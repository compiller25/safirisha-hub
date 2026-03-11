import { Delivery, Driver, DeliveryStatus } from "@/types/delivery";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, MessageSquare, Truck } from "lucide-react";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { useAppPreferences } from "@/contexts/AppPreferences";

interface DeliveryDetailProps {
  delivery: Delivery;
  drivers: Driver[];
  onAssign: (deliveryId: string, driverId: string) => void;
  onStatusChange: (deliveryId: string, status: DeliveryStatus) => void;
}

export function DeliveryDetail({ delivery, drivers, onAssign, onStatusChange }: DeliveryDetailProps) {
  const { t } = useAppPreferences();
  const availableDrivers = drivers.filter((d) => d.status === "available");
  const statusLabel =
    delivery.status === "pending"
      ? t("common.pending")
      : delivery.status === "assigned"
        ? t("common.assigned")
        : delivery.status === "in_transit"
          ? t("common.inTransit")
          : t("common.delivered");

  const handleWhatsApp = () => {
    const phone = delivery.customerPhone.replace("+", "");
    const message = encodeURIComponent(
      `Hello ${delivery.customerName}, your delivery ${delivery.trackingId} is now out for delivery! Driver: ${delivery.driverName}. Track: ${window.location.origin}/track/${delivery.trackingId}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-label">{t("detail.selectedDelivery")}</p>
          <h2 className="mt-2 font-display text-2xl font-bold">{delivery.trackingId}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{delivery.customerName}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
            delivery.status === "pending"
              ? "status-pending"
              : delivery.status === "assigned"
                ? "status-assigned"
                : delivery.status === "in_transit"
                  ? "status-in-transit"
                  : "status-delivered"
          }`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="metric-card">
          <p className="section-label">{t("common.customerPhone")}</p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
            <Phone className="w-4 h-4 text-primary" />
            {delivery.customerPhone}
          </p>
        </div>
        <div className="metric-card">
          <p className="section-label">{t("common.package")}</p>
          <p className="mt-3 text-sm font-medium">{delivery.packageType}</p>
          <p className="mt-2 font-display text-2xl font-bold text-primary">TZS {delivery.priceTZS.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3 rounded-3xl border border-border/70 bg-secondary/25 p-5">
        <div>
          <p className="section-label">{t("common.route")}</p>
          <div className="mt-3 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{t("common.pickup")}</p>
              <p className="mt-1 text-sm">{delivery.pickupLocation}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{t("common.dropoff")}</p>
              <p className="mt-1 text-sm">{delivery.dropoffLocation}</p>
            </div>
          </div>
        </div>
        <MapPlaceholder pickup={delivery.pickupLocation} dropoff={delivery.dropoffLocation} />
      </div>

      <div className="mt-5 space-y-3 border-t border-border/60 pt-5">
        {delivery.status === "pending" && availableDrivers.length > 0 && (
          <div className="space-y-3">
            <div>
              <p className="section-label">{t("detail.assignDriver")}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t("detail.assignDriverNote")}</p>
            </div>
            {availableDrivers.map((driver) => (
              <Button
                key={driver.id}
                variant="outline"
                className="w-full justify-between"
                onClick={() => onAssign(delivery.id, driver.id)}
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  {driver.name}
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{driver.activeDeliveries} active</span>
              </Button>
            ))}
          </div>
        )}

        {delivery.status === "assigned" && (
          <Button variant="action" className="w-full" onClick={() => onStatusChange(delivery.id, "in_transit")}>
            <Truck className="w-4 h-4" />
            {t("common.markInTransit")}
          </Button>
        )}

        {delivery.status === "in_transit" && (
          <div className="space-y-3">
            <Button variant="whatsapp" className="w-full" onClick={handleWhatsApp}>
              <MessageSquare className="w-4 h-4" />
              {t("detail.notifyWhatsapp")}
            </Button>
            <Button variant="action" className="w-full" onClick={() => onStatusChange(delivery.id, "delivered")}>
              <CheckCircle2 className="w-4 h-4" />
              {t("common.markDelivered")}
            </Button>
          </div>
        )}

        {delivery.status === "delivered" && delivery.receiverName && (
          <div className="metric-card">
            <p className="section-label">{t("common.receivedBy")}</p>
            <p className="mt-2 text-sm font-semibold text-foreground">{delivery.receiverName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
