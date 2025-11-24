import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, X, KeyRound } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOTP(true);
  };

  const handleOTPSubmit = () => {
    navigate("/app/home");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('/bride-groom-holding-hands_79762-2001.avif')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* MAIN LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg bg-white/20 backdrop-blur-md border border-white/30 
        shadow-2xl px-10 py-8 rounded-xl text-white"
      >
        {/* HEADER TITLE */}
        <h1 className="text-3xl text-center font-light italic tracking-wider mb-3">
          Matrimony Login Form
        </h1>

        <h2 className="text-center text-xl font-semibold mb-6">
          Login Now
        </h2>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* USERNAME */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-white/80" size={18} />
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md bg-white/20 border border-white/40 
              placeholder-white/70 text-white focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/80" size={18} />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md bg-white/20 border border-white/40 
              placeholder-white/70 text-white focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* OPTIONS */}
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-pink-500" />
              Remember Me
            </label>

          <Link
  to="/forgot-password"
  className="cursor-pointer hover:underline text-white/90"
>
  Forgot Password?
</Link>

          </div>

          {/* LOGIN BUTTON */}
          <button
            className="w-full py-2 bg-[#ff5e6c] hover:bg-[#e44756] transition text-white 
            font-semibold rounded-md shadow-lg"
            type="submit"
          >
            Log In
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs mt-6 text-white/90">
          © 2025 Matrimony Login Form. All rights reserved.
        </p>
      </motion.div>

      {/* OTP POPUP UI (MATCHED THEME) */}
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
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                onClick={() => setShowOTP(false)}
              >
                <X size={22} />
              </button>

              {/* Title */}
              <h2 className="text-center text-2xl font-semibold mb-3">
                OTP Verification
              </h2>

              <p className="text-center text-white/80 mb-6 text-sm">
                Enter the 6-digit OTP sent to your registered number.
              </p>

              {/* OTP FIELD */}
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

              {/* VERIFY BUTTON */}
              <button
                onClick={handleOTPSubmit}
                className="w-full mt-6 bg-[#ff5e6c] hover:bg-[#e44756] transition 
                text-white py-3 rounded-lg font-semibold shadow-lg"
              >
                Verify OTP
              </button>

              {/* Resend */}
              <p className="text-center text-white/80 text-xs mt-4">
                Didn't receive the OTP?{" "}
                <span className="text-pink-300 cursor-pointer hover:underline">
                  Resend
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
