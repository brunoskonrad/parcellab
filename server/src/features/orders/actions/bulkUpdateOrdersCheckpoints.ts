import { Checkpoint, OrderModel } from "../OrderModel";

export async function bulkUpdatOrdersCheckpoints(groupedCheckpoints: {
  [key: string]: Checkpoint[];
}) {
  const trackingNumbers = Object.keys(groupedCheckpoints);

  const queryCursor = OrderModel.find({
    trackingNumber: { $in: trackingNumbers },
  }).cursor();

  for await (const order of queryCursor) {
    const checkpoints = groupedCheckpoints[order.trackingNumber];

    await order
      .set({
        checkpoints,
      })
      .save();
  }
}
