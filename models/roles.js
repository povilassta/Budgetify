import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Role", roleSchema);
