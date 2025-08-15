import "dotenv/config";   
import express from "express";

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
import authRoute from "./routes/authRoute.js"
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
