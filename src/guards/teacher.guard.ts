import { ExecutionContext, CanActivate } from '@nestjs/common';
import { UserRole } from 'src/enums/user.enum';

export class TeacherGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        return request.currentUser?.roles.includes(UserRole.TEACHER);
    }
}
