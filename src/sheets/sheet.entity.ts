import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Privacy } from 'src/enums/sheet.enum';

@Entity()
export class Sheet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Title: string;

    @Column()
    Subject: string;

    @Column()
    Description: string;

    @Column()
    Privacy: Privacy;
}
