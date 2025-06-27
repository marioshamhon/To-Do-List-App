import { Router } from "express";
import authenticateUser from "../middlewares/authenticateuser.middleware";
import { getAiSuggestion } from "../controllers/gemini.controller";

const geminiRouter = Router();

geminiRouter.post("/suggestions", authenticateUser, getAiSuggestion);

export default geminiRouter;
