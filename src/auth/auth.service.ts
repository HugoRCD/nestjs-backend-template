import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from 'src/user/entities/user.entity';
import {UserService} from 'src/user/user.service';
import {AuthLoginOutput} from './dto/auth-login.dto';

export interface JWTPayload {
    id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {
    }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.userGetByLogin(login);
    if (user && user.password === password) {
      const { password, ...result } = user;
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
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
