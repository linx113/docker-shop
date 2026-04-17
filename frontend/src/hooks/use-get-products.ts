import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Item } from "../types/Items.types";

export function useGetProducts() {
  return useQuery<Item[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/api/products/getProducts");

      return res.data;
    },
  });
}
