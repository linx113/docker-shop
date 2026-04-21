import { createSupabaseClient } from "../db/server";
import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();
import jwt from "jsonwebtoken";

const supabase = createSupabaseClient();

export async function requireAdmin(req: any, res: any, next: any) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const userId = decoded.id;
  const { data: userRow, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !userRow) {
    return res.status(403).json({ message: "User not found" });
  }

  console.log("ROLE FROM DB:", userRow.role);

  if (!["admin", "superadmin"].includes(userRow.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  req.user = {
    id: userId,
    role: userRow.role,
  };

  next();
}

router.get("/getProfile", (req, res) => userController.getProfile(req, res));
router.get("/getAllUsers", (req, res) => userController.getAllUsers(req, res));
router.put("/:id/updateRole", requireAdmin, (req, res) =>
  userController.updateRole(req, res),
);
export default router;
