import {Injectable} from "@nestjs/common";
import {User} from "./user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {RegisterArgsDto} from "../auth/dto/auth-args.dto";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("user")
    private userModel: Model<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async findAll(user: string): Promise<UserDto[]> {
    const users = await this.userModel.find({});
    return users.filter(u => String(u._id) !== user);
  }

  async create(data: RegisterArgsDto) {
    return this.userModel.create(data);
  }
}
