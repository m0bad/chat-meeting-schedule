import * as mongoose from "mongoose";
import {Chat} from "../chat/chat.schema";

export interface User extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  chats: Chat[];
}

export const UserSchema = new mongoose.Schema<User>(
  {
    email: String,
    username: { type: String, unique: true },
    password: String,
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat",
      },
    ],
  },
  {
    timestamps: true,
  },
);
