import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required."],
  },
  type: {
    type: String,
    required: [true, "Category type is required."],
    enum: {
      values: ["expense", "income"],
      message:
        "{VALUE} category type is not supported. Supported category types: expense, income.",
    },
  },
  userId: {
    type: mongoose.ObjectId,
    ref: "User",
    immutable: true,
  },
});

categorySchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

export default mongoose.model("Category", categorySchema);
