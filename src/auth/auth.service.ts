import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {User} from "src/user/entities/user.entity";
import {UserService} from "src/user/user.service";
import {AuthLoginOutput} from "./dto/auth-login.dto";
import {CreateUserInput} from "../user/dto/user-create.input";
import {Utils} from "../user/utils/utils";
import {ConfigService} from "@nestjs/config";

export interface JWTPayload {
  id: number;
  email: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UserService,
      private jwtService: JwtService,
      private readonly configService: ConfigService
  ) {
  }

  async createAccessToken(user: User): Promise<string> {
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get("ACCESS_TOKEN_SECRET"),
      expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRATION"),
    });
  }

  async createRefreshToken(user: User): Promise<string> {
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get("REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get("REFRESH_TOKEN_EXPIRATION"),
    });
  }

  async refreshToken(user: User, refreshToken: string): Promise<AuthLoginOutput> {
    const userToRefresh = await this.userService.getUserById(user.id);
    const decodedRefreshToken = await Utils.deHash(refreshToken, userToRefresh.refreshToken);
    if (decodedRefreshToken) {
      const {accessToken, refreshToken, user} = await this.login(userToRefresh);
      return {accessToken, refreshToken, user};
    }
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.getUserByLogin(login);
    if (user && await Utils.deHash(password, user.password)) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<AuthLoginOutput> {
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    };
  }

  async signup(createUserInput: CreateUserInput): Promise<AuthLoginOutput> {
    const userCreated = await this.userService.create(createUserInput);
    const {accessToken, refreshToken, user} = await this.login(userCreated);
    return {accessToken, refreshToken, user};
  }

  /*async forgotPassword(login: string) {
    const user = await this.userService.userGetByLogin(login);
    const accessToken = this.jwtService.sign({id: user.id});
    //TODO: send email with accessToken
  }*/
}
