import { Router } from "express"; // Import Router from express
const router = Router();
// import { JsonWebTokenError } from "jsonwebtoken";
import User from "../model/user"; // Import User model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
router.post("/signup", async (req, res) => {
  const { name, email, password,mobile } = req.body;
  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

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
    res.status(500).json({ error: "Error occurred" });
  }
})

router.post("/login", async (req, res) => {
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
      res.json({ token, uid: found._id ,email:found.email,name:found.name,mobile:found.mobile });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login error" });
  }
})

module.exports = router;