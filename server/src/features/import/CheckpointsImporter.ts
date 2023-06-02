import groupBy from "lodash.groupby";
import { parseCSV } from "../../lib/parseCSV";
import { Checkpoint, DeliveryStatus, OrderModel } from "../orders/OrderModel";

export type CheckpointCSVEntry = {
  tracking_number: string;
  location: string;
  timestamp: string;
  status: string;
  status_text: string;
  status_details: string;
};

export function parseCheckpointsCSVToCheckpoint(
  checkpoints: CheckpointCSVEntry[]
): Checkpoint[] {
  return checkpoints.map<Checkpoint>((checkpoint) => ({
    trackingNumber: checkpoint.tracking_number,
    location: checkpoint.location,
    status: checkpoint.status as DeliveryStatus,
    statusDetails: checkpoint.status_details,
    statusText: checkpoint.status_text,
    timestamp: new Date(checkpoint.timestamp),
  }));
}

export async function importCheckpoints(csv: string): Promise<boolean> {
  const checkpointsCSV = await parseCSV<CheckpointCSVEntry>(csv);
  const parsedCheckpoints = parseCheckpointsCSVToCheckpoint(checkpointsCSV);

  const groupedCheckpoints = groupBy(parsedCheckpoints, (checkpoint) => {
    return checkpoint.trackingNumber;
  });
  const trackingNumbers = Object.keys(groupedCheckpoints);

  const queryCursor = OrderModel.find({
    trackingNumber: { $in: trackingNumbers },
  }).cursor();

  for await (const order of queryCursor) {
    const checkpoints = groupedCheckpoints[order.trackingNumber];

    order
      .set({
        checkpoints,
      })
      .save();
  }

  return true;
}
