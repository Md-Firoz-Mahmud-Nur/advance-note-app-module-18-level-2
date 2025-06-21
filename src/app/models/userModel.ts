import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/userInterface";
import validator from "validator";

const addressSchema = new Schema<IAddress>({
  city: { type: String, required: true },
  street: { type: String, required: true },
  zip: { type: Number, required: true },
}, { _id: false });

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
    // validate: {
    //   validator: function (value) {
    //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    //   },
    //   message: "Invalid email format",
    // },
    validate: [validator.isEmail, "Validator email error"],
    // unique: true,
    unique: [true, "Email must be unique"],
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: { values: ["user", "admin"], message: "Role is not valid" },
    default: "user",
  },
  address: { type: addressSchema },
},{
  timestamps: true
});

export const User = model("User", userSchema);
