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
      const { productId, userId } = req.body;

      if (!productId || !userId) {
        return res
          .status(400)
          .json({ message: "Both productId and userId are required" });
      }
      const result = await productService.addProductToCart({
        productId: productId,
        userId: userId,
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
      const { userId } = req.query;
      if (!userId || typeof userId !== "string") {
        return res
          .status(400)
          .json({ message: "userId query parameter is required" });
      }
      const cartItems = await productService.getCartItems(userId);
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
      const { productId, userId } = req.body;
      if (!productId || !userId) {
        return res

          .status(400)
          .json({ message: "Both productId and userId are required" });
      }
      await productService.removeProductFromCart({
        productId: Number(productId),
        userId: userId,
      });
      res.json({ message: "Product removed from cart" });
    } catch (err: any) {
      console.error("Error in removeProductFromCart controller:", err);
      res.status(500).json({ message: err.message });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      await productService.clearCart(userId);
      res.json({ message: "Cart cleared" });
    } catch (err: any) {
      console.error("Error in clearCart controller:", err);
      res.status(500).json({ message: err.message });
    }
  }
  
}
