import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET(req, { params }) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const card = await prisma.card.findFirst({
      where: {
        id: params.id,
        userId: decoded.userId,
      },
      include: {
        transactions: {
          orderBy: {
            timestamp: "desc",
          },
          take: 10, // Limit to last 10 transactions
        },
      },
    });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    return NextResponse.json({ card });
  } catch (error) {
    console.error("Error fetching card:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const body = await req.json();

    const card = await prisma.card.findFirst({
      where: {
        id: params.id,
        userId: decoded.userId,
      },
    });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    const updatedCard = await prisma.card.update({
      where: { id: params.id },
      data: {
        status: body.status,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ card: updatedCard });
  } catch (error) {
    console.error("Error updating card:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    // First check if the card exists and belongs to the user
    const card = await prisma.card.findFirst({
      where: {
        id: params.id,
        userId: decoded.userId,
      },
    });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    // Delete all transactions associated with the card first
    await prisma.transaction.deleteMany({
      where: {
        cardId: params.id,
      },
    });

    // Then delete the card
    await prisma.card.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
