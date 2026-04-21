import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import Admin from "./pages/admin/Admin";
import Orders from "./pages/orders/Orders";
import ManageUsers from "./pages/admin/users/Users";
import ManageProducts from "./pages/admin/products/manage-products";
import ManageOrders from "./pages/admin/orders/manage-orders";
import Cart from "./pages/cart/Cart";
import { useUserDataStore } from "./zustand/use-user-data";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const token = localStorage.getItem("token");
  const { setUserData } = useUserDataStore();

  useEffect(() => {
    if (token) {
      axios
        .get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData({
            id: response.data.id,
            username: response.data.username,
            role: response.data.role,
            email: response.data.email,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
        });
    }
  }, []);

  return (
    <main className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path={"/cart"} element={<Cart />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Routes>
    </main>
  );
}

export default App;
