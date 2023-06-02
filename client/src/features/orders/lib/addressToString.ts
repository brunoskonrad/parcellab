import type { OrderAddress } from "@/lib/api";

export function addressToString(address: OrderAddress): string {
  return `${address.street} ${address.zipCode} ${address.city}`;
}
