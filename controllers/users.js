import { json } from "express";
import { Users } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {
  let users = await Users.find({});
  console.log("users", users);
  console.log("req.query", req.query);
  res.json({
    success: true,
    users,
  });
};

export const addUsers = async (req, res) => {
  const { name, email, password } = req.body;
  await Users.create({
    name,
    email,
    password,
  }).catch((err) => console.log("err", err));

  res.json({
    success: true,
    message: "Added Successfully",
  });
};

export const findById = async (req, res) => {
  let { id } = req.body;

  let user = await Users.findById({ _id: id });
  if (!user) {
    res.json({
      success: false,
      message: "User not found",
    });
  } else {
    res.json({
      success: true,
      user,
    });
  }
};

export const deleteUser = async (req, res) => {
  let { id } = req.body;

  await Users.deleteOne({ _id: id })
    .then(() =>
      res.json({
        success: true,
      })
    )
    .catch((err) => console.log(err));
};

//Second part of tutorial

export const register = async (req, res) => {
  let { name, email, password } = req.body;

  let user = await Users.findOne({ email });

  if (user)
    return res.status(404).json({
      success: false,
      message: "User exist",
    });

  let hashedPassword = await bcrypt.hash(password, 10);
  user = await Users.create({ name, email, password: hashedPassword });

  sendCookie(user, res, "201", "User created");
};

export const login = async (req, res) => {
  let { email, password } = req.body;

  let user = await Users.findOne({ email }).select("+password");

  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });

  let match = await bcrypt.compare(password, user.password);
  console.log("match", match);
  if (!match)
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });

  sendCookie(user, res, 200, `Welcome Back ${user.name}`);
};

export const myData = (req, res) => {
  res.status(201).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(201)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
    });
};
