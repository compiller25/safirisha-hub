import { Link, useLocation } from "react-router-dom";
import { BarChart3, LayoutDashboard, Truck } from "lucide-react";
import { AppControls } from "@/components/AppControls";
import { useAppPreferences } from "@/contexts/AppPreferences";

export function AdminNav() {
  const location = useLocation();
  const { t } = useAppPreferences();

  const links = [
    { to: "/admin", label: t("common.dispatch"), icon: LayoutDashboard },
    { to: "/admin/drivers", label: t("common.drivers"), icon: Truck },
    { to: "/admin/reports", label: t("common.reports"), icon: BarChart3 },
  ];

  return (
    <div className="app-frame pb-0">
      <nav className="panel-shell flex h-16 items-center gap-3 px-4 md:px-6">
        <div className="min-w-[170px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary/80">{t("nav.operations")}</p>
          <span className="font-display text-xl font-bold tracking-tight text-primary">{t("common.brand")}</span>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
        <AppControls />
        <Link
          to="/driver"
          className="ml-auto inline-flex items-center rounded-full border border-border/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          {t("common.driverView")} {"->"}
        </Link>
      </nav>
    </div>
  );
}
