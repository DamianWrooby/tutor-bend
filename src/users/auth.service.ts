import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserRole } from '../enums/user.enum';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string, role: UserRole) {
        const users = await this.usersService.find(email);

        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const dbPassword = `${salt}.${hash.toString('hex')}`;

        const user = await this.usersService.create(email, dbPassword, role);

        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const [salt, dbHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (dbHash !== hash.toString('hex')) {
            throw new BadRequestException('Wrong password');
        }
        return user;
    }
}
