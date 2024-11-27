// src/components/dashboard/hooks/useDashboardData.js
import { useState, useEffect } from "react";

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Fetch wallet data
      const walletResponse = await fetch("/api/wallet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const walletResult = await walletResponse.json();
      if (!walletResponse.ok) throw new Error(walletResult.error);
      setWalletData(walletResult.wallet);

      // Fetch cards
      const cardsResponse = await fetch("/api/cards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cardsResult = await cardsResponse.json();
      if (!cardsResponse.ok) throw new Error(cardsResult.error);
      setCards(cardsResult.cards);

      // Fetch recent transactions
      const transactionsResponse = await fetch("/api/transactions?limit=5", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const transactionsResult = await transactionsResponse.json();
      if (!transactionsResponse.ok) throw new Error(transactionsResult.error);
      setTransactions(transactionsResult.transactions);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    isLoading,
    error,
    walletData,
    cards,
    transactions,
    refreshData: fetchDashboardData,
  };
}
