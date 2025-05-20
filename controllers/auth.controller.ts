import mongoose from "mongoose";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  JWT_SECRET_REFRESH_TOKEN,
  JWT_EXPIRES_IN_REFRESH_TOKEN,
  JWT_SECRET_ACCESS_TOKEN,
  JWT_EXPIRES_IN_ACCESS_TOKEN,
} from "../config/env";
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
      [
        {
          name,
          email,
          password: hashedPassword,
          refreshToken: "tempRequestToken",
        },
      ],
      { session }
    );

    const refreshToken = jwt.sign(
      { userId: newUser[0]._id },
      JWT_SECRET_REFRESH_TOKEN,
      {
        expiresIn: JWT_EXPIRES_IN_REFRESH_TOKEN,
      } as jwt.SignOptions
    );

    const accessToken = jwt.sign(
      { userId: newUser[0]._id },
      JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn: JWT_EXPIRES_IN_ACCESS_TOKEN,
      } as jwt.SignOptions
    );

    const hashedRefreshedToken = await bcrypt.hash(refreshToken, salt);

    newUser[0].refreshToken = hashedRefreshedToken;
    await newUser[0].save();

    await session.commitTransaction();

    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        refreshToken,
        accessToken,
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

    const refreshToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET_REFRESH_TOKEN,
      {
        expiresIn: JWT_EXPIRES_IN_REFRESH_TOKEN,
      } as jwt.SignOptions
    );

    const accessToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn: JWT_EXPIRES_IN_ACCESS_TOKEN,
      } as jwt.SignOptions
    );

    const salt = await bcrypt.genSalt(10);

    const hashedRefreshedToken = await bcrypt.hash(refreshToken, salt);

    user.refreshToken = hashedRefreshedToken;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        refreshToken,
        accessToken,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("refresh token route hit");
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const error = new CustomError("refresh token undefined");
      error.statusCode = 404;
      throw error;
    }

    const decodedInformation = jwt.verify(
      refreshToken,
      JWT_SECRET_REFRESH_TOKEN
    ) as { userId: string };

    const userId = decodedInformation.userId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      const error = new CustomError("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );

    if (!isRefreshTokenValid) {
      const error = new CustomError("Refresh token invalid");
      error.statusCode = 401;
      throw error;
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn: JWT_EXPIRES_IN_ACCESS_TOKEN,
      } as jwt.SignOptions
    );

    res.status(200).json({
      success: true,
      message: "New access token created successfully",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}
