import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Meeting } from "./meeting.schema";
import { MeetingArgsType } from "./dto/meeting-args.dto";
import { MeetingDto } from "./dto/meeting.dto";

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel("meeting")
    private meetingModel: Model<Meeting>,
  ) {}

  async getMeetings(user: string): Promise<MeetingDto[]> {
    return this.meetingModel.find({
      users: user,
    });
  }

  async createMeeting(data: MeetingArgsType): Promise<MeetingDto> {
    return this.meetingModel.create(data);
  }
}
