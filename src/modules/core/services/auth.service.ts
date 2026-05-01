import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        // ১. চেক করুন ইউজার বা টেন্যান্ট আগে থেকে আছে কি না
        const userExists = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (userExists) throw new BadRequestException('Email already exists');

        const tenantExists = await this.prisma.tenant.findUnique({ where: { slug: dto.slug } });
        if (tenantExists) throw new BadRequestException('Slug already taken');

        // ২. পাসওয়ার্ড হ্যাশ করা
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // ৩. টেন্যান্ট এবং ইউজার একসাথে তৈরি করা (Transaction)
        return this.prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: { name: dto.companyName, slug: dto.slug },
            });

            // ডিফল্ট 'Admin' রোল তৈরি
            const adminRole = await tx.role.create({
                data: { name: 'Admin', tenantId: tenant.id },
            });

            const user = await tx.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    tenantId: tenant.id,
                    roleId: adminRole.id,
                },
            });

            return { message: 'Registration successful', tenantId: tenant.id };
        });
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            include: { tenant: true },
        });

        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email, tenantId: user.tenantId };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: { email: user.email, tenant: user.tenant.name },
        };
    }
}
