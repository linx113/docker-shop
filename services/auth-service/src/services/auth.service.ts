import { hashPassword, comparePassword } from "../utils/bcrypt";
import { generateToken, verifyToken } from "../utils/jwt";
import { createSupabaseClient } from "../db/server";

const supabase = createSupabaseClient();

export class AuthService {
  async register(data: { email: string; password: string; name: string }) {
    
    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("email", data.email)
      .maybeSingle();

    if (existing) throw new Error("User already exists");

    const hashed = await hashPassword(data.password);

    const { data: user, error } = await supabase
      .from("users")
      .insert({
        username: data.name,  
        email: data.email,
        password: hashed,
      })
      .select()
      .single();

    if (error || !user) throw new Error("User not created");

    const token = generateToken({ id: user.id, email: user.email });

    return { user, token };
  }

  async login(data: { email: string; password: string }) {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", data.email)
      .single();

    if (error || !user) throw new Error("User not found");

    const isValid = await comparePassword(data.password, user.password);
    if (!isValid) throw new Error("Invalid password");

    const token = generateToken({ id: user.id, email: user.email });

    return { user, token };
  }

  async me(token?: string) {
    if (!token) throw new Error("No token");

    const decoded = verifyToken(token);

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", decoded.id)
      .single();

    if (error || !user) throw new Error("User not found");

    return user;
  }
}
