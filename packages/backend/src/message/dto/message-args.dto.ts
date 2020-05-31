import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class MessageArgsDto {
  @Field()
  body: string;

  @Field()
  sender: string;

  @Field()
  chat: string;
}
