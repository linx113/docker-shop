import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { CircleX } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../zod/auth";
import type { SignUpData } from "../zod/auth";

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  function handleSignUp(data: SignUpData) {
    console.log(data);
    // API call to sign up the user would go here
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className={styles.form}>
      <div className={styles.head}>
        <h1>Sign Up</h1>
        <button className={styles.close} type="button">
          <CircleX onClick={() => navigate("/")} size={25} />
        </button>
      </div>
      <section className={styles.section}>
        <label htmlFor="name">
          {errors.name ? (
            <span className={styles.error}>{errors.name.message}</span>
          ) : (
            "Name"
          )}
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          required
        />
      </section>
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
        Sign Up
      </button>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  );
}
