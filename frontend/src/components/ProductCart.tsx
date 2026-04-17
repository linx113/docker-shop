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
  async function handleRemoveFromCart({
    product_id,
    user_id,
  }: {
    product_id: string;
    user_id: string | null;
  }) {
    try {
      const res = await axios.delete("/api/products/removeProductFromCart", {
        data: {
          product_id,
          user_id,
        },
      });
      if (res.status === 200) {
        alert("Product removed from cart successfully!");
        queryClient.invalidateQueries({
          queryKey: ["cart", userData?.id],
        });
      }
    } catch (err: any) {
      console.error("Error removing product from cart:", err);
      alert("Failed to remove product from cart: " + err.message);
    }
  }

  return (
    <div className={styles.card}>
      <img src={product.image_url} alt={product.title} />

      <div>
        <h3>{product.title}</h3>
        <button
          className={styles.remove}
          type="button"
          onClick={() =>
            handleRemoveFromCart({
              product_id: product.id,
              user_id: userData?.id || null,
            })
          }
        >
          <Trash />
          Remove from cart
        </button>
      </div>

      <p>Catalog - {product.catalogue}</p>
      <span className={styles.price}>
        {product.price}
        <strong>$</strong>
      </span>
    </div>
  );
}
