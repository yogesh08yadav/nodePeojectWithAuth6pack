import express from "express";
import { Users } from "../models/users.js";
import {
  addUsers,
  deleteUser,
  findById,
  getAllUsers,
} from "../controllers/users.js";

const router = express.Router();

router.post("/add", addUsers);

router.get("/all", getAllUsers);

router.get("/findById", findById);

router.delete("/deleteUserById", deleteUser);
export default router;
