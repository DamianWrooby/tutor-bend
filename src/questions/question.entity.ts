import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Sheet } from '../sheets/sheet.entity';
import { Privacy } from '../enums/sheet.enum';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    content: string;

    @ManyToMany(() => Sheet, (sheet) => sheet.questions)
    sheets: Sheet[];

    @Column()
    privacy: Privacy;

    @ManyToOne(() => User, (user) => user.questions)
    createdBy: User;
}
