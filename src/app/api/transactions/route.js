// src/app/api/transactions/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { z } from "zod";

const transactionSchema = z.object({
  cardId: z.string(),
  amount: z.number().positive(),
  merchant: z.string().min(1),
  currency: z.string().length(3), // ISO 4217 currency code
});

export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const body = await req.json();

    const result = transactionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Verify card ownership and status
    const card = await prisma.card.findFirst({
      where: {
        id: result.data.cardId,
        userId: decoded.userId,
        status: "active",
      },
    });

    if (!card) {
      return NextResponse.json(
        { error: "Card not found or inactive" },
        { status: 404 }
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        ...result.data,
        status: "completed",
        timestamp: new Date(),
      },
    });

    return NextResponse.json({ transaction });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    // Get query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const cardId = url.searchParams.get("cardId");

    const transactions = await prisma.transaction.findMany({
      where: {
        card: {
          userId: decoded.userId,
          ...(cardId && { id: cardId }),
        },
      },
      orderBy: {
        timestamp: "desc",
      },
      take: limit,
      skip: offset,
      include: {
        card: true,
      },
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
