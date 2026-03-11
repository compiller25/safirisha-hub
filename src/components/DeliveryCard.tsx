import { Delivery } from "@/types/delivery";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { useAppPreferences } from "@/contexts/AppPreferences";

interface DeliveryCardProps {
  delivery: Delivery;
  isSelected: boolean;
  onClick: () => void;
}

export function DeliveryCard({ delivery, isSelected, onClick }: DeliveryCardProps) {
  const { t } = useAppPreferences();
  const statusClass = {
    pending: "status-pending",
    assigned: "status-assigned",
    in_transit: "status-in-transit",
    delivered: "status-delivered",
  }[delivery.status];
  const statusLabel =
    delivery.status === "pending"
      ? t("common.pending")
      : delivery.status === "assigned"
        ? t("common.assigned")
        : delivery.status === "in_transit"
          ? t("common.inTransit")
          : t("common.delivered");

  return (
    <button
      onClick={onClick}
      className={`w-full cursor-pointer rounded-2xl border p-4 text-left transition-all ${
        isSelected
          ? "border-primary bg-primary/10 shadow-[0_20px_40px_rgba(245,181,37,0.1)]"
          : "border-border/70 bg-card/85 hover:border-primary/30 hover:bg-card"
      } ${delivery.status === "delivered" ? "opacity-70" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-bold tracking-tight">{delivery.trackingId}</p>
          <p className="mt-1 text-sm text-muted-foreground">{delivery.customerName}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusClass}`}>
          {statusLabel}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4 shrink-0 text-primary" />
        <span className="truncate">{delivery.pickupLocation}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
        <span className="truncate">{delivery.dropoffLocation}</span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-border/60 pt-3">
        <span className="font-display text-lg font-bold text-primary">TZS {delivery.priceTZS.toLocaleString()}</span>
        <div className="text-right text-xs text-muted-foreground">
          {delivery.driverName ? <p>{delivery.driverName}</p> : <p>Unassigned</p>}
          <p className="mt-1 inline-flex items-center gap-1">
            <Clock3 className="w-3 h-3" />
            Updated recently
          </p>
        </div>
      </div>
    </button>
  );
}
