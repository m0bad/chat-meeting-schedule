import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat } from "./chat.schema";
import { MessageService } from "../message/message.service";
import { MessageArgsDto } from "../message/dto/message-args.dto";
import { Message } from "../message/message.schema";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel("chat")
    private chatModel: Model<Chat>,
    private messageService: MessageService,
  ) {}

  async getMessagesForChat(chat: string): Promise<Message[]> {
    // @ts-ignore
    return this.messageService.messagesModel.find({ chat});
  }

  async createChat(users: string[]): Promise<string> {
    const chat = await this.chatModel.create({ users: users, messages: [] });
    return chat._id;
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
