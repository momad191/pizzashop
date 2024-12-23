import Orders from "../components/Orders";
import { getAllOrders } from "@/app/actions/order";

const page = async () => {
  const orders = await getAllOrders();
  return <Orders orders={orders} />;
};

export default page;
