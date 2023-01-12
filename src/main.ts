import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieSession = require('cookie-session');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        cookieSession({
            keys: [''],
        })
    );
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    );
    await app.listen(3000);
}
bootstrap();
