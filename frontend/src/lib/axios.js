import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5555/api', // Adjust the base URL as needed
  withCredentials: true, // This allows cookies to be sent with requests
});