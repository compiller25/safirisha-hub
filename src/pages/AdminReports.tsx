import { AdminNav } from "@/components/AdminNav";
import { mockDailyReports, mockReportSummaries } from "@/data/mockData";

const AdminReports = () => {
  return (
    <div className="min-h-screen">
      <AdminNav />
      <div className="app-frame pt-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
          <section className="panel-shell p-6">
            <p className="section-label">Reports</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">Daily summary</h1>
            <p className="mt-2 text-sm text-muted-foreground">Simple numbers for today&apos;s delivery work.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {mockReportSummaries.map((report, index) => (
                <article key={report.id} className="metric-card pop-card" style={{ animationDelay: `${index * 60}ms` }}>
                  <p className="section-label">{report.title}</p>
                  <p className="mt-3 font-display text-3xl font-bold">{report.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{report.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel-shell p-6">
            <p className="section-label">Hubs</p>
            <h2 className="mt-3 font-display text-2xl font-bold">Hub performance</h2>
            <div className="mt-6 space-y-3">
              {mockDailyReports.map((report, index) => (
                <article key={report.id} className="task-card pop-card" style={{ animationDelay: `${index * 70}ms` }}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-bold">{report.hub}</h3>
                    <span className="font-display text-lg font-bold text-primary">TZS {report.revenueTZS.toLocaleString()}</span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="metric-card">
                      <p className="section-label">Delivered</p>
                      <p className="mt-2 text-sm font-semibold">{report.delivered}</p>
                    </div>
                    <div className="metric-card">
                      <p className="section-label">Transit</p>
                      <p className="mt-2 text-sm font-semibold">{report.inTransit}</p>
                    </div>
                    <div className="metric-card">
                      <p className="section-label">Pending</p>
                      <p className="mt-2 text-sm font-semibold">{report.pending}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
