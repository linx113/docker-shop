import { create } from "zustand";

interface AddProductState {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
}

export const useAddProduct = create<AddProductState>((set) => ({
  isAdding: false,
  setIsAdding: (isAdding) => set({ isAdding }),
}));
