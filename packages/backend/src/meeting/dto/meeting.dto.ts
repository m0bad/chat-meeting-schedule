import { Field, ObjectType } from "@nestjs/graphql";
import {MeetingTypeEnum} from "./meeting-type.enum";

@ObjectType()
export class MeetingDto {
  @Field()
  _id: string;

  @Field(type => MeetingTypeEnum)
  type: MeetingTypeEnum;

  @Field(type => String)
  location: string;

  @Field(type => [String])
  users: string[];

  @Field(type => Date)
  startDate: Date;

  @Field(type => Date)
  endDate: Date;
}
