import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todoText: {
      type: String,
      required: [true, "A todo is required"],
    },

    userId: {
      type: String,
      required: [true, "User id is required"],
    },

    isCompleted: {
      type: Boolean,
      required: [true, "The completed field is required"],
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
