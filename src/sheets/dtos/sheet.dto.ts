import { Expose, Transform } from 'class-transformer';
import { Privacy } from '../../enums/sheet.enum';

export class SheetDto {
    @Expose()
    title: string;

    @Expose()
    subject: string;

    @Expose()
    description: string;

    @Transform(({ obj }) => obj.questions?.map((question) => question.id))
    @Expose()
    questionIds: number[];

    @Transform(({ obj }) => obj.createdBy.id)
    @Expose()
    createdBy: any;

    @Expose()
    privacy: Privacy;
}
