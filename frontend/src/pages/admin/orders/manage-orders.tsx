import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./manage-orders.module.css";

export default function ManageOrders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const { data } = await axios.get("/api/orders/getAllOrders");
      return data;
    },
  });

  if (isLoading) {
    return (
      <>
        <h1>Manage Orders</h1>
        <p>Loading orders...</p>
      </>
    );
  }

  if (error instanceof Error) {
    return (
      <>
        <h1>Manage Orders</h1>
        <p>Error loading orders: {error.message}</p>
      </>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Manage Orders</h1>

        {orders.length === 0 ? (
          <p className={styles.empty}>No orders found.</p>
        ) : (
          <div className={styles.list}>
            {orders.map((order: any) => (
              <div key={order.id} className={styles.card}>
                <div className={styles.row}>
                  <p className={styles.text}>Order ID: {order.id}</p>

                  <span className={`${styles.status} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <p className={styles.text}>
                  Created: {new Date(order.created_at).toLocaleString()}
                </p>

                <div>
                  <p className={styles.text}>Items:</p>

                  <div className={styles.items}>
                    {order.items.map((item: any, index: number) => (
                      <span key={index}>
                        Product #{item.product_id} × {item.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
