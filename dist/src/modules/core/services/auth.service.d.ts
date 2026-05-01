import { PrismaService } from '../../../database/prisma.service';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        message: string;
        tenantId: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            email: string;
            tenant: string;
        };
    }>;
}
