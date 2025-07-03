import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000", // change to your backend
    headers: {
      "Content-Type": "application/json",
    },
});

// Optionally add token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `${token}`;
    }
    return config;
  });

export default api;
  