import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  accountId: {
    type: mongoose.ObjectId,
    ref: "Account",
    required: [true, "Account id is required"],
  },
  title: {
    type: String,
    required: [true, "Transaction title is required."],
  },
  type: {
    type: String,
    enum: {
      values: ["expense", "income"],
      message:
        "{VALUE} transaction type is not supported. Supported transaction types: expense, income.",
    },
  },
  transactionDate: {
    type: Date,
    default: Date.now(),
    required: [true, "Transaction date is required."],
  },
  amount: {
    type: Number,
    required: [true, "Transaction amount is required."],
    min: [0, "Transaction amount can't be less than 0."],
  },
  categories: [
    {
      type: mongoose.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
    },
  ],
  payee: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

transactionSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

export default mongoose.model("Transaction", transactionSchema);
