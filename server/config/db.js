import mongoose from "mongoose";

// MONGOOSE DB CONNECT

const DB_URL =
  "mongodb+srv://nk11:pizza123@nk-sei.utmze.mongodb.net/?retryWrites=true&w=majority";

// strict query warning
// mongoose.set("strictQuery", true);

const DB_CONNECT = async () =>
  mongoose
    .connect(DB_URL)
    .then(() => console.log(`MongoDB is Connected!`))
    .catch((err) => console.log(`DB Error: ${err}`));

export default DB_CONNECT;
