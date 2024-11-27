"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreditCard from "@/components/CreditCard";
import { Eye, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CardsListPage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchCards();
  }, []);

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
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-yellow-500"></div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-black text-zinc-200 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-yellow-500 mb-4">
            Your Virtual Cards
          </h1>
          <Card className="bg-zinc-900 border-zinc-800 p-12">
            <div className="flex flex-col items-center gap-4">
              <CreditCard variant="black" />
              <h2 className="text-xl font-semibold mt-6">
                Create your first virtual card
              </h2>
              <p className="text-zinc-400 mb-6">
                Start managing your expenses with custom virtual cards
              </p>
              <Button
                onClick={() => router.push("/dashboard/cards")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <PlusCircle className="mr-2" size={20} />
                Create New Card
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500">
            Your Virtual Cards
          </h1>
          <Button
            onClick={() => router.push("/dashboard/cards")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            <PlusCircle className="mr-2" size={20} />
            Create New Card
          </Button>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-zinc-800">
                  <tr>
                    <th className="text-left py-4 px-4 text-zinc-400 font-medium">
                      Card Design
                    </th>
                    <th className="text-left py-4 px-4 text-zinc-400 font-medium">
                      Card Name
                    </th>
                    <th className="text-left py-4 px-4 text-zinc-400 font-medium">
                      Cardholder
                    </th>
                    <th className="text-left py-4 px-4 text-zinc-400 font-medium">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 text-zinc-400 font-medium">
                      Expiration
                    </th>
                    <th className="text-center py-4 px-4 text-zinc-400 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {cards.map((card) => (
                    <tr key={card.id} className="hover:bg-zinc-800/50">
                      <td className="py-4 px-4">
                        <div className="w-20">
                          <CreditCard
                            cardNumber={card.cardNumber}
                            cardHolder={card.cardHolder}
                            expiryDate={new Date(
                              card.expirationDate
                            ).toLocaleDateString("en-US", {
                              month: "2-digit",
                              year: "2-digit",
                            })}
                            variant={card.variant}
                            type={card.name.toUpperCase()}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-zinc-200">
                          {card.name}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-zinc-300">
                        {card.cardHolder}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            card.status === "active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          {card.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-zinc-300">
                        {new Date(card.expirationDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              router.push(`/dashboard/cards/${card.id}`)
                            }
                            className="text-zinc-400 hover:text-zinc-200"
                          >
                            <Eye size={18} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
