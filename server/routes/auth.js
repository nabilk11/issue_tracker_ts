import * as dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import { Router } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import auth from "../middleware/auth.js";

const router = Router();

// Create / Register User

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // Add Validation Steps

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "You already have an account!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    const result = await newUser.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Get User
router.get("/user", auth, async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User does not exist!" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // ADD VALIDATIONS

    if (isPasswordCorrect) {
      const { password, id, email, issues, projects } = user._doc;
      const payload = { password, id, email, issues, projects };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });

      const userFound = { ...user._doc };

      return res.status(200).json({
        success: true,
        token,
        userFound,
        // token: "Bearer " + token
      });
    } else {
      return res.status(400).json({ error: "Incorrect Password!" });
    }
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
