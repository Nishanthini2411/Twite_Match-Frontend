import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/DashboardSidebar";
import NotificationBell from "../../components/NotificationBell";
import NotificationDropdown from "../../components/NotificationDropdown";

export default function DashboardLayout() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR – only render when open */}
      {sidebarOpen && <DashboardSidebar onToggle={toggleSidebar} />}

      {/* MAIN AREA */}
      <main className="flex-1 max-h-screen overflow-y-auto">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Left: hamburger when sidebar is hidden */}
            <div>
              {!sidebarOpen && (
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className="p-2 rounded hover:bg-slate-100"
                  aria-label="Open sidebar"
                >
                  <div className="space-y-1">
                    <span className="block w-4 h-[2px] bg-slate-700" />
                    <span className="block w-4 h-[2px] bg-slate-700" />
                    <span className="block w-4 h-[2px] bg-slate-700" />
                  </div>
                </button>
              )}
            </div>

            {/* Right: notification bell */}
            <div className="flex-1 flex justify-end">
              <div className="relative">
                <NotificationBell
                  onClick={() => setNotifOpen((prev) => !prev)}
                />
                <NotificationDropdown
                  open={notifOpen}
                  onClose={() => setNotifOpen(false)}
                />
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
