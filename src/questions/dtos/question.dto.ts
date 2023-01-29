import { Expose, Transform } from 'class-transformer';
import { Privacy } from '../../enums/sheet.enum';

export class QuestionDto {
    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    content: string;

    @Transform(({ obj }) => obj.sheets.map((sheet) => sheet.id))
    @Expose()
    sheetIds: number[];

    @Expose()
    privacy: Privacy;
}
