// src/app/api/auth/web3/nonce/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateNonce() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export async function POST(req) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }

    const normalizedAddress = address.toLowerCase();
    const nonce = generateNonce();

    // Delete any existing record first
    await prisma.web3Auth.deleteMany({
      where: { address: normalizedAddress },
    });

    // Create new record
    const web3Auth = await prisma.web3Auth.create({
      data: {
        address: normalizedAddress,
        nonce,
      },
    });

    return NextResponse.json({ nonce });
  } catch (error) {
    console.error("Nonce generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
