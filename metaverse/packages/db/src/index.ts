import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

export const prisma = new PrismaClient({} as any);

export { PrismaClient };
export type { Prisma };
export default prisma;
