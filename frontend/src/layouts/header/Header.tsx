import { useNavigate } from "react-router-dom";
import { LayoutGrid, User, ShoppingCart } from "lucide-react";
import styles from "./Header.module.css";
import { useCartStore } from "../../zustand/use-cart-store";
export default function Header() {
  const navigate = useNavigate();
  const { items } = useCartStore();
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <span className={styles.logo} onClick={() => navigate("/")}>
            Docker Shop
          </span>
          <button className={styles.button} type="button">
            <LayoutGrid size={20} />
            Catalogue
          </button>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li className={styles.button} onClick={() => navigate("/cart")}>
              <ShoppingCart size={20} />
              {items > 0 && <span className={styles.cartCount}>{items}</span>}
            </li>
            <li className={styles.button} onClick={() => navigate("/login")}>
              <User size={20} />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
