import express from 'express';
import User from '../models/User.js';
import  { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/complete', authenticateUser, async (req, res) => {
  const userId = req.user._id;
  const { date } = req.body; // e.g., "2025-07-04"

  if (!date) return res.status(400).json({ message: "Date is required" });

  try {
    const user = await User.findById(userId);

    user.completedChallenges.set(date, true);
    await user.save();

    res.status(200).json({ message: 'Challenge marked as complete', date });
  } catch (err) {
    console.error("Error completing challenge:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/completed', authenticateUser, async (req, res) => {
  const userId = req.user._id;
  const { month } = req.query; // "2025-07"

  if (!month) return res.status(400).json({ message: "Month is required" });

  try {
    const user = await User.findById(userId);
    const allDates = Array.from(user.completedChallenges.keys());

    const filteredDates = allDates.filter(date => date.startsWith(month));
    res.status(200).json(filteredDates);
  } catch (err) {
    console.error("Error fetching completed challenges:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;