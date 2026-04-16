import styles from "./ProductAdmin.module.css";

import type { Item } from "../types/Items.types";

interface ProductProps {
  product: Item;
}

export default function ProductAdmin({ product }: ProductProps) {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={product.image_url}
        alt={product.title}
      />

      <div className={styles.title}>{product.title}</div>

      <div className={styles.category}>{product.catalogue}</div>

      <div className={styles.price}>
        {product.price}
        <strong>$</strong>
      </div>
    </div>
  );
}
