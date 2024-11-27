// src/components/dashboard/cards/WalletCard.js
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "../utils/formatters";

export function WalletCard({ walletData }) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg text-zinc-400">Wallet Balance</h3>
          <div className="text-3xl font-bold text-yellow-500">
            {formatCurrency(walletData?.balance || 0)}
          </div>
        </div>
        <div className="text-sm text-zinc-400">
          {walletData?.currency || "USD"} Account
        </div>
      </CardContent>
    </Card>
  );
}
