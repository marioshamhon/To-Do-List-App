import { Router } from "express";

import { signUp, signIn, refreshToken } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-up", signUp);

authRouter.post("/refresh-token", refreshToken);

export default authRouter;
