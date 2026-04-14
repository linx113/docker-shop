import Header from "../../layouts/header/Header";
import InputModal from "../../modals/input-modal/input-modal";
import useGetUserProfile from "../../hooks/use-get-user-profile";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { data, isLoading, error } = useGetUserProfile();

  useEffect(() => {
    if (data?.role === "admin") {
      setIsAdmin(true);
    }
  }, [data]);

  return (
    <>
      <Header />
      <InputModal />
      <h1>Docker Shop</h1>
      <p>
        Welcome to the Docker Shop! Explore our collection of Docker images and
        containers.
      </p>
      {isLoading && <p>Loading user profile...</p>}
      {error && <p>Error loading user profile: {error.message}</p>}
      {data && (
        <p>
          Logged in as: {data.username} ({data.role})
        </p>
      )}
      {isAdmin && <p>You have admin privileges.</p>}
    </>
  );
}
