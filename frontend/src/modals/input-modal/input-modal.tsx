import styles from "./input-modal.module.css";
import { createPortal } from "react-dom";
import { useInputStore } from "../../zustand/use-input-store";
import { X } from "lucide-react";

export default function InputModal() {
  const { isInput, setIsInput } = useInputStore();

  if (!isInput) return null;

  return createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.wrapper}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => setIsInput(false)}
        >
          <X size={25} />
        </button>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter something..."
        />
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement,
  );
}
