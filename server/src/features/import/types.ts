export type TrackingCSV = {
  orderNo: string;
  tracking_number: string;
  courier: string;
  street: string;
  zip_code: number;
  city: string;
  destination_country_iso3: string;
  email: string;
  articleNo?: string;
  articleImageUrl?: string;
  quantity?: number;
  product_name?: string;
};

export type CheckpointCSVEntry = {
  tracking_number: string;
  location: string;
  timestamp: string;
  status: string;
  status_text: string;
  status_details: string;
};
