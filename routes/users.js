import express from "express";
import { Users } from "../models/users.js";
import {
  addUsers,
  deleteUser,
  findById,
  getAllUsers,
  login,
  logout,
  myData,
  register,
} from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

//express.router should always be at the top
const router = express.Router();

router.post("/add", addUsers);

router.get("/all", getAllUsers);

router.get("/findById", findById);

router.delete("/deleteUserById", deleteUser);

// Second part of tutorial

router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);
router.get("/myData", isAuthenticated, myData);

export default router;
