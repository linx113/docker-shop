import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Docker Shop</h1>
      <p>
        Welcome to the Docker Shop! Explore our collection of Docker images and
        containers.
      </p>
      <div className={styles.buttons}>
        <button onClick={() => navigate("/signup")} type="button">
          Sign Up
        </button>
        <button onClick={() => navigate("/login")} type="button">
          Log In
        </button>
      </div>
    </>
  );
}
