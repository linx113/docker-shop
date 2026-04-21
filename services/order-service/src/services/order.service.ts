import { publishOrderCreated } from "../rabbit";
import { createSupabaseClient } from "../db/server";

const supabase = createSupabaseClient();

interface OrderItem {
  product_id: string;
  quantity: number;
}

export class OrderService {
  async getAllOrders() {
    const { data: orders, error } = await supabase.from("orders").select(
      `
        id,
        created_at,
        status,
        items:order_items (
          product_id,
          quantity
        )
      `,
    );

    if (error) {
      throw new Error(error.message || "Failed to fetch orders");
    }
    return (
      orders?.map((order) => ({
        id: order.id,
        created_at: order.created_at,
        status: order.status, 

        items:
          order.items?.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
          })) || [],
      })) || []
    );
  }

  async getOrdersByUserId(user_id: string) {
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        created_at,
        status,
        items:order_items (
          product_id,
          quantity
        )
      `,
      )
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error.message || "Failed to fetch orders");
    }

    return (
      orders?.map((order) => ({
        id: order.id,
        created_at: order.created_at,
        status: order.status,
        items:
          order.items?.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
          })) || [],
      })) || []
    );
  }

  async createOrder({
    user_id,
    items,
  }: {
    user_id: string;
    items: OrderItem[];
  }) {
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (orderError || !order) {
      throw new Error(orderError?.message || "Failed to create order");
    }

    const orderItemsPayload = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsPayload);

    if (itemsError) {
      throw new Error(itemsError.message || "Failed to create order items");
    }

    publishOrderCreated({
      event: "order.created",
      orderId: order.id,
      status: "pending",
    });

    return {
      ...order,
      items,
    };
  }
}
