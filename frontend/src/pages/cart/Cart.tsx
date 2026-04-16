import styles from "./Cart.module.css";
import { Trash } from "lucide-react";
import ProductCart from "../../components/ProductCart";
import { useUserDataStore } from "../../zustand/use-user-data";
import { useGetCart } from "../../hooks/use-get-cart";
import type { Item } from "../../types/Items.types";
import axios from "axios";

export default function Cart() {
  const { userData } = useUserDataStore();
  const {
    data: cartItems,
    isLoading,
    error,
  } = useGetCart(userData?.id || null);

  async function handleClearCart() {
    try {
      const res = await axios.delete("/api/products/clearCart", {
        data: {
          userId: userData?.id,
        },
      });
      if (res.status === 200) {
        alert("Cart cleared successfully!");
        window.location.reload();
      }
    } catch (err: any) {
      console.error("Error clearing cart:", err);
      alert("Failed to clear cart: " + err.message);
    }
  }

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <h1>Shopping Cart</h1>
        <p>Loading cart items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <h1>Shopping Cart</h1>
        <p>Error loading cart items: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Shopping Cart</h1>
        {cartItems && cartItems.length > 0 ? (
          <div className={styles.items}>
            {cartItems.map((item: Item) => (
              <ProductCart key={item.id} product={item} userData={userData} />
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div>
          <button
            className={styles.clearButton}
            type="button"
            onClick={handleClearCart}
          >
            <Trash />
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
}
