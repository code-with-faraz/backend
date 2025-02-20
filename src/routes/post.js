import { Router } from "express"; // Import Router from express
const router = Router();
import FormModel from "../model/form";

router.post("/save-form", async (req, res) => {
  try {
    const newForm = new FormModel(req.body);
    await newForm.save();
    res.json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Error saving form data" });
  }
})
module.exports = router;