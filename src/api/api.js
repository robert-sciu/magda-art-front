import axios from "axios";

const api_url = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: api_url,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
