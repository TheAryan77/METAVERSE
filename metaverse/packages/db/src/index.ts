import { PrismaClient } from "./generated/prisma/client.js";
import type { Prisma } from "./generated/prisma/client.js";

export const prisma = new PrismaClient(undefined as any);

export { PrismaClient };
export type { Prisma };
export default prisma;
