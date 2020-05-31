import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Message} from "./message.schema";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel("message")
    public messagesModel: Model<Message>,
  ) {}
}
