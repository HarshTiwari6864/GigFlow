import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import path from "path";
import dotenv from "dotenv";




const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true
// }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow server-to-server
      if (origin === process.env.CLIENT_URL) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/profile", profileRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get("/", (req, res) => {
  res.send("GigFlow API running");
});

export default app;
