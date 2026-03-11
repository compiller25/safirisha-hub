import { useState } from "react";
import { Delivery, Driver, DeliveryStatus } from "@/types/delivery";
import { mockDeliveries, mockDrivers, generateTrackingId } from "@/data/mockData";
import { AdminNav } from "@/components/AdminNav";
import { DriverList } from "@/components/DriverList";
import { DeliveryCard } from "@/components/DeliveryCard";
import { DeliveryDetail } from "@/components/DeliveryDetail";
import { QuickCreateForm } from "@/components/QuickCreateForm";
import { useAppPreferences } from "@/contexts/AppPreferences";

const statuses = ["all", "pending", "assigned", "in_transit", "delivered"] as const;

const AdminDashboard = () => {
  const { t } = useAppPreferences();
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | "all">("all");

  const filtered = statusFilter === "all" ? deliveries : deliveries.filter((d) => d.status === statusFilter);

  const handleCreate = (data: {
    customerName: string;
    customerPhone: string;
    pickupLocation: string;
    dropoffLocation: string;
    packageType: string;
    priceTZS: number;
  }) => {
    const newDelivery: Delivery = {
      id: crypto.randomUUID(),
      trackingId: generateTrackingId(),
      ...data,
      status: "pending",
      driverId: null,
      driverName: null,
      receiverName: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDeliveries((prev) => [newDelivery, ...prev]);
  };

  const handleAssign = (deliveryId: string, driverId: string) => {
    const driver = drivers.find((d) => d.id === driverId);
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === deliveryId
          ? {
              ...d,
              driverId,
              driverName: driver?.name ?? null,
              status: "assigned" as DeliveryStatus,
              updatedAt: new Date().toISOString(),
            }
          : d
      )
    );
    setSelectedDelivery((prev) =>
      prev?.id === deliveryId ? { ...prev, driverId, driverName: driver?.name ?? null, status: "assigned" } : prev
    );
  };

  const handleStatusChange = (deliveryId: string, status: DeliveryStatus) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === deliveryId ? { ...d, status, updatedAt: new Date().toISOString() } : d))
    );
    setSelectedDelivery((prev) => (prev?.id === deliveryId ? { ...prev, status } : prev));
  };

  const activeCount = deliveries.filter((d) => d.status !== "delivered").length;
  const pendingCount = deliveries.filter((d) => d.status === "pending").length;
  const availableDrivers = drivers.filter((d) => d.status === "available").length;

  return (
    <div className="min-h-screen">
      <AdminNav />
      <div className="app-frame pt-4">
        <div className="mb-4 grid gap-4 lg:grid-cols-[1.4fr_0.9fr_0.9fr]">
          <div className="panel-shell p-6">
            <p className="section-label">{t("admin.overview")}</p>
            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight">{t("admin.title")}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {t("admin.description")}
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-secondary/30 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("admin.activeQueue")}</p>
                <p className="mt-1 font-display text-3xl font-bold text-primary">{activeCount}</p>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <p className="section-label">{t("admin.pendingOrders")}</p>
            <p className="mt-3 font-display text-3xl font-bold">{pendingCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("admin.pendingNote")}</p>
          </div>
          <div className="metric-card">
            <p className="section-label">{t("admin.availableDrivers")}</p>
            <p className="mt-3 font-display text-3xl font-bold">{availableDrivers}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("admin.availableDriversNote")}</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_390px]">
          <aside className="panel-shell hidden p-4 lg:block">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="section-label">{t("common.drivers")}</p>
                <h2 className="mt-2 font-display text-xl font-bold">{t("admin.fleetAvailability")}</h2>
              </div>
              <span className="rounded-full bg-success/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-success">
                {t("common.live")}
              </span>
            </div>
            <DriverList drivers={drivers} />
          </aside>

          <main className="panel-shell overflow-hidden">
            <div className="border-b border-border/60 p-4 md:p-6">
              <QuickCreateForm onSubmit={handleCreate} />
            </div>
            <div className="p-4 md:p-6">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
                <div>
                  <p className="section-label">{t("admin.liveDispatch")}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold">{t("admin.deliveryBoard")}</h2>
                </div>
                <div className="flex flex-wrap gap-2 md:ml-auto">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                        statusFilter === s
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {s === "all"
                        ? "All"
                        : s === "pending"
                          ? t("common.pending")
                          : s === "assigned"
                            ? t("common.assigned")
                            : s === "in_transit"
                              ? t("common.inTransit")
                              : t("common.delivered")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filtered.map((d) => (
                  <DeliveryCard
                    key={d.id}
                    delivery={d}
                    isSelected={selectedDelivery?.id === d.id}
                    onClick={() => setSelectedDelivery(d)}
                  />
                ))}
                {filtered.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-border/70 py-10 text-center text-sm text-muted-foreground">
                    {t("admin.noMatch")}
                  </div>
                )}
              </div>
            </div>
          </main>

          <aside className="panel-shell overflow-hidden">
            {selectedDelivery ? (
              <DeliveryDetail
                delivery={selectedDelivery}
                drivers={drivers}
                onAssign={handleAssign}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <div className="flex h-full min-h-[420px] items-center justify-center px-6 text-center text-sm text-muted-foreground">
                {t("admin.emptySelection")}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
