import { forwardRef, Module } from "@nestjs/common";
import { ChatResolver } from "./chat.resolver";
import { ChatService } from "./chat.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatSchema } from "./chat.schema";
import { MessageModule } from "../message/message.module";
import { MessageService } from "../message/message.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "chat",
        schema: ChatSchema,
      },
    ]),
    MessageModule,
  ],
  providers: [ChatResolver, ChatService],
  exports: [ChatService],
})
export class ChatModule {}
