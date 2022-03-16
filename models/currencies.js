import mongoose from "mongoose";

const currencyScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Currency", currencyScheme);
