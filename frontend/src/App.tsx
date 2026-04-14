import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";

function App() {
  return (
    <main className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
