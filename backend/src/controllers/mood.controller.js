import User from '../models/User.js';

export const getMoodHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user || !user.moods || user.moods.length === 0) {
      return res.status(404).json({ moods: [] });
    }
    // Sort moods by date ascending
    const sortedMoods = user.moods.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json({ moods: sortedMoods });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const submitMood = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { value } = req.body;
    if (!value || typeof value !== 'number') {
      return res.status(400).json({ error: 'Mood value is required and must be a number.' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    user.moods.push({ value, date: new Date() });
    await user.save();
    res.json({ success: true, mood: { value, date: new Date() } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 