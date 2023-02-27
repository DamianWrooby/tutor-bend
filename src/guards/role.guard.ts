import { ExecutionContext, CanActivate, mixin } from '@nestjs/common';
import { UserRole } from '../enums/user.enum';

export const RoleGuard = (roles: UserRole[]) => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();

            return roles.includes(request.currentUser?.role);
        }
    }

    const guard = mixin(RoleGuardMixin);
    return guard;
};
