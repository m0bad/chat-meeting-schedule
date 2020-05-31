import {Args, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";
import {User} from "./user.schema";
import {UserDto} from "./dto/user.dto";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [UserDto])
  async users(@Args("user") user: string): Promise<UserDto[]> {
    return this.userService.findAll(user);
  }
}
