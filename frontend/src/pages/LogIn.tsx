import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CircleX } from "lucide-react";
import styles from "./Auth.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../zod/auth";
import type { LoginData } from "../zod/auth";

export default function LogIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  function handleLogIn(data: LoginData) {
    console.log(data);
    // API call to log in the user would go here
  }

  return (
    <form onSubmit={handleSubmit(handleLogIn)} className={styles.form}>
      <div className={styles.head}>
        <h1>Log In</h1>
        <button className={styles.close} type="button">
          <CircleX onClick={() => navigate("/")} size={25} />
        </button>
      </div>
      <section className={styles.section}>
        <label htmlFor="email">
          {errors.email ? (
            <span className={styles.error}>{errors.email.message}</span>
          ) : (
            "Email"
          )}
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          required
        />
      </section>
      <section className={styles.section}>
        <label htmlFor="password">
          {errors.password ? (
            <span className={styles.error}>{errors.password.message}</span>
          ) : (
            "Password"
          )}
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          required
        />
      </section>
      <button className={styles.submit} type="submit">
        Log In
      </button>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );
}
