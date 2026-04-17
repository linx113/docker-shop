export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  catalogue: "Electronics" | "Clothing" | "Home";
  image_url: string;
}
