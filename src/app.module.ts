import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User, Sheet, Question],
            synchronize: true,
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
