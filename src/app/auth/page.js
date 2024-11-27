"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Wallet } from "lucide-react";
import { ethers } from "ethers";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? {
                email: formData.email,
                password: formData.password,
              }
            : formData
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `${isLogin ? "Login" : "Signup"} failed`);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      setError("Please install MetaMask to continue");
      return;
    }

    try {
      setIsConnecting(true);
      setError("");

      // Create Web3 Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Request account access
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      // Get the nonce
      const nonceResponse = await fetch("/api/auth/web3/nonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      if (!nonceResponse.ok) {
        throw new Error("Failed to get nonce");
      }

      const { nonce } = await nonceResponse.json();

      // Create the message
      const message = `Welcome to VirtualWallet!\n\nPlease sign this message to verify your identity.\n\nNonce: ${nonce}`;

      // Request signature
      const signature = await signer.signMessage(message);

      // Verify signature with backend
      const authResponse = await fetch("/api/auth/web3/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, signature, nonce }),
      });

      if (!authResponse.ok) {
        throw new Error("Verification failed");
      }

      const data = await authResponse.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-yellow-500">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* MetaMask Button */}
        <div>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-zinc-800 text-lg font-medium rounded-lg text-zinc-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wallet size={20} />
            {isConnecting ? "Connecting..." : "Continue with MetaMask"}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-zinc-400">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleEmailSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="rounded-md space-y-4">
            {!isLogin && (
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-zinc-400 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required={!isLogin}
                    className="appearance-none relative block w-full px-3 py-2 border border-zinc-800 bg-zinc-900 placeholder-zinc-500 text-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-zinc-400 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required={!isLogin}
                    className="appearance-none relative block w-full px-3 py-2 border border-zinc-800 bg-zinc-900 placeholder-zinc-500 text-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-zinc-800 bg-zinc-900 placeholder-zinc-500 text-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-800 bg-zinc-900 placeholder-zinc-500 text-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            >
              {isLogin ? "Sign in" : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
