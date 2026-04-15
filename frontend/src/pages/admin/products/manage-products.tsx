import styles from "../Admin.module.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAddProduct } from "../../../zustand/use-add-product";
import { Plus } from "lucide-react";
import AddProductModal from "../../../modals/add-product-modal/add-product-modal";

export default function ManageProducts() {
  const navigate = useNavigate();
  const { setIsAdding } = useAddProduct();

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
      <div>{/* Product management content would go here */}</div>
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
