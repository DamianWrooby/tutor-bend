import { IsEmail, IsString, ArrayNotEmpty } from 'class-validator';
import { UserRole } from 'src/enums/user.enum';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @ArrayNotEmpty()
    roles: UserRole[];
}
