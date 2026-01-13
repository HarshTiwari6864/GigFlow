import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    budget: {
      type: Number,
      required: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["open", "assigned"],
      default: "open"
    },
    assignedTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null
}

  },
  { timestamps: true }
);

export default mongoose.model("Gig", gigSchema);
