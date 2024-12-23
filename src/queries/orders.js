import { Order } from "@/model/order";

export async function createOrder(order) {
  try {
    await Order.create(order);
  } catch (e) {
    throw new Error(e);
  }
}

export async function getOrders() {
  try {
    const orders = await Order.find({});
    return orders;
  } catch (e) {
    throw new Error(e);
  }
}
