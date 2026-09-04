import { create } from "zustand";

type UserStore = {
  lastCreatedEmail: string | null;
  setLastCreatedEmail: (email: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  lastCreatedEmail: null,
  setLastCreatedEmail: (email) => set({ lastCreatedEmail: email }),
}));