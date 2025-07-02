// src/store/useMoodStore.js
import { create } from 'zustand';

const useMoodStore = create((set) => ({
  mood: null, // null or 1-5
  setMood: (mood) => set({ mood }),
}));

export default useMoodStore;
