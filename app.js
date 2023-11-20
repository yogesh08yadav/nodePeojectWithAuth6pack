import express from "express";
import router from "./routes/users.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import tasksRouter from "./routes/tasks.js";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();
app.use(cookieParser());
config({
  path: "./data/config.env",
});

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use(express.json());
app.use("/users", router);
app.use("/", router);
app.use("/tasks", tasksRouter);

app.use(errorMiddleware);
