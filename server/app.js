import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/auth.js";
import multer from "multer";
import auth from "./middleware/auth.js";

// MONGOOSE DB CONNECTION

import DB_CONNECT from "./config/db.js";

const app = express();
const upload = multer();
app.use(upload.array());

// MIDDLEWARE

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// ROUTES
app.get("/", (req, res) => {
  res.send("Issue Tracker");
});

// AUTH ROUTE
app.get("/protected", auth, (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

app.use("/api", router);

// LISTENER

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await DB_CONNECT();
    console.log(`Issue Tracker is Live on Port: ${PORT}`);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});
