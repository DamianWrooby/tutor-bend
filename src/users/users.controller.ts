import {
    Body,
    Controller,
    Get,
    Patch,
    Param,
    Query,
    Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id));
    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password);
    }
}
