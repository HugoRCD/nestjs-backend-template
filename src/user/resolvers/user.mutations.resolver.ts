import {Args, Mutation, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {CreateUserInput, CreateUserOutput} from '../dto/user-create.input';
import {User} from '../entities/user.entity';
import {UserService} from '../user.service';
import {Role} from "../../role/entities/role.entity";

@Resolver(User)
export class UserMutationsResolver {
    constructor(private readonly userService: UserService) {
    }

    @Mutation(() => CreateUserOutput)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.createUser(createUserInput);
    }

    @ResolveField(() => [Role])
    async roles(@Parent() user: User): Promise <Role> {
        return this.userService.getRole(user.roleId);
    }
}
