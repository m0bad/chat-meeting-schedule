import {Args, Mutation, Query, Resolver, Subscription} from "@nestjs/graphql";
import {MeetingArgsType} from "./dto/meeting-args.dto";
import {MeetingDto, MeetingResultDto} from "./dto/meeting.dto";
import {Meeting} from "./meeting.schema";
import {MeetingService} from "./meeting.service";
import {PubSub} from "apollo-server-express";
import {MeetingsUnAvailableTimesDto} from "./dto/meeting-unavailable-times.dto";

const pubSub = new PubSub();

@Resolver("Meeting")
export class MeetingResolver {
  constructor(private readonly meetingService: MeetingService) {}

  @Query(returns => MeetingResultDto)
  async meetings(@Args("user") user: string): Promise<MeetingResultDto> {
    return this.meetingService.getMeetings(user);
  }

  @Query(returns => [MeetingsUnAvailableTimesDto])
  async unavailableTimes(@Args("user") user: string): Promise<any> {
    return this.meetingService.getUnavailableTimes(user);
  }

  @Mutation(returns => MeetingDto)
  async scheduleMeeting(@Args() args: MeetingArgsType): Promise<MeetingDto> {
    const meeting = await this.meetingService.createMeeting(args);
    await pubSub.publish("newMeeting", meeting);
    return meeting;
  }

  @Subscription(returns => MeetingDto, {
    resolve: payload => payload,
    filter: (payload, variables) => payload.users.includes(variables.user),
  })
  newMeeting(@Args("user") user: string) {
    return pubSub.asyncIterator("newMeeting");
  }
}
