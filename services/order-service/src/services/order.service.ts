import { publishOrderCreated } from "../rabbit";
import { createSupabaseClient } from "../db/server";

const supabase = createSupabaseClient();

interface OrderItem {
  product_id: string;
  quantity: number;
}

export class OrderService {
  async createOrder({
    user_id,
    items,
  }: {
    user_id: string;
    items: OrderItem[];
  }) {
    
    // 1. create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([{ user_id }])
      .select()
      .single();

    if (orderError || !order) {
      throw new Error(orderError?.message || "Failed to create order");
    }

    // 2. create order items
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
    });

    return {
      ...order,
      items,
    };
  }
}
