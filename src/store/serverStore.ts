import { create } from "zustand";
import axios from "axios";

type ServerState = {
  serverOn: boolean;
  isInitialized: boolean | undefined;
  version: string | undefined;
  checkInitialization: () => Promise<void>;
};

export const useServerStore = create<ServerState>((set) => ({
  serverOn: false,
  isInitialized: undefined,
  version: undefined,

  checkInitialization: async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/server-status"
      );
      if (response.status == 200) {
        set({
          serverOn: true,
          isInitialized: response.data.isInitialized,
          version: response.data.version,
        });
      } else {
        set({
          serverOn: false,
          isInitialized: undefined,
          version: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      set({
        serverOn: false,
        isInitialized: undefined,
        version: undefined,
      });
    }
  },
}));
