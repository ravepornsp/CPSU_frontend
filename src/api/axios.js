import axios from "axios";

const api = axios.create({
  baseURL: "https://vibrant-connection-production.up.railway.app/api/v1",
});

// 👇 สำคัญมาก
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
