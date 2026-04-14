import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export default function useGetUserProfile() {
  const { data, isLoading, error } = useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await axios.get("/api/user/getProfile");
      return response.data;
    },
  });
  return { data, isLoading, error };
}
