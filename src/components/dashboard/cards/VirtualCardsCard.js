// src/components/dashboard/cards/VirtualCardsCard.js
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

export function VirtualCardsCard({ cards }) {
  return (
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
  );
}
