import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();
const orderController = new OrderController();

router.post("/createOrder", (req, res) =>
  orderController.createOrder(req, res),
);

export default router;
