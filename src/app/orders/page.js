import Orders from "../components/Orders";
import { getOrders } from "@/app/actions/order";

const page = async () => {
  const orders = await getOrders();
  return <Orders orders={orders} />;
};

export default page;
