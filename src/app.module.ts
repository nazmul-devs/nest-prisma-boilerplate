import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { CoreModule } from './modules/core/core.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true, // এটি সেট করলে সব মডিউলে ConfigService পাওয়া যাবে
            cache: true,    // পারফরম্যান্সের জন্য ক্যাশে অন রাখা ভালো
        }),
        // এনভায়রনমেন্ট ভ্যারিয়েবল ম্যানেজমেন্ট
        ConfigModule.forRoot({ isGlobal: true }),

        // ডাটাবেস মডিউল
        DatabaseModule,

        // কোর মডিউল যেখানে Auth, User, Tenant সব আছে
        CoreModule,
    ],
})
export class AppModule { }
