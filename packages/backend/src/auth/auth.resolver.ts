import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { AuthResultDto } from "./dto/auth-result.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

@Resolver("Auth")
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(returns => AuthResultDto, { nullable: true })
  async register(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<AuthResultDto | null> {
    const userExists = await this.userService.findOne(email);
    if (userExists) {
      throw new HttpException("Email Already Exists", HttpStatus.CONFLICT);
    }

    const newUser = await this.authService.register({ email, password });
    const token = await this.authService.login(newUser);
    return { _id: newUser._id, email: newUser.email, token };
  }

  @Mutation(returns => AuthResultDto, { nullable: true })
  async login(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<AuthResultDto | null> {
    const user = await this.authService.validate(email, password);
    if (!user)
      throw new HttpException(
        "Email or password incorrect",
        HttpStatus.UNAUTHORIZED,
      );

    const token = await this.authService.login(user);

    // @ts-ignore
    return { _id: user._doc._id, email: user._doc.email, token };
  }
}
