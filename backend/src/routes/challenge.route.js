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
  const userId = req.user?._id;
  const { month } = req.query;

  if (!month) return res.status(400).json({ message: "Month is required" });

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.error("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const completed = user.completedChallenges || new Map();

    // convert Map to plain object if needed
    const allDates = Array.from(completed.keys()).filter(key => typeof key === 'string');

    const filteredDates = allDates.filter(date => date.startsWith(month));

    console.log(`Found ${filteredDates.length} completed dates for month ${month}`);
    res.status(200).json(filteredDates);
  } catch (err) {
    console.error("❌ Error in /completed route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;