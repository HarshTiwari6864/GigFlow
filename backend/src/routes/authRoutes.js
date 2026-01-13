import express from "express";
import { register, login,logout,checkAuth,me } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/me", authMiddleware, me);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", checkAuth);

export default router;
