import { createSupabaseClient } from "../db/server";

const supabase = createSupabaseClient();

export class UserService {
  async getProfile() {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return user;
  }
}
