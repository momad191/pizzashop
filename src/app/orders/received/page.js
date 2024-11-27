import Orders from "@/app/components/Orders";
import { getReceivedOrders } from "@/app/actions/order";

const page = async () => {
  const orders = await getReceivedOrders();
  return <Orders orders={orders} />;
};

export default page;
