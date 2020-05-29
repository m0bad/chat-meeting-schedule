import {Field, ObjectType} from "@nestjs/graphql";
import {UserDto} from "../../user/dto/user.dto";
import {MessageDto} from "../../message/dto/message.dto";

@ObjectType()
export class ChatDto {
  @Field()
  _id: string;

  @Field(type => [UserDto])
  users: UserDto[];

  @Field(type => [MessageDto])
  messages: MessageDto[];
}
