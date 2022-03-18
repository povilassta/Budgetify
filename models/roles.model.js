import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "Role type is required."],
  },
});

export default mongoose.model("Role", roleSchema);
