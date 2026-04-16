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
}
