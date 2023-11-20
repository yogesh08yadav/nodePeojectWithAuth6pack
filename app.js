import express from "express";
import router from "./routes/users.js";
import { config } from "dotenv";

export const app = express();
config({
  path: "./data/config.env",
});

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use(express.json());
app.use("/users", router);
app.use("/", router);
