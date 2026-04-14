import { create } from "zustand";

interface LanguageState {
  isLanguage: boolean;
  setIsLanguage: (value: boolean) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  isLanguage: false,
  setIsLanguage: (value) => set({ isLanguage: value }),
}));
