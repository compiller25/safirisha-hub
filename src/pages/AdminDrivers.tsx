import { AdminNav } from "@/components/AdminNav";
import { mockDriverProfiles } from "@/data/mockData";

const AdminDrivers = () => {
  return (
    <div className="min-h-screen">
      <AdminNav />
      <div className="app-frame pt-4">
        <section className="panel-shell p-6">
          <p className="section-label">Drivers</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">Driver team</h1>
          <p className="mt-2 text-sm text-muted-foreground">View riders, zones, ratings, and work load.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mockDriverProfiles.map((driver, index) => (
              <article key={driver.id} className="task-card pop-card" style={{ animationDelay: `${index * 60}ms` }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-bold">{driver.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{driver.phone}</p>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {driver.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="metric-card">
                    <p className="section-label">Zone</p>
                    <p className="mt-2 text-sm font-semibold">{driver.zone}</p>
                  </div>
                  <div className="metric-card">
                    <p className="section-label">Vehicle</p>
                    <p className="mt-2 text-sm font-semibold">{driver.vehicle}</p>
                  </div>
                  <div className="metric-card">
                    <p className="section-label">Rating</p>
                    <p className="mt-2 text-sm font-semibold">{driver.rating}/5</p>
                  </div>
                  <div className="metric-card">
                    <p className="section-label">Done Today</p>
                    <p className="mt-2 text-sm font-semibold">{driver.completedToday}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDrivers;
