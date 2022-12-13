import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {JWTPayload} from "../auth.service";

@Injectable()
export class JwtAtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("ACCESS_TOKEN_SECRET"),
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    return payload;
  }
}
