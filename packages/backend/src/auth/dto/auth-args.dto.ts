import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class AuthArgsDto {
    @Field()
    email: string;

    @Field()
    password: string;
}
