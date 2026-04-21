import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();
const orderController = new OrderController();

router.post("/createOrder", (req, res) =>
  orderController.createOrder(req, res),
);

router.get("/getAllOrders", (req, res) =>
  orderController.getAllOrders(req, res),
);

router.get("/getOrders", (req, res) => orderController.getUserOrders(req, res));

export default router;
