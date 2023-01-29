import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';
import { Sheet } from '../sheets/sheet.entity';

describe('QuestionsController', () => {
    let controller: QuestionsController;
    let questionRepo: Repository<Question>;
    let sheetRepo: Repository<Sheet>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuestionsController],
            providers: [
                QuestionsService,
                { provide: getRepositoryToken(Question), useValue: jest.fn() },
                { provide: getRepositoryToken(Sheet), useValue: jest.fn() },
            ],
        }).compile();

        controller = module.get<QuestionsController>(QuestionsController);
        sheetRepo = module.get<Repository<Sheet>>(getRepositoryToken(Sheet));
        questionRepo = module.get<Repository<Question>>(
            getRepositoryToken(Question)
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
