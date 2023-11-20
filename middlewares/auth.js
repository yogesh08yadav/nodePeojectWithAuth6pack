import { Users } from "../models/users.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  let { token } = req.cookies;
  if (!token)
    return res.status(404).json({
      success: false,
      message: "User not logged in",
    });

  let tokenData = jwt.verify(token, process.env.SECRET_TOKEN);

  req.user = await Users.findById(tokenData._id);
  next();
};
