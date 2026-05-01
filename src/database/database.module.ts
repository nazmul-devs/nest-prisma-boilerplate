import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // @Global ব্যবহার করলে বারবার অন্য মডিউলে ইম্পোর্ট করতে হবে না
@Module({
    providers: [PrismaService],
    exports: [PrismaService], // অন্য মডিউল যাতে Prisma ব্যবহার করতে পারে
})
export class DatabaseModule { }
