import * as mongoose from "mongoose";
import { User } from "../user/user.schema";

export interface Chat extends mongoose.Document {
  members: User[];
}

export const ChatSchema = new mongoose.Schema<Chat>(
         {
           members: [
             {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
             },
           ],
         },
         {
           timestamps: true,
         },
       );
