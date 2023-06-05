import { redirect, useLoaderData } from "react-router-dom";
import { OrdersList } from "../components/OrdersList";
import { PageHeading } from "@/components/PageHeading";
import { SimplifiedOrder, getOrders } from "../lib/ordersApi";

type OrdersPageData = {
  error?: string;
  orders: SimplifiedOrder[];
};

export function OrdersPage() {
  const pageData = useLoaderData() as OrdersPageData;

  return (
    <div>
      <PageHeading>Your Orders</PageHeading>

      <OrdersList orders={pageData.orders} />
    </div>
  );
}

export async function ordersPageLoader() {
  try {
    const response = await getOrders();

    return {
      orders: response.data,
      error: undefined,
    };
  } catch (error) {
    if (error.response.status === 401) {
      return redirect("/");
    }

    return {
      orders: [],
      error: error.message,
    };
  }
}
