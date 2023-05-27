import * as dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    // verify
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) {
        return res.status(400).json({ error: `${err}` });
      }

      try {
        const foundUser = await User.findOne({ email: payload.email });

        req.user = foundUser;
        next();
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    return res.status(403).json({ error: "Forbidden!" });
  }
};
