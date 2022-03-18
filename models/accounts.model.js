import mongoose from "mongoose";
import Transaction from "./transactions.model.js";

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "Users",
    immutable: true,
  },
  title: {
    type: String,
    required: [true, "Account title is required."],
  },
  description: {
    type: String,
  },
  currency: {
    type: mongoose.ObjectId,
    ref: "Currency",
    required: [true, "Account currency is required."],
  },
});

// Middleware: when account is removed, remove its transactions.
accountSchema.pre(
  "deleteOne",
  { document: true, query: false },
  function (next) {
    console.log(this);
    Transaction.deleteMany({ accountId: this._id }).exec();
    next();
  }
);

export default mongoose.model("Account", accountSchema);
