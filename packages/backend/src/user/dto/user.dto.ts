import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class UserDto {
  @Field()
  _id: string;

  @Field()
  email: string;

  @Field()
  username: string;
}
