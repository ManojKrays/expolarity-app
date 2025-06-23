import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,

            setUser: (data) => set({ user: data }),
            updateUser: (updates) =>
                set((state) => ({
                    user: { ...state.user, ...updates },
                })),
            logout: () => set({ user: null }),
        }),
        {
            name: "userDetails",
        },
    ),
);

export default useAuthStore;
