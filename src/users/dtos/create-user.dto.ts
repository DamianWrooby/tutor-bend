import { IsEmail, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../../enums/user.enum';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsEnum(UserRole)
    role: UserRole;
}
