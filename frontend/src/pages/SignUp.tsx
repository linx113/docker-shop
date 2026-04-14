import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { CircleX } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <form className={styles.form}>
      <div className={styles.head}>
        <h1>Sign Up</h1>
        <button className={styles.close} type="button">
          <CircleX onClick={() => navigate("/")} size={25} />
        </button>
      </div>
      <section className={styles.section}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          required
        />
      </section>
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
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  );
}
