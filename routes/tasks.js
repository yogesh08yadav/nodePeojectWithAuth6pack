import express from "express";
import {
  deleteTask,
  myTasks,
  newTask,
  updateTask,
} from "../controllers/tasks.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/my", isAuthenticated, myTasks);
router
  .route("/:id")
  .post(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
