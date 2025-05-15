import { Router } from "express";
import authenticateUser from "../middlewares/authenticateuser.middleware";
import {
  getUser,
  updateUserProfile,
  verifyPassword,
  updatePassword,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", authenticateUser, getUser);

userRouter.patch("/", authenticateUser, updateUserProfile);

userRouter.post("/verify-password", authenticateUser, verifyPassword);

userRouter.patch("/password", authenticateUser, updatePassword);

export default userRouter;
