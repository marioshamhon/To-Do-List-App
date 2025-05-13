import express from "express";
import { PORT } from "./config/env";
import authRouter from "./routes/auth.routes";
import todoRouter from "./routes/todo.routes";
import userRouter from "./routes/user.routes";
import ConnectToDatabase from "./database/mongodb";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter); // http://api/auth/sign-in or http://api/auth/sign-up
app.use("/api/todos", todoRouter); // http://api/todos/ here we have four different methods
app.use("/api/user", userRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Sever running on port: ${PORT}`);

  await ConnectToDatabase();
});
