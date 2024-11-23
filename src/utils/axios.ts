import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const authStore = useAuthStore.getState();
      try {
        await authStore.refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        authStore.logout();
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
