import styles from "./Cart.module.css";
import ProductCart from "../../components/ProductCart";
import { useUserDataStore } from "../../zustand/use-user-data";
import { useGetCart } from "../../hooks/use-get-cart";
import type { Item } from "../../types/Items.types";
import { useState } from "react";
import axios from "axios";

export default function Cart() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const { userData } = useUserDataStore();
  const {
    data: cartItems,
    isLoading,
    error,
  } = useGetCart(userData?.id || null);

  async function handleCheckout() {
    try {
      setCheckoutLoading(true);
      setCheckoutError(null);
      if (!userData) {
        alert("Please log in to proceed with checkout.");
        return;
      }

      const response = await axios.post("/api/orders/createOrder", {
        user_id: userData.id,
        items:
          cartItems?.map((item: Item) => ({
            product_id: item.id,
            quantity: 1,
          })) || [],
      });

      alert("Order created successfully!");
      console.log("Order: ", response.data);
    } catch (err) {
      console.error("Checkout error:", err);
      setCheckoutError("An error occurred during checkout. Please try again.");
    } finally {
      setCheckoutLoading(false);
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
      <>
        <h1 className={styles.title}>Shopping Cart</h1>
        <div className={styles.content}>
          {cartItems && cartItems.length > 0 ? (
            <>
              <div className={styles.items}>
                {cartItems.map((item: Item) => (
                  <ProductCart
                    key={item.id}
                    product={item}
                    userData={userData}
                  />
                ))}
              </div>

              <div className={styles.sidebar}>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className={styles.checkoutButton}
                >
                  {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
                </button>

                {checkoutError && (
                  <p className={styles.error}>{checkoutError}</p>
                )}
              </div>
            </>
          ) : (
            <p className={styles.empty}>Your cart is empty.</p>
          )}
        </div>
      </>
    </>
  );
}
