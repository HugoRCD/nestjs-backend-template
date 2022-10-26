import {Args, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "../user.service";
import {User} from "../entities/user.entity";
import {UsersPagination, UsersPaginationArgs} from "../dto/user-pagination.dto";

@Resolver(User)
export class UserQueriesResolver {
    constructor(private readonly userService: UserService) {
    }

    @Query(() => UsersPagination)
    async usersPagination(@Args() args: UsersPaginationArgs) {
        return this.userService.usersPagination(args);
    }

    @Query(() => User)
    async getUserById(@Args('id') id: number) {
        return this.userService.getUserById(id);
    }
}