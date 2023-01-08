import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    signup(email: string, password: string) {
        const user = this.usersService.find(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }
    }
}
