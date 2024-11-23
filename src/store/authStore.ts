import { create } from "zustand";
import axios from "axios";

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,

  login: async (email, password) => {
    // const response = await axios.post("/api/auth/login", {
    //   email,
    //   password,
    // });

    // TODO
    const { accessToken, refreshToken } = {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    set({
      isAuthenticated: true,
      accessToken,
      refreshToken,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
    });
  },

  refreshAccessToken: async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!storedRefreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post("/api/auth/refresh-token", {
      refreshToken: storedRefreshToken,
    });

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },
}));
