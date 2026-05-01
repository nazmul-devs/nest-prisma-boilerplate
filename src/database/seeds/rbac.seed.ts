import { PrismaClient, Tenant } from '@prisma/client';
import * as bcrypt from 'bcrypt'; // bcrypt ইম্পোর্ট করুন

export async function seedRBAC(prisma: PrismaClient, tenant: Tenant) {
    console.log('🔹 Seeding Roles, Permissions and Users...');

    const permissionsData = [
        { action: 'manage', subject: 'all' },
        { action: 'read', subject: 'accounting' },
        { action: 'write', subject: 'accounting' },
        { action: 'process', subject: 'bsp_files' },
    ];

    for (const p of permissionsData) {
        await prisma.permission.upsert({
            where: {
                action_subject_tenantId: {
                    action: p.action,
                    subject: p.subject,
                    tenantId: tenant.id,
                },
            },
            update: {},
            create: {
                action: p.action,
                subject: p.subject,
                tenantId: tenant.id,
            },
        });
    }

    const adminRole = await prisma.role.upsert({
        where: {
            name_tenantId: { name: 'Admin', tenantId: tenant.id },
        },
        update: {},
        create: {
            name: 'Admin',
            description: 'Full access to the system',
            tenantId: tenant.id,
        },
    });

    // পাসওয়ার্ড হ্যাশ করা (১০ রাউন্ড সল্ট ব্যবহার করা স্ট্যান্ডার্ড)
    const hashedPassword = await bcrypt.hash('password123', 10);

    await prisma.user.upsert({
        where: { email: 'admin@iata-saas.com' },
        update: {
            password: hashedPassword, // আপডেট করার সময়ও হ্যাশড পাসওয়ার্ড দিন
        },
        create: {
            email: 'admin@iata-saas.com',
            password: hashedPassword, // তৈরি করার সময় হ্যাশড পাসওয়ার্ড
            firstName: 'Master',
            lastName: 'Admin',
            tenantId: tenant.id,
            roleId: adminRole.id,
        },
    });
}
