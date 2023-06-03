import { parseCSV } from "../../../lib/parseCSV";
import { OrderModel } from "../../orders/OrderModel";
import { parseTrackingsCSVToOrders } from "../lib/parseTrackings";
import type { TrackingCSV } from "../types";

export async function importTracking(csv: string): Promise<boolean> {
  const trackings = await parseCSV<TrackingCSV>(csv);
  const orders = parseTrackingsCSVToOrders(trackings);

  await OrderModel.insertMany(orders);

  return true;
}
