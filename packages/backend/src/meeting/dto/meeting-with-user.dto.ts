import {Field, ObjectType} from "@nestjs/graphql";
import {MeetingTypeEnum} from "./meeting-type.enum";
import {UserDto} from "../../user/dto/user.dto";

@ObjectType()
export class MeetingWithUserDto {
  @Field()
  _id: string;

  @Field(type => MeetingTypeEnum)
  type: MeetingTypeEnum;

  @Field(type => String)
  location: string;

  @Field(type => [UserDto])
  users: UserDto[];

  @Field(type => Date)
  startDate: Date;

  @Field(type => Date)
  endDate: Date;
}
