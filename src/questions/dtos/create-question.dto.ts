import { IsString, IsNumber } from 'class-validator';
import { Privacy } from '../../enums/sheet.enum';

export class CreateQuestionDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    content: string;

    @IsNumber({}, { each: true })
    sheetIds: number[];

    @IsNumber()
    privacy: Privacy;
}
