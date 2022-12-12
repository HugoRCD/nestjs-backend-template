import {UseGuards} from "@nestjs/common";
import {Args, Context, Mutation, Resolver} from "@nestjs/graphql";
import {AuthService} from "../auth.service";
import {AuthLoginOutput} from "../dto/auth-login.dto";
import {LocalAuthGuard} from "../guards/local-auth.guard";
import {UserService} from "../../user/user.service";
import {CreateUserInput} from "../../user/dto/user-create.input";

@Resolver()
export class AuthMutationsResolver {
  constructor(
      private readonly authService: AuthService,
      private readonly userService: UserService,
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthLoginOutput)
  async authLogin(
      @Context("req") req,
      @Args("username") _username: string,
      @Args("password") _password: string,
  ) {
    const login_response = await this.authService.login(req.user);
    await this.userService.insertTokens(req.user.id, login_response.accessToken, login_response.refreshToken);
    return login_response;
  }

  @Mutation(() => AuthLoginOutput)
  async authSignup(
      @Args("user") user: CreateUserInput,
  ) {
    return await this.authService.signup(user);
  }
}
