import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import { connectDB } from "./lib/db_conn.js";
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
