import * as mongoose from "mongoose";

export interface User extends mongoose.Document {
  email: string;
  username: string;
  password: string;
}

export const UserSchema = new mongoose.Schema<User>({
  email: String,
  username: { type: String, unique: true },
  password: String,
});
