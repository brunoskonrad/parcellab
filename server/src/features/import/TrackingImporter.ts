import { Prisma, PrismaClient } from "@prisma/client";
import groupBy from "lodash.groupby";

import { parseCSV } from "../../lib/parseCSV";
import { Order, OrderModel, Product } from "../orders/OrderModel";

export type TrackingCSV = {
  orderNo: string;
  tracking_number: string;
  courier: string;
  street: string;
  zip_code: number;
  city: string;
  destination_country_iso3: string;
  email: string;
  articleNo?: string;
  articleImageUrl?: string;
  quantity?: number;
  product_name?: string;
};

export async function importTracking(csv: string): Promise<boolean> {
  const trackings = await parseCSV<TrackingCSV>(csv);
  const orders = parseTrackingsCSVToOrders(trackings);

  await OrderModel.insertMany(orders);

  return true;
}

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

function mergeProducts(trackings: TrackingCSV[]): Product[] {
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
