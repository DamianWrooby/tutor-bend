import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateQuestionDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    content: string;

    @IsNumber()
    @IsOptional()
    sheetId: number;
}
