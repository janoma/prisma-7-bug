import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "prisma/config";
import "server-only";

import { PrismaClient } from "./prisma/generated/prisma/client";

type AcceleratedPrisma = ReturnType<typeof getAcceleratedPrisma>;

function getAcceleratedPrisma() {
  return new PrismaClient({
    accelerateUrl: env("DATABASE_URL"),
  }).$extends(withAccelerate()); // error
  // }); // ok
}

const globalForPrisma = globalThis as unknown as {
  prisma: AcceleratedPrisma | undefined;
};

export const prisma = globalForPrisma.prisma || getAcceleratedPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
