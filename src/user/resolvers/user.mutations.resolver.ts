import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {CreateUserInput} from "../dto/user-create.input";
import {UpdateUserInput} from "../dto/user-update.input";
import {User} from "../entities/user.entity";
import {UserService} from "../user.service";
import {UseGuards} from "@nestjs/common";
import {CurrentUser, JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {JWTPayload} from "../../auth/auth.service";
import {VerifCode} from "../entities/verif-code.entity";
import {Public} from "../../auth/decorators/public.decorator";

@UseGuards(JwtAuthGuard)
@Resolver(User)
export class UserMutationsResolver {
  constructor(private readonly userService: UserService) {
  }

  @Public()
  @Mutation(() => User)
  async createUser(@Args("user") user: CreateUserInput) {
    return this.userService.create(user);
  }

  @Mutation(() => User)
  async updateUser(
      @Args("user") user: UpdateUserInput,
      @Args("id") id: number,
  ) {
    return this.userService.update(user, id);
  }

  @Mutation(() => String)
  async deleteUser(
      @Args("id") id: number,
  ) {
    return this.userService.delete(id);
  }

  @Mutation(() => User)
  async verifyUser(@CurrentUser() user: JWTPayload, @Args("code") code: string) {
    return this.userService.verify(user, code);
  }

  @Mutation(() => VerifCode)
  async getVerificationCode(@Args("email") email: string) {
    return this.userService.createVerificationCode(email, true);
  }

  @Mutation(() => User)
  async insertTokens(user_id: number, access_token: string, refresh_token: string) {
    return this.userService.insertTokens(user_id, access_token, refresh_token);
  }
}
