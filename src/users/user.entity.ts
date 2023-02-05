import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    OneToMany,
} from 'typeorm';
import { Sheet } from '../sheets/sheet.entity';
import { Question } from '../questions/question.entity';
import { UserRole } from 'src/enums/user.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    roles: UserRole[];

    @OneToMany(() => Sheet, (sheet) => sheet.createdBy)
    sheets: Sheet[];

    @OneToMany(() => Question, (question) => question.createdBy)
    questions: Question[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id:', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id:', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id:', this.id);
    }
}
