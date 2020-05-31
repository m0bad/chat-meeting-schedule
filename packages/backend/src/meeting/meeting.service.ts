import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Meeting} from "./meeting.schema";
import {MeetingArgsType} from "./dto/meeting-args.dto";
import {MeetingDto, MeetingResultDto} from "./dto/meeting.dto";
import {MeetingsUnAvailableTimesDto} from "./dto/meeting-unavailable-times.dto";

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

  async getUnavailableTimes(user: string): Promise<any> {
    const userMeetings = await this.meetingModel.find({
      users: user,
    });
    return this.getComingMeetings(userMeetings);
  }

  isPastDate(date: Date): boolean {
    if (date <= new Date()) return true;
    return false;
  }

  getComingMeetings(meetings): MeetingsUnAvailableTimesDto[] {
    let result = [];
    meetings.map(meeting => {
      if (!this.isPastDate(meeting.startDate)) {
        let hours = [];
        const ranges = this.getRanges(
          meeting.startDate.getHours(),
          meeting.endDate.getHours(),
        );
        hours = [...hours, ...ranges];
        result = [
          ...result,
          {
            date: meeting.startDate,
            hours,
          },
        ];
      }
    });
    return result;
  }

  getRanges(low, high) {
    let list = [];
    for (let i = low; i <= high; i++) {
      list.push(i);
    }
    return list;
  }
}
