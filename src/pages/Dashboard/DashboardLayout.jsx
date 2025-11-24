import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar />
      <main className="flex-1 max-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}