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

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax" as const,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

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
          refreshToken: [],
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

    newUser[0].refreshToken.push(hashedRefreshedToken);
    await newUser[0].save();

    await session.commitTransaction();

    session.endSession();

    const platform = req.headers.platform;

    if (platform === "web") {
      res.cookie("refreshToken", refreshToken, cookieOptions);
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        ...(platform !== "web" ? { refreshToken } : {}),
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

    user.refreshToken.push(hashedRefreshedToken);

    await user.save();

    const platform = req.headers.platform;

    if (platform === "web") {
      res.cookie("refreshToken", refreshToken, cookieOptions);
    }

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        ...(platform !== "web" ? { refreshToken } : {}),
        accessToken,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  try {
    let refreshToken = "";

    const platform = req.headers.platform;

    if (platform === "web") {
      refreshToken = req.cookies.refreshToken;
    } else if (platform !== "web") {
      refreshToken = req.body.refreshToken;
    }

    if (!refreshToken) {
      const error = new CustomError("refresh token undefined");
      error.statusCode = 404;
      throw error;
    }

    const userId = req.userId;

    if (!userId) {
      const error = new CustomError("User ID invalid");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      const error = new CustomError("User not found");
      error.statusCode = 404;
      throw error;
    }

    let matchIndex = -1;

    for (let i = 0; i < user.refreshToken.length; i++) {
      const hashedRefreshTokenFromDb = user.refreshToken[i];

      if (await bcrypt.compare(refreshToken, hashedRefreshTokenFromDb)) {
        matchIndex = i;
        break;
      }
    }

    if (matchIndex < 0) {
      const error = new CustomError("Refresh token not found");
      error.statusCode = 401;
      throw error;
    }

    user.refreshToken.splice(matchIndex, 1);

    await user.save();

    if (platform === "web") {
      res.clearCookie("refreshToken", cookieOptions);
    }

    res.status(200).json({
      success: true,
      message: "Refresh token removed successfully",
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
    let refreshToken = "";

    const platform = req.headers.platform;

    if (platform === "web") {
      refreshToken = req.cookies.refreshToken;
    } else if (platform !== "web") {
      refreshToken = req.body.refreshToken;
    }

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

    if (!userId) {
      const error = new CustomError("User ID invalid");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      const error = new CustomError("User not found");
      error.statusCode = 404;
      throw error;
    }

    let matchIndex = -1;

    for (let i = 0; i < user.refreshToken.length; i++) {
      const hashedRefreshTokenFromDb = user.refreshToken[i];

      if (await bcrypt.compare(refreshToken, hashedRefreshTokenFromDb)) {
        matchIndex = i;
        break;
      }
    }

    if (matchIndex < 0) {
      const error = new CustomError("Refresh token not found");
      error.statusCode = 404;
      throw error;
    }

    user.refreshToken.splice(matchIndex, 1);

    const accessToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn: JWT_EXPIRES_IN_ACCESS_TOKEN,
      } as jwt.SignOptions
    );

    const newRefreshToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET_REFRESH_TOKEN,
      {
        expiresIn: JWT_EXPIRES_IN_REFRESH_TOKEN,
      } as jwt.SignOptions
    );

    const salt = await bcrypt.genSalt(10);

    const hashedRefreshedToken = await bcrypt.hash(newRefreshToken, salt);

    user.refreshToken.push(hashedRefreshedToken);

    await user.save();

    if (platform === "web") {
      res.cookie("refreshToken", newRefreshToken, cookieOptions);
    }

    res.status(200).json({
      success: true,
      message: "New access token created successfully",
      accessToken,
      ...(req.body.refreshToken ? { newRefreshToken } : {}),
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      const customError = new CustomError("Refresh token has expired");
      customError.statusCode = 401;
      next(customError);
    } else if (error.name === "JsonWebTokenError") {
      const customError = new CustomError("Invalid refresh token");
      customError.statusCode = 401;
      next(customError);
    } else {
      next(error);
    }
  }
}
