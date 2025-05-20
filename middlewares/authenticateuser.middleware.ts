import jwt from "jsonwebtoken";
import { JWT_SECRET_ACCESS_TOKEN } from "../config/env";
import { Request, Response, NextFunction } from "express";

export default function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedInformation = jwt.verify(token, JWT_SECRET_ACCESS_TOKEN);

    if (
      typeof decodedInformation !== "string" &&
      "userId" in decodedInformation
    ) {
      req.userId = decodedInformation.userId;
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token.",
    });
    return;
  }
}
