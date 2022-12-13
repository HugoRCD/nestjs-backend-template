import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {UserModule} from "src/user/user.module";
import {AuthService} from "./auth.service";
import {AuthMutationsResolver} from "./resolvers/auth.mutations.resolver";
import {JwtAtStrategy} from "./strategies/jwt-at.strategy";
import {JwtRtGuard} from "./strategies/jwt-rt.strategy";
import {LocalStrategy} from "./strategies/local.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule,
  ],
  providers: [
    AuthService,
    AuthMutationsResolver,
    LocalStrategy,
    JwtAtStrategy,
    JwtRtGuard,
  ],
})
export class AuthModule {
}
