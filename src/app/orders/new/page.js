import Orders from "@/app/components/Orders";
import { getNewOrders } from "@/app/actions/order";

const page = async () => {
  const orders = await getNewOrders();
  return <Orders orders={orders} />;
};

export default page;
