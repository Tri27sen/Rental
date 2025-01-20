import { PrismaClient } from '@prisma/client'

// Use type augmentation for the global scope
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Create or reuse Prisma Client instance
const client = globalThis.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = client
}

export default client