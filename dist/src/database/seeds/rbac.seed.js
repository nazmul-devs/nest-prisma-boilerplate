"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRBAC = seedRBAC;
const bcrypt = __importStar(require("bcrypt"));
async function seedRBAC(prisma, tenant) {
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
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@iata-saas.com' },
        update: {
            password: hashedPassword,
        },
        create: {
            email: 'admin@iata-saas.com',
            password: hashedPassword,
            firstName: 'Master',
            lastName: 'Admin',
            tenantId: tenant.id,
            roleId: adminRole.id,
        },
    });
}
//# sourceMappingURL=rbac.seed.js.map