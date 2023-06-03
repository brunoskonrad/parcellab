import { Link } from "react-router-dom";
import { OrderCard } from "./OrderCard";
import type { SimplifiedOrder } from "../lib/ordersApi";

export type OrdersListProps = {
  orders: SimplifiedOrder[];
};

export function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <p>
        <span className="font-bold">404</span>! There are no orders for this
        email address.
      </p>
    );
  }

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.orderNumber} className="mb-4">
          <Link to={`/orders/${order.orderNumber}`}>
            <OrderCard order={order} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
