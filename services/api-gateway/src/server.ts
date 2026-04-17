import dotenv from "dotenv";
import express from "express";
import { authProxy, userProxy, productsProxy, notificationProxy, orderProxy } from "./proxy";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use("/api/auth", authProxy);
app.use("/api/user", userProxy);
app.use("/api/products", productsProxy);
app.use("/api/orders", orderProxy);
app.use("/api/notifications", notificationProxy);

app.listen(5000, () => console.log("Gateway running on port 5000"));
