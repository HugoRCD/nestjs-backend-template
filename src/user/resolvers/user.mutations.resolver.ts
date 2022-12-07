import {Args, ID, Mutation, Resolver} from "@nestjs/graphql";
import {CreateUserInput, CreateUserOutput} from "../dto/user-create.input";
import {UpdateUserInput, UpdateUserOutput} from "../dto/user-update.input";
import {User} from "../entities/user.entity";
import {UserService} from "../user.service";
import {UseGuards} from "@nestjs/common";
import {CurrentUser, JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {DeleteUserOutput} from "../dto/user-delete.input";
import {JWTPayload} from "../../auth/auth.service";
import {RolesGuard} from "../../auth/guards/roles.guard";
import {Roles} from "../../auth/decorators/roles.decorator";
import {Role} from "../../auth/decorators/role.enum";
import {VerifCode} from "../entities/verif-code.entity";
import {Public} from "../../auth/decorators/public.decorator";

@UseGuards(JwtAuthGuard)
@Resolver(User)
export class UserMutationsResolver {
  constructor(private readonly userService: UserService) {
  }

  @Public()
  @Mutation(() => CreateUserOutput)
  async createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => UpdateUserOutput)
  async updateUser(
      @Args({name: "userId", type: () => ID}) userId: User["id"], //TODO: Insert only the to change fields
      @Args("input") input: UpdateUserInput,
  ) {
    return this.userService.updateUser(userId, input);
  }

  @Roles(Role.ADMIN)
  @Mutation(() => DeleteUserOutput)
  async deleteUser(
      @Args({name: "userId", type: () => ID}) userId: User["id"],
  ) {
    return this.userService.deleteUser(userId);
  }

  @Mutation(() => User)
  async verifyUser(@CurrentUser() user: JWTPayload, @Args("code") code: string) {
    return this.userService.verifyUser(user, code);
  }

  @Mutation(() => VerifCode)
  async getVerificationCode(@Args("email") email: string) {
    return this.userService.createVerificationCode(email, true);
  }

  @Mutation(() => User)
  async insertToken(userId: User["id"], token: string) {
    return this.userService.insertToken(userId, token);
  }
}
