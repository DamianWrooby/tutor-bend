import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Title: string;

    @Column()
    Description: string;

    @Column()
    SheetId: number;
}
