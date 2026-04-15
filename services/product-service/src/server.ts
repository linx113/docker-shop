import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/products.routes";
import cors from "cors";
import multer from "multer";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.use("/products", upload.single("image"), productRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});
