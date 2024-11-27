"use client";
import { useEffect, useState, use } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreditCard from "@/components/CreditCard";
import { TransactionsCard } from "@/components/dashboard/cards/TransactionsCard";
import { ArrowLeft, AlertTriangle, Loader2, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CardDetailsPage({ params }) {
  const resolvedParams = use(params);
  const cardId = resolvedParams.id;
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [card, setCard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cardId) {
      fetchCardDetails();
    }
  }, [cardId]);

  const fetchCardDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      // Fetch card details
      const cardResponse = await fetch(`/api/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!cardResponse.ok) {
        throw new Error("Failed to fetch card details");
      }

      const cardData = await cardResponse.json();
      setCard(cardData.card);

      // Fetch card transactions
      const transactionsResponse = await fetch(
        `/api/transactions?cardId=${cardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!transactionsResponse.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData.transactions);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivateCard = async () => {
    if (!confirm("Are you sure you want to deactivate this card?")) {
      return;
    }

    try {
      setIsDeactivating(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`/api/cards/${params.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "inactive" }),
      });

      if (!response.ok) {
        throw new Error("Failed to deactivate card");
      }

      // Refresh card details
      fetchCardDetails();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleDeleteCard = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete card");
      }

      router.push("/dashboard"); // Redirect to dashboard after successful deletion
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-black text-zinc-200 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-zinc-900 border-zinc-800 p-8">
            <div className="flex flex-col items-center gap-4">
              <AlertTriangle className="text-red-500" size={48} />
              <h2 className="text-xl font-semibold">Error Loading Card</h2>
              <p className="text-zinc-400">{error}</p>
              <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="mr-2" size={20} />
                Go Back
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-200 pb-4">
      {/* Mobile Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 m-8">
        <div className="flex items-center gap-4">

          <h1 className="text-2xl font-bold text-zinc-200 mt-8">Card Details</h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {card.status === "active" && (
            <Button
              onClick={handleDeactivateCard}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10 flex-1 sm:flex-none"
              disabled={isDeactivating}
            >
              {isDeactivating ? "Deactivating..." : "Deactivate Card"}
            </Button>
          )}
          <Button
            onClick={() => setShowDeleteConfirm(true)}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500/10  flex-1 sm:flex-none"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Card"}
          </Button>
        </div>
      </div>

      {/* Desktop Header - Hidden on Mobile */}
      {/* <div className="hidden md:flex justify-between items-center p-8">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="text-zinc-400"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold text-yellow-500">{card.name}</h1>
        </div>
        <div className="flex gap-2">
          {card.status === "active" && (
            <Button
              onClick={handleDeactivateCard}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
              disabled={isDeactivating}
            >
              {isDeactivating ? "Deactivating..." : "Deactivate Card"}
            </Button>
          )}
          <Button
            onClick={() => setShowDeleteConfirm(true)}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500/10"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Card"}
          </Button>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="px-4 md:px-8 max-w-4xl mx-auto space-y-6">
        {/* Card Details */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card Preview */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-full max-w-[340px]">
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
              </div>

              {/* Card Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-yellow-500 mb-4">
                    Card Information
                  </h3>
                  <dl className="space-y-4 text-sm md:text-base">
                    <div>
                      <dt className="text-zinc-400">Card Number</dt>
                      <dd className="mt-1 font-mono">{card.cardNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-400">CVV</dt>
                      <dd className="mt-1 font-mono">{card.cvv}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-400">Expiration Date</dt>
                      <dd className="mt-1">
                        {new Date(card.expirationDate).toLocaleDateString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-zinc-400">Monthly Limit</dt>
                      <dd className="mt-1">${card.limit.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-400">Status</dt>
                      <dd className="mt-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            card.status === "active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          {card.status}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <TransactionsCard transactions={transactions} specificCard={card} />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-zinc-900 border-zinc-800 max-w-md w-full">
            <CardHeader>
              <CardTitle>Delete Card</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-zinc-400">
                  Are you sure you want to delete this card? This action cannot
                  be undone and all associated transactions will be deleted.
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteCard}
                    className="bg-red-500 hover:bg-red-600 text-white"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Card"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
