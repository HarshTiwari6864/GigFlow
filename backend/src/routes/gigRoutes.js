import express from "express";
import { getGigs, createGig } from "../controllers/gigController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMyProjects ,deleteGig} from "../controllers/gigController.js";


const router = express.Router();

router.get("/", getGigs);
router.post("/", authMiddleware, createGig);
router.get("/my-projects", authMiddleware, getMyProjects);
router.delete("/:id", authMiddleware, deleteGig);



export default router;
