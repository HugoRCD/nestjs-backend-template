import {Args, Mutation, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserCreateInput, UserCreateOutput} from '../dto/user-create.dto';
import {User} from '../entities/user.entity';
import {UserService} from '../user.service';
import {Role} from "../../role/entities/role.entity";

@Resolver(User)
export class UserMutationsResolver {
    constructor(private readonly userService: UserService) {
    }

    @Mutation(() => UserCreateOutput)
    async userCreate(@Args('userCreateInput') userCreateInput: UserCreateInput) {
        return this.userService.userCreate(userCreateInput);
    }

    @ResolveField(() => [Role])
    async roles(@Parent() user: User): Promise <Role> {
        return this.userService.getRole(user.roleId);
    }
}
