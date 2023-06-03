import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const email = localStorage.getItem("email");

  config.headers["X-Authentication-Email"] = email;

  return config;
});
