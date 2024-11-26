// src/lib/test-data.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTestData() {
  try {
    // Create a user with a wallet
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'hashed_password_here',
        firstName: 'Test',
        lastName: 'User',
        wallet: {
          create: {
            balance: 1000.00 // Starting balance of 1000
          }
        }
      },
      include: {
        wallet: true // Include the wallet in the response
      }
    })
    
    console.log('Test user created:', user)
    
  } catch (error) {
    console.error('Error creating test data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestData()