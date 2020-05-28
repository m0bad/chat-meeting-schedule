import { Module } from "@nestjs/common";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";

import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import {UserModule} from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    UserModule
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
