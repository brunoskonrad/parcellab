import { Link } from "react-router-dom";
import type { GetOrders } from "../../../lib/api";
import { OrderCard } from "./OrderCard";

export type OrdersListProps = {
  orders: GetOrders[];
};

export function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return null;
  }

  return (
    <div>
      {orders.map((order) => (
        <Link key={order.orderNumber} to={`/orders/${order.orderNumber}`}>
          <OrderCard order={order} />
        </Link>
      ))}
    </div>
  );
}
