import Orders from "@/app/components/Orders";
import { getDeliveredOrders } from "@/app/actions/order";

const page = async () => {
  const orders = await getDeliveredOrders();
  return <Orders orders={orders} />;
};

export default page;
