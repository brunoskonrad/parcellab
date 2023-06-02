import { DisplayProperty } from "@/components/DisplayProperty";
import type { GetOrders } from "@/lib/api";
import { addressToString } from "@/features/orders/lib/addressToString";

export function OrderCard({ order }: { order: GetOrders }) {
  return (
    <div>
      <DisplayProperty sectionTitle="Order Number" value={order.orderNumber} />

      <DisplayProperty
        sectionTitle="Current Status"
        value={order.deliveryStatusText}
      />

      <DisplayProperty
        sectionTitle="Delivery Address"
        value={addressToString(order.address)}
      />
    </div>
  );
}
