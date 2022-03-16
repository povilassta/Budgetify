import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "Users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  currency: {
    type: mongoose.ObjectId,
    ref: "Currency",
  },
});

export default mongoose.model("Account", accountSchema);
