import {
    createParamDecorator,
    ExecutionContext,
    Injectable, SetMetadata,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {GqlExecutionContext} from '@nestjs/graphql';
import {AuthGuard} from '@nestjs/passport';
import {Role} from "../../role/entities/role.entity";
import {User} from "../../user/entities/user.entity";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    },
);
