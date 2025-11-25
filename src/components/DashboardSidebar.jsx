import { NavLink } from "react-router-dom";

const items = [
  { path: "home", label: "Home" },
  { path: "matches", label: "Matches" },
  { path: "interest", label: "Interest" },
  { path: "messages", label: "Messages" },
  { path: "search", label: "Search" },
  { path: "notifications", label: "Notification" },
  { path: "premium", label: "Premium Plans" },
  { path: "profile", label: "My Profile" },
  { path: "account", label: "My Account" },
];

// onToggle prop → parent (DashboardLayout) will control show / hide
export default function DashboardSidebar({ onToggle }) {
  return (
    <aside className="w-full md:w-60 border-r border-slate-200 bg-white">
      {/* HEADER */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Pink Icon Box */}
          <div className="h-9 w-9 rounded-2xl bg-[#e91e63] text-white flex items-center justify-center font-bold">
            M
          </div>

          <div>
            {/* Pink Brand Name */}
            <p className="font-semibold text-[#e91e63] text-sm">TwiteMatch</p>
            <p className="text-xs text-slate-500">Welcome back!</p>
          </div>
        </div>

        {/* ☰ Hamburger icon – click to hide sidebar */}
        <button
          type="button"
          onClick={onToggle}
          className="p-2 rounded hover:bg-slate-100"
          aria-label="Toggle sidebar"
        >
          <div className="space-y-1">
            <span className="block w-4 h-[2px] bg-slate-700" />
            <span className="block w-4 h-[2px] bg-slate-700" />
            <span className="block w-4 h-[2px] bg-slate-700" />
          </div>
        </button>
      </div>

      {/* MENU */}
      <nav className="p-3 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible text-sm">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "px-3 py-2 rounded-lg whitespace-nowrap transition-all",
                isActive
                  ? "bg-pink-100 text-[#e91e63] font-medium" // ACTIVE ITEM
                  : "text-slate-600 hover:bg-pink-50",        // INACTIVE ITEM
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
