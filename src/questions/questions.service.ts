import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { User } from '../users/user.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question) private repo: Repository<Question>
    ) {}

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    create(
        title: string,
        description: string,
        content: string,
        createdBy: User
    ) {
        const question = this.repo.create({
            title,
            description,
            content,
            createdBy,
        });

        return this.repo.save(question);
    }

    async remove(id: number) {
        const question = await this.repo.findOneBy({ id });
        if (!question) {
            throw new NotFoundException('Question not found');
        }

        return this.repo.remove(question);
    }

    async update(id: number, attrs: Partial<Question>) {
        const question = await this.repo.findOneBy({ id });
        if (!question) {
            throw new NotFoundException('Question not found');
        }
        Object.assign(question, attrs);

        return this.repo.save(question);
    }
}
