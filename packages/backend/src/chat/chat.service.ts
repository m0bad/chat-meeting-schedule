import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Chat} from "./chat.schema";
import {MessageService} from "../message/message.service";
import {MessageArgsDto} from "../message/dto/message-args.dto";
import {Message} from "../message/message.schema";
import {UserDto} from "../user/dto/user.dto";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel("chat")
    private chatModel: Model<Chat>,
    private messageService: MessageService,
  ) {}

  async getMessages(_id: string): Promise<Message[]> {
    let chatRoom = await this.chatModel.findOne({ _id });
    if (!chatRoom)
      throw new HttpException("Chat Not Found.", HttpStatus.NOT_FOUND);

    return this.messageService.messagesModel.find({
      chat: chatRoom._id,
    });
  }

  async getChatForUsers(users: string[]): Promise<string> {
    let chatExists = await this.chatModel.findOne({
      users: { $all: users },
    });
    if (!chatExists)
      chatExists = await this.chatModel.create({ users, messages: [] });

    return chatExists._id;
  }

  async getFriends(user: string): Promise<UserDto[]> {
    const chats = await this.chatModel
      .find({ users: user as any })
      .populate("users");

    return chats
      .map(chat => chat.users)
      .reduce((acc, cur) => acc.concat(cur), [])
      .filter(u => u._id != user);
  }

  async sendMessage(data: MessageArgsDto): Promise<Message> {
    const chat = await this.chatModel.findById(data.chat);
    if (!chat) throw new HttpException("Chat Not Found.", HttpStatus.NOT_FOUND);

    const message = await this.messageService.messagesModel.create(data);

    chat.messages.push(message);
    await chat.save();

    return message;
  }
}
