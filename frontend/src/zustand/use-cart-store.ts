import { create } from "zustand";

interface CartState {
  items: number;
  addToCart: () => void;
  removeFromCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: 0,
  addToCart: () => set((state) => ({ items: state.items + 1 })),
  removeFromCart: () =>
    set((state) => ({ items: Math.max(state.items - 1, 0) })),
}));
