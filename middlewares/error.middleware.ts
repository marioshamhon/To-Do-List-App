import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";

export default function errorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let error = { ...err };

    error.message = err.message;

    console.error(err);

    //Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    //Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === "ValidationError" && err.errors) {
      const errorArray = Object.values(err.errors) as { message: string }[];
      error.message = errorArray.map((e) => e.message).join(", ");
      error.statusCode = 400;
    }

    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message || "Server Error" });
  } catch (error) {
    next(error);
  }
}
