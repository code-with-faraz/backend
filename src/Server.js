import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


import auth from "../Routes/auth"
// import post from "./routes/post"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const Port = 5050;

app.use("/auth",auth)
// app.use("/form",post)
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected!");
});
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});