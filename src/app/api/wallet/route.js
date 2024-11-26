// src/app/api/wallet/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { z } from "zod";

// Get wallet balance
export async function GET(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const wallet = await prisma.wallet.findUnique({
      where: { userId: decoded.userId },
    });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    return NextResponse.json({ wallet });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update wallet balance (add/withdraw funds)
const updateBalanceSchema = z.object({
  amount: z.number(),
  type: z.enum(["deposit", "withdrawal"]),
});

export async function PUT(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const body = await req.json();

    const result = updateBalanceSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { amount, type } = result.data;
    const wallet = await prisma.wallet.findUnique({
      where: { userId: decoded.userId },
    });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    if (type === "withdrawal" && wallet.balance < amount) {
      return NextResponse.json(
        { error: "Insufficient funds" },
        { status: 400 }
      );
    }

    const updatedWallet = await prisma.wallet.update({
      where: { userId: decoded.userId },
      data: {
        balance:
          type === "deposit"
            ? wallet.balance + amount
            : wallet.balance - amount,
      },
    });

    return NextResponse.json({ wallet: updatedWallet });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
