import styles from "./Product.module.css";
import type { Item } from "../types/Items.types";

interface ProductProps {
  product: Item;
}

export default function Product({ product }: ProductProps) {
  return (
    <div className={styles.card}>
      <img src={product.image_url} alt={product.title} />

      <h3>{product.title}</h3>
      <p>Catalog - {product.catalogue}</p>
      <span className={styles.price}>
        {product.price}
        <strong>$</strong>
      </span>
      <button type="button" className={styles.buy}>
        Add to Cart
      </button>
    </div>
  );
}
