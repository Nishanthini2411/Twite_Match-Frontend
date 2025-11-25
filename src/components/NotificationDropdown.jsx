import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  markOneRead,
  clearAll,
  removeOne,
} from "../store/slices/notificationsSlice";

const typeColors = {
  match: "border-pink-300 bg-pink-50",
  chat: "border-blue-300 bg-blue-50",
  verify: "border-yellow-300 bg-yellow-50",
  activity: "border-green-300 bg-green-50",
  payment: "border-purple-300 bg-purple-50",
  security: "border-red-300 bg-red-50",
};

export default function NotificationDropdown({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.notifications.items);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* click outside area */}
          <motion.div
            className="fixed inset-0 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white shadow-xl rounded-xl border z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-slate-900">
                Notifications
              </h3>
              {items.length > 0 && (
                <button
                  className="text-[11px] text-red-500 hover:underline"
                  onClick={() => dispatch(clearAll())}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* List */}
            <div className="py-2">
              {items.length === 0 && (
                <div className="px-4 py-6 text-xs text-slate-500 text-center">
                  No notifications yet.
                </div>
              )}

              {items.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 30, opacity: 0 }}
                  className={`relative mx-2 mb-2 rounded-lg border p-3 cursor-pointer ${
                    n.isRead
                      ? "bg-white border-slate-200"
                      : typeColors[n.type] || "bg-slate-50 border-slate-200"
                  }`}
                  onClick={() => dispatch(markOneRead(n.id))}
                >
                  {/* remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeOne(n.id));
                    }}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>

                  <h4 className="text-xs font-semibold text-slate-900 pr-5">
                    {n.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 pr-5">
                    {n.message}
                  </p>

                  {n.actionUrl && (
                    <a
                      href={n.actionUrl}
                      className="mt-2 inline-block text-[11px] font-semibold text-blue-600"
                    >
                      View
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
