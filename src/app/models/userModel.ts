import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  age: {
    type: Number,
    required: true,
    min: [18, "age must be at least 18, got {VALUE}"],
    max: 60,
  },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

export const User = model("User", userSchema);
