"use client";
import { useState, useEffect } from "react";
import { TransactionsCard } from "@/components/dashboard/cards/TransactionsCard";
import { Loader2 } from "lucide-react";

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([fetchTransactions(), fetchCards()]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const response = await fetch("/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data.transactions);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchCards = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const response = await fetch("/api/cards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }

      const data = await response.json();
      setCards(data.cards);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl font-bold text-zinc-200 mb-8">Transactions</h1>
        <TransactionsCard
          transactions={transactions}
          cards={cards}
          showDownload={true}
          isFullPage={true}
        />
      </div>
    </div>
  );
}
