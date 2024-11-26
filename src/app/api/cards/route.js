// src/app/api/cards/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { z } from "zod";

const cardSchema = z.object({
  type: z.enum(["virtual", "physical"]),
  name: z.string().min(1),
  limit: z.number().positive(),
});

export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const body = await req.json();

    const result = cardSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Generate mock card details
    const cardNumber = "4242" + Math.random().toString().slice(2, 14);
    const cvv = Math.floor(Math.random() * 900 + 100).toString();
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 3);

    const card = await prisma.card.create({
      data: {
        type: result.data.type,
        name: result.data.name,
        limit: result.data.limit,
        cardNumber,
        cvv,
        expirationDate,
        status: "active",
        userId: decoded.userId,
      },
    });

    return NextResponse.json({ card });
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
    const cards = await prisma.card.findMany({
      where: { userId: decoded.userId },
    });

    return NextResponse.json({ cards });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
