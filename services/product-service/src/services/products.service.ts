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

  async getProducts() {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) throw new Error(error.message);

    return products;
  }
}
