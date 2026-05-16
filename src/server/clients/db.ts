import { PrismaClient } from "~/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "~/env";
import { getPgPoolConfig } from "../../../prisma/pg-connection";

const createPrismaClient = () => {
  const adapter = new PrismaPg(getPgPoolConfig(env.DATABASE_URL));

  return new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

const globalForPrisma = globalThis as typeof globalThis & {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
