import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";
import validator from "validator";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
  },
  lastName: { type: String, required: true, trim: true },
  age: {
    type: Number,
    required: true,
    min: [18, "age must be at least 18, got {VALUE}"],
    max: 60,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: [true, "email must be unique"],
    // validate: {
    //   validator: function (value) {
    //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    //   },
    //   message: "Invalid email format",
    // },
    validate: [validator.isEmail, "Validator email error"],
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: { values: ["user", "admin"], message: "Role is not valid" },
    default: "user",
  },
});

export const User = model("User", userSchema);
