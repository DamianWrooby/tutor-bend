import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sheet } from './sheet.entity';
import { Privacy } from '../enums/sheet.enum';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';

@Injectable()
export class SheetsService {
    constructor(
        @InjectRepository(Sheet) private sheetRepo: Repository<Sheet>,
        @InjectRepository(Question) private questionRepo: Repository<Question>
    ) {}

    findOne(id: number) {
        return this.sheetRepo.findOneBy({ id });
    }

    async create(
        title: string,
        subject: string,
        description: string,
        questionIds: number[],
        privacy: Privacy,
        createdBy: User
    ) {
        const questions = await this.questionRepo.findBy({
            id: In(questionIds),
        });
        if (questions.length !== questionIds.length) {
            throw new NotFoundException('Questions not found');
        }
        const sheet = this.sheetRepo.create({
            title,
            subject,
            description,
            privacy,
            questions,
            createdBy,
        });

        return this.sheetRepo.save(sheet);
    }

    async remove(id: number) {
        const Sheet = await this.sheetRepo.findOneBy({ id });
        if (!Sheet) {
            throw new NotFoundException('Sheet not found');
        }

        return this.sheetRepo.remove(Sheet);
    }

    async update(id: number, attrs: Partial<Sheet>) {
        const Sheet = await this.sheetRepo.findOneBy({ id });
        if (!Sheet) {
            throw new NotFoundException('Sheet not found');
        }
        Object.assign(Sheet, attrs);

        return this.sheetRepo.save(Sheet);
    }
}
