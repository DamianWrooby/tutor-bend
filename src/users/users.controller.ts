import {
    Body,
    Controller,
    Get,
    Patch,
    Param,
    Delete,
    Post,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.authService.signup(body.email, body.password);
    }

    @Post('/signin')
    signin(@Body() body: CreateUserDto) {
        return this.authService.signin(body.email, body.password);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        this.usersService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        this.usersService.remove(parseInt(id));
    }
}
