import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, ShieldCheck, Search, TimerReset, Truck } from "lucide-react";
import { AppControls } from "@/components/AppControls";
import { useAppPreferences } from "@/contexts/AppPreferences";

const metrics = [
  { label: "Active zones", value: "12", note: "Across Dar es Salaam" },
  { label: "Average dispatch", value: "4.8m", note: "From creation to assignment" },
  { label: "Tracking access", value: "24/7", note: "Customer self-service" },
];

const pillars = [
  { title: "Dispatch control", copy: "Create, assign, and monitor deliveries from one operational workspace." },
  { title: "Driver flow", copy: "Keep riders focused with a clean delivery queue and completion actions." },
  { title: "Customer tracking", copy: "Share live delivery status through a simple tracking ID experience." },
];

const Index = () => {
  const { t } = useAppPreferences();

  return (
    <main className="min-h-screen">
      <div className="app-frame flex min-h-screen items-center">
        <section className="panel-shell soft-grid grid min-h-[780px] w-full overflow-hidden lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,181,37,0.12),transparent_32%)]" />
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div>
                <p className="section-label">{t("landing.platform")}</p>
                <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                  {t("common.brand")}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <AppControls />
                <div className="hidden rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary md:block">
                  {t("landing.ready")}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 max-w-2xl space-y-6">
              <div className="space-y-4">
                <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[3.25rem] lg:leading-[1.05]">
                  {t("landing.heading")}
                </h2>
                <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {t("landing.subheading")}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="metric-card">
                    <p className="section-label">
                      {metric.label === "Active zones"
                        ? t("landing.metric.activeZones")
                        : metric.label === "Average dispatch"
                          ? t("landing.metric.avgDispatch")
                          : t("landing.metric.trackingAccess")}
                    </p>
                    <p className="mt-3 font-display text-3xl font-bold text-foreground">{metric.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {metric.note === "Across Dar es Salaam"
                        ? t("landing.metric.activeZonesNote")
                        : metric.note === "From creation to assignment"
                          ? t("landing.metric.avgDispatchNote")
                          : t("landing.metric.trackingAccessNote")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/admin" className="sm:min-w-[220px]">
                  <Button variant="action" size="lg" className="w-full justify-between px-6">
                    <span className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      {t("common.adminDashboard")}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/driver" className="sm:min-w-[220px]">
                  <Button variant="outline" size="lg" className="w-full justify-between px-6">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      {t("common.driverInterface")}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/track" className="sm:min-w-[220px]">
                  <Button variant="secondary" size="lg" className="w-full justify-between px-6">
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      {t("common.trackDelivery")}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative z-10 mt-12 grid gap-3 md:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl border border-border/70 bg-background/35 p-4">
                  <p className="font-display text-lg font-semibold text-foreground">
                    {pillar.title === "Dispatch control"
                      ? t("landing.pillar.dispatch")
                      : pillar.title === "Driver flow"
                        ? t("landing.pillar.driver")
                        : t("landing.pillar.customer")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {pillar.title === "Dispatch control"
                      ? t("landing.pillar.dispatchCopy")
                      : pillar.title === "Driver flow"
                        ? t("landing.pillar.driverCopy")
                        : t("landing.pillar.customerCopy")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="relative border-t border-border/70 bg-[#0d1527]/85 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,112,247,0.16),transparent_32%)]" />
            <div className="relative z-10 flex h-full flex-col gap-6">
              <div className="rounded-[28px] border border-border/70 bg-background/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="section-label">{t("landing.snapshot")}</p>
                    <p className="mt-2 font-display text-2xl font-bold">{t("common.today")}</p>
                  </div>
                  <div className="rounded-full bg-success/15 p-3 text-success">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-border/60 bg-card/75 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{t("landing.queue")}</p>
                      <span className="status-in-transit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                        {t("landing.queueActive")}
                      </span>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-[72%] rounded-full bg-primary" />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{t("landing.queueNote")}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/60 bg-card/75 p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-primary/12 p-3 text-primary">
                          <TimerReset className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{t("landing.assignTime")}</p>
                          <p className="mt-1 text-2xl font-display font-bold">4.8m</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-card/75 p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-success/12 p-3 text-success">
                          <Truck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{t("landing.availableRiders")}</p>
                          <p className="mt-1 text-2xl font-display font-bold">07</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-border/70 bg-card/85 p-6">
                <p className="section-label">{t("landing.whyWorks")}</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                  <li>{t("landing.why1")}</li>
                  <li>{t("landing.why2")}</li>
                  <li>{t("landing.why3")}</li>
                </ul>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default Index;
