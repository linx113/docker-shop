import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemSchema } from "../../zod/item";
import type { Item } from "../../zod/item";
import styles from "./add-product-modal.module.css";
import { createPortal } from "react-dom";
import { useAddProduct } from "../../zustand/use-add-product";
import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function AddProductModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAdding, setIsAdding } = useAddProduct();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Item>({
    resolver: zodResolver(ItemSchema),
  });
  async function onSubmit(data: Item) {
    console.debug("Form Data:", data);
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("catalogue", data.catalogue);
      if (data.image) {
        formData.append("image", data.image); // File
      }

      const res = await axios.post("/api/products/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setIsAdding(false);
        alert("Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isAdding) return null;

  return createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.wrapper}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => setIsAdding(false)}
        >
          <X size={25} />
        </button>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Add New Product</h2>
          <section className={styles.section_row}>
            <div>
              <label htmlFor="title">
                {errors.title ? (
                  <span className={styles.error}>{errors.title.message}</span>
                ) : (
                  "Product Title"
                )}
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter product title like 'Wireless Headphones'"
                {...register("title")}
              />
            </div>
            <div>
              <label htmlFor="price">
                {errors.price ? (
                  <span className={styles.error}>{errors.price.message}</span>
                ) : (
                  "Product Price"
                )}
              </label>
              <input
                id="price"
                type="number"
                placeholder="Enter product price like 19.99$"
                {...register("price", { valueAsNumber: true })}
              />
            </div>
          </section>
          <section className={styles.section}>
            <label htmlFor="description">
              {errors.description ? (
                <span className={styles.error}>
                  {errors.description.message}
                </span>
              ) : (
                "Product Description"
              )}
            </label>
            <textarea
              className={styles.textarea}
              id="description"
              placeholder="Enter product description like 'High-quality wireless headphones with noise cancellation and long battery life.'"
              {...register("description")}
            ></textarea>
          </section>
          <section className={styles.section}>
            <label htmlFor="catalogue">
              {errors.catalogue ? (
                <span className={styles.error}>{errors.catalogue.message}</span>
              ) : (
                "Product Catalogue"
              )}
            </label>
            <select id="catalogue" {...register("catalogue")}>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
            </select>
          </section>
          <section>
            <label htmlFor="image">
              {errors.image ? (
                <span className={styles.error}>{errors.image.message}</span>
              ) : (
                "Product Image"
              )}
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setValue("image", file!, { shouldValidate: true });
              }}
            />
          </section>
          <button disabled={isLoading} className={styles.submit} type="submit">
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Adding...
              </>
            ) : (
              "Add Product"
            )}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </>,
    document.getElementById("add-root") as HTMLElement,
  );
}
