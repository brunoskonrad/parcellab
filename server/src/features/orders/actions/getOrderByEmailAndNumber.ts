import { Address, OrderModel, Product } from "../OrderModel";

export async function getOrderByEmailAndNumber(
  email: string | string[] | undefined,
  orderNumber: string
) {
  const result = await OrderModel.aggregate([
    {
      $match: {
        email,
        orderNumber,
      },
    },
    {
      $addFields: {
        checkpoints: {
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
      },
    },
    {
      $project: {
        _id: 0,
        address: 1,
        orderNumber: 1,
        trackingNumber: 1,
        products: {
          $map: {
            input: "$products",
            as: "product",
            in: {
              articleNumber: "$$product.articleNumber",
              name: "$$product.name",
              imageUrl: "$$product.imageUrl",
              quantity: "$$product.quantity",
            },
          },
        },
        checkpoint: {
          $arrayElemAt: [
            {
              $map: {
                input: "$checkpoints",
                as: "checkpoint",
                in: {
                  statusText: "$$checkpoint.statusText",
                  statusDetails: "$$checkpoint.statusDetails",
                },
              },
            },
            0,
          ],
        },
      },
    },
  ]);

  return result as {
    address: Address;
    orderNumber: string;
    trackingNumber: string;
    products: Product;
    checkpoint: {
      statusText: string;
      statusDetails: string;
    };
  }[];
}
