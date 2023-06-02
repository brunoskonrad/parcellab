import mongoose from "mongoose";

export type Order = {
  orderNumber: string;
  trackingNumber: string;
  email: string;
  courier: string;
  address: Address;
  products: Product[];
  checkpoints: Checkpoint[];
};

export type Address = {
  street: string;
  zipCode: string;
  city: string;
  countryIso3: string;
};

export type Product = {
  articleNumber: string;
  name: string;
  imageUrl: string;
  quantity: number;
};

export type DeliveryStatus =
  | "OrderProcessed"
  | "PickUpPlanned"
  | "Upgrade"
  | "InboundScan"
  | "DestinationDeliveryCenter"
  | "Scheduled";

export type Checkpoint = {
  trackingNumber: string;
  location: string;
  timestamp: Date;
  status: DeliveryStatus;
  statusText: string;
  statusDetails: string;
};

const orderSchema = new mongoose.Schema<Order>({
  orderNumber: String,
  trackingNumber: String,
  email: String,
  courier: String,
  address: {
    street: String,
    zipCode: String,
    city: String,
    countryIso3: String,
  },
  products: [
    {
      articleNumber: String,
      name: String,
      imageUrl: String,
      quantity: Number,
    },
  ],
  checkpoints: [
    {
      trackingNumber: String,
      location: String,
      timestamp: Date,
      status: String,
      statusText: String,
      statusDetails: String,
    },
  ],
});

export const OrderModel = mongoose.model<Order>("Order", orderSchema);
