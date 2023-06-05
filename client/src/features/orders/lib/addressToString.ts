import type { OrderAddress } from "./ordersApi";

export function addressToString(address: OrderAddress): string {
  return `${address.street} ${address.zipCode} ${address.city}`;
}
