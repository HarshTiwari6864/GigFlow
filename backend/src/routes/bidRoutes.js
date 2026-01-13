import express from "express";
import { createBid, getBidsByGig } from "../controllers/bidController.js";
import { hireBid } from "../controllers/hireController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBid);
router.get("/:gigId", authMiddleware, getBidsByGig);
router.patch("/:bidId/hire", authMiddleware, hireBid);

export default router;
