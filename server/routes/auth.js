import * as dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import { Router } from "express";
import * as bcrypt from "bcrypt";
import { json } from "express";

import { User } from "../models/User.js";

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

// Login User

export default router;
