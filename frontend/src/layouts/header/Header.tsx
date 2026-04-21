import { useNavigate } from "react-router-dom";
import { User, ShoppingCart, Carrot, SquareArrowRightExit } from "lucide-react";
import styles from "./Header.module.css";
import { useUserDataStore } from "../../zustand/use-user-data";
import { useGetCart } from "../../hooks/use-get-cart";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const { userData } = useUserDataStore();
  const {
    data: cartItems,
    isLoading,
    error,
  } = useGetCart(userData?.id || null);

  function handleLoginClick() {
    if (userData?.role === "admin" || userData?.role === "superadmin") {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  }

  function handleLogout() {
    try {
      const res = axios.post("/api/auth/logout", {
        user_id: userData?.id,
      });
      console.log(res);

      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }

  if (error) {
    console.error("Error fetching cart items:", error);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <span className={styles.logo} onClick={() => navigate("/")}>
            Docker Shop
          </span>
        </div>
        <nav className={styles.nav}>
          <ul>
            {userData ? (
              <li className={styles.button} onClick={handleLogout}>
                <SquareArrowRightExit size={20} />
              </li>
            ) : null}
            <li className={styles.button} onClick={() => navigate("/orders")}>
              <Carrot size={20} />
            </li>
            <li className={styles.button} onClick={() => navigate("/cart")}>
              {isLoading ? (
                0
              ) : (
                <li>
                  <ShoppingCart size={20} />
                  {cartItems && cartItems.length > 0 && (
                    <span className={styles.cartCount}>{cartItems.length}</span>
                  )}
                </li>
              )}
            </li>
            <li className={styles.button} onClick={handleLoginClick}>
              <User size={20} />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
