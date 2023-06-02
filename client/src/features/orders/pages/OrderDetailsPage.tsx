import { GetOrder, getOrder } from "@/lib/api";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";

type OrdersPageData = {
  error?: string;
  order: GetOrder[];
};

export function OrderDetailsPage() {
  const pageData = useLoaderData() as OrdersPageData;

  return <div>Order Detais Page {JSON.stringify(pageData.order, null, 2)}</div>;
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

    if (response.status === 401) {
      return redirect("/");
    }

    return {
      order: response.data,
      error: undefined,
    };
  } catch (error) {
    return {
      order: null,
      error: error.message,
    };
  }
}
