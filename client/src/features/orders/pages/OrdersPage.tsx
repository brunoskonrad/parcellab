import { redirect, useLoaderData } from "react-router-dom";
import { GetOrders, getOrders } from "@/lib/api";
import { OrdersList } from "../components/OrdersList";

type OrdersPageData = {
  error?: string;
  orders: GetOrders[];
};

export function OrdersPage() {
  const pageData = useLoaderData() as OrdersPageData;

  return (
    <div>
      <h2>Your Orders</h2>

      <OrdersList orders={pageData.orders} />
    </div>
  );
}

export async function ordersPageLoader() {
  try {
    const response = await getOrders();

    if (response.status === 401) {
      return redirect("/");
    }

    return {
      orders: response.data,
      error: undefined,
    };
  } catch (error) {
    return {
      orders: [],
      error: error.message,
    };
  }
}
