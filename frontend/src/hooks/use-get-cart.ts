import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCart = (userId: number | null) => {
  return useQuery({
    queryKey: ["cartItems", userId],
    queryFn: async () => {
      const response = await axios.get(
        `/api/products/getCartItems?userId=${userId}`,
      );
      console.log("Cart Items: ", response.data);

      return response.data;
    },
    enabled: !!userId,
  });
};
