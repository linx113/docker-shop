import { create } from "zustand";

interface UserDataState {
  userData: {
    id: number;
    username: string;
    email: string;
  } | null;
  setUserData: (data: UserDataState["userData"]) => void;
}

export const useUserDataStore = create<UserDataState>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
}));