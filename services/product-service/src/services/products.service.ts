import { createSupabaseClient } from "../db/server";
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

    return product;
  }

  async addProductToCart({
    productId,
    userId,
  }: {
    productId: number;
    userId: string;
  }) {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data: cartItem, error } = await supabase
      .from("cart")
      .insert([{ productId, userId }])
      .select()
      .maybeSingle();

    if (error || !cartItem) {
      console.error("Supabase insert error:", error);
      throw new Error(error?.message || "Cart item not created");
    }

    return cartItem;
  }

  // <-- GET -->
  async getCartItems(userId: string) {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("cart")
      .select(
        `
    id,
    userId,
    productId,
    products (*)
  `,
      )
      .eq("userId", userId);

    if (error) {
      console.error("Supabase select error:", error);
      throw new Error("Failed to fetch cart items");
    }

    return data;
  }

  async getProducts() {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Supabase select error:", error);
      throw new Error("Failed to fetch products");
    }

    return products;
  }

  // <- DELETE ->
  async removeProductFromCart({
    productId,
    userId,
  }: {
    productId: number;
    userId: string;
  }) {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("cart")
      .delete()
      .eq("id", productId)
      .eq("userId", userId);

    if (error) {
      console.error("Supabase delete error:", error);
      throw new Error("Failed to remove product from cart");
    }
    return data;
  }

  async clearCart(userId: string) {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("cart")
      .delete()
      .eq("userId", userId);

    if (error) {
      console.error("Supabase delete error:", error);
      throw new Error("Failed to clear cart");
    }
    return data;
  }
}
