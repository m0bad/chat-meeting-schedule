import * as mongoose from "mongoose";
import {MeetingTypeEnum} from "./dto/meeting-type.enum";

export interface Meeting extends mongoose.Document {
  type: MeetingTypeEnum;
  startDate: Date;
  endDate: Date;
  users: string[];
  location: string;
}

export const MeetingSchema = new mongoose.Schema<Meeting>(
  {
    location: String,
    startDate: Date,
    endDate: Date,
    type: {
      type: String,
      enum: [MeetingTypeEnum.Offline, MeetingTypeEnum.Online],
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  },
);
