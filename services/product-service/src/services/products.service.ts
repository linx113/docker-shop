import { createSupabaseClient } from "../db/server";
import { redis } from "../redis";
import type { Express } from "express";

type UploadedFile = Express.Multer.File;

const supabase = createSupabaseClient();

interface Product {
  title: string;
  description: string;
  price: number;
  catalogue: "Electronics" | "Clothing" | "Home";
  image: UploadedFile;
}

export class ProductService {
  // <- POST ->

  async addProduct({ title, description, price, catalogue, image }: Product) {
    const fileName = `${Date.now()}-${image.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from("image_item")

      .upload(fileName, image.buffer, {
        contentType: image.mimetype,
      });

    if (uploadError) throw new Error(uploadError.message);

    const { data } = supabase.storage.from("image_item").getPublicUrl(fileName);
    const image_url = data.publicUrl;

    const { data: product, error } = await supabase
      .from("products")
      .insert([
        {
          title,
          description,
          price,
          catalogue,
          image_url,
        },
      ])
      .select()
      .single();

    if (error || !product) {
      console.error("Supabase insert error:", error);
      throw new Error(error?.message || "Product not created");
    }

    redis.del("products"); // Invalidate products cache

    return product;
  }

  async addProductToCart({
    product_id,
    user_id,
  }: {
    product_id: string;
    user_id: string;
  }) {
    if (!user_id) {
      throw new Error("User not authenticated");
    }

    const { data: cartItem, error } = await supabase
      .from("cart")
      .insert([{ product_id, user_id }])
      .select()
      .maybeSingle();

    if (error || !cartItem) {
      console.error("Supabase insert error:", error);
      throw new Error(error?.message || "Cart item not created");
    }

    redis.del(`cart:${user_id}`); // Invalidate cart cache for the user

    return cartItem;
  }

  // <-- GET -->
  async getCartItems(user_id: string) {
    if (!user_id) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("cart")
      .select(
        `
      product:products!cart_productId_fkey (
        *
      )
    `,
      )
      .eq("user_id", user_id);

    if (error) {
      console.error("Supabase select error:", error);
      throw new Error("Failed to fetch cart products");
    }

    redis.set(`cart:${user_id}`, JSON.stringify(data), "EX", 3600); // Cache for 1 hour

    return (data ?? []).map((r) => r.product).filter(Boolean);
  }

  async getProducts() {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Supabase select error:", error);
      throw new Error("Failed to fetch products");
    }

    redis.set("products", JSON.stringify(products), "EX", 3600); // Cache for 1 hour

    return products;
  }

  // <- DELETE ->
  async removeProductFromCart({
    product_id,
    user_id,
  }: {
    product_id: string;
    user_id: string;
  }) {
    if (!user_id) {
      throw new Error("User not authenticated");
    }

    console.log(product_id);
    console.log(user_id);

    const { data, error } = await supabase
      .from("cart")
      .delete()
      .eq("product_id", product_id)
      .eq("user_id", user_id);

    if (error) {
      console.error("Supabase delete error:", error);
      throw new Error("Failed to remove product from cart");
    }

    redis.del(`cart:${user_id}`); // Invalidate cart cache for the user

    return data;
  }
}
