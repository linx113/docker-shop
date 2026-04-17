import { Router } from "express";
import { ProductController } from "../controllers/products.controllers";

const router = Router();
const productController = new ProductController();

router.post("/addProduct", (req, res) =>
  productController.addProduct(req, res),
);
router.get("/getProducts", (req, res) =>
  productController.getProducts(req, res),
);
router.post("/addProductToCart", (req, res) =>
  productController.addProductToCart(req, res),
);
router.get("/getCartItems", (req, res) =>
  productController.getCartItems(req, res),
);
router.delete("/removeProductFromCart", (req, res) =>
  productController.removeProductFromCart(req, res),
);
export default router;
