import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  FileText,
  DollarSign,
  Building,
  LogOut,
} from "lucide-react";

export default function SideNav({ activeTab, setActiveTab }) {
  return (
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
            route: "/dashboard/cards",
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
          <Link
            key={item.id}
            href={`${item.route}`}
            className={`flex items-center space-x-3 p-3 rounded-lg mb-1 cursor-pointer ${
              activeTab === item.id
                ? "bg-zinc-800 text-yellow-500"
                : "hover:bg-zinc-800"
            }`}
          >
            <span>{item.label}</span>
          </Link>
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
  );
}
