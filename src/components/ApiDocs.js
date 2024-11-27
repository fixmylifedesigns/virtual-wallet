"use client";
import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ApiDocs = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(text);
    setTimeout(() => setCopiedEndpoint(""), 2000);
  };

  const endpoints = [
    {
      category: "Authentication",
      endpoints: [
        {
          method: "POST",
          path: "/api/auth/signup",
          description: "Create a new user account",
          request: {
            email: "user@example.com",
            password: "password123",
            firstName: "John",
            lastName: "Doe",
          },
          response: {
            user: {
              id: "user_id",
              email: "user@example.com",
              firstName: "John",
              lastName: "Doe",
            },
            token: "jwt_token",
          },
        },
        {
          method: "POST",
          path: "/api/auth/login",
          description: "Login with email and password",
          request: {
            email: "user@example.com",
            password: "password123",
          },
          response: {
            user: {
              id: "user_id",
              email: "user@example.com",
              firstName: "John",
              lastName: "Doe",
            },
            token: "jwt_token",
          },
        },
        {
          method: "POST",
          path: "/api/auth/web3/nonce",
          description: "Get nonce for Web3 authentication",
          request: {
            address: "0x1234...5678",
          },
          response: {
            nonce: "generated_nonce",
          },
        },
        {
          method: "POST",
          path: "/api/auth/web3/verify",
          description: "Verify Web3 signature",
          request: {
            address: "0x1234...5678",
            signature: "signed_message",
            nonce: "nonce",
          },
          response: {
            token: "jwt_token",
            user: {
              id: "user_id",
              walletAddress: "0x1234...5678",
            },
          },
        },
      ],
    },
    {
      category: "Wallet",
      endpoints: [
        {
          method: "GET",
          path: "/api/wallet",
          description: "Get wallet balance",
          response: {
            wallet: {
              id: "wallet_id",
              balance: 1000.0,
              currency: "USD",
            },
          },
        },
        {
          method: "PUT",
          path: "/api/wallet",
          description: "Update wallet balance (deposit/withdraw)",
          request: {
            amount: 100.0,
            type: "deposit",
          },
          response: {
            wallet: {
              id: "wallet_id",
              balance: 1100.0,
              currency: "USD",
            },
          },
        },
      ],
    },
    {
      category: "Virtual Cards",
      endpoints: [
        {
          method: "GET",
          path: "/api/cards",
          description: "Get all virtual cards",
          response: {
            cards: [
              {
                id: "card_id",
                type: "virtual",
                status: "active",
                name: "Shopping Card",
                cardNumber: "4242424242424242",
                expirationDate: "2025-12-31",
                cvv: "123",
                limit: 5000.0,
              },
            ],
          },
        },
        {
          method: "POST",
          path: "/api/cards",
          description: "Create a new virtual card",
          request: {
            type: "virtual",
            name: "Shopping Card",
            cardHolder: "JOHN DOE",
            limit: 5000.0,
            variant: "black",
          },
          response: {
            card: {
              id: "card_id",
              type: "virtual",
              status: "active",
              name: "Shopping Card",
              cardNumber: "4242424242424242",
              expirationDate: "2025-12-31",
              cvv: "123",
              limit: 5000.0,
            },
          },
        },
        {
          method: "GET",
          path: "/api/cards/[id]",
          description: "Get card details by ID",
          response: {
            card: {
              id: "card_id",
              type: "virtual",
              status: "active",
              name: "Shopping Card",
              cardNumber: "4242424242424242",
              expirationDate: "2025-12-31",
              cvv: "123",
              limit: 5000.0,
              transactions: [],
            },
          },
        },
        {
          method: "PUT",
          path: "/api/cards/[id]",
          description: "Update card status",
          request: {
            status: "inactive",
          },
          response: {
            card: {
              id: "card_id",
              status: "inactive",
            },
          },
        },
        {
          method: "DELETE",
          path: "/api/cards/[id]",
          description: "Delete a virtual card",
          response: {
            message: "Card deleted successfully",
          },
        },
      ],
    },
    {
      category: "Transactions",
      endpoints: [
        {
          method: "GET",
          path: "/api/transactions",
          description: "Get all transactions",
          response: {
            transactions: [
              {
                id: "transaction_id",
                amount: 499.99,
                currency: "USD",
                merchant: "Amazon",
                status: "completed",
                timestamp: "2024-11-25T00:00:00.000Z",
                cardId: "card_id",
              },
            ],
          },
        },
        {
          method: "POST",
          path: "/api/transactions",
          description: "Create a new transaction",
          request: {
            cardId: "card_id",
            amount: 499.99,
            merchant: "Amazon",
            currency: "USD",
          },
          response: {
            transaction: {
              id: "transaction_id",
              amount: 499.99,
              currency: "USD",
              merchant: "Amazon",
              status: "completed",
              timestamp: "2024-11-25T00:00:00.000Z",
              cardId: "card_id",
            },
          },
        },
      ],
    },
  ];

  const renderCodeBlock = (code, language = "json") => (
    <pre className="bg-zinc-800 p-4 rounded-lg overflow-x-auto">
      <code className="text-sm font-mono text-zinc-200">
        {JSON.stringify(code, null, 2)}
      </code>
    </pre>
  );

  const getMethodColor = (method) => {
    const colors = {
      GET: "bg-green-500/10 text-green-500",
      POST: "bg-blue-500/10 text-blue-500",
      PUT: "bg-yellow-500/10 text-yellow-500",
      DELETE: "bg-red-500/10 text-red-500",
    };
    return colors[method] || "bg-gray-500/10 text-gray-500";
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4">
            API Documentation
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Integrate ThunderWallet into your applications with our
            comprehensive API. All API endpoints require authentication via JWT
            token in the Authorization header.
          </p>
        </div>

        <div className="grid gap-8">
          {endpoints.map((category) => (
            <section key={category.category} className="space-y-6">
              <h2 className="text-2xl font-bold text-zinc-200">
                {category.category}
              </h2>
              <div className="grid gap-6">
                {category.endpoints.map((endpoint) => (
                  <Card
                    key={endpoint.path}
                    className="bg-zinc-900 border-zinc-800"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(
                              endpoint.method
                            )}`}
                          >
                            {endpoint.method}
                          </span>
                          <code className="text-zinc-200">{endpoint.path}</code>
                        </div>
                        <button
                          onClick={() => copyToClipboard(endpoint.path)}
                          className="p-2 text-zinc-400 hover:text-zinc-200 rounded-lg transition-colors"
                          title="Copy endpoint"
                        >
                          {copiedEndpoint === endpoint.path ? (
                            <Check size={20} className="text-green-500" />
                          ) : (
                            <Copy size={20} />
                          )}
                        </button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-zinc-400">{endpoint.description}</p>

                      {endpoint.request && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-zinc-300">
                            Request Body:
                          </h4>
                          {renderCodeBlock(endpoint.request)}
                        </div>
                      )}

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-zinc-300">
                          Response:
                        </h4>
                        {renderCodeBlock(endpoint.response)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Authentication</h3>
          <p className="text-zinc-400 mb-4">
            All API endpoints require authentication. Include the JWT token in
            the Authorization header:
          </p>
          <pre className="bg-zinc-800 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono text-zinc-200">
              {`Authorization: Bearer your_jwt_token`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
