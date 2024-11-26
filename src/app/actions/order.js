"use server";
import { Order } from "../../model/order";

export async function creatOrder(formData, cart) {
  try {
    console.log({
      formData,
      cart,
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
      cart: cart1,
    };

    await Order.create(order);
    return { success: true };
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}
