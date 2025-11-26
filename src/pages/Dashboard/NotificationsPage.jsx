import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { markAllRead, markOneRead } from "../../store/slices/notificationsSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Heart,
  MessageCircle,
  ShieldAlert,
  CreditCard,
  CheckCircle2,
  Sparkles,
  Crown,
  Star,
  Gauge,
  Clock,
} from "lucide-react";

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.notifications.items);

  const [filter, setFilter] = useState("all");

  const unreadCount = useMemo(
    () => items.filter((n) => !n.isRead).length,
    [items]
  );

  const profileCompletion = 60;
  const remaining = 100 - profileCompletion;

  // ⭐ NEW: timestamps added
  const profileUpdatedAt = "2025-11-26T10:15:00";
  const premiumUpdatedAt = "2025-11-26T09:40:00";

  const colors = {
    match: "border-pink-200 bg-pink-50",
    chat: "border-blue-200 bg-blue-50",
    verify: "border-amber-200 bg-amber-50",
    activity: "border-emerald-200 bg-emerald-50",
    payment: "border-purple-200 bg-purple-50",
    security: "border-red-200 bg-red-50",
  };

  const typeLabel = {
    match: "Match",
    chat: "Chat",
    verify: "Verification",
    activity: "Activity",
    payment: "Payment",
    security: "Security",
  };

  const typeIcon = (type) => {
    switch (type) {
      case "match":
        return <Heart className="w-4 h-4 text-pink-500" />;
      case "chat":
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "payment":
        return <CreditCard className="w-4 h-4 text-purple-500" />;
      case "security":
        return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case "verify":
        return <CheckCircle2 className="w-4 h-4 text-amber-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
    }
  };

  // ⭐ DATE FORMATTER
  const formatDateTime = (value) => {
    if (!value) return "Just now";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "Just now";
    return d.toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filteredItems =
    filter === "unread" ? items.filter((n) => !n.isRead) : items;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-0.5 text-xs font-medium text-rose-700 border border-rose-200">
                {unreadCount} unread
              </span>
            )}
          </h1>
          {/* <p className="text-sm text-slate-500 mt-1">
            Stay updated with matches, messages, premium offers and security alerts.
          </p> */}
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5">
            <button
              className={`px-3 py-1 text-xs rounded-full transition ${
                filter === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full transition ${
                filter === "unread" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
              onClick={() => setFilter("unread")}
            >
              Unread
            </button>
          </div>

          <button
            className="px-3 py-1 rounded-full text-xs font-medium border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
            onClick={() => dispatch(markAllRead())}
          >
            Mark all as read
          </button>
        </div>
      </header>

      {/* ======================== */}
      {/* PROFILE + PREMIUM CARDS */}
      {/* ======================== */}

      <div className="grid gap-4 md:grid-cols-2">

        {/* ⭐ PROFILE CARD */}
        <div className="group rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-4 md:px-5 md:py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-sky-200">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center border border-sky-100 group-hover:scale-110 transition">
              <Gauge className="w-5 h-5 text-sky-500" />
            </div>
            <div className="flex-1">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                Profile Progress
              </p>

              {/* ⭐ NEW DATE LINE */}
              <p className="text-[11px] text-slate-500 mt-0.5">
                {formatDateTime(profileUpdatedAt)}
              </p>

              <h2 className="text-sm md:text-base font-semibold text-slate-900 mt-1">
                Your profile is {profileCompletion}% complete
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-1">
                Complete the remaining {remaining}% to unlock better match suggestions and more accurate recommendations.
              </p>

              <div className="mt-3">
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[11px] text-slate-500">
                  <span>Basic details</span>
                  <span>Photos & partner preferences</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  to="/app/profile"
                  className="inline-flex items-center gap-1 rounded-full bg-sky-600 hover:bg-sky-700 px-3 py-1 text-xs font-medium text-white"
                >
                  Complete profile
                  <ArrowRight size={14} />
                </Link>

                <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[11px] text-sky-700 border border-sky-100">
                  <Star className="w-3 h-3 text-amber-400" />
                  Better matches when profile is 100%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ PREMIUM CARD */}
        <div className="group rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-rose-50 px-4 py-4 md:px-5 md:py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-purple-200">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center border border-purple-100 group-hover:scale-110 transition">
              <Crown className="w-5 h-5 text-purple-500" />
            </div>

            <div className="flex-1">

              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
                  Premium Update
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-rose-600 border border-rose-100">
                  <Clock className="w-3 h-3" />
                  Offer ends in 5 days
                </span>
              </div>

              {/* ⭐ NEW DATE LINE */}
              <p className="text-[11px] text-slate-500 mt-0.5">
                {formatDateTime(premiumUpdatedAt)}
              </p>

              <h2 className="text-sm md:text-base font-semibold text-slate-900 mt-1">
                Limited time offer on Premium plans
              </h2>

              <p className="text-xs md:text-sm text-slate-600 mt-1">
                Get extra visibility, priority search ranking and direct chat access with our Premium membership.
              </p>

              <ul className="mt-2 space-y-1 text-[11px] md:text-xs text-slate-700">
                <li className="flex items-start gap-1.5">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-purple-400" />
                  Silver users can upgrade to <span className="font-semibold ml-1">Gold Premium</span> for advanced filters and read-receipt features.
                </li>

                <li className="flex items-start gap-1.5">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-purple-400" />
                  Exclusive profile highlight badge on cards and search results.
                </li>
              </ul>

              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  to="/app/premium"
                  className="inline-flex items-center gap-1 rounded-full bg-purple-600 hover:bg-purple-700 px-3 py-1 text-xs font-medium text-white"
                >
                  View Premium options
                  <ArrowRight size={14} />
                </Link>

                <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[11px] text-purple-700 border border-purple-100">
                  🎁 Special discount active now
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Notification List */}
      <div className="bg-white/90 backdrop-blur shadow-sm rounded-3xl border border-slate-100 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500 text-sm flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-1">
              <Sparkles className="w-5 h-5 text-slate-500" />
            </div>
            <p>No notifications to show.</p>
            <p className="text-xs text-slate-400">
              You’ll see interests, messages, offers and security alerts here.
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredItems.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                onClick={() => dispatch(markOneRead(n.id))}
                className={`px-4 md:px-6 py-4 cursor-pointer border-l-4 flex gap-3 md:gap-4 ${
                  n.isRead
                    ? "border-transparent bg-white hover:bg-slate-50"
                    : `${colors[n.type] || "border-slate-200 bg-slate-50"} hover:bg-opacity-80`
                }`}
              >
                <div className="mt-1 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center border border-slate-100">
                    {typeIcon(n.type)}
                  </div>
                  {!n.isRead && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base text-slate-900">
                        {n.title}
                      </h3>

                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {formatDateTime(n.createdAt)}
                      </p>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                      {typeLabel[n.type] || "General"}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 mt-1">
                    {n.message}
                  </p>

                  {n.actionUrl && (
                    <div className="flex items-center gap-1 mt-2 text-xs md:text-sm font-semibold text-rose-600">
                      <a href={n.actionUrl}>View details</a>
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
