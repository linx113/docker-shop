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
}
