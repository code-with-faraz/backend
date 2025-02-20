import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from './model/user'
import FormModel from "./model/form";
import auth from "./routes/auth"
import post from "./routes/post"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const Port = 5050;

app.use("/auth",auth)
app.use("/form",post)
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

// Save form data endpoint
// app.post();

// Signup Route
// app.post();

// // Login Route
// app.post();

// Start Server
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
