import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';
import { Sheet } from '../sheets/sheet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Question, Sheet])],
    controllers: [QuestionsController],
    providers: [QuestionsService],
})
export class QuestionsModule {}
