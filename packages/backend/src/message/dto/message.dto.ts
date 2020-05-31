import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class MessageDto {
  @Field()
  _id: string;

  @Field()
  body: string;

  @Field()
  sender: string;

  @Field()
  chat: string;

  @Field()
  createdAt: Date;
}
