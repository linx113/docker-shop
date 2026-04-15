import styles from "../Admin.module.css";
import { useGetProducts } from "../../../hooks/use-get-products";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAddProduct } from "../../../zustand/use-add-product";
import { Plus } from "lucide-react";
import AddProductModal from "../../../modals/add-product-modal/add-product-modal";
import type { Item } from "../../../types/Items.types";

export default function ManageProducts() {
  const navigate = useNavigate();
  const { setIsAdding } = useAddProduct();
  const { data, isLoading, error } = useGetProducts();

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching products.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h1>Manage Products</h1>
      <button
        onClick={() => navigate("/admin")}
        className={styles.backButton}
        type="button"
      >
        <ArrowLeft />
      </button>
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
      <button
        className={styles.addButton}
        type="button"
        onClick={() => setIsAdding(true)}
      >
        <Plus />
        Add New Product
      </button>
      <AddProductModal />
    </div>
  );
}
