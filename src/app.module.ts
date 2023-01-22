import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SheetsModule } from './sheets/sheets.module';
import { QuestionsModule } from './questions/questions.module';
import { User } from './users/user.entity';
import { Sheet } from './sheets/sheet.entity';
import { Question } from './questions/question.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'sqlite',
                database: config.get<string>('DB_NAME'),
                entities: [User, Sheet, Question],
                synchronize: true,
            }),
        }),
        SheetsModule,
        QuestionsModule,
        UsersModule,
        SheetsModule,
        QuestionsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
