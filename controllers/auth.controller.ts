import mongoose from "mongoose";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env";
import CustomError from "../utils/CustomError";
import { NextFunction, Request, Response } from "express";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const minimumPasswordLength = 6;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    if (password.length < minimumPasswordLength) {
      const error = new CustomError(
        `Password too short please provide an password with a minimum of ${minimumPasswordLength} characters`
      );
      error.statusCode = 401;
      throw error;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new CustomError("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as jwt.SignOptions);

    await session.commitTransaction();

    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new CustomError("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new CustomError("Invaild Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as jwt.SignOptions);

    res.status(200).json({
      success: true,
      message: "User signed in in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}
