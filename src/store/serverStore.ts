import { create } from "zustand";
import axios from "axios";

type ServerState = {
  isInitialized: boolean;
  checkInitialization: () => Promise<void>;
};

export const useServerStore = create<ServerState>((set) => ({
  isInitialized: false,

  checkInitialization: async () => {
    try {
      const response = await axios.get("/api/server-status");
      set({ isInitialized: response.data.isInitialized });
    } catch (error) {
      console.error("Failed to fetch initialization status:", error);
    }
  },
}));
