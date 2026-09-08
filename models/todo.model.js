import mongoose from "mongoose";

const todoschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    iscompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoschema);