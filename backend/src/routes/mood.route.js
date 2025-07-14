import { Router } from "express";
import { getMoodHistory, submitMood } from "../controllers/mood.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/history", authenticateUser, getMoodHistory);
router.post("/submit", authenticateUser, submitMood);

export default router;
