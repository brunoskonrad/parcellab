import type { Checkpoint, DeliveryStatus } from "../../orders/OrderModel";
import type { CheckpointCSVEntry } from "../types";

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
