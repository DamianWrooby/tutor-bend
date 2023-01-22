import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Privacy } from '../enums/sheet.enum';
import { User } from '../users/user.entity';

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

    @ManyToOne(() => User, (user) => user.sheets)
    createdBy: User;
}
