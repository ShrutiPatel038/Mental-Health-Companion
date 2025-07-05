// routes/streak.routes.js
import express from 'express';
import { updateStreak } from '../controllers/streak.controller.js';
import {authenticateUser} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/update', authenticateUser, updateStreak);

export default router;

