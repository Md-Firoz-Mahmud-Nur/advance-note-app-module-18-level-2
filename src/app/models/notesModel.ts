import { model, Schema } from "mongoose";
import { INotes } from "../interfaces/notesInterface";

const noteSchema = new Schema<INotes>(
  {
    title: { type: String, required: true, trim: true },
    content: {
      type: String,
      default: "No content provided by user",
      trim: true,
    },
    category: {
      type: String,
      enum: ["personal", "work", "study", "other"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "gray" },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = model<INotes>("note", noteSchema);
