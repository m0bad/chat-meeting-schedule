import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { MeetingArgsType } from "./dto/meeting-args.dto";
import { MeetingDto, MeetingResultDto } from "./dto/meeting.dto";
import { Meeting } from "./meeting.schema";
import { MeetingService } from "./meeting.service";

@Resolver("Meeting")
export class MeetingResolver {
  constructor(private readonly meetingService: MeetingService) {}

  @Query(returns => MeetingResultDto)
  async meetings(@Args("user") user: string): Promise<MeetingResultDto> {
    return this.meetingService.getMeetings(user);
  }

  @Query(returns => [[Date]])
  async unavailableTimes(@Args("user") user: string): Promise<Date[][]> {
    return this.meetingService.getUnavailableTimes(user);
  }

  @Mutation(returns => MeetingDto)
  async scheduleMeeting(@Args() args: MeetingArgsType): Promise<MeetingDto> {
    return this.meetingService.createMeeting(args);
  }
}
