import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {CreateUserInput, CreateUserOutput} from '../dto/user-create.input';
import {User} from '../entities/user.entity';
import {UserService} from '../user.service';

@Resolver(User)
export class UserMutationsResolver {
    constructor(private readonly userService: UserService) {
    }

    @Mutation(() => CreateUserOutput)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.createUser(createUserInput);
    }
}
