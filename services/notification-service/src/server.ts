import express from "express";
import dotenv from "dotenv";

import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

// app.use("/orders", authRoutes);

// Notification PORT from environment variable or default to 5005
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
