import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { User } from '../users/user.entity';
import { Sheet } from '../sheets/sheet.entity';
import { Privacy } from '../enums/sheet.enum';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question) private questionRepo: Repository<Question>,
        @InjectRepository(Sheet) private sheetRepo: Repository<Sheet>
    ) {}

    findOne(id: number) {
        return this.questionRepo.findOne({
            where: {
                id,
            },
            relations: ['sheets', 'createdBy'],
        });
    }

    async create(
        title: string,
        description: string,
        content: string,
        sheetIds: number[],
        privacy: Privacy,
        createdBy: User
    ) {
        const sheets = await this.sheetRepo.findBy({
            id: In(sheetIds),
        });
        if (sheets.length !== sheetIds.length) {
            throw new NotFoundException('Sheets not found');
        }
        const question = this.questionRepo.create({
            title,
            description,
            content,
            sheets,
            privacy,
            createdBy,
        });

        return this.questionRepo.save(question);
    }

    async remove(id: number) {
        const question = await this.questionRepo.findOneBy({ id });
        if (!question) {
            throw new NotFoundException('Question not found');
        }

        return this.questionRepo.remove(question);
    }

    async update(id: number, attrs: Partial<Question>) {
        const question = await this.questionRepo.findOneBy({ id });
        if (!question) {
            throw new NotFoundException('Question not found');
        }
        Object.assign(question, attrs);

        return this.questionRepo.save(question);
    }
}
