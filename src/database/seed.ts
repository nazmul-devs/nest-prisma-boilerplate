import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

// আলাদা করা সিড ফাইলগুলো ইম্পোর্ট
import { seedRBAC } from './seeds/rbac.seed';
import { seedSubscriptionsAndTenants } from './seeds/subscription-tenant.seed';

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' }),
});

async function main() {
    try {
        console.log('🌱 Seeding process started...');

        // ১. সাবস্ক্রিপশন এবং টেন্যান্ট সিড করুন
        const tenant = await seedSubscriptionsAndTenants(prisma);

        if (!tenant) {
            throw new Error('Tenant creation failed during seeding.');
        }

        // ২. ওই টেন্যান্টের আন্ডারে RBAC এবং ইউজার সিড করুন
        await seedRBAC(prisma, tenant);

        console.log('✅ All seeds completed successfully!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
