import {axiosInstance} from './axios';

export const signup = async (signupData) => {
    const response = await axiosInstance.post('/auth/signup', signupData);
    return response.data;
}

export const login = async (loginData) => {
    const response = await axiosInstance.post('/auth/login', loginData);
    return response.data;
}

export const logout = async() => {
    const response= await axiosInstance.post('/auth/logout');
    return response.data;
}

export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/me", { withCredentials: true })
  return response.data
}

export const getDailyChallenge = async (mood) => {
  const response = await axiosInstance.post("/gemini", { mood });
  return response.data; // returns { text: "...challenge..." }
};

// Get daily challenge for heatmap (renamed to avoid clash)
export const getDailyChallengeForHeatmap = async (mood) => {
  const res = await axiosInstance.get(`/daily-challenge?mood=${mood}`);
  return res.data;
};

// Mark a specific date as complete
export const markChallengeComplete = async (date) => {
  const res = await axiosInstance.post('/challenge/complete', { date }); // e.g., '2025-07-04'
  return res.data;
};

// Get completed dates for a specific month (e.g., '2025-07')
export const getCompletedChallenges = async (month) => {
  const res = await axiosInstance.get(`/challenge/completed?month=${month}`);
  return res.data; // expected: ['2025-07-01', '2025-07-02', ...]
};

export const getGratitudePrompt = async () => {
  const response = await axiosInstance.post("/gratitude-journal");
  return response.data; // returns { text: "...gratitude prompt..." }
};

export const sendChatMessage = async (messages) => {
  const response = await axiosInstance.post("/chatbot", { messages });
  return response.data; // { reply: "..." }
};

export const fetchNegativeThoughts = async (difficulty = "easy", count = 5) => {
  const response = await axiosInstance.post("/thoughts", {
    thoughtsOnly: true,
    difficulty,
    count,
  });
  return response.data.thoughts;
};

export const evaluateThought = async (originalThought, userAnswer, difficulty = "easy") => {
  const response = await axiosInstance.post("/thoughts", {
    originalThought,
    userAnswer,
    difficulty,
  });
  return response.data;
};

export const sendThoughts = async (difficulty, count) => {
  const res = await axiosInstance.post("/thoughts", { difficulty, count });
  return res.data; // { thoughts: [] }
};

export const getStreak = async () => {
  const res = await axiosInstance.get("/challenge/streak");
  return res.data.streak; // e.g., 5
};

export const submitMood = async (value) => {
  const response = await axiosInstance.post("/mood/submit", { value });
  return response.data;
};


export const getMoodHistory = async () => {
  const response = await axiosInstance.get("/mood/history", { withCredentials: true });
  return response.data.moods;
};

