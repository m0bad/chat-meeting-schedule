import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {
    @Field()
    email: string;
}

@ObjectType()
export class UserWithPasswordDto {
    @Field()
    email: string;

    @Field()
    password: string;
}

