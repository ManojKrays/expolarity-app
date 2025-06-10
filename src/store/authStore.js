import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            authorized: null,

            login: () => set({ authorized: true }),

            logout: () => set({ authorized: null }),
        }),
        {
            name: "userDetails",
        },
    ),
);

export default useAuthStore;
