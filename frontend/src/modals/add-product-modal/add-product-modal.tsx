import globalModalStyles from "../input-modal/input-modal.module.css";
import styles from "./add-product-modal.module.css";
import { createPortal } from "react-dom";
import { useAddProduct } from "../../zustand/use-add-product";
import { X } from "lucide-react";

export default function AddProductModal() {
  const { isAdding, setIsAdding } = useAddProduct();

  if (!isAdding) return null;

  return createPortal(
    <>
      <div className={globalModalStyles.overlay}></div>
      <div className={globalModalStyles.wrapper}>
        <button
          className={globalModalStyles.closeButton}
          type="button"
          onClick={() => setIsAdding(false)}
        >
          <X size={25} />
        </button>
        <form className={styles.form}>
          <h2>Add New Product</h2>
          <section className={styles.section_row}>
            <div>
              <label htmlFor="title">Product Title</label>
              <input
                id="title"
                type="text"
                placeholder="Enter product title like 'Wireless Headphones'"
              />
            </div>
            <div>
              <label htmlFor="price">Price ($)</label>
              <input
                id="price"
                type="number"
                placeholder="Enter product price like 19.99$"
              />
            </div>
          </section>
          <section className={styles.section}>
            <label htmlFor="description">Description</label>
            <textarea
              className={styles.textarea}
              id="description"
              placeholder="Enter product description like 'High-quality wireless headphones with noise cancellation and long battery life.'"
            ></textarea>
          </section>
          <section className={styles.section}>
            <label htmlFor="catalogue">Catalogue</label>
            <select name="catalogue" id="catalogue">
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
            </select>
          </section>
          <section>
            <label htmlFor="image">Product Image</label>
            <input id="image" type="file" accept="image/*" />
          </section>
          <button className={styles.submit} type="submit">
            Add Product
          </button>
        </form>
      </div>
    </>,
    document.getElementById("add-root") as HTMLElement,
  );
}
