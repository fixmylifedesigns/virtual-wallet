"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreditCard from "@/components/CreditCard";
import { useRouter } from "next/navigation";

export default function CreateVirtualCard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    cardHolder: "",
    type: "VIRTUAL",
    variant: "black",
    limit: 5000,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const colorOptions = [
    { label: "Classic Black", value: "black" },
    { label: "Royal Blue", value: "blue" },
    { label: "Regal Purple", value: "purple" },
    { label: "Premium Gold", value: "golden" },
    { label: "Sleek Yellow", value: "yellow" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create card");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Format cardholder name to uppercase
  const formatCardholderName = (name) => {
    return name.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500">
            Create Your Virtual Card
          </h1>
          <p className="text-zinc-400 mt-2">
            Customize your card details and appearance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card Preview */}
          <div className="flex items-center justify-center p-8 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <CreditCard
              cardHolder={
                formData.cardHolder
                  ? formatCardholderName(formData.cardHolder)
                  : "CARDHOLDER NAME"
              }
              type={formData.name.toUpperCase() || "VIRTUAL CARD"}
              variant={formData.variant}
            />
          </div>

          {/* Form */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Card Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g., Shopping Card, Travel Card"
                    required
                  />
                  <p className="text-xs text-zinc-500">
                    This is the name you'll use to identify this card
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter cardholder name"
                    required
                    maxLength={20}
                  />
                  <p className="text-xs text-zinc-500">
                    Name that will appear on the card
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Card Design</label>
                  <select
                    name="variant"
                    value={formData.variant}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {colorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">
                    Spending Limit
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-zinc-400">
                      $
                    </span>
                    <input
                      type="number"
                      name="limit"
                      value={formData.limit}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      min="100"
                      max="50000"
                      step="100"
                      required
                    />
                  </div>
                  <p className="text-xs text-zinc-500">
                    Set a monthly spending limit between $100 and $50,000
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Card"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
