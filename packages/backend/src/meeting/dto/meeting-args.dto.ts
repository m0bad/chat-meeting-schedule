import {ArgsType, Field} from "@nestjs/graphql";

@ArgsType()
export class MeetingArgsType {
  @Field(type => String)
  type: string;

  @Field(type => String)
  location: string;

  @Field(type => [String])
  users: string[];

  @Field(type => Date)
  startDate: Date;

  @Field(type => Date)
  endDate: Date;
}
