import { Link } from "react-router-dom";
import Header from "../../layouts/header/Header";
import InputModal from "../../modals/input-modal/input-modal";

export default function Home({ isAdmin }: { isAdmin: boolean }) {
  return (
    <>
      <Header />
      <InputModal />
      <h1>Docker Shop</h1>
      <p>
        Welcome to the Docker Shop! Explore our collection of Docker images and
        containers.
      </p>
      {isAdmin && (
        <button type="button">
          <Link to="/admin">Go to Admin Dashboard</Link>
        </button>
      )}
    </>
  );
}
