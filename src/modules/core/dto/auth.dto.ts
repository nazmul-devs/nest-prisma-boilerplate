import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    companyName: string; // Tenant Name

    @IsNotEmpty()
    @IsString()
    slug: string; // Tenant Slug (e.g., 'naria-holidays')
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
