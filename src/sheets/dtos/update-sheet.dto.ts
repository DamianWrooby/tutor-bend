import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Privacy } from '../../enums/sheet.enum';

export class UpdateSheetDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    subject: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    privacy: Privacy;
}
