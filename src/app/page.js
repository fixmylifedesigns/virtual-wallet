import { ChevronRight, Shield, Wallet, Zap } from "lucide-react";
import Link from "next/link";
import CreditCard from "../components/CreditCard";
import Nav from "@/components/MarketingPage/Nav";
import Footer from "@/components/MarketingPage/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-200">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto pt-16 pb-12 px-4 sm:pt-24 sm:pb-20">
          {/* Hero Content */}
          <div className="text-center space-y-8 relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="block text-zinc-200">Create Virtual Cards at</span>
              <span className="block text-yellow-500">Lightning Speed!</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto text-zinc-400">
              Generate secure, temporary virtual cards for your online
              purchases within seconds. Take control of your digital payments with unlimited
              virtual cards.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link
                href="/auth"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-400"
              >
                Start Creating Cards <ChevronRight className="ml-2" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center px-8 py-3 border border-zinc-800 text-base font-medium rounded-md text-zinc-200 bg-transparent hover:bg-zinc-800"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-yellow-500 w-96 h-96 rounded-full opacity-10 blur-3xl"></div>
            </div>
            <div className="relative flex justify-center perspective-1000">
              <div className="flex space-x-4 -rotate-12">
                <CreditCard
                  cardNumber="4532 1111 2222 3333"
                  cardHolder="JOHN DOE"
                  expiryDate="12/25"
                  variant="yellow"
                  type="PLATINUM"
                />

                {/* Blue variant */}
                <CreditCard
                  cardNumber="5678 9012 3456 7890"
                  cardHolder="JANE SMITH"
                  expiryDate="03/27"
                  variant="blue"
                  type="BUSINESS"
                  className="-rotate-12"
                />

                {/* Purple variant */}
                <CreditCard
                  cardNumber="9876 5432 1098 7654"
                  cardHolder="ALEX JOHNSON"
                  expiryDate="09/26"
                  variant="purple"
                  type="PREMIUM"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-zinc-200 sm:text-4xl">
              Everything you need for secure online payments
            </h2>
            <p className="mt-4 text-xl text-zinc-400">
              Create, manage, and secure your digital transactions with ease.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Zap className="text-yellow-500" size={24} />,
                title: "Instant Card Creation",
                description:
                  "Generate virtual cards instantly for your online purchases. Set limits and expiration dates for better control.",
              },
              {
                icon: <Shield className="text-yellow-500" size={24} />,
                title: "Bank-Grade Security",
                description:
                  "Your virtual cards are protected with advanced encryption and real-time fraud monitoring.",
              },
              {
                icon: <Wallet className="text-yellow-500" size={24} />,
                title: "Flexible Management",
                description:
                  "Create temporary or permanent cards, set spending limits, and track all your transactions in one place.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:bg-zinc-800/80 transition-colors"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zinc-800">
                  {feature.icon}
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-zinc-200">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-zinc-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
