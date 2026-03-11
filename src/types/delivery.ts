export type DeliveryStatus = "pending" | "assigned" | "in_transit" | "delivered";

export interface Delivery {
  id: string;
  trackingId: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  packageType: string;
  status: DeliveryStatus;
  driverId: string | null;
  driverName: string | null;
  receiverName: string | null;
  createdAt: string;
  updatedAt: string;
  priceTZS: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  status: "available" | "busy" | "offline";
  activeDeliveries: number;
}

export interface DriverProfile extends Driver {
  zone: string;
  vehicle: string;
  rating: number;
  completedToday: number;
}

export interface ReportSummary {
  id: string;
  title: string;
  value: string;
  note: string;
}

export interface DailyReport {
  id: string;
  hub: string;
  delivered: number;
  inTransit: number;
  pending: number;
  revenueTZS: number;
}

export const PACKAGE_TYPES = ["Document", "Parcel", "Food", "Electronics", "Fragile", "Other"] as const;

export const STATUS_LABELS: Record<DeliveryStatus, string> = {
  pending: "Pending",
  assigned: "Assigned",
  in_transit: "In Transit",
  delivered: "Delivered",
};
