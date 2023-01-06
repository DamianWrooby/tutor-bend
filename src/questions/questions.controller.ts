import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    NotFoundException,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {}

    @Get('/:id')
    async findQuestion(@Param('id') id: string) {
        const question = this.questionsService.findOne(parseInt(id));
        if (!question) {
            throw new NotFoundException('Question not found');
        }
        return question;
    }

    @Post('')
    createQuestion(@Body() body: CreateQuestionDto) {
        this.questionsService.create(
            body.title,
            body.description,
            body.content,
            body.sheetId
        );
    }

    @Patch('/:id')
    updateQuestion(@Param('id') id: string, @Body() body: UpdateQuestionDto) {
        this.questionsService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeQuestion(@Param('id') id: string) {
        this.questionsService.remove(parseInt(id));
    }
}
