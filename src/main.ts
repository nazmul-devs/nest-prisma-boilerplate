import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    const port = configService.get<number>('port') ?? 5000;
    const origins = configService.get<string[]>('cors.allowedOrigins');

    app.enableCors({
        origin: origins,
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    });




    // ১. গ্লোবাল প্রিফিক্স (api/v1)
    app.setGlobalPrefix('api/v1');

    // ২. গ্লোবাল ভ্যালিডেশন পাইপ (DTO ভ্যালিডেশনের জন্য)
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));




    // ৪. Swagger API Documentation সেটআপ
    const config = new DocumentBuilder()
        .setTitle('IATA Accounting SaaS API')
        .setDescription('The API documentation for IATA Accounting Software')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);


    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}/api/v1`);
    logger.log(`API Docs available at: http://localhost:${port}/docs`);
}
bootstrap();
