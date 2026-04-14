import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";

const router = Router();
const authController = new AuthController();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.get("/me", (req, res) => authController.me(req, res));

export default router;
