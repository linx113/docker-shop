import styles from "./language-drop.module.css";

export default function LanguageDrop() {
  return (
    <>
      <div className={styles.drop}>
        <div className={styles.triangle}></div>
        <span>EN</span>
        <span>UA</span>
      </div>
    </>
  );
}
