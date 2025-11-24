import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, Ban, LogOut } from "lucide-react";

// Dummy Logged-In User
const userData = {
  email: "priya.sharma@example.com",
  password: "MySecretPassword",
};

// Dummy Block List
const blockListData = [
  {
    id: 1,
    name: "Arun Kumar",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    reason: "Unwanted messages",
  },
  {
    id: 2,
    name: "Divya",
    img: "https://randomuser.me/api/portraits/women/33.jpg",
    reason: "Profile mismatch",
  },
];

export default function AccountPage() {
  const [user, setUser] = useState(userData);

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [newPass, setNewPass] = useState("");

  const [showBlockList, setShowBlockList] = useState(false);
  const [blockList] = useState(blockListData);

  // Privacy Settings
  const [lastSeen, setLastSeen] = useState("Everyone");
  const [profilePhoto, setProfilePhoto] = useState("Everyone");
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out!");
    window.location.href = "/login";
  };

  const saveNewPassword = () => {
    if (newPass.trim().length < 4) return;
    setUser({ ...user, password: newPass });
    setShowPasswordPopup(false);
    setNewPass("");
  };

  return (
    <div className="space-y-6 p-4">

      <h1 className="text-lg font-semibold text-slate-900">My Account</h1>

      {/* ======================= ACCOUNT DETAILS ======================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-5 shadow border space-y-4 w-full"
      >
        <h2 className="text-sm font-semibold text-slate-800">Account Details</h2>

        {/* Email */}
        <div>
          <label className="text-[11px] text-slate-500 flex items-center gap-1">
            <Mail size={12} /> Email
          </label>
          <input
            value={user.email}
            readOnly
            className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-slate-600"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-[11px] text-slate-500 flex items-center gap-1">
            <Lock size={12} /> Password
          </label>

          <div className="flex items-center gap-2">
            <input
              type="password"
              value={user.password}
              readOnly
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100"
            />
            <button
              onClick={() => setShowPasswordPopup(true)}
              className="px-3 py-2 text-xs bg-[#e91e63] text-white rounded-lg mt-1 shadow hover:bg-pink-600"
            >
              Change
            </button>
          </div>
        </div>
      </motion.div>

      {/* ======================= PRIVACY SETTINGS ======================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-5 shadow border space-y-4 w-full"
      >
        <h2 className="text-sm font-semibold text-slate-800">Privacy Settings</h2>

        {/* Last Seen */}
        <div>
          <p className="text-[11px] text-slate-500 mb-1">Last Seen</p>
          <select
            className="w-full border rounded-lg p-2 text-xs"
            value={lastSeen}
            onChange={(e) => setLastSeen(e.target.value)}
          >
            <option>Everyone</option>
            <option>My Matches</option>
            <option>Nobody</option>
          </select>
        </div>

        {/* Profile Photo */}
        <div>
          <p className="text-[11px] text-slate-500 mb-1">Profile Photo</p>
          <select
            className="w-full border rounded-lg p-2 text-xs"
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
          >
            <option>Everyone</option>
            <option>My Matches</option>
            <option>Nobody</option>
          </select>
        </div>

        {/* Online Status */}
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-slate-700">Show Online Status</span>
          <input
            type="checkbox"
            checked={onlineStatus}
            onChange={() => setOnlineStatus(!onlineStatus)}
            className="w-4 h-4 accent-[#e91e63]"
          />
        </label>

        {/* Read Receipts */}
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-slate-700">Read Receipts</span>
          <input
            type="checkbox"
            checked={readReceipts}
            onChange={() => setReadReceipts(!readReceipts)}
            className="w-4 h-4 accent-[#e91e63]"
          />
        </label>

        <button
          onClick={() => setShowBlockList(true)}
          className="px-3 py-2 border rounded-lg text-xs text-slate-700 flex items-center gap-2 hover:bg-slate-50"
        >
          <Ban size={14} /> Block List
        </button>
      </motion.div>

      {/* ======================= DANGER ZONE ======================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-5 shadow border space-y-3 w-full"
      >
        <h2 className="text-sm font-semibold text-red-600">Danger Zone</h2>
        <button className="px-3 py-2 rounded-lg border border-red-500 text-red-600 text-xs hover:bg-red-50">
          Delete Account
        </button>
      </motion.div>

      {/* ======================= SIGN OUT BUTTON ======================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-slate-800 text-white rounded-lg flex items-center justify-center gap-2 text-sm shadow hover:bg-black"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </motion.div>

      {/* ====================================================== */}
      {/*             POPUP — CHANGE PASSWORD                   */}
      {/* ====================================================== */}
      <AnimatePresence>
        {showPasswordPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative"
            >
              <button
                onClick={() => setShowPasswordPopup(false)}
                className="absolute top-4 right-4 text-slate-600 hover:text-black"
              >
                <X size={20} />
              </button>

              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Change Password
              </h2>

              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Enter new password"
              />

              <button
                onClick={saveNewPassword}
                className="mt-4 w-full py-2 bg-[#e91e63] text-white rounded-lg shadow hover:bg-pink-600"
              >
                Save Password
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================== */}
      {/*             POPUP — BLOCK LIST                        */}
      {/* ====================================================== */}
      <AnimatePresence>
        {showBlockList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative"
            >
              <button
                onClick={() => setShowBlockList(false)}
                className="absolute top-4 right-4 text-slate-600 hover:text-black"
              >
                <X size={20} />
              </button>

              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Blocked Users
              </h2>

              {blockList.length === 0 ? (
                <p className="text-sm text-slate-500">No blocked users</p>
              ) : (
                <div className="space-y-3">
                  {blockList.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border"
                    >
                      <img
                        src={user.img}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Reason: {user.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
