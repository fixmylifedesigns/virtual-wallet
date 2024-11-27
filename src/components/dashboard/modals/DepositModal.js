// src/components/dashboard/modals/DepositModal.js
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DepositModal({ onClose, onDeposit }) {
  const [depositAmount, setDepositAmount] = useState("");
  const [error, setError] = useState("");

  const handleDeposit = async () => {
    try {
      const token = localStorage.getItem("token");
      const amount = parseFloat(depositAmount);

      if (isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid amount");
      }

      const response = await fetch("/api/wallet", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          type: "deposit",
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      onDeposit();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <Card className="bg-zinc-900 border-zinc-800 w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Add Funds</CardTitle>
          <CardDescription>
            Enter the amount you want to deposit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label className="text-sm text-zinc-400">Amount</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 mt-1"
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>
            <div className="flex space-x-4">
              <Button className="flex-1" onClick={handleDeposit}>
                Deposit
              </Button>
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
