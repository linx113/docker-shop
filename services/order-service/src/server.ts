import { connectRabbit } from "./rabbit";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/order.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});

connectRabbit({ retries: 20, baseDelayMs: 500 })
  .then(() => console.log("RabbitMQ connected"))
  .catch((err) => {
    console.error("RabbitMQ failed:", err);
  });
