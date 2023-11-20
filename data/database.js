import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "node_backend",
    })
    .then(() => console.log("DB connected"));
};
