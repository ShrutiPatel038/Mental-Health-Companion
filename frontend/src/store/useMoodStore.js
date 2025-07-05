import { create } from 'zustand';

const useMoodStore = create((set) => ({
  mood: JSON.parse(localStorage.getItem('mood')) || null,
  setMood: (mood) => {
    localStorage.setItem('mood', JSON.stringify(mood));
    set({ mood });
  },
}));

export default useMoodStore;
