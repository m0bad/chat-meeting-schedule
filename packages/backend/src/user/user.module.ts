import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "user",
        schema: UserSchema,
      },
    ]),
  ],
  providers: [],
})
export class UserModule {}
