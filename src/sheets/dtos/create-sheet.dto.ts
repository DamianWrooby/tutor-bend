import { IsNumber, IsString } from 'class-validator';
import { Privacy } from 'src/enums/sheet.enum';

export class CreateSheetDto {
    @IsString()
    title: string;

    @IsString()
    subject: string;

    @IsString()
    description: string;

    @IsNumber()
    privacy: Privacy;
}
