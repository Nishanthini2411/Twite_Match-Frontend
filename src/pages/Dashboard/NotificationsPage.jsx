import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "lucide-react";

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.notifications.items);

  const [filter, setFilter] = useState("all"); // "all" | "unread"

  const unreadCount = useMemo(
    () => items.filter((n) => !n.isRead).length,
    [items]
  );

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

  // 🔹 Date + time formatter
  const formatDateTime = (value) => {
    if (!value) return "Just now";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "Just now";
    return d.toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
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
          <p className="text-sm text-slate-500 mt-1">
            Stay updated with matches, messages, security alerts and more.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter pills */}
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5">
            <button
              className={`px-3 py-1 text-xs rounded-full transition ${
                filter === "all"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full transition ${
                filter === "unread"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
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

      {/* Notification List */}
      <div className="bg-white/90 backdrop-blur shadow-sm rounded-3xl border border-slate-100 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500 text-sm flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-1">
              <Sparkles className="w-5 h-5 text-slate-500" />
            </div>
            <p>No notifications to show.</p>
            <p className="text-xs text-slate-400">
              You’ll see interests, messages and security alerts here.
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
                    : `${
                        colors[n.type] || "border-slate-200 bg-slate-50"
                      } hover:bg-opacity-80`
                }`}
              >
                {/* Left icon + unread dot */}
                <div className="mt-1 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center border border-slate-100">
                    {typeIcon(n.type)}
                  </div>
                  {!n.isRead && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  )}
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base text-slate-900">
                        {n.title}
                      </h3>
                      {/* 🔹 Date + time */}
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {formatDateTime(n.createdAt)}
                      </p>
                    </div>

                    {/* Type pill */}
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
