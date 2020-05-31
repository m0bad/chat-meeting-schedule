import * as mongoose from "mongoose";
import {User} from "../user/user.schema";
import {Chat} from "../chat/chat.schema";

export interface Message extends mongoose.Document {
  body: string;
  sender: User;
  chat: Chat;
}

export const MessageSchema = new mongoose.Schema<Message>(
  {
    body: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
  },
  {
    timestamps: true,
  },
);
