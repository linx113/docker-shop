import { useLanguageStore } from "../../zustand/use-language-store";
import { useNavigate } from "react-router-dom";
import { Languages, LayoutGrid, User, ShoppingCart } from "lucide-react";
import LanguageDrop from "../../drop-down/language-drop";
import styles from "./Header.module.css";
import { useCartStore } from "../../zustand/use-cart-store";
export default function Header() {
  const navigate = useNavigate();
  const { isLanguage, setIsLanguage } = useLanguageStore();
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
            <li
              className={isLanguage ? styles.buttonActive : styles.button}
              onClick={() => setIsLanguage(!isLanguage)}
            >
              <Languages size={20} />
              {isLanguage && <LanguageDrop />}
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
