import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ChatService } from "./chat.service";
import { MessageDto } from "../message/dto/message.dto";
import { Message } from "../message/message.schema";
import { Chat } from "./chat.schema";
import { UserDto } from "../user/dto/user.dto";

@Resolver("Chat")
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(returns => [MessageDto])
  async messages(
    @Args("users", { type: () => [String] }) users: string[],
  ): Promise<Message[]> {
    return this.chatService.getMessages(users);
  }

  @Query(returns => [UserDto])
  async friends(@Args("user") user: string): Promise<UserDto[]> {
    return this.chatService.getFriends(user);
  }

  @Mutation(returns => MessageDto)
  async sendMessage(
    @Args("body") body: string,
    @Args("sender") sender: string,
    @Args("chat") chat: string,
  ): Promise<Message> {
    const newMessage = await this.chatService.sendMessage({
      body,
      sender,
      chat,
    });
    return newMessage;
  }
}
