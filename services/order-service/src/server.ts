import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/order.routes";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/orders", orderRoutes);

// Order PORT from environment variable or default to 5004
const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
