import styles from "./Product.module.css";
import { Trash } from "lucide-react";
import type { Item } from "../types/Items.types";
import axios from "axios";
import { queryClient } from "../main";

interface ProductProps {
  product: Item;
  userData: {
    id: string;
    username: string;
    email: string;
  } | null;
}

export default function ProductCart({ product, userData }: ProductProps) {
  async function handleRemoveFromCart(product_id: string) {
    try {
      if (!userData?.id) return;

      const res = await axios.delete("/api/products/removeProductFromCart", {
        data: {
          product_id,
          user_id: userData.id,
        },
      });

      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["cartItems", userData.id],
        });
      }
    } catch (err: any) {
      console.error("Error removing product from cart:", err);
    }
  }

  return (
    <div className={styles.card}>
      <img src={product.image_url} alt={product.title} />

      <div className={styles.cardContent}>
        <h3>{product.title}</h3>
        <p>{product.description}</p>

        <div className={styles.price}>${product.price}</div>

        <div className={styles.actions}>
          <button
            onClick={() => handleRemoveFromCart(product.id)}
            className={styles.remove}
          >
            <Trash size={16} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
