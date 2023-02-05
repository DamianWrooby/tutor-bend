import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction, Express } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

interface Req extends Request {
    currentUser?: User;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) {}

    async use(req: Req, res: Response, next: NextFunction) {
        const { userId } = req.session || {};

        if (userId) {
            const user = await this.usersService.findOne(userId);
            req.currentUser = user;
        }

        next();
    }
}
