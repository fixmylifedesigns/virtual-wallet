import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpCircle, ArrowDownCircle, Download } from "lucide-react";
import { formatCurrency, formatDate } from "../utils/formatters";

const mockTransactions = [
  {
    id: "1",
    amount: -299.99,
    currency: "USD",
    merchant: "Amazon",
    status: "completed",
    timestamp: new Date("2024-11-25"),
  },
  {
    id: "2",
    amount: -89.99,
    currency: "USD",
    merchant: "Netflix",
    status: "completed",
    timestamp: new Date("2024-11-24"),
  },
  {
    id: "3",
    amount: 1500.0,
    currency: "USD",
    merchant: "Salary Deposit",
    status: "completed",
    timestamp: new Date("2024-11-23"),
  },
  {
    id: "4",
    amount: -125.5,
    currency: "USD",
    merchant: "Grocery Store",
    status: "pending",
    timestamp: new Date("2024-11-22"),
  },
  {
    id: "5",
    amount: -45.0,
    currency: "USD",
    merchant: "Gas Station",
    status: "completed",
    timestamp: new Date("2024-11-21"),
  },
];

export function TransactionsCard({
  specificCard = null, // Card from card details page
  cards = [], // All user cards
  showDownload = false,
  isFullPage = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Use specific card if provided, otherwise use first available card
  const associatedCard = specificCard || cards[0];

  // Only show transactions if we have a card to associate them with
  const transactionsToShow = associatedCard ? mockTransactions : [];

  const filteredTransactions = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return transactionsToShow.filter(
      (transaction) =>
        transaction.merchant.toLowerCase().includes(searchLower) ||
        formatCurrency(transaction.amount).includes(searchTerm) ||
        transaction.status.toLowerCase().includes(searchLower) ||
        formatDate(transaction.timestamp).toLowerCase().includes(searchLower)
    );
  }, [transactionsToShow, searchTerm]);

  const handleDownload = () => {
    if (!associatedCard) return;

    const csvContent = [
      ["Date", "Merchant", "Card", "Card Number", "Amount", "Status"],
      ...filteredTransactions.map((t) => [
        formatDate(t.timestamp),
        t.merchant,
        associatedCard.name,
        `****${associatedCard.cardNumber.slice(-4)}`,
        formatCurrency(t.amount),
        t.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${formatDate(new Date())}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!associatedCard) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-zinc-400 mb-4">No transactions yet</div>
            <div className="text-sm text-zinc-500">
              Once you start using your cards, your transactions will appear
              here
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg text-zinc-400">
            {isFullPage ? "All Transactions" : "Recent Transactions"}
          </h3>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search
                className="absolute left-3 top-2.5 text-zinc-400"
                size={20}
              />
              <input
                type="text"
                className="w-full sm:w-64 bg-zinc-800 border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {showDownload && (
              <Button
                variant="outline"
                onClick={handleDownload}
                className="shrink-0"
              >
                <Download size={20} className="mr-2" />
                Download
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {transaction.amount > 0 ? (
                  <ArrowUpCircle className="text-green-500" size={20} />
                ) : (
                  <ArrowDownCircle className="text-red-500" size={20} />
                )}
                <div>
                  <div className="text-zinc-300">{transaction.merchant}</div>
                  <div className="text-sm text-zinc-400">
                    {formatDate(transaction.timestamp)}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {/* Desktop: Show full card info */}
                    <span className="hidden md:inline">
                      {associatedCard.name} (****
                      {associatedCard.cardNumber.slice(-4)})
                    </span>
                    {/* Mobile: Show only last 4 */}
                    <span className="md:hidden">
                      ****{associatedCard.cardNumber.slice(-4)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div
                  className={
                    transaction.amount > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {formatCurrency(transaction.amount)}
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    transaction.status === "completed"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
