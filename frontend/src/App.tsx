import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import Admin from "./pages/admin/Admin";
import ManageProducts from "./pages/admin/products/manage-products";
import useGetUserProfile from "./hooks/use-get-user-profile";
import { useEffect, useState } from "react";

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const { data, isLoading, error } = useGetUserProfile();

  useEffect(() => {
    if (data?.role === "admin") {
      setIsAdmin(true);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user profile</div>;
  }

  return (
    <main className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<Home isAdmin={isAdmin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path={isAdmin ? "/admin" : "*"} element={<Admin />} />
        <Route
          path={isAdmin ? "/admin/products" : "*"}
          element={<ManageProducts />}
        />
      </Routes>
    </main>
  );
}

export default App;
