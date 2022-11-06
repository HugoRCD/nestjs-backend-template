import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { AuthLoginOutput } from '../dto/auth-login.dto';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {UserService} from "../../user/user.service";

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
      @Context('req') req,
      @Args('username') _username: string,
      @Args('password') _password: string,
  ) {
    const token = await this.authService.login(req.user);
    await this.userService.insertToken(req.user.id, token.accessToken);
    return token;
  }
}
