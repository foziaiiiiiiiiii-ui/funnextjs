import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create the adapter using your hidden DATABASE_URL
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter }); // We pass the adapter here

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;