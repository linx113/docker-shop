import { useInputStore } from "../../zustand/use-input-store";
import { useLanguageStore } from "../../zustand/use-language-store";
import { useNavigate } from "react-router-dom";
import { Search, Languages, LayoutGrid, User } from "lucide-react";
import LanguageDrop from "../../drop-down/language-drop";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const { isLanguage, setIsLanguage } = useLanguageStore();
  const { setIsInput } = useInputStore();
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
            <li onClick={() => setIsInput(true)} className={styles.button}>
              <Search size={20} />
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
