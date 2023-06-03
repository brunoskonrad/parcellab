import groupBy from "lodash.groupby";
import { parseCSV } from "../../../lib/parseCSV";
import { bulkUpdatOrdersCheckpoints } from "../../orders/actions/bulkUpdateOrdersCheckpoints";
import type { CheckpointCSVEntry } from "../types";
import { parseCheckpointsCSVToCheckpoint } from "../lib/parseCheckpoints";

export async function importCheckpoints(csv: string): Promise<boolean> {
  const checkpointsCSV = await parseCSV<CheckpointCSVEntry>(csv);
  const parsedCheckpoints = parseCheckpointsCSVToCheckpoint(checkpointsCSV);

  const groupedCheckpoints = groupBy(parsedCheckpoints, (checkpoint) => {
    return checkpoint.trackingNumber;
  });

  await bulkUpdatOrdersCheckpoints(groupedCheckpoints);

  return true;
}
