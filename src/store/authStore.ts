import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,

      login: async (email, password) => {
        // const { accessToken, refreshToken } = await axios
        //   .post("/api/auth/login", { email, password })
        //   .then((res) => res.data);
        // TODO
        set({
          isAuthenticated: true,
          accessToken: email,
          refreshToken: password,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        });
      },

      refreshAccessToken: async () => {
        const storedRefreshToken = useAuthStore.getState().refreshToken;

        if (!storedRefreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post("/api/auth/refresh-token", {
          refreshToken: storedRefreshToken,
        });

        const { accessToken, refreshToken } = response.data;

        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
