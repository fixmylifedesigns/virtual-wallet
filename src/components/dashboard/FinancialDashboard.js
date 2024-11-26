import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
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
} from "lucide-react";

const FinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      id: "dashboard",
    },
    { icon: <CreditCard size={20} />, label: "Virtual Cards", id: "cards" },
    { icon: <Wallet size={20} />, label: "Wallet", id: "wallet" },
    { icon: <Building size={20} />, label: "Bank Accounts", id: "banks" },
    { icon: <FileText size={20} />, label: "Statements", id: "statements" },
    {
      icon: <DollarSign size={20} />,
      label: "Transactions",
      id: "transactions",
    },
  ];

  const virtualCards = [
    { id: 1, type: "Visa", lastFour: "4242", limit: 5000, balance: 1250 },
    { id: 2, type: "Mastercard", lastFour: "8888", limit: 3000, balance: 500 },
  ];

  const transactions = [
    {
      icon: <ArrowUpCircle className="text-green-500" size={20} />,
      title: "Deposit from Bank",
      amount: "+$2,500.00",
      date: "2024-11-26",
      status: "completed",
    },
    {
      icon: <ArrowDownCircle className="text-red-500" size={20} />,
      title: "Withdrawal to Chase",
      amount: "-$1,800.00",
      date: "2024-11-25",
      status: "pending",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-zinc-200">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-yellow-500">VirtualWallet</h1>
        </div>

        <nav className="flex-1">
          {sidebarItems.map((item) => (
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
          <div className="flex items-center space-x-3 p-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
              U
            </div>
            <div>
              <div className="text-sm">user@example.com</div>
              <div className="text-xs text-yellow-500">Premium Account</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 cursor-pointer hover:bg-zinc-800 rounded-lg">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Quick Actions Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-200">Welcome back</h2>
          <div className="flex space-x-4">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <PlusCircle className="mr-2" size={20} />
              New Virtual Card
            </Button>
            <Button className="bg-zinc-800 hover:bg-zinc-700">
              <Building className="mr-2" size={20} />
              Connect Bank
            </Button>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Balance Card */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg text-zinc-400">Total Balance</h3>
                <div className="text-3xl font-bold text-yellow-500">
                  $150,000.00
                </div>
              </div>

              <div className="flex justify-between text-sm text-zinc-400">
                <div>
                  <div>Available Credit</div>
                  <div className="text-zinc-200">$847,500.00</div>
                </div>
                <div>
                  <div>Credit Limit</div>
                  <div className="text-zinc-200">$1,000,000.00</div>
                </div>
              </div>

              <div className="w-full bg-zinc-800 rounded-full h-2 my-4">
                <div className="bg-yellow-500 h-2 rounded-full w-2/12" />
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
                  className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black"
                >
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {virtualCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-4 bg-zinc-800 rounded-lg flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <CreditCard className="text-yellow-500" size={24} />
                      <div>
                        <div className="text-sm text-zinc-400">
                          {card.type} ****{card.lastFour}
                        </div>
                        <div className="text-yellow-500">
                          ${card.balance.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-zinc-400">
                      Limit: ${card.limit.toLocaleString()}
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
                  <Button
                    variant="outline"
                    className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black"
                  >
                    Export
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800"
                  >
                    <div className="flex items-center space-x-4">
                      {transaction.icon}
                      <div>
                        <div className="text-zinc-300">{transaction.title}</div>
                        <div className="text-sm text-zinc-400">
                          {transaction.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-zinc-300">{transaction.amount}</div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          transaction.status === "completed"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {transaction.status}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-zinc-300"
                      >
                        <MoreVertical size={20} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
