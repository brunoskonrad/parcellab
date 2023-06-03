import { Address, OrderModel } from "../OrderModel";

export async function getOrders(email: string | string[] | undefined) {
  const response = await OrderModel.aggregate([
    {
      $match: {
        email,
      },
    },
    {
      $project: {
        address: 1,
        orderNumber: 1,
        latestCheckpoint: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$checkpoints",
                as: "checkpoint",
                cond: {
                  $eq: [
                    "$$checkpoint.timestamp",
                    { $max: "$checkpoints.timestamp" },
                  ],
                },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        address: 1,
        orderNumber: 1,
        deliveryStatusText: "$latestCheckpoint.statusText",
      },
    },
  ]);

  return response as {
    address: Address;
    orderNumber: string;
    deliveryStatusText: string;
  }[];
}
