// backend/src/controllers/streak.controller.js
import User from '../models/User.js';

export const updateStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Authenticated user from JWT

    if (!user) return res.status(404).json({ message: 'User not found' });

    const today = new Date().toISOString().split('T')[0];
    const last = user.lastCompleted?.toISOString().split('T')[0];

    if (last === today) {
      return res.status(400).json({ message: 'Challenge already completed today.' });
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (last === yesterday) {
      user.streakCount = (user.streakCount || 0) + 1;
    } else {
      user.streakCount = 1;
    }

    user.lastCompleted = new Date();
    await user.save();

    res.json({ streakCount: user.streakCount, lastCompleted: user.lastCompleted });
  } catch (error) {
    console.error("Update Streak Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};
