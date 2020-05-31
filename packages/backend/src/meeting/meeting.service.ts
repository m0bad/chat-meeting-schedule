import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Meeting } from "./meeting.schema";
import { MeetingArgsType } from "./dto/meeting-args.dto";
import { MeetingDto, MeetingResultDto } from "./dto/meeting.dto";

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel("meeting")
    private meetingModel: Model<Meeting>,
  ) {}

  async getMeetings(user: string): Promise<MeetingResultDto> {
    let coming = [];
    let past = [];
    const userMeetings = await this.meetingModel
      .find({
        users: user,
      })
      .populate("users")
      .exec();

    userMeetings.map(meeting => {
      if (this.isPastDate(meeting.startDate)) past.push(meeting);
      else coming.push(meeting);
    });

    return { coming, past };
  }

  async createMeeting(data: MeetingArgsType): Promise<MeetingDto> {
    return this.meetingModel.create(data);
  }

  async getUnavailableTimes(user: string): Promise<Date[][]> {
    const userMeetings = await this.meetingModel.find({
      users: user,
    });

    return this.getComingMeetings(userMeetings);
  }

  isPastDate(date: Date): boolean {
    if (date <= new Date()) return true;
    return false;
  }

  getComingMeetings(meetings): Date[][] {
    let result = [];
    meetings.map(meeting => {
      if (!this.isPastDate(meeting.startDate)) {
        result = [...result, [meeting.startDate, meeting.endDate]];
      }
    });
    return result;
  }
}
