import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function NotificationBell({ onClick }) {
  const unreadCount = useSelector((s) =>
    s.notifications.items.filter((n) => !n.isRead).length
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-slate-100 transition"
    >
      {/* bell shake animation */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Bell className="w-6 h-6 text-slate-700" />
      </motion.div>

      {unreadCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow"
        >
          {unreadCount}
        </motion.span>
      )}
    </button>
  );
}
