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

const FinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showDepositModal, setShowDepositModal] = useState(false);
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
    <div className="flex-1 p-8">
      {/* Quick Actions Bar */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-200">Welcome back</h2>
        <div className="flex space-x-4">
          <Button
            onClick={() => setShowDepositModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            <DollarSign className="mr-2" size={20} />
            Add Funds
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700">
            <PlusCircle className="mr-2" size={20} />
            New Card
          </Button>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wallet Balance Card */}
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

        {/* Virtual Cards */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-zinc-400">Virtual Cards</h3>
              <Button
                variant="outline"
                className="text-yellow-500 border-yellow-500"
              >
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="p-4 bg-zinc-800 rounded-lg flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <CreditCard className="text-yellow-500" size={24} />
                    <div>
                      <div className="text-sm text-zinc-400">
                        {card.type} ****{card.cardNumber.slice(-4)}
                      </div>
                      <div className="text-yellow-500">{card.name}</div>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-400">
                    Limit: {formatCurrency(card.limit)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg text-zinc-400">Recent Transactions</h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-2.5 text-zinc-400"
                    size={20}
                  />
                  <input
                    type="text"
                    className="bg-zinc-800 border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-zinc-300"
                    placeholder="Search transactions..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800"
                >
                  <div className="flex items-center space-x-4">
                    {transaction.amount > 0 ? (
                      <ArrowUpCircle className="text-green-500" size={20} />
                    ) : (
                      <ArrowDownCircle className="text-red-500" size={20} />
                    )}
                    <div>
                      <div className="text-zinc-300">
                        {transaction.merchant}
                      </div>
                      <div className="text-sm text-zinc-400">
                        {formatDate(transaction.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      className={
                        transaction.amount > 0
                          ? "text-green-500"
                          : "text-red-500"
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
      </div>
      {showDepositModal && (
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
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowDepositModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FinancialDashboard;
