import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./Users.module.css";
import { queryClient } from "../../../main";

export default function ManageUsers() {
  const token = localStorage.getItem("token");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState("user");

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user/getAllUsers");
      return data;
    },
  });

  async function handleRoleChange(user_id: string) {
    try {
      console.log("Token: ", token);

      const res = await axios.put(
        `/api/user/${user_id}/updateRole`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 200) {
        alert("User role updated successfully");
        queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      }
      setSelectedUserId(null);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }

  if (isLoading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Manage Users</h1>
        <p className={styles.muted}>Loading users...</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Manage Users</h1>
        <p className={styles.error}>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Manage Users</h1>

      {users.length === 0 ? (
        <p className={styles.muted}>No users found.</p>
      ) : (
        <div className={styles.grid}>
          {users.map((user: any) => (
            <div className={styles.card} key={user.id}>
              <div className={styles.cardHeader}>
                <div>
                  <p className={styles.name}>{user.name}</p>
                  <p className={styles.email}>{user.email}</p>
                </div>

                <span className={`${styles.badge} ${styles[user.role]}`}>
                  {user.role}
                </span>
              </div>

              {user.role !== "superadmin" && (
                <button
                  className={styles.btn}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  Change Role
                </button>
              )}

              {user.id === selectedUserId && (
                <div className={styles.panel}>
                  <label className={styles.label}>New Role</label>

                  <select
                    className={styles.select}
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                  <div className={styles.row}>
                    <button
                      className={`${styles.btn} ${styles.primary}`}
                      onClick={() => handleRoleChange(user.id)}
                    >
                      Save
                    </button>

                    <button
                      className={`${styles.btn} ${styles.ghost}`}
                      onClick={() => setSelectedUserId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
