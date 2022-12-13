import {ExtractJwt, Strategy} from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {JWTPayload} from "../auth.service";

@Injectable()
export class JwtRtGuard extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("REFRESH_TOKEN_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    return payload;
  }
}