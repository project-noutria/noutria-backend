import { model, Schema } from "mongoose";
import {
  IUser, Role, Goal, Gender, Preferences
} from "../utils/interface"; 

const userSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String, unique: true, maxLength: 50, lowercase: true
    },
    password: { type: String },
    phone: { type: String, unique: true },
    weight: { type: Number },
    height: { type: Number },
    gender: { type: String, body: Gender },
    role: { type: String, body: Role, default: "user" },
    goal: { type: String, body: Goal },
    preferences: { type: String, body: Preferences },
    verified: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
