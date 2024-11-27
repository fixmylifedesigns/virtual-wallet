const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function cleanDatabase() {
  // Delete all records in reverse order of dependencies
  await prisma.transaction.deleteMany();
  await prisma.card.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  try {
    console.log("Starting database seed...");

    // Clean existing data
    await cleanDatabase();
    console.log("Database cleaned");

    // Create test user with wallet
    const hashedPassword = await bcrypt.hash("testpass123", 12);

    console.log("Creating user...");
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        password: hashedPassword,
        firstName: "Test",
        lastName: "User",
        wallet: {
          create: {
            balance: 1000.0,
            currency: "USD",
          },
        },
      },
      include: {
        wallet: true,
      },
    });
    console.log("User created:", user.email);

    // Create cards with different designs and holders
    console.log("Creating cards...");
    const card1 = await prisma.card.create({
      data: {
        type: "virtual",
        status: "active",
        name: "Shopping Card",
        cardHolder: "TEST USER",
        cardNumber: "4242424242424242",
        expirationDate: new Date("2025-12-31"),
        cvv: "123",
        limit: 5000.0,
        variant: "black", // Classic black design
        userId: user.id,
      },
    });

    const card2 = await prisma.card.create({
      data: {
        type: "virtual",
        status: "active",
        name: "Travel Card",
        cardHolder: "TEST USER",
        cardNumber: "4242424242424243",
        expirationDate: new Date("2025-12-31"),
        cvv: "456",
        limit: 10000.0,
        variant: "golden", // Premium gold design
        userId: user.id,
      },
    });

    const card3 = await prisma.card.create({
      data: {
        type: "virtual",
        status: "active",
        name: "Entertainment Card",
        cardHolder: "TEST USER",
        cardNumber: "4242424242424244",
        expirationDate: new Date("2025-12-31"),
        cvv: "789",
        limit: 2500.0,
        variant: "purple", // Purple design
        userId: user.id,
      },
    });

    const card4 = await prisma.card.create({
      data: {
        type: "virtual",
        status: "active",
        name: "Business Card",
        cardHolder: "TEST USER",
        cardNumber: "4242424242424245",
        expirationDate: new Date("2025-12-31"),
        cvv: "321",
        limit: 15000.0,
        variant: "blue", // Blue design
        userId: user.id,
      },
    });

    console.log("Cards created");

    // Create transactions with a variety of merchants and amounts
    console.log("Creating transactions...");
    await prisma.transaction.createMany({
      data: [
        // Shopping Card transactions
        {
          amount: 499.99,
          currency: "USD",
          merchant: "Amazon",
          status: "completed",
          timestamp: new Date("2024-11-25"),
          cardId: card1.id,
          userId: user.id,
        },
        {
          amount: 1299.99,
          currency: "USD",
          merchant: "Apple Store",
          status: "completed",
          timestamp: new Date("2024-11-24"),
          cardId: card1.id,
          userId: user.id,
        },
        // Travel Card transactions
        {
          amount: 799.5,
          currency: "USD",
          merchant: "Airline Tickets",
          status: "pending",
          timestamp: new Date("2024-11-26"),
          cardId: card2.id,
          userId: user.id,
        },
        {
          amount: 350.0,
          currency: "USD",
          merchant: "Hotel Booking",
          status: "completed",
          timestamp: new Date("2024-11-23"),
          cardId: card2.id,
          userId: user.id,
        },
        // Entertainment Card transactions
        {
          amount: 129.99,
          currency: "USD",
          merchant: "Netflix Annual",
          status: "completed",
          timestamp: new Date("2024-11-22"),
          cardId: card3.id,
          userId: user.id,
        },
        {
          amount: 79.99,
          currency: "USD",
          merchant: "Spotify Premium",
          status: "completed",
          timestamp: new Date("2024-11-21"),
          cardId: card3.id,
          userId: user.id,
        },
        // Business Card transactions
        {
          amount: 2499.99,
          currency: "USD",
          merchant: "Office Equipment",
          status: "completed",
          timestamp: new Date("2024-11-20"),
          cardId: card4.id,
          userId: user.id,
        },
        {
          amount: 999.99,
          currency: "USD",
          merchant: "Software License",
          status: "pending",
          timestamp: new Date("2024-11-19"),
          cardId: card4.id,
          userId: user.id,
        },
      ],
    });
    console.log("Transactions created");

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
