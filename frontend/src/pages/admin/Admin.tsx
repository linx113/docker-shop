import styles from "./Admin.module.css";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

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
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/orders">Manage Orders</Link>   
      </div>
    </div>
  );
}
