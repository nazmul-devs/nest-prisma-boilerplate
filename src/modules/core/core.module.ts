import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RoleService } from './services/role.service';
import { SubscriptionService } from './services/subscription.service';
import { TenantService } from './services/tenant.service';
import { UserService } from './services/user.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('auth.jwtSecret'),
                signOptions: { expiresIn: config.get('auth.jwtExpires') },
            }),
        }),
    ],
    controllers: [AuthController], // মেইন কন্ট্রোলার যেখানে লগইন/রেজিস্ট্রেশন থাকবে
    providers: [
        AuthService,
        UserService,
        TenantService,
        RoleService,
        SubscriptionService
    ],
    exports: [UserService, TenantService], // অন্য মডিউল লাগলে ব্যবহার করতে পারবে
})
export class CoreModule { }
