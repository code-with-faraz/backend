import { Router } from "express";
import { check, validationResult } from "express-validator";
import User from "../Models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();


router.post(
  "/signup",
  [
    
    check("name", "Name is required").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("mobile", "Mobile number must be 10 digits").isLength({ min: 10, max: 10 }).isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, mobile } = req.body;

    try {
      const found = await User.findOne({ email });
      if (found) {
        return res.status(400).json({ error: "Email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ name, email, password: hashedPassword, mobile });

      await user.save();
      res.json({ success: "Account created" });
    } catch (error) {
      res.status(500).json({ error: "Server error occurred" });
    }
  }
);


router.post(
  "/login",
  [
    
    check("email", "Invalid email").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const found = await User.findOne({ email });
      if (!found) {
        return res.status(400).json({ error: "This account does not exist" });
      }

      const match = await bcrypt.compare(password, found.password);
      if (match) {
        const token = jwt.sign({ id: found._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({
          token,
          uid: found._id,
          email: found.email,
          name: found.name,
          mobile: found.mobile,
        });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login error" });
    }
  }
);

export default router;
