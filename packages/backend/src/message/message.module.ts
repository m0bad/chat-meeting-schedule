import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {MessageSchema} from "./message.schema";
import {MessageService} from "./message.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "message",
        schema: MessageSchema,
      },
    ]),
  ],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
