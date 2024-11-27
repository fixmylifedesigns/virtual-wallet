import { Button } from "@/components/ui/button";
import { DollarSign, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardHeader({ onDeposit }) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-zinc-200">Welcome back</h2>
      <div className="flex space-x-4">
        <Button
          onClick={onDeposit}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          <DollarSign className="mr-2" size={20} />
          Add Funds
        </Button>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          onClick={() => router.push("/dashboard/cards")}
        >
          <PlusCircle className="mr-2" size={20} />
          New Card
        </Button>
      </div>
    </div>
  );
}
