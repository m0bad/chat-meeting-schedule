import * as mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  password: string;
}

export const UserSchema = new mongoose.Schema<User>({
  name: String,
  password: String,
});
