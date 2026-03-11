import { useState } from "react";
import { PACKAGE_TYPES } from "@/types/delivery";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppPreferences } from "@/contexts/AppPreferences";

interface QuickCreateFormProps {
  onSubmit: (data: {
    customerName: string;
    customerPhone: string;
    pickupLocation: string;
    dropoffLocation: string;
    packageType: string;
    priceTZS: number;
  }) => void;
}

export function QuickCreateForm({ onSubmit }: QuickCreateFormProps) {
  const { t } = useAppPreferences();
  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "+255",
    pickupLocation: "",
    dropoffLocation: "",
    packageType: "Parcel",
    priceTZS: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.pickupLocation || !form.dropoffLocation) return;
    onSubmit({
      ...form,
      priceTZS: parseInt(form.priceTZS) || 0,
    });
    setForm({
      customerName: "",
      customerPhone: "+255",
      pickupLocation: "",
      dropoffLocation: "",
      packageType: "Parcel",
      priceTZS: "",
    });
    setExpanded(false);
  };

  const inputClass =
    "w-full rounded-xl border border-border/70 bg-background/75 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none";

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="flex w-full items-center justify-between rounded-2xl border border-dashed border-border/70 bg-secondary/25 px-4 py-4 text-left transition-colors hover:border-primary/35 hover:bg-secondary/40"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <Plus className="w-4 h-4" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">{t("quickCreate.description")}</span>
            <span className="mt-1 block text-xs text-muted-foreground">{t("quickCreate.subtitle")}</span>
          </span>
        </span>
        <span className="hidden rounded-full border border-border/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:inline-flex">
          {t("quickCreate.label")}
        </span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border/70 bg-secondary/30 p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="section-label">{t("quickCreate.label")}</p>
          <h3 className="mt-2 font-display text-xl font-bold">{t("quickCreate.title")}</h3>
        </div>
        <Button type="button" variant="ghost" onClick={() => setExpanded(false)}>
          {t("common.cancel")}
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <input
          className={inputClass}
          placeholder={t("quickCreate.customerName")}
          value={form.customerName}
          onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
          required
        />
        <input
          className={inputClass}
          placeholder={t("quickCreate.customerPhone")}
          value={form.customerPhone}
          onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))}
        />
        <input
          className={inputClass}
          placeholder={t("quickCreate.pickup")}
          value={form.pickupLocation}
          onChange={(e) => setForm((f) => ({ ...f, pickupLocation: e.target.value }))}
          required
        />
        <input
          className={inputClass}
          placeholder={t("quickCreate.dropoff")}
          value={form.dropoffLocation}
          onChange={(e) => setForm((f) => ({ ...f, dropoffLocation: e.target.value }))}
          required
        />
        <select
          className={inputClass}
          value={form.packageType}
          onChange={(e) => setForm((f) => ({ ...f, packageType: e.target.value }))}
        >
          {PACKAGE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          className={inputClass}
          placeholder={t("quickCreate.price")}
          type="number"
          value={form.priceTZS}
          onChange={(e) => setForm((f) => ({ ...f, priceTZS: e.target.value }))}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => setExpanded(false)}>
          {t("common.close")}
        </Button>
        <Button type="submit" variant="action">
          <Plus className="w-4 h-4" />
          {t("common.createDelivery")}
        </Button>
      </div>
    </form>
  );
}
