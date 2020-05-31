import {Module} from "@nestjs/common";
import {AuthResolver} from "./auth.resolver";
import {AuthService} from "./auth.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./helpers/jwt.strategy";

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("SECRET"),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
