import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

const orderService = new OrderService();

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const { user_id, items } = req.body;

      if (!user_id || !items || !Array.isArray(items)) {
        return res
          .status(400)
          .json({ message: "user_id and items array are required" });
      }

      const result = await orderService.createOrder({ user_id, items });
      res.status(201).json(result);
    } catch (err: any) {
      console.error("Error in createOrder controller:", err);
      res.status(400).json({ message: err.message });
    }
  }
}
