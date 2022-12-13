import {UseGuards} from "@nestjs/common";
import {Args, Context, Mutation, Resolver} from "@nestjs/graphql";
import {AuthService} from "../auth.service";
import {AuthLoginOutput} from "../dto/auth-login.dto";
import {LocalAuthGuard} from "../guards/local-auth.guard";
import {UserService} from "../../user/user.service";
import {CreateUserInput} from "../../user/dto/user-create.input";
import {CurrentUser} from "../guards/jwt-at.guard";
import {JwtRtGuard} from "../guards/jwt-rt.guard";

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
    await this.userService.insertRefreshToken(req.user.id, login_response.refreshToken);
    return login_response;
  }

  @Mutation(() => AuthLoginOutput)
  async authSignup(
      @Args("user") user: CreateUserInput,
  ) {
    return await this.authService.signup(user);
  }

  @UseGuards(JwtRtGuard)
  @Mutation(() => AuthLoginOutput)
  async refreshToken(
      @CurrentUser() user,
      @Args("refreshToken") refreshToken: string,
  ) {
    return await this.authService.refreshToken(user, refreshToken);
  }
}
