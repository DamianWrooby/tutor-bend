import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersController', () => {
    let controller: UsersController;
    let repo: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                { provide: getRepositoryToken(User), useValue: jest.fn() },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        repo = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
