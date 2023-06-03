import { DisplayProperty } from "@/components/DisplayProperty";
import { AddressView } from "./AddressView";
import type { SimplifiedOrder } from "../lib/ordersApi";

export function OrderCard({ order }: { order: SimplifiedOrder }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 p-2 border-2 border-transparent bg-orange-100 hover:border-2 hover:border-orange-200 rounded shadow-sm">
      <DisplayProperty
        className="mb-2 sm:mb-0"
        sectionTitle="Order Number"
        value={order.orderNumber}
      />

      <DisplayProperty
        className="mb-2 sm:mb-0"
        sectionTitle="Current Status"
        value={order.deliveryStatusText}
      />

      <AddressView className="sm:col-span-2" address={order.address} />
    </div>
  );
}
