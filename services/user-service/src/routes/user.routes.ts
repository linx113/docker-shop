import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("/getProfile", (req, res) => userController.getProfile(req, res));

export default router;
