import styles from "./Admin.module.css";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserDataStore } from "../../zustand/use-user-data";

export default function Admin() {
  const navigate = useNavigate();
  const { userData } = useUserDataStore();

  return (
    <div className={styles.wrapper}>
      <h1>Admin Dashboard</h1>
      <p>
        Welcome to the admin dashboard! Here you can manage your application.
      </p>
      <button
        onClick={() => navigate("/")}
        className={styles.backButton}
        type="button"
      >
        <ArrowLeft />
      </button>
      <div className={styles.links}>
        <Link to="/admin/products">Manage Products</Link>
        <Link to="/admin/orders">Manage Orders</Link>
        {userData?.role === "superadmin" && (
          <Link to="/admin/users">Manage Users</Link>
        )}
      </div>
    </div>
  );
}
