import {
  DisplayProperty,
  DisplayPropertyProps,
} from "@/components/DisplayProperty";
import { addressToString } from "../lib/addressToString";
import type { OrderAddress } from "../lib/ordersApi";

type AddressViewProps = Omit<
  DisplayPropertyProps,
  "sectionTitle" | "value" | "description"
> & {
  address: OrderAddress;
};

export function AddressView({ address, ...props }: AddressViewProps) {
  return (
    <DisplayProperty
      {...props}
      sectionTitle="Delivery Address"
      value={addressToString(address)}
    />
  );
}
