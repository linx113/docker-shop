import { useQuery } from "@tanstack/react-query";
import { useUserDataStore } from "../../zustand/use-user-data";
import styles from "./Orders.module.css";
import axios from "axios";

type OrderItem = {
  product_id: number;
  quantity: number;
};

type Order = {
  id: number;
  created_at: string;
  items?: OrderItem[];
  status: string;
};

export default function Orders() {
  const { userData } = useUserDataStore();

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery<Order[]>({
    queryKey: ["orders", userData?.id],
    queryFn: async () => {
      const { data } = await axios.get("/api/orders/getOrders", {
        params: { user_id: userData!.id },
      });
      return data;
    },
    enabled: !!userData,
  });

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <h1>Your Orders</h1>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className={styles.wrapper}>
        <h1>Your Orders</h1>
        <p>Error loading orders: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h2>Order ID: {order.id}</h2>
              <p>Created At: {new Date(order.created_at).toLocaleString()}</p>
              <span className={`${styles.status} ${styles[order.status]}`}>
                {order.status}
              </span>

              <h3>Items:</h3>

              {order.items?.length ? (
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      Product ID: {item.product_id}, Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items in this order</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
