import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class MeetingsUnAvailableTimesDto {
  @Field(type => String)
  date: string;

  @Field(type => [Number])
  hours: number[];
}
