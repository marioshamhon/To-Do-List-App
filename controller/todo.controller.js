import mongoose from "mongoose";
import Todo from "../models/todo.model.js";

export const createTodo = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;

    const { todoText, isCompleted } = req.body;

    if (todoText === "") {
      const error = new Error("Todo cannnot be blank");
      error.statusCode = 400;
      throw error;
    }

    if (typeof isCompleted !== "boolean") {
      const error = new Error("isCompleted be true or false");
      error.statusCode = 400;
      throw error;
    }

    if (userId === "" || userId === undefined) {
      const error = new Error("UserId field invalid");
      error.statusCode = 400;
      throw error;
    }

    const newTodo = await Todo.create([{ todoText, userId, isCompleted }], {
      session,
    });

    await session.commitTransaction();

    session.endSession();

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: {
        newTodo,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const userId = req.userId;

    const userTodos = await Todo.find({ userId });

    if (!userTodos) {
      const error = new Error("Failed to get user todos");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "successfully got the todos",
      data: {
        userTodos,
      },
    });
  } catch (error) {
    next(error);
  }
};

//updatenotes function
//delete notes function
