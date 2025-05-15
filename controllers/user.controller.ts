import User from "../models/user.model";
import CustomError from "../utils/CustomError";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.userId;

    if (!_id) {
      const error = new CustomError("UserId field invalid");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ _id });

    if (!user) {
      const error = new CustomError("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let userProfileUpdates = {};

    const name = req.body.name;

    const email = req.body.email;

    const mongoUserDocumentId = req.userId;

    if (name === undefined && email === undefined) {
      const error = new CustomError("name and email variables undefined");
      error.statusCode = 400;
      throw error;
    }

    if (!mongoUserDocumentId) {
      const error = new CustomError("mongo user document _id field invalid");
      error.statusCode = 400;
      throw error;
    }

    if (name !== undefined) {
      userProfileUpdates = { name: name };
    }

    if (email !== undefined) {
      userProfileUpdates = { email: email };
    }

    const updatedUser = await User.findByIdAndUpdate(
      mongoUserDocumentId,
      userProfileUpdates,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      const error = new CustomError("Failed to get user updated document");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message:
        "successfully got the updated user document from the updateUserProfile function on the server side",
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { password } = req.body;
    const mongoUserDocumentId = req.userId;

    if (!password) {
      const error = new CustomError(
        "password field invaild from verifyPassword function"
      );
      error.statusCode = 400;
      throw error;
    }

    if (!mongoUserDocumentId) {
      const error = new CustomError("mongo user document _id field invalid");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ _id: mongoUserDocumentId });

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

    res.status(200).json({
      success: true,
      message: "password verified successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const password = req.body.password;
    const mongoUserDocumentId = req.userId;

    if (!password) {
      const error = new CustomError(
        "password field invaild from updatePassword function function"
      );
      error.statusCode = 400;
      throw error;
    }

    if (!mongoUserDocumentId) {
      const error = new CustomError("mongo user document _id field invalid");
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedPassword = { password: hashedPassword };

    const userWithUpdatedPassword = await User.findByIdAndUpdate(
      mongoUserDocumentId,
      updatedPassword,
      { new: true }
    );

    if (!userWithUpdatedPassword) {
      const error = new CustomError(
        "Failed to get user with updated password document"
      );
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (error) {
    next(error);
  }
}
