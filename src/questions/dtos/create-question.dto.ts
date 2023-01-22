import { IsString } from 'class-validator';

export class CreateQuestionDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    content: string;
}
