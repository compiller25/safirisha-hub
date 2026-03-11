import { useState } from "react";
import { mockDeliveries } from "@/data/mockData";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Clock, Package, Search, Truck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppControls } from "@/components/AppControls";
import { useAppPreferences } from "@/contexts/AppPreferences";

const statusOrder: DeliveryStatus[] = ["pending", "assigned", "in_transit", "delivered"];

function TrackingStepper({ currentStatus }: { currentStatus: DeliveryStatus }) {
  const { t } = useAppPreferences();
  const currentIndex = statusOrder.indexOf(currentStatus);
  const steps: { status: DeliveryStatus; label: string; icon: typeof Package }[] = [
    { status: "pending", label: t("common.pending"), icon: Package },
    { status: "assigned", label: t("common.assigned"), icon: UserCheck },
    { status: "in_transit", label: t("common.inTransit"), icon: Truck },
    { status: "delivered", label: t("common.delivered"), icon: CheckCircle2 },
  ];

  return (
    <div className="grid gap-3">
      {steps.map((step, i) => {
        const isCompleted = i <= currentIndex;
        const isCurrent = i === currentIndex;
        const Icon = step.icon;

        return (
          <div key={step.status} className="rounded-2xl border border-border/60 bg-secondary/20 p-4">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 ${
                  isCurrent
                    ? "border-primary bg-primary/20"
                    : isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className={`text-sm font-semibold ${isCurrent ? "text-primary" : "text-foreground"}`}>{step.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isCurrent ? t("tracking.statusCurrent") : isCompleted ? t("tracking.statusComplete") : t("tracking.statusPending")}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const CustomerTracking = () => {
  const { t } = useAppPreferences();
  const { trackingId: urlTrackingId } = useParams();
  const normalizedTrackingId = urlTrackingId?.toUpperCase().trim();
  const [inputId, setInputId] = useState(normalizedTrackingId || "");
  const [delivery, setDelivery] = useState<Delivery | null>(
    normalizedTrackingId ? mockDeliveries.find((d) => d.trackingId === normalizedTrackingId) || null : null
  );
  const [notFound, setNotFound] = useState(false);
  const statusLabel =
    delivery?.status === "pending"
      ? t("common.pending")
      : delivery?.status === "assigned"
        ? t("common.assigned")
        : delivery?.status === "in_transit"
          ? t("common.inTransit")
          : t("common.delivered");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = mockDeliveries.find((d) => d.trackingId === inputId.toUpperCase().trim());
    if (found) {
      setDelivery(found);
      setNotFound(false);
    } else {
      setDelivery(null);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="app-frame">
        <nav className="panel-shell flex h-16 items-center px-4 md:px-6">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-primary">
            {t("common.brand")}
          </Link>
          <span className="ml-3 rounded-full bg-secondary/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t("nav.customerTracking")}
          </span>
          <div className="ml-auto">
            <AppControls />
          </div>
        </nav>

        <div className="mt-4 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="panel-shell p-6">
            <p className="section-label">{t("common.trackDelivery")}</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">{t("tracking.title")}</h1>
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              {t("tracking.description")}
            </p>

            <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                className="h-12 flex-1 rounded-xl border border-border/70 bg-background/75 px-4 text-sm font-semibold uppercase tracking-[0.16em] text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                placeholder="ML-1001"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Button type="submit" variant="action" size="lg" className="sm:px-6">
                <Search className="w-4 h-4" />
                {t("common.track")}
              </Button>
            </form>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="metric-card">
                <p className="section-label">{t("tracking.alwaysAvailable")}</p>
                <p className="mt-3 font-display text-3xl font-bold">24/7</p>
                <p className="mt-2 text-sm text-muted-foreground">{t("tracking.alwaysAvailableNote")}</p>
              </div>
              <div className="metric-card">
                <p className="section-label">{t("tracking.liveStatus")}</p>
                <p className="mt-3 font-display text-3xl font-bold">4 steps</p>
                <p className="mt-2 text-sm text-muted-foreground">{t("tracking.liveStatusNote")}</p>
              </div>
            </div>

            {notFound && (
              <div className="mt-6 rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-sm text-muted-foreground">
                {t("tracking.notFound")}
              </div>
            )}
          </section>

          <section className="panel-shell p-6">
            {delivery ? (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-label">{t("tracking.result")}</p>
                    <h2 className="mt-2 font-display text-2xl font-bold">{delivery.trackingId}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{delivery.packageType}</p>
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

                <div className="mt-6">
                  <TrackingStepper currentStatus={delivery.status} />
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-secondary/20 p-4">
                    <p className="section-label">{t("common.pickup")}</p>
                    <p className="mt-2 text-sm">{delivery.pickupLocation}</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-secondary/20 p-4">
                    <p className="section-label">{t("common.dropoff")}</p>
                    <p className="mt-2 text-sm">{delivery.dropoffLocation}</p>
                  </div>
                  {delivery.driverName && (
                    <div className="rounded-2xl border border-border/60 bg-secondary/20 p-4">
                      <p className="section-label">{t("common.assignedDriver")}</p>
                      <p className="mt-2 text-sm">{delivery.driverName}</p>
                    </div>
                  )}
                  {delivery.receiverName && (
                    <div className="rounded-2xl border border-border/60 bg-secondary/20 p-4">
                      <p className="section-label">{t("common.receivedBy")}</p>
                      <p className="mt-2 text-sm">{delivery.receiverName}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 rounded-2xl border border-border/60 bg-secondary/20 p-4">
                  <p className="section-label">{t("tracking.statusNote")}</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    {t("tracking.note", { status: statusLabel.toLowerCase() })}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[420px] items-center justify-center text-center">
                <div>
                  <p className="section-label">{t("tracking.awaiting")}</p>
                  <h2 className="mt-3 font-display text-2xl font-bold">{t("tracking.enterId")}</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    {t("tracking.awaitingNote")}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CustomerTracking;
