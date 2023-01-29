import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionsService } from './questions.service';
import { Question } from '../questions/question.entity';
import { Sheet } from '../sheets/sheet.entity';

describe('QuestionsService', () => {
    let service: QuestionsService;
    let questionRepo: Repository<Question>;
    let sheetRepo: Repository<Sheet>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuestionsService,
                { provide: getRepositoryToken(Question), useValue: jest.fn() },
                { provide: getRepositoryToken(Sheet), useValue: jest.fn() },
            ],
        }).compile();

        service = module.get<QuestionsService>(QuestionsService);
        questionRepo = module.get<Repository<Question>>(
            getRepositoryToken(Question)
        );
        sheetRepo = module.get<Repository<Sheet>>(getRepositoryToken(Sheet));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
