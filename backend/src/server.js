import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import chatRoutes from "./routes/chatRoute.js";
import { connectDB } from "./lib/db_conn.js";

const app = express();
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;
const __dirname = path.resolve();

// ✅ Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // safer for deployment
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "HaveATalk API is running",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Serve frontend build
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// ✅ Catch-all for frontend routing (React Router etc.)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
