import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { WalletCard } from "./cards/WalletCard";
import { VirtualCardsCard } from "./cards/VirtualCardsCard";
import { TransactionsCard } from "./cards/TransactionsCard";
import { DepositModal } from "./modals/DepositModal";
import { LoadingState } from "./states/LoadingState";
import { ErrorState } from "./states/ErrorState";
import { useDashboardData } from "./hooks/useDashboardData";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DollarSign } from "lucide-react";

export default function FinancialDashboard() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const { isLoading, error, walletData, cards, transactions, refreshData } =
    useDashboardData();
  const router = useRouter();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} retry={refreshData} />;

  return (
    <div className="flex-1 p-4 md:p-8">
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden md:block">
      <DashboardHeader onDeposit={() => setShowDepositModal(true)} />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <h2 className="text-xl font-bold text-zinc-200 mb-6">Dashboard</h2>
      </div>

      {/* Mobile Add Funds Button */}
      <div className="mb-6 md:hidden">
        <Button
          onClick={() => setShowDepositModal(true)}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-6"
        >
          <DollarSign className="text-yellow-500" size={20} />
          <span>Add Funds to Wallet</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Left Column - Wallet and Cards (Full width on mobile, left side on desktop) */}
        <div className="w-full md:w-1/2 space-y-6">
          <WalletCard walletData={walletData} />
          <VirtualCardsCard cards={cards} />
        </div>

        {/* Right Column - Transactions (Hidden on mobile, right side on desktop) */}
        <div className="hidden md:block md:w-1/2">
          <TransactionsCard transactions={transactions} cards={cards} />
        </div>

        {/* Mobile Transactions Button */}
        <div className="mt-6 md:hidden">
          <Button
            onClick={() => router.push("/dashboard/transactions")}
            variant="outline"
            className="w-full py-6"
          >
            View All Transactions
          </Button>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <DepositModal
          onClose={() => setShowDepositModal(false)}
          onDeposit={refreshData}
          walletData={walletData}
        />
      )}
    </div>
  );
}
