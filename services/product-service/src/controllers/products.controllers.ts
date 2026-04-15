import { Request, Response } from "express";
import { ProductService } from "../services/products.service";

const productService = new ProductService();

export class ProductController {
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

  async getProducts(req: Request, res: Response) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      res.status(500).json({ message: err.message });
    }
  }
}
