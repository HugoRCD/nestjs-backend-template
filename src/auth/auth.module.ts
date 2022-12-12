import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {UserModule} from "src/user/user.module";
import {AuthService} from "./auth.service";
import {AuthMutationsResolver} from "./resolvers/auth.mutations.resolver";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {LocalStrategy} from "./strategies/local.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService) => ({
        secret: ConfigService.get("ACCESS_TOKEN_SECRET"),
        signOptions: {expiresIn: ConfigService.get("ACCESS_TOKEN_EXPIRATION")},
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthMutationsResolver,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule {
}
