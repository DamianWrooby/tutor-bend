import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';
import { Sheet } from './sheet.entity';
import { Question } from '../questions/question.entity';

describe('SheetsController', () => {
    let controller: SheetsController;
    let sheetRepo: Repository<Sheet>;
    let questionRepo: Repository<Question>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SheetsService,
                { provide: getRepositoryToken(Sheet), useValue: jest.fn() },
                { provide: getRepositoryToken(Question), useValue: jest.fn() },
            ],
            controllers: [SheetsController],
        }).compile();

        controller = module.get<SheetsController>(SheetsController);
        sheetRepo = module.get<Repository<Sheet>>(getRepositoryToken(Sheet));
        questionRepo = module.get<Repository<Question>>(
            getRepositoryToken(Question)
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
