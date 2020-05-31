import {ArgsType, Field} from "@nestjs/graphql";

@ArgsType()
export class LoginArgsDto {
    @Field()
    email: string;

    @Field()
    password: string;
}


@ArgsType()
export class RegisterArgsDto {
    @Field()
    email: string;

    @Field()
    username: string;

    @Field()
    password: string;
}
