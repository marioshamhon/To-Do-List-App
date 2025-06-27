import { Router } from "express";

import authenticateUser from "../middlewares/authenticateuser.middleware";

import {
  signUp,
  signIn,
  signOut,
  refreshToken,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-up", signUp);

authRouter.patch("/sign-out", authenticateUser, signOut);

authRouter.post("/refresh-token", refreshToken);

export default authRouter;
