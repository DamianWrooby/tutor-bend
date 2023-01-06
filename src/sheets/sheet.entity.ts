import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Privacy } from 'src/enums/sheet.enum';

@Entity()
export class Sheet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subject: string;

    @Column()
    description: string;

    @Column()
    privacy: Privacy;
}
