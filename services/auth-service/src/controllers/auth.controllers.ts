import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async logout(req: Request, res: Response) {
    try {
      await authService.logout();
      res.json({ message: "Logged out successfully" });
    } catch (err: any) {
      console.error("Error in logout controller:", err);
      res.status(500).json({ message: "Logout failed" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (err: any) {
      console.error("Error in me controller:", err);
      res.status(401).json({ message: err.message });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const user = await authService.me(token);
      res.json(user);
    } catch (err: any) {
      console.error("Error in me controller:", err);

      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
