import { DailyReport, Delivery, Driver, DriverProfile, ReportSummary } from "@/types/delivery";

export const mockDrivers: Driver[] = [
  { id: "d1", name: "Juma Hassan", phone: "+255712345678", status: "available", activeDeliveries: 0 },
  { id: "d2", name: "Amina Salim", phone: "+255713456789", status: "busy", activeDeliveries: 2 },
  { id: "d3", name: "Baraka Mwanza", phone: "+255714567890", status: "available", activeDeliveries: 1 },
  { id: "d4", name: "Grace Kimaro", phone: "+255715678901", status: "offline", activeDeliveries: 0 },
];

export const mockDriverProfiles: DriverProfile[] = [
  { id: "d1", name: "Juma Hassan", phone: "+255712345678", status: "available", activeDeliveries: 0, zone: "Kariakoo", vehicle: "Bajaj", rating: 4.8, completedToday: 6 },
  { id: "d2", name: "Amina Salim", phone: "+255713456789", status: "busy", activeDeliveries: 2, zone: "Masaki", vehicle: "Box Bike", rating: 4.9, completedToday: 9 },
  { id: "d3", name: "Baraka Mwanza", phone: "+255714567890", status: "available", activeDeliveries: 1, zone: "Mikocheni", vehicle: "Motorbike", rating: 4.7, completedToday: 5 },
  { id: "d4", name: "Grace Kimaro", phone: "+255715678901", status: "offline", activeDeliveries: 0, zone: "Tegeta", vehicle: "Motorbike", rating: 4.6, completedToday: 4 },
  { id: "d5", name: "Neema Mushi", phone: "+255716234567", status: "busy", activeDeliveries: 3, zone: "Mwenge", vehicle: "Van", rating: 4.9, completedToday: 11 },
  { id: "d6", name: "Hassan Selemani", phone: "+255717345678", status: "available", activeDeliveries: 1, zone: "Posta", vehicle: "Motorbike", rating: 4.5, completedToday: 7 },
];

let deliveryCounter = 1004;

export const mockDeliveries: Delivery[] = [
  {
    id: "1", trackingId: "ML-1001", customerName: "Fatma Omar", customerPhone: "+255716789012",
    pickupLocation: "Kariakoo Market", dropoffLocation: "Masaki, Haile Selassie Rd",
    packageType: "Parcel", status: "in_transit", driverId: "d2", driverName: "Amina Salim",
    receiverName: null, createdAt: "2026-03-10T08:30:00Z", updatedAt: "2026-03-10T09:15:00Z", priceTZS: 15000,
  },
  {
    id: "2", trackingId: "ML-1002", customerName: "John Mwalimu", customerPhone: "+255717890123",
    pickupLocation: "Posta, Dar es Salaam", dropoffLocation: "Sinza, Block C",
    packageType: "Document", status: "assigned", driverId: "d2", driverName: "Amina Salim",
    receiverName: null, createdAt: "2026-03-10T09:00:00Z", updatedAt: "2026-03-10T09:10:00Z", priceTZS: 8000,
  },
  {
    id: "3", trackingId: "ML-1003", customerName: "Saidi Bakari", customerPhone: "+255718901234",
    pickupLocation: "Mlimani City Mall", dropoffLocation: "Mikocheni B",
    packageType: "Electronics", status: "pending", driverId: null, driverName: null,
    receiverName: null, createdAt: "2026-03-10T09:30:00Z", updatedAt: "2026-03-10T09:30:00Z", priceTZS: 25000,
  },
  {
    id: "4", trackingId: "ML-1004", customerName: "Rose Tarimo", customerPhone: "+255719012345",
    pickupLocation: "JNIA Airport", dropoffLocation: "Oyster Bay",
    packageType: "Fragile", status: "delivered", driverId: "d3", driverName: "Baraka Mwanza",
    receiverName: "Ali Tarimo", createdAt: "2026-03-10T07:00:00Z", updatedAt: "2026-03-10T08:45:00Z", priceTZS: 20000,
  },
];

export const mockReportSummaries: ReportSummary[] = [
  { id: "r1", title: "Orders Today", value: "48", note: "Good flow in town routes." },
  { id: "r2", title: "Delivered", value: "31", note: "Most jobs closed before evening." },
  { id: "r3", title: "Revenue", value: "TZS 684,000", note: "Strong courier and parcel mix." },
  { id: "r4", title: "Active Drivers", value: "6", note: "Two riders free for new jobs." },
];

export const mockDailyReports: DailyReport[] = [
  { id: "dr1", hub: "Posta", delivered: 12, inTransit: 4, pending: 2, revenueTZS: 198000 },
  { id: "dr2", hub: "Kariakoo", delivered: 9, inTransit: 3, pending: 4, revenueTZS: 142000 },
  { id: "dr3", hub: "Mikocheni", delivered: 6, inTransit: 2, pending: 1, revenueTZS: 116000 },
  { id: "dr4", hub: "Mwenge", delivered: 4, inTransit: 2, pending: 3, revenueTZS: 98000 },
];

export function generateTrackingId(): string {
  deliveryCounter++;
  return `ML-${deliveryCounter}`;
}
