import { axiosInstance } from "@/lib/baseApi";

export function getOrders() {
  return axiosInstance.get<SimplifiedOrder[]>("/orders");
}

export function getOrder(orderNumber: string) {
  return axiosInstance.get<OrderDetail>(`/orders/${orderNumber}`);
}

/**
 * Just the essential information to render orders in a list
 */
export type SimplifiedOrder = {
  orderNumber: string;
  address: OrderAddress;
  deliveryStatusText: string;
};

export type OrderAddress = {
  street: string;
  zipCode: string;
  city: string;
  countryIso3: string;
};

export type OrderProduct = {
  articleNumber: string;
  name: string;
  imageUrl: string;
  quantity: string;
};

export type OrderDetail = {
  orderNumber: string;
  address: OrderAddress;
  trackingNumber: string;
  checkpoint: {
    statusText: string;
    statusDetails: string;
  };
  products: OrderProduct[];
};
