import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { User } from '../users/user.entity';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { QuestionDto } from './dtos/question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {}

    @Get('/:id')
    @UseGuards(AuthGuard)
    @Serialize(QuestionDto)
    async findQuestion(@Param('id') id: string) {
        const question = this.questionsService.findOne(parseInt(id));
        if (!question) {
            throw new NotFoundException('Question not found');
        }
        return question;
    }

    @Post('')
    @UseGuards(AuthGuard)
    @Serialize(QuestionDto)
    createQuestion(@Body() body: CreateQuestionDto, @CurrentUser() user: User) {
        return this.questionsService.create(
            body.title,
            body.description,
            body.content,
            body.sheetIds,
            body.privacy,
            user
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
