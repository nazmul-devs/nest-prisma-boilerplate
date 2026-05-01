import { PrismaClient } from '@prisma/client';

export async function seedSubscriptionsAndTenants(prisma: PrismaClient) {
    console.log('🔹 Seeding Subscriptions and Tenants...');

    const basicPlan = await prisma.subscription.upsert({
        where: { id: 'plan-basic' },
        update: {},
        create: {
            id: 'plan-basic',
            planName: 'IATA Basic Plan',
            price: 150.00,
            interval: 'monthly',
            features: { max_users: 5, reports: true },
        },
    });

    const tenant = await prisma.tenant.upsert({
        where: { slug: 'iata-master' },
        update: {},
        create: {
            name: 'IATA Master Office',
            slug: 'iata-master',
            domain: '://iata-saas.com',
            subscriptionId: basicPlan.id,
        },
    });

    return tenant;
}
