import groupBy from "lodash.groupby";
import { Order, Product } from "../../orders/OrderModel";
import type { TrackingCSV } from "../types";

export function parseTrackingsCSVToOrders(trackings: TrackingCSV[]): Order[] {
  const groupped = groupBy(trackings, (tracking) => {
    return tracking.orderNo;
  });

  return Object.values(groupped).map(merge);
}

function merge(trackings: TrackingCSV[]): Order {
  const [firstTracking] = trackings;

  return {
    orderNumber: firstTracking.orderNo,
    trackingNumber: firstTracking.tracking_number,
    courier: firstTracking.courier,
    email: firstTracking.email,
    address: {
      city: firstTracking.city,
      countryIso3: firstTracking.destination_country_iso3,
      zipCode: firstTracking.zip_code.toString(),
      street: firstTracking.street,
    },
    products: mergeProducts(trackings),
    checkpoints: [],
  };
}

export function mergeProducts(trackings: TrackingCSV[]): Product[] {
  return trackings
    .filter(
      (tracking) =>
        tracking.articleNo &&
        tracking.articleImageUrl &&
        tracking.product_name &&
        tracking.quantity
    )
    .map<Product>((tracking) => {
      return {
        articleNumber: tracking.articleNo!,
        imageUrl: tracking.articleImageUrl!,
        name: tracking.product_name!,
        quantity: tracking.quantity!,
      };
    });
}
