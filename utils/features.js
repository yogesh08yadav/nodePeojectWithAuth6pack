import jwt from "jsonwebtoken";

export const sendCookie = (user, res, statusCode, message) => {
  let token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: message,
    });
};
