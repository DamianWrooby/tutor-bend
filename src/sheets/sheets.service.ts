import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sheet } from './sheet.entity';
import { Privacy } from 'src/enums/sheet.enum';

@Injectable()
export class SheetsService {
    constructor(@InjectRepository(Sheet) private repo: Repository<Sheet>) {}

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    create(
        title: string,
        subject: string,
        description: string,
        privacy: Privacy
    ) {
        const Sheet = this.repo.create({
            title,
            subject,
            description,
            privacy,
        });

        return this.repo.save(Sheet);
    }

    async remove(id: number) {
        const Sheet = await this.repo.findOneBy({ id });
        if (!Sheet) {
            throw new NotFoundException('Sheet not found');
        }

        return this.repo.remove(Sheet);
    }

    async update(id: number, attrs: Partial<Sheet>) {
        const Sheet = await this.repo.findOneBy({ id });
        if (!Sheet) {
            throw new NotFoundException('Sheet not found');
        }
        Object.assign(Sheet, attrs);

        return this.repo.save(Sheet);
    }
}