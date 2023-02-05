import { IsEmail, IsString, IsOptional, ArrayNotEmpty } from 'class-validator';
import { UserRole } from 'src/enums/user.enum';

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @ArrayNotEmpty()
    @IsOptional()
    roles: UserRole[];
}
