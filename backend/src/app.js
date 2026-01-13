import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

/**
 * ✅ SAFE CORS CONFIG (Render + Vercel)
 */
const allowedOrigins = [
  process.env.CLIENT_URL,           // prod frontend
  "http://localhost:5173",           // local dev
  "http://localhost:3000"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server, curl, postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("❌ Blocked by CORS:", origin);
      return callback(null, false);
    },
    credentials: true
  })
);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/profile", profileRoutes);

// STATIC UPLOADS
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("GigFlow API running");
});

export default app;
