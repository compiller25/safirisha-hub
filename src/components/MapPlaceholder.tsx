import { MapPin, Navigation } from "lucide-react";

interface MapPlaceholderProps {
  pickup: string;
  dropoff: string;
}

export function MapPlaceholder({ pickup, dropoff }: MapPlaceholderProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/70 bg-secondary/25 p-5">
      <div className="soft-grid relative flex h-40 items-center justify-center rounded-2xl border border-border/50 bg-background/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,181,37,0.08),transparent_38%)]" />
        <div className="relative w-[80%]">
          <div className="h-px bg-border">
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <div className="rounded-full bg-primary/15 p-2 text-primary">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="rounded-full bg-success/15 p-2 text-success">
                <Navigation className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_24px_rgba(245,181,37,0.75)]" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between gap-4 text-xs text-muted-foreground">
        <span className="max-w-[45%] truncate">{pickup}</span>
        <span className="max-w-[45%] truncate text-right">{dropoff}</span>
      </div>
    </div>
  );
}
