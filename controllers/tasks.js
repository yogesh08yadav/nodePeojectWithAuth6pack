import { Tasks } from "../models/tasks.js";

export const newTask = async (req, res, next) => {
  let { title, description } = req.body;

  await Tasks.create({ title, description, user: req.user });

  res.status(201).json({
    success: true,

    message: "Task created",
  });
};

export const myTasks = async (req, res) => {
  let tasks = await Tasks.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTask = async (req, res) => {
  let task = await Tasks.findById(req.params.id);
  if (!task) return next(new Error("Invalid task"));

  task.isCompleted = !task.isCompleted;
  task.save();
  res.status(200).json({
    success: true,
    message: "Task update successfully",
  });
};

export const deleteTask = async (req, res, next) => {
  let task = await Tasks.findById(req.params.id);
  if (!task) {
    return next(new Error());
  }
  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};
