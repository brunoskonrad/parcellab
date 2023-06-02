import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const email = localStorage.getItem("email");

  config.headers["X-Authentication-Email"] = email;

  return config;
});

export function getOrders() {
  return instance.get<GetOrders[]>("/orders");
}

export function getOrder(orderNumber: string) {
  return instance.get<GetOrder>(`/orders/${orderNumber}`);
}

export type GetOrders = {
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

export type GetOrder = {
  orderNumber: string;
  address: OrderAddress;
  trackingNumber: string;
  checkpoint: {
    statusText: string;
    statusDetails: string;
  };
  products: {
    articleNumber: string;
    name: string;
    imageUrl: string;
    quantity: string;
  }[];
};
