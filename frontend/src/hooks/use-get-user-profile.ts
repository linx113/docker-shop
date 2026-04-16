import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export default function useGetUserProfile() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await axios.get("/api/user/getProfile");
      if (response.status === 200) {
        navigate("/");
        return response.data;
      } else {
        navigate("/login");
      }
    },
  });
  return { data, isLoading, error };
}
