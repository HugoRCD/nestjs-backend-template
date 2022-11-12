import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {GqlExecutionContext} from "@nestjs/graphql";
import {Observable} from "rxjs";
import {UserService} from "../../user/user.service";
import {Role} from "../decorators/role.enum";
import {ROLES_KEY} from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private usersService: UserService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!requiredRoles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context);
        const userId = ctx.getContext().req.user.userId;
        return this.usersService.getUserById(userId).then(user => {
            if (user) {
                return user.role.valueOf() === Role.ADMIN;
            }
            return false;
        });
    }
}