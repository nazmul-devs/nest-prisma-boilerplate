import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
