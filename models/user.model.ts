import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: 1,
      maxLength: 50,
    },

    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
    refreshToken: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
