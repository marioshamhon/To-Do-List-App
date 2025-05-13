import { Router } from "express";
import authenticateUser from "../middlewares/authenticateuser.middleware";
import { getUser, updateUserProfile } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", authenticateUser, getUser);

userRouter.patch("/", authenticateUser, updateUserProfile);

export default userRouter;
