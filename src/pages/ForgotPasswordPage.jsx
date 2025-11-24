import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, X, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const sendOTP = (e) => {
    e.preventDefault();
    setShowOTP(true);
  };

  const verifyOTP = () => {
    if (otp.length === 6) {
      setShowOTP(false);
      setShowNewPass(true);
    }
  };

  const resetPassword = () => {
    if (newPass === confirmPass && newPass.trim().length >= 4) {
      alert("Password Updated Successfully!");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/bride-groom-holding-hands_79762-2001.avif')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* RESET PASSWORD CARD */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg bg-white/20 backdrop-blur-md 
        border border-white/30 shadow-2xl px-10 py-8 rounded-xl text-white"
      >
        <h1 className="text-3xl text-center font-light italic tracking-wider mb-3">
          Forgot Password
        </h1>

        <p className="text-center text-white/80 mb-6 text-sm">
          Enter your registered email to receive OTP.
        </p>

        {/* EMAIL FORM */}
        <form onSubmit={sendOTP} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/80" size={18} />
            <input
              type="email"
              required
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md bg-white/20 border border-white/40 
              placeholder-white/70 text-white focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <button
            className="w-full py-2 bg-[#ff5e6c] hover:bg-[#e44756] transition text-white 
            font-semibold rounded-md shadow-lg"
            type="submit"
          >
            Send OTP
          </button>
        </form>
      </motion.div>

      {/* OTP POPUP */}
      <AnimatePresence>
        {showOTP && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 
              shadow-2xl rounded-xl p-8 text-white"
            >
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                onClick={() => setShowOTP(false)}
              >
                <X size={22} />
              </button>

              <h2 className="text-center text-2xl font-semibold mb-3">
                Enter OTP
              </h2>

              <div className="relative">
                <KeyRound className="absolute left-3 top-3 text-white/80" size={18} />
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="••••••"
                  className="w-full pl-10 pr-3 py-3 rounded-md bg-white/20 border border-white/40 
                  text-center tracking-widest text-xl text-white placeholder-white/60 
                  focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <button
                onClick={verifyOTP}
                className="w-full mt-6 bg-[#ff5e6c] hover:bg-[#e44756] transition 
                text-white py-3 rounded-lg font-semibold shadow-lg"
              >
                Verify OTP
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW PASSWORD POPUP */}
      <AnimatePresence>
        {showNewPass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 
              shadow-2xl rounded-xl p-8 text-white"
            >
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                onClick={() => setShowNewPass(false)}
              >
                <X size={22} />
              </button>

              <h2 className="text-center text-2xl font-semibold mb-3">
                Reset Password
              </h2>

              <div className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-white/80" size={18} />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-md bg-white/20 border border-white/40 
                    text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-white/80" size={18} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-md bg-white/20 border border-white/40 
                    text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={resetPassword}
                className="w-full mt-6 bg-[#ff5e6c] hover:bg-[#e44756] transition 
                text-white py-3 rounded-lg font-semibold shadow-lg"
              >
                Update Password
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
