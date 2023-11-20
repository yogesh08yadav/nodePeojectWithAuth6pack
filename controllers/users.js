import { Users } from "../models/users.js";

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
