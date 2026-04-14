import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);

// Auth PORT from environment variable or default to 5001
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
