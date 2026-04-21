import { hashPassword, comparePassword } from "../utils/bcrypt";
import { generateToken, verifyToken } from "../utils/jwt";
import { createSupabaseClient } from "../db/server";

const supabase = createSupabaseClient();

export class AuthService {
  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message || "Logout failed");
    }

    return true;
  }
  async register(data: { email: string; password: string; name: string }) {
    const hashed = await hashPassword(data.password);

    const { data: user, error } = await supabase
      .from("users")
      .insert({
        username: data.name,
        email: data.email,
        password: hashed,
      })
      .select()
      .maybeSingle();

    if (error || !user) throw new Error("User not created");
  }

  async login(data: { email: string; password: string }) {
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", data.email)
      .limit(1);

    if (error) {
      console.error("Supabase query error:", error);
      throw new Error("Database error while logging in");
    }

    const user = users?.[0];

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await comparePassword(data.password, user.password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return { token };
  }

  async me(token?: string) {
    if (!token) throw new Error("No token");

    const decoded = verifyToken(token);

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", decoded.id)
      .maybeSingle();

    if (error || !user) throw new Error("User not found");

    return user;
  }
}
