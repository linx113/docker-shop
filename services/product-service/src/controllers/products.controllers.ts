import { Request, Response } from "express";
import { ProductService } from "../services/products.service";

const productService = new ProductService();

export class ProductController {
  // <- POST ->
  async addProduct(req: Request, res: Response) {
    try {
      const { title, description, price, catalogue } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "Image file is required" });
      }

      const result = await productService.addProduct({
        title,
        description,
        price: Number(price),
        catalogue,
        image: file,
      });

      res.status(201).json(result);
    } catch (err: any) {
      console.error("Error in addProduct controller:", err);
      res.status(400).json({ message: err.message });
    }
  }

  async addProductToCart(req: Request, res: Response) {
    try {
      const { product_id, user_id } = req.body;

      if (!product_id || !user_id) {
        return res
          .status(400)
          .json({ message: "Both product_id and user_id are required" });
      }
      const result = await productService.addProductToCart({
        product_id: product_id,
        user_id: user_id,
      });
      res.status(200).json(result);
    } catch (err: any) {
      console.error("Error in addProductToCart controller:", err);
      res.status(400).json({ message: err.message });
    }
  }

  // <- GET ->
  async getCartItems(req: Request, res: Response) {
    try {
      const { user_id } = req.query;
      if (!user_id || typeof user_id !== "string") {
        return res
          .status(400)
          .json({ message: "user_id query parameter is required" });
      }
      const cartItems = await productService.getCartItems(user_id);
      res.json(cartItems);
    } catch (err: any) {
      console.error("Error in getCartItems controller:", err);
      res.status(500).json({ message: err.message });
    }
  }

  async getProducts(req: Request, res: Response) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      res.status(500).json({ message: err.message });
    }
  }

  // <- DELETE ->
  async removeProductFromCart(req: Request, res: Response) {
    try {
      const { product_id, user_id } = req.body;
      if (!product_id || !user_id) {
        return res

          .status(400)
          .json({ message: "Both product_id and user_id are required" });
      }
      await productService.removeProductFromCart({
        product_id: product_id,
        user_id: user_id,
      });
      res.json({ message: "Product removed from cart" });
    } catch (err: any) {
      console.error("Error in removeProductFromCart controller:", err);
      res.status(500).json({ message: err.message });
    }
  }
}
