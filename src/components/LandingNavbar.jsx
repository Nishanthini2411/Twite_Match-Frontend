import { Link, NavLink } from "react-router-dom";

export default function LandingNavbar() {
  const activeStyle = {
    color: "#e91e63",
    borderBottom: "2px solid #e91e63",
    paddingBottom: "3px",
  };

  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* ===== LEFT LOGO ===== */}
        <Link to="/" className="flex items-center gap-2 select-none">
          {/* HEART ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e91e63"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21.4l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
          </svg>

          <span className="text-lg font-semibold" style={{ color: "#e91e63" }}>
            TwiteMatch
          </span>
        </Link>

        {/* ===== RIGHT NAV LINKS ===== */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

          <NavLink
            to="/"
            className="text-slate-700 hover:text-pink-600 transition"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>

          <NavLink
  to="/success-stories"
  className="text-slate-700 hover:text-pink-600 transition"
  style={({ isActive }) => (isActive ? activeStyle : undefined)}
>
  Success Stories
</NavLink>
          <NavLink
            to="/login"
            className="text-slate-700 hover:text-pink-600 transition"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Login
          </NavLink>
        </nav>

      </div>
    </header>
  );
}
