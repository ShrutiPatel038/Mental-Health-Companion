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
  const res = await axios.get(`/daily-challenge?mood=${mood}`);
  return res.data;
};

// Mark a specific date as complete
export const markChallengeComplete = async (date) => {
  const res = await axios.post('/challenge/complete', { date }); // e.g., '2025-07-04'
  return res.data;
};

// Get completed dates for a specific month (e.g., '2025-07')
export const getCompletedChallenges = async (month) => {
  const res = await axios.get(`/challenge/completed?month=${month}`);
  return res.data; // expected: ['2025-07-01', '2025-07-02', ...]
};

