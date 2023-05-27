import express from "express";
import morgan from "morgan";
import cors from "cors";

// MONGOOSE DB CONNECTION

import DB_CONNECT from "./config/db.js";

const app = express();

// MIDDLEWARE

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("Issue Tracker");
});

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
