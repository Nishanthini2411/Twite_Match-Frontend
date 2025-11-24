import { useSelector, useDispatch } from "react-redux";
import { markAllRead } from "../../store/slices/notificationsSlice";

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.notifications.items);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">Notifications</h1>
        <button
          className="btn-outline text-xs"
          onClick={() => dispatch(markAllRead())}
        >
          Mark all as read
        </button>
      </header>
      <div className="card divide-y divide-slate-100">
        {items.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-3 text-xs ${
              n.isRead ? "bg-white" : "bg-primary-50/60"
            }`}
          >
            {n.text}
          </div>
        ))}
      </div>
    </div>
  );
}