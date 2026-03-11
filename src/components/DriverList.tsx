import { Driver } from "@/types/delivery";
import { Circle, User } from "lucide-react";

interface DriverListProps {
  drivers: Driver[];
}

export function DriverList({ drivers }: DriverListProps) {
  const statusColor = (s: Driver["status"]) => {
    switch (s) {
      case "available":
        return "text-success";
      case "busy":
        return "text-primary";
      case "offline":
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-3">
      {drivers.map((driver) => (
        <div key={driver.id} className="rounded-2xl border border-border/70 bg-secondary/25 p-4 transition-colors hover:bg-secondary/40">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background/70">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-semibold text-foreground">{driver.name}</p>
                <Circle className={`w-3 h-3 fill-current ${statusColor(driver.status)}`} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{driver.phone}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="rounded-full bg-background/70 px-2.5 py-1 uppercase tracking-[0.16em]">
                  {driver.status}
                </span>
                <span>{driver.activeDeliveries} active</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
