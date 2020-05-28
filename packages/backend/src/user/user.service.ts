import { Injectable } from "@nestjs/common";
import { User } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User")
    private userModel: Model<User>,
  ) {}

  async findOne(name: string): Promise<User | undefined> {
    return this.userModel.findOne({ name });
  }
}
