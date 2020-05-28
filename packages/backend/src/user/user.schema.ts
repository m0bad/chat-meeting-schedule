import * as mongoose from "mongoose";

export interface User extends mongoose.Document {
  email: string;
  password: string;
}

export const UserSchema = new mongoose.Schema<User>({
  email: String,
  password: String,
});
