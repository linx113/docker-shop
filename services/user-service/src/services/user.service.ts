import { createSupabaseClient } from "../db/server";

const supabase = createSupabaseClient();

export class UserService {
  async getProfile() {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .maybeSingle();
    if (error) {
      console.error("Supabase select error:", error);
      throw new Error("Failed to fetch user profile");
    }
    return user;
  }

  async getAllUsers() {
    const { data: users, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Supabase select error:", error);
      throw new Error("Failed to fetch users");
    }
    return users;
  }

  async updateRole(user_id: string, newRole: string) {
    const { data: user, error } = await supabase
      .from("users")
      .update({ role: newRole })
      .eq("id", user_id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Supabase update error:", error);
      throw new Error("Failed to update user role");
    }
    return user;
  }
}
