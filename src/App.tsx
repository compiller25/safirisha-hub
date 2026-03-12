import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppPreferencesProvider } from "@/contexts/AppPreferences";
import { AppFooter } from "@/components/AppFooter";
import Index from "./pages/Index.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminDrivers from "./pages/AdminDrivers.tsx";
import AdminReports from "./pages/AdminReports.tsx";
import DriverView from "./pages/DriverView.tsx";
import CustomerTracking from "./pages/CustomerTracking.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AppPreferencesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <div className="flex min-h-screen flex-col">
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/drivers" element={<AdminDrivers />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/driver" element={<DriverView />} />
                  <Route path="/track" element={<CustomerTracking />} />
                  <Route path="/track/:trackingId" element={<CustomerTracking />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <AppFooter />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AppPreferencesProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
