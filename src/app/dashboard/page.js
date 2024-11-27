// In src/app/dashboard/page.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  FileText,
  DollarSign,
  Building,
  PlusCircle,
  LogOut,
  MoreVertical,
  ArrowDownCircle,
  ArrowUpCircle,
  Search,
  Loader2,
} from "lucide-react";
import FinancialDashboard from "@/components/dashboard/FinancialDashboard";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Fetch wallet data
      const walletResponse = await fetch("/api/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const walletResult = await walletResponse.json();
      if (!walletResponse.ok) throw new Error(walletResult.error);
      setWalletData(walletResult.wallet);

      // Fetch cards
      const cardsResponse = await fetch("/api/cards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const cardsResult = await cardsResponse.json();
      if (!cardsResponse.ok) throw new Error(cardsResult.error);
      setCards(cardsResult.cards);

      // Fetch recent transactions
      const transactionsResponse = await fetch("/api/transactions?limit=5", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

      setWalletData(result.wallet);
      setShowDepositModal(false);
      setDepositAmount("");
      fetchDashboardData(); // Refresh all data
    } catch (err) {
      setError(err.message);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Card className="bg-zinc-900 border-zinc-800 max-w-md w-full mx-4">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-red-500 mb-4">Error loading dashboard</div>
              <div className="text-zinc-400 mb-4">{error}</div>
              <Button onClick={fetchDashboardData}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-zinc-200">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-yellow-500">ThunderWallet</h1>
        </div>

        <nav className="flex-1">
          {[
            {
              icon: <LayoutDashboard size={20} />,
              label: "Dashboard",
              id: "dashboard",
            },
            {
              icon: <CreditCard size={20} />,
              label: "Virtual Cards",
              id: "cards",
            },
            { icon: <Wallet size={20} />, label: "Wallet", id: "wallet" },
            {
              icon: <Building size={20} />,
              label: "Bank Accounts",
              id: "banks",
            },
            {
              icon: <FileText size={20} />,
              label: "Statements",
              id: "statements",
            },
            {
              icon: <DollarSign size={20} />,
              label: "Transactions",
              id: "transactions",
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg mb-1 cursor-pointer ${
                activeTab === item.id
                  ? "bg-zinc-800 text-yellow-500"
                  : "hover:bg-zinc-800"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="border-t border-zinc-800 pt-4 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            <LogOut className="mr-2" size={20} />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <FinancialDashboard />
    </div>
  );
};

export default DashboardPage;
