import { DisplayProperty } from "@/components/DisplayProperty";

import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { PageHeading } from "@/components/PageHeading";
import { AddressView } from "../components/AddressView";
import { ReturnLink } from "@/components/ReturnLink";
import { NotFoundView } from "@/components/404";
import { ProductView } from "../components/ProductView";
import { OrderDetail, getOrder } from "../lib/ordersApi";

type OrdersPageData = {
  error?: string;
  order: OrderDetail;
};

export function OrderDetailsPage() {
  const pageData = useLoaderData() as OrdersPageData;
  const { order } = pageData;

  if (!order) {
    return <NotFoundView to="/orders" />;
  }

  return (
    <div>
      <ReturnLink to="/orders">Back to orders</ReturnLink>

      <PageHeading>Order Detais Page</PageHeading>

      <DisplayProperty
        className="mb-4"
        sectionTitle="Order Number"
        value={order.orderNumber}
      />

      <AddressView className="col-span-2 mb-4" address={order.address} />

      <DisplayProperty
        className="mb-4"
        sectionTitle="Tracking number"
        value={order.trackingNumber}
        description={order.checkpoint.statusDetails}
      />

      {order.products.length > 0 ? (
        <div>
          <h3 className="font-bold text-lg mb-2">Products</h3>

          <ul>
            {order.products.map((product) => (
              <li key={product.articleNumber}>
                <ProductView
                  className="flex flex-row flex-nowrap items-center mb-4"
                  product={product}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export async function orderDetailPageLoader({ params }: LoaderFunctionArgs) {
  try {
    if (!params["orderNumber"]) {
      return {
        error: "Missing parameter",
        order: null,
      };
    }

    const response = await getOrder(params["orderNumber"]);

    return {
      order: response.data,
      error: undefined,
    };
  } catch (error) {
    if (error.response.status === 401) {
      return redirect("/");
    }

    return {
      order: null,
      error: error.message,
    };
  }
}
