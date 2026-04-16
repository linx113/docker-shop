import Header from "../../layouts/header/Header";
import { useGetProducts } from "../../hooks/use-get-products";
import styles from "./Home.module.css";
import Product from "../../components/Product";
import type { Item } from "../../types/Items.types";

export default function Home() {
  const { data, isLoading, error } = useGetProducts();

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching products.</div>;
  }

  return (
    <main className={styles.homeContainer}>
      <Header />
      <article className={styles.intro}>
        <h1>Shop</h1>
        <p>
          Welcome to the Docker Shop! Explore our collection of Docker images
          and containers.
        </p>
      </article>
      <div className={styles.productsContainer}>
        {data && data.length > 0 ? (
          data.map((product: Item) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </main>
  );
}
