import { Expose } from 'class-transformer';
import { UserRole } from 'src/enums/user.enum';

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    role: UserRole;
}
