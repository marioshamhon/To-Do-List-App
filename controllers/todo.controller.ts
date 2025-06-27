import mongoose from "mongoose";
import Todo from "../models/todo.model";
import CustomError from "../utils/CustomError";
import { NextFunction, Request, Response } from "express";

export async function getTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;

    if (!userId) {
      const error = new CustomError("UserId field invalid");
      error.statusCode = 400;
      throw error;
    }

    const userTodos = await Todo.find({ userId });

    if (!userTodos) {
      const error = new CustomError("Failed to get user todos");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message:
        "successfully got the todos from the getTodos function on the server side",
      data: {
        userTodos,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function createTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { todoText, isCompleted } = req.body;

    const userId = req.userId;

    if (!userId) {
      const error = new CustomError("UserId field invalid");
      error.statusCode = 400;
      throw error;
    }

    if (todoText === "") {
      const error = new CustomError("Todo cannnot be blank");
      error.statusCode = 400;
      throw error;
    }

    if (typeof isCompleted !== "boolean") {
      const error = new CustomError("isCompleted must be true or false");
      error.statusCode = 400;
      throw error;
    }

    if (!userId) {
      const error = new CustomError("UserId field invalid");
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
      message:
        "Todo created successfully from the createTodos function on the server side",
      data: {
        newTodo,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export async function updateTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let updates = {};

  try {
    const isCompleted = req.body.isCompleted;

    const todoText = req.body.todoText;

    const mongoDocumentId = req.params.id;

    if (isCompleted === undefined && todoText === undefined) {
      const error = new CustomError(
        "isCompleted and todoText variables undefined"
      );
      error.statusCode = 400;
      throw error;
    }

    if (!mongoDocumentId) {
      const error = new CustomError("mongo document _id field invalid");
      error.statusCode = 400;
      throw error;
    }

    if (todoText !== undefined) {
      updates = { todoText: todoText };
    }

    if (isCompleted !== undefined) {
      updates = { isCompleted: isCompleted };
    }

    const updatedTodo = await Todo.findByIdAndUpdate(mongoDocumentId, updates, {
      new: true,
    });

    if (!updatedTodo) {
      const error = new CustomError("Failed to get updated document");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message:
        "successfully got the updated todo from the updateTodos function on the server side",
      data: {
        updatedTodo,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTods(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const documentIdToDelete = req.params.id;

    if (!documentIdToDelete) {
      const error = new CustomError("mongo document _id field invalid");
      error.statusCode = 400;
      throw error;
    }

    const deletedTodo = await Todo.findByIdAndDelete(documentIdToDelete);

    if (!deletedTodo) {
      const error = new CustomError("Failed to get deleted todos");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message:
        "successfully deleted the todo from the deleteTodos function on the server side",
    });
  } catch (error) {
    next(error);
  }
}
