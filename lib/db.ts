import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

// This is needed to prevent multiple PrismaClient instances in development
// which can cause issues like "too many connections"
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
