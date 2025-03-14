import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/auth"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const Port = 5050;

app.use("/auth",auth)
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
