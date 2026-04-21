import Header from "../../layouts/header/Header";
import { useGetProducts } from "../../hooks/use-get-products";
import styles from "./Home.module.css";
import Product from "../../components/Product";
import type { Item } from "../../types/Items.types";
import { useMemo, useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useGetProducts();
  const [catalogue, setCatalogue] = useState("all");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    if (!data) return [];

    return data.filter((product: Item) => {
      const matchCategory =
        catalogue === "all" || product?.catalogue === catalogue;

      const matchSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [data, catalogue, search]);
  ``;
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

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />

        <select
          value={catalogue}
          onChange={(e) => setCatalogue(e.target.value)}
          className={styles.select}
        >
          <option value="all">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Home">Home</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>

      <div className={styles.productsContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: Item) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </main>
  );
}
