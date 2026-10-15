import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    clickCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", linkSchema);

export default Link;
