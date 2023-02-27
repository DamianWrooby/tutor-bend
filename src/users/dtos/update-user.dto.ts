import { IsEmail, IsString, IsOptional } from 'class-validator';
import { UserRole } from '../../enums/user.enum';

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsOptional()
    role: UserRole;
}
