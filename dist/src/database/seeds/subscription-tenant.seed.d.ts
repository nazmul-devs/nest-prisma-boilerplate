import { PrismaClient } from '@prisma/client';
export declare function seedSubscriptionsAndTenants(prisma: PrismaClient): Promise<{
    slug: string;
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    domain: string | null;
    subscriptionId: string | null;
}>;
