import {Args, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "../user.service";
import {User} from "../models/user.model";
import {UsersPagination, UsersPaginationArgs} from "../dto/user-pagination.dto";

@Resolver(User)
export class UserQueriesResolver {
    constructor(private readonly userService: UserService) {
    }

    @Query(() => UsersPagination)
    async usersPagination(@Args() args: UsersPaginationArgs) {
        return this.userService.usersPagination(args);
    }
}