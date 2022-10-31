import {Args, ID, Mutation, Resolver} from '@nestjs/graphql';
import {CreateUserInput, CreateUserOutput} from '../dto/user-create.input';
import {UpdateUserInput, UpdateUserOutput} from '../dto/user-update.input';
import {User} from '../entities/user.entity';
import {UserService} from '../user.service';
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {DeleteUserOutput} from "../dto/user-delete.input";

@Resolver(User)
export class UserMutationsResolver {
    constructor(private readonly userService: UserService) {
    }

    @Mutation(() => CreateUserOutput)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.createUser(createUserInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => UpdateUserOutput)
    async updateUser(
        @Args({ name: 'userId', type: () => ID }) userId: User['id'], //TODO: Insert only the to change fields
        @Args('input') input: UpdateUserInput,
    ) {
        return this.userService.updateUser(userId, input);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => DeleteUserOutput)
    async deleteUser(
        @Args({ name: 'userId', type: () => ID }) userId: User['id'],
    ) {
        return this.userService.deleteUser(userId);
    }
}
