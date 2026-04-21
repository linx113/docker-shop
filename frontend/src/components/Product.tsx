import styles from "./Product.module.css";
import type { Item } from "../types/Items.types";
import { useCartStore } from "../zustand/use-cart-store";
import { useUserDataStore } from "../zustand/use-user-data";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";

interface ProductProps {
  product: Item;
}

export default function Product({ product }: ProductProps) {
  const { userData } = useUserDataStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      
      if (!userData?.id) {
        throw new Error("User not found");
      }

      return axios.post("/api/products/addProductToCart", {
        product_id: product.id,
        user_id: userData.id,
      });
    },

    onSuccess: () => {
      addToCart();
      queryClient.invalidateQueries({
        queryKey: ["cartItems", userData?.id],
      });
    },

    onError: (error) => {
      console.error("Error adding product to cart:", error);
    },
  });

  return (
    <div className={styles.card}>
      <img src={product.image_url} alt={product.title} />

      <h3>{product.title}</h3>
      <p>Catalog - {product.catalogue}</p>

      <span className={styles.price}>
        {product.price}
        <strong>$</strong>
      </span>

      <button
        onClick={() => mutate()}
        type="button"
        className={styles.buy}
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
