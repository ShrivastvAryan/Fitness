// stores/auth.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      userName: "",
      token: "",

      setAuth: ({ userName, token }) => set({ userName, token }),
      clearAuth: () => set({ userName: "", token: "" }),
    }),
    {
      name: "esports", // localStorage key
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
