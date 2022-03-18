import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "User email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User password is required."],
  },
  firstName: {
    type: String,
    required: [true, "User first name is required."],
  },
  lastName: {
    type: String,
    required: [true, "User last name is required."],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message:
        "{VALUE} gender is not supported. Supported genders: male, female, other.",
    },
  },
  dateOfBirth: {
    type: Date,
    required: [true, "User date of birth is required."],
  },
  country: {
    type: String,
    required: [true, "User country is required."],
  },
  role: {
    type: mongoose.ObjectId,
    ref: "Role",
    required: [true, "User role is required."],
  },
});

export default mongoose.model("User", userSchema);
