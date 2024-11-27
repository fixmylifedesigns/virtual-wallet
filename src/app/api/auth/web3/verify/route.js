// src/app/api/auth/web3/verify/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ethers } from "ethers";
import { generateToken } from "@/lib/jwt";

function generateNonce() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export async function POST(req) {
  try {
    const { address, signature, nonce } = await req.json();

    if (!address || !signature || !nonce) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedAddress = address.toLowerCase();

    // Get stored nonce for this address
    const storedAuth = await prisma.web3Auth.findUnique({
      where: { address: normalizedAddress },
    });

    if (!storedAuth || storedAuth.nonce !== nonce) {
      return NextResponse.json({ error: "Invalid nonce" }, { status: 401 });
    }

    // Verify the signature
    const message = `Welcome to VirtualWallet!\n\nPlease sign this message to verify your identity.\n\nNonce: ${nonce}`;
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== normalizedAddress) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Find or create user
    let user = await prisma.user.findFirst({
      where: { walletAddress: normalizedAddress },
    });

    if (!user) {
      // Delete any existing wallet user with this email
      await prisma.user.deleteMany({
        where: { email: `${normalizedAddress}@wallet.local` },
      });

      user = await prisma.user.create({
        data: {
          email: `${normalizedAddress}@wallet.local`,
          firstName: "Wallet",
          lastName: "User",
          walletAddress: normalizedAddress,
          wallet: {
            create: {
              balance: 0,
              currency: "USD",
            },
          },
        },
      });
    }

    // Update nonce
    await prisma.web3Auth.update({
      where: { address: normalizedAddress },
      data: {
        nonce: generateNonce(),
        updatedAt: new Date(),
      },
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      walletAddress: normalizedAddress,
    });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        walletAddress: user.walletAddress,
      },
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
