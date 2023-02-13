import { IsEmail, IsString } from 'class-validator';
import { UserRole } from 'src/enums/user.enum';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    roles: UserRole;
}
