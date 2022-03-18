import mongoose from "mongoose";

const currencyScheme = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Currency name is required."],
  },
  code: {
    type: String,
    required: [true, "Currency code is required."],
  },
});

export default mongoose.model("Currency", currencyScheme);
