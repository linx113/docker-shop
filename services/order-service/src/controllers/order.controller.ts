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

  async getUserOrders(req: Request, res: Response) {
    const { user_id } = req.query;

    if (!user_id || typeof user_id !== "string") {
      return res
        .status(400)
        .json({ message: "user_id query parameter is required" });
    }

    try {
      const orders = await orderService.getOrdersByUserId(user_id);
      res.json(orders);
    } catch (err: any) {
      console.error("Error in getOrders controller:", err);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (err: any) {
      console.error("Error in getAllOrders controller:", err);
      res.status(500).json({ message: "Failed to fetch all orders" });
    }
  }
}
