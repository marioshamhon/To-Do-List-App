import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export default function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedInformation = jwt.verify(token, JWT_SECRET);

    req.userId = decodedInformation.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
