import styles from "./Product.module.css";
import type { Item } from "../types/Items.types";
import { useCartStore } from "../zustand/use-cart-store";
import { useState } from "react";
import { useUserDataStore } from "../zustand/use-user-data";
import axios from "axios";

interface ProductProps {
  product: Item;
}

export default function Product({ product }: ProductProps) {
  const [loading, setLoading] = useState(false);

  const { userData } = useUserDataStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const token = localStorage.getItem("token");

  async function handleAddToCart(product_id: string, user_id: string | null) {
    if (!token) {
      alert("Please log in to add products to your cart.");
      return;
    }

    if (!user_id) {
      alert("User not found");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/products/addProductToCart", {
        product_id,
        user_id,
      });

      addToCart();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(false);
    }
  }

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
        onClick={() => handleAddToCart(product.id, userData?.id || null)}
        type="button"
        className={styles.buy}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
