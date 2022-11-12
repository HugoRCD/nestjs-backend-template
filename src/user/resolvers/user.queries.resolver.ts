import {Args, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "../user.service";
import {User} from "../entities/user.entity";
import {UsersPagination, UsersPaginationArgs} from "../dto/user-pagination.dto";
import {UseGuards} from "@nestjs/common";
import {RolesGuard} from "../../auth/guards/roles.guard";
import {Roles} from "../../auth/decorators/roles.decorator";
import {Role} from "../../auth/decorators/role.enum";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";

@Resolver(User)
export class UserQueriesResolver {
    constructor(private readonly userService: UserService) {
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Query(() => UsersPagination)
    async usersPagination(@Args() args: UsersPaginationArgs) {
        return this.userService.usersPagination(args);
    }

    @Query(() => User)
    async getUserById(@Args('id') id: number) {
        return this.userService.getUserById(id);
    }
}