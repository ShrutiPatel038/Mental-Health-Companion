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

