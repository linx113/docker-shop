import { Link } from "react-router-dom";
import Header from "../../layouts/header/Header";
import InputModal from "../../modals/input-modal/input-modal";
import { useGetProducts } from "../../hooks/use-get-products";
import styles from "./Home.module.css";
import type { Item } from "../../types/Items.types";

export default function Home({ isAdmin }: { isAdmin: boolean }) {
  const { data, isLoading, error } = useGetProducts();

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching products.</div>;
  }

  return (
    <>
      <Header />
      <InputModal />
      <h1>Docker Shop</h1>
      <p>
        Welcome to the Docker Shop! Explore our collection of Docker images and
        containers.
      </p>
      {isAdmin && (
        <button type="button">
          <Link to="/admin">Go to Admin Dashboard</Link>
        </button>
      )}
      <div>
        {data && data.length > 0 ? (
          <ul className={styles.productList}>
            {data.map((product: Item) => (
              <li key={product.id} className={styles.productItem}>
                <img
                  src={product.image_url}
                  alt={product.title}
                  className={styles.productImage}
                />
                <div className={styles.productDetails}>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>{product.catalogue}</p>
                  <p>${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
}
