// routes/streak.routes.js
import express from 'express';
import { updateStreak } from '../controllers/streak.controller.js';
import {authenticateUser} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/update', authenticateUser, updateStreak);

export const getStreak = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId); // assuming Mongoose
    return res.status(200).json({ streak: user.streak || 0 });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to get streak' });
  }
};


export default router;

