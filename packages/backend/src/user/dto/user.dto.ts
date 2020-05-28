import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {
    @Field()
    name: string;
}
