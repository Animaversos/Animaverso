import { create } from "zustand";
import { persist } from "zustand/middleware";

const userUserStore = create(
  persist(
    (set) => ({
      user: {},
      setUser: (user) => set({ user: user }),
      delUser: () => {
        set({ user: {} });
        localStorage.removeItem("user-storage");
      },
    }),
    { name: "user-storage" }
  )
);

export default userUserStore;
