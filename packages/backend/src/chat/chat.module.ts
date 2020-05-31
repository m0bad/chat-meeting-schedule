import {Module} from "@nestjs/common";
import {ChatResolver} from "./chat.resolver";
import {ChatService} from "./chat.service";
import {MongooseModule} from "@nestjs/mongoose";
import {ChatSchema} from "./chat.schema";
import {MessageModule} from "../message/message.module";

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
