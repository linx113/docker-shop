import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/user.routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/user", authRoutes);

// User PORT from environment variable or default to 5002
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
