import { Test, TestingModule } from '@nestjs/testing';
import { SheetsService } from './sheets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sheet } from './sheet.entity';
import { Question } from '../questions/question.entity';
import { Repository } from 'typeorm';

describe('SheetsService', () => {
    let service: SheetsService;
    let sheetRepo: Repository<Sheet>;
    let questionRepo: Repository<Question>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SheetsService,
                { provide: getRepositoryToken(Sheet), useValue: jest.fn() },
                { provide: getRepositoryToken(Question), useValue: jest.fn() },
            ],
        }).compile();

        service = module.get<SheetsService>(SheetsService);
        sheetRepo = module.get<Repository<Sheet>>(getRepositoryToken(Sheet));
        questionRepo = module.get<Repository<Question>>(
            getRepositoryToken(Question)
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
