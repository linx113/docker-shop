import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCart = (user_id: string | null) => {
  return useQuery({
    queryKey: ["cartItems", user_id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/products/getCartItems?user_id=${user_id}`,
      );
      return response.data;
    },
    enabled: !!user_id,
  });
};
