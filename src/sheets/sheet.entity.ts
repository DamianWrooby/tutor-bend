import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Privacy } from '../enums/sheet.enum';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';

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

    @ManyToMany(() => Question, (question) => question.sheets)
    @JoinTable()
    questions: Question[];

    @Column()
    privacy: Privacy;

    @ManyToOne(() => User, (user) => user.sheets)
    createdBy: User;
}
