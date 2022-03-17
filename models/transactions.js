import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  accountId: {
    type: mongoose.ObjectId,
    ref: "Account",
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["expense", "income"],
  },
  transactionDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default mongoose.model("Transaction", transactionSchema);
