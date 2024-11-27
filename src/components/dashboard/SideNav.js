import { usePathname } from "next/navigation";
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
  X,
} from "lucide-react";

export default function SideNav({ isMobile, onClose }) {
  const pathname = usePathname();

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <CreditCard size={20} />,
      label: "Create Cards",
      href: "/dashboard/cards",
    },
    {
      icon: <Wallet size={20} />,
      label: "Wallet",
      href: "/dashboard/wallet",
    },
    {
      icon: <DollarSign size={20} />,
      label: "Transactions",
      href: "/dashboard/transactions",
    },
    // {
    //   icon: <Building size={20} />,
    //   label: "Bank Accounts",
    //   href: "/dashboard/banks",
    // },
    // {
    //   icon: <FileText size={20} />,
    //   label: "Statements",
    //   href: "/dashboard/statements",
    // },
  ];

  return (
    <div className="w-64 bg-zinc-900 p-4 flex flex-col h-full">
      {/* Header with close button for mobile */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-yellow-500">ThunderWallet</h1>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-zinc-400 md:hidden"
          >
            <X size={20} />
          </Button>
        )}
      </div>

      <nav className="flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={isMobile ? onClose : undefined}
            className={`flex items-center space-x-3 p-3 rounded-lg mb-1 cursor-pointer ${
              pathname === item.href
                ? "bg-zinc-800 text-yellow-500"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-zinc-800 pt-4">
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
