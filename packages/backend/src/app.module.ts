import {Module} from "@nestjs/common";
import {AppResolver} from "./app.resolver";
import {AppService} from "./app.service";

import {ConfigModule} from "@nestjs/config";
import {GraphQLModule} from "@nestjs/graphql";
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {ChatModule} from "./chat/chat.module";
import {MessageModule} from "./message/message.module";
import {MeetingModule} from './meeting/meeting.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      installSubscriptionHandlers: true,
    }),
    UserModule,
    AuthModule,
    ChatModule,
    MessageModule,
    MeetingModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
