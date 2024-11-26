"use server";
import { Order } from "../../model/order";
import { revalidatePath } from "next/cache";

export async function creatOrder(formData, cart, cartTotal) {
  try {
    console.log({
      formData,
      cart,
      cartTotal,
    });
    const first_name = formData["first_name"];
    const last_name = formData["last_name"];
    const email = formData["email"];
    const phone = formData["phone"];
    const street_name = formData["street_name"];
    const street_no = formData["street_no"];
    const block = formData["block"];
    const floor = formData["floor"];
    const apt_no = formData["apt_no"];
    const mentions = formData["mentions"];
    const cart1 = cart;
    const total = cartTotal;

    const order = {
      first_name,
      last_name,
      email,
      phone,
      street_name,
      street_no,
      block,
      floor,
      apt_no,
      mentions,
      total,
      cart: cart1,
    };

    await Order.create(order);
    return { success: true };
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function getOrders() {
  try {
    const orders = await Order.find();
    // Convert each order into a plain object
    const serializedOrders = orders.map((order) => ({
      ...order.toObject(), // Convert Mongoose Document to plain object
      _id: order._id.toString(), // Convert ObjectId to string
      date: order.date ? order.date.toISOString() : null, // Convert Date to string (if applicable)
    }));

    return serializedOrders;
    revalidatePath("/orders");
  } catch (e) {
    throw new Error(e.message || "Failed to fetch orders");
  }
}
