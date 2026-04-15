import { Router } from "express";
import { ProductController } from "../controllers/products.controllers";

const router = Router();
const productController = new ProductController();

router.post("/addProduct", (req, res) => productController.addProduct(req, res));
router.get("/getProducts", (req, res) => productController.getProducts(req, res));

export default router;
