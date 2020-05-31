import * as mongoose from "mongoose";
import {User} from "../user/user.schema";
import {Message} from "../message/message.schema";

export interface Chat extends mongoose.Document {
  users: User[];
  messages: Message[];
}

export const ChatSchema = new mongoose.Schema<Chat>(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
      },
    ],
  },
  {
    timestamps: true,
  },
);
