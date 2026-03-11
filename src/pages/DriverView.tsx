import { useState } from "react";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { mockDeliveries } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, MapPin, Package, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";
import { AppControls } from "@/components/AppControls";
import { useAppPreferences } from "@/contexts/AppPreferences";

const DriverView = () => {
  const { t } = useAppPreferences();
  const [deliveries, setDeliveries] = useState<Delivery[]>(
    mockDeliveries.filter((d) => d.driverId === "d2" && d.status !== "delivered")
  );
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState("");
  const [committed, setCommitted] = useState<string | null>(null);

  const handleMarkDelivered = (id: string) => {
    setCompletingId(id);
  };

  const handleComplete = (id: string) => {
    if (!receiverName.trim()) return;
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "delivered" as DeliveryStatus, receiverName: receiverName.trim() } : d
      )
    );
    setCommitted(id);
    setTimeout(() => {
      setCommitted(null);
      setCompletingId(null);
      setReceiverName("");
    }, 600);
  };

  const handleCancel = () => {
    setCompletingId(null);
    setReceiverName("");
  };

  const activeDeliveries = deliveries.filter((d) => d.status !== "delivered");
  const completedDeliveries = deliveries.filter((d) => d.status === "delivered");

  return (
    <div className="min-h-screen">
      <div className="app-frame">
        <nav className="panel-shell flex h-16 items-center gap-3 px-4 md:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary/80">{t("nav.driverConsole")}</p>
            <span className="font-display text-xl font-bold tracking-tight text-primary">{t("common.brand")}</span>
          </div>
          <AppControls />
          <span className="rounded-full bg-secondary/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Amina Salim
          </span>
          <Link
            to="/admin"
            className="ml-auto inline-flex items-center rounded-full border border-border/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {t("common.adminDashboard")} {"->"}
          </Link>
        </nav>

        <div className="mt-4 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
          <section className="panel-shell p-6">
            <p className="section-label">{t("driver.summary")}</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">{t("driver.title")}</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t("driver.description")}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="metric-card">
                <p className="section-label">{t("driver.activeJobs")}</p>
                <p className="mt-3 font-display text-3xl font-bold">{activeDeliveries.length}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t("driver.activeJobsNote")}</p>
              </div>
              <div className="metric-card">
                <p className="section-label">{t("driver.completed")}</p>
                <p className="mt-3 font-display text-3xl font-bold">{completedDeliveries.length}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t("driver.completedNote")}</p>
              </div>
            </div>
          </section>

          <section className="panel-shell p-4 md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="section-label">{t("driver.queue")}</p>
                <h2 className="mt-2 font-display text-2xl font-bold">{t("driver.queueTitle")}</h2>
              </div>
              <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {t("driver.onShift")}
              </span>
            </div>

            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className={`rounded-3xl border p-5 transition-all ${
                    committed === delivery.id
                      ? "border-success/50 bg-success/10"
                      : "border-border/70 bg-card/85"
                  }`}
                >
                  {completingId === delivery.id ? (
                    <div className="space-y-4">
                      <div>
                        <p className="section-label">{t("driver.proof")}</p>
                        <h3 className="mt-2 font-display text-xl font-bold">{t("common.completeDelivery")} {delivery.trackingId}</h3>
                      </div>

                      <div className="rounded-2xl border border-border/70 bg-secondary/25 p-5">
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl bg-primary/12 p-3 text-primary">
                            <Package className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{t("driver.photoUpload")}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{t("driver.photoUploadNote")}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {t("driver.receiverName")}
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-xl border border-border/70 bg-background/75 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                          placeholder={t("driver.receiverPlaceholder")}
                          value={receiverName}
                          onChange={(e) => setReceiverName(e.target.value)}
                          autoFocus
                        />
                      </div>

                      <div className="rounded-2xl border border-dashed border-border/70 bg-secondary/20 px-4 py-5 text-center text-xs text-muted-foreground">
                        {t("driver.signature")}
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Button variant="outline" onClick={handleCancel}>
                          {t("common.cancel")}
                        </Button>
                        <Button
                          variant="action"
                          disabled={!receiverName.trim()}
                          onClick={() => handleComplete(delivery.id)}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {t("common.completeDelivery")}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                    <p className="font-display text-lg font-bold">{delivery.trackingId}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{delivery.customerName}</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                            delivery.status === "in_transit"
                              ? "status-in-transit"
                              : delivery.status === "assigned"
                                ? "status-assigned"
                                : "status-delivered"
                          }`}
                        >
                          {delivery.status === "assigned" ? t("common.assigned") : delivery.status === "in_transit" ? t("common.inTransit") : t("common.delivered")}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="rounded-2xl border border-border/60 bg-secondary/20 p-4">
                          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Customer</p>
                          <p className="mt-2 inline-flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-primary" />
                            {delivery.customerName}
                          </p>
                          <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            {delivery.customerPhone}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border/60 bg-secondary/20 p-4">
                          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Route</p>
                          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="truncate">{delivery.pickupLocation}</span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                            <span className="truncate">{delivery.dropoffLocation}</span>
                          </div>
                          <p className="mt-3 font-display text-xl font-bold text-primary">
                            TZS {delivery.priceTZS.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {delivery.status !== "delivered" && (
                        <div className="mt-4 flex justify-end">
                          <Button variant="action" onClick={() => handleMarkDelivered(delivery.id)}>
                            <CheckCircle2 className="w-4 h-4" />
                            {t("common.markDelivered")}
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {completedDeliveries.length > 0 && (
              <div className="mt-6 border-t border-border/60 pt-6">
                <p className="section-label">{t("driver.completedDeliveries")}</p>
                <div className="mt-4 space-y-3">
                  {completedDeliveries.map((d) => (
                    <div key={d.id} className="rounded-2xl border border-border/60 bg-secondary/20 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold">{d.trackingId}</span>
                      <span className="status-delivered rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">{t("common.delivered")}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t("driver.receivedBy", { name: d.receiverName ?? "-" })}</p>
                  </div>
                ))}
              </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DriverView;
