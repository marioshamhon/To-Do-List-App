import User from "../models/user.model";
import CustomError from "../utils/CustomError";
import { NextFunction, Request, Response } from "express";

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
  let userProfileUpdates = {};

  try {
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
