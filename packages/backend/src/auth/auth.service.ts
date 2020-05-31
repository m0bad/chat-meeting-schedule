import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {UserDto} from "../user/dto/user.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {RegisterArgsDto} from "./dto/auth-args.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password, username }: RegisterArgsDto) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.create({
      email,
      username,
      password: hashedPassword,
    });
  }

  async login(user: UserDto): Promise<string> {
    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }

  async validate(email: string, password: string): Promise<UserDto> {
    const user = await this.userService.findOne(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
