import type { CheckpointCSVEntry } from "../types";
import { parseCheckpointsCSVToCheckpoint } from "./parseCheckpoints";

describe("features/import/lib/parseCheckpoints", () => {
  describe("parseCheckpointsCSVToCheckpoint", () => {
    it("returns empty array when no checkpoints provided", () => {
      expect(parseCheckpointsCSVToCheckpoint([])).toStrictEqual([]);
    });

    it("returns parsed Checkpoints", () => {
      const fixture: CheckpointCSVEntry = {
        tracking_number: "1234",
        location: "Jest",
        status: "Status",
        status_details: "Details",
        status_text: "Text",
        timestamp: new Date().toISOString(),
      };

      expect(parseCheckpointsCSVToCheckpoint([fixture])).toStrictEqual([
        {
          trackingNumber: "1234",
          location: "Jest",
          status: "Status",
          statusDetails: "Details",
          statusText: "Text",
          timestamp: expect.any(Date),
        },
      ]);
    });
  });
});
