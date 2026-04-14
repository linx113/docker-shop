import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CircleX } from "lucide-react";
import styles from "./Auth.module.css";

export default function LogIn() {
  const navigate = useNavigate();

  return (
    <form className={styles.form}>
      <div className={styles.head}>
        <h1>Log In</h1>
        <button className={styles.close} type="button">
          <CircleX onClick={() => navigate("/")} size={25} />
        </button>
      </div>
      <section className={styles.section}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          required
        />
      </section>
      <section className={styles.section}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          required
        />
      </section>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );
}
