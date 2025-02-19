import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from './model/user'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const Port = 5050;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

// Define Schema
const formSchema = new mongoose.Schema({
  Step1: { name: { type: String, required: true } },
  Step2: { details: { type: String, required: true } },
  Step3: { type: { type: String, required: true } }, 
  Step4: { industry: { type: String, required: true } },
  Step5: { loan: { type: String, required: true } },
  Step6: {
    "Rented Building": { type: Number, default: 0 },
    Salary: { type: Number, default: 0 },
    "Purchase of consumables/ spare parts": { type: Number, default: 0 },
    "Stationary expenses": { type: Number, default: 0 },
    "Electricity/water expense": { type: Number, default: 0 },
    "Repair and maintenance charges": { type: Number, default: 0 },
    "Transportation cost": { type: Number, default: 0 },
    "Telephone/postal & internet charge": { type: Number, default: 0 },
    "Marketing & advertising cost": { type: Number, default: 0 },
  },
  Step7: { business: { type: String, required: true } },
  Step8: {
    Land: { type: Number, default: 0 },
    "Shed/building": { type: Number, default: 0 },
    Machinery: { type: Number, default: 0 },
    "Computers/printers/photocopier/other electronic gadgets,etc.": { type: Number, default: 0 },
    "Furniture & fixtures": { type: Number, default: 0 },
    "Electrification & electricity backup": { type: Number, default: 0 },
    "Racks & storage": { type: Number, default: 0 },
    Vehicle: { type: Number, default: 0 },
    "Other initial expenditure": { type: Number, default: 0 },
    "Software purchase": { type: Number, default: 0 },
  },
  Step9: {
    education: { type: String, required: true },
    year: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    society: { type: String, required: true },
  },
  Step10: {
    locality: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    registration: { type: String, required: true },
  },
});

const FormModel = mongoose.model("Form", formSchema);

// Save form data endpoint
app.post("/save-form", async (req, res) => {
  try {
    const newForm = new FormModel(req.body);
    await newForm.save();
    res.json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Error saving form data" });
  }
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  try {
    const found = await User.findOne({ email });
    if (found) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.json({ success: "Account created" });
  } catch (error) {
    res.status(500).json({ error: "Error occurred" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const found = await User.findOne({ email }); 
    if (!found) {
      return res.status(400).json({ error: "This account does not exist" });
    }

    const match = await bcrypt.compare(password, found.password);
    if (match) {
      const token = jwt.sign({ id: found._id }, process.env.JWT_SECRET);
      res.json({ token, uid: found._id });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login error" });
  }
});

// Start Server
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
