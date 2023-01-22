import { Test, TestingModule } from '@nestjs/testing';
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sheet } from './sheet.entity';
import { Repository } from 'typeorm';

describe('SheetsController', () => {
    let controller: SheetsController;
    let repo: Repository<Sheet>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: getRepositoryToken(Sheet), useValue: jest.fn() },
                SheetsService,
            ],
            controllers: [SheetsController],
        }).compile();

        controller = module.get<SheetsController>(SheetsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
