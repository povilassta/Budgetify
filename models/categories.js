import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["expense", "income"],
  },
  userId: {
    type: mongoose.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Category", categorySchema);
