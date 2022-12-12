import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {CreateUserInput} from "../dto/user-create.input";
import {UpdateUserInput} from "../dto/user-update.input";
import {User} from "../entities/user.entity";
import {UserService} from "../user.service";
import {UseGuards} from "@nestjs/common";
import {CurrentUser, JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
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
  @Mutation(() => User)
  async createUser(@Args("user") user: CreateUserInput) {
    return this.userService.create(user);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => User)
  async updateUser(
      @Args("user") user: UpdateUserInput,
      @Args("id") id: number,
  ) {
    return this.userService.update(user, id);
  }

  @Roles(Role.ADMIN)
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
  async insertToken(userId: User["id"], token: string) {
    return this.userService.insertToken(userId, token);
  }
}
