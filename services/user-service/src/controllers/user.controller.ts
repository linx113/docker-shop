import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async getProfile(req: Request, res: Response) {
    try {
      const user = await userService.getProfile();
      res.status(200).json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateRole(req: Request, res: Response) {
    const user_id: any = req.params.id;
    const { role } = req.body;

    if (!user_id || !role) {
      return res.status(400).json({ message: "user_id and role required" });
    }

    try {
      const updatedUser = await userService.updateRole(user_id, role);
      res.status(200).json(updatedUser);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
