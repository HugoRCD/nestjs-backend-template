import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {User} from "src/user/entities/user.entity";
import {UserService} from "src/user/user.service";
import {AuthLoginOutput} from "./dto/auth-login.dto";
import {CreateUserInput} from "../user/dto/user-create.input";
import {Utils} from "../user/utils/utils";

export interface JWTPayload {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  role: number;
}

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UserService,
      private jwtService: JwtService,
  ) {
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.getUserByLogin(login);
    if (user && await Utils.deHashPassword(password, user.password)) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<AuthLoginOutput> {
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async signup(createUserInput: CreateUserInput): Promise<AuthLoginOutput> {
    const userCreated = await this.userService.create(createUserInput);
    const {token, user: user} = await this.login(userCreated);
    return {token, user};
  }

  /*async forgotPassword(login: string) {
    const user = await this.userService.userGetByLogin(login);
    const token = this.jwtService.sign({id: user.id});
    //TODO: send email with token
  }*/
}
