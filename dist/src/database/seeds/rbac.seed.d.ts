import { PrismaClient, Tenant } from '@prisma/client';
export declare function seedRBAC(prisma: PrismaClient, tenant: Tenant): Promise<void>;
