import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  ArrowLeft,
  Crown,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";

// ************** PLAN DATA **************
const PLAN_DETAILS = {
  silver: {
    title: "Silver Plan",
    price: "₹799",
    duration: "1 Month",
    features: [
      "See who viewed your profile",
      "Send up to 25 interests / month",
      "Priority customer support",
    ],
    color: "from-gray-400 via-slate-400 to-gray-500",
  },
  gold: {
    title: "Gold Plan",
    price: "₹1,999",
    duration: "3 Months",
    features: [
      "Unlimited interests",
      "Instant chat access",
      "Highlighted profile visibility",
      "See contact details",
    ],
    color: "from-yellow-500 via-amber-500 to-orange-500",
  },
  platinum: {
    title: "Platinum Plan",
    price: "₹3,499",
    duration: "6 Months",
    features: [
      "Top placement in your community",
      "Dedicated relationship manager",
      "Advanced search filters",
      "Early access features",
    ],
    color: "from-purple-600 via-fuchsia-500 to-pink-500",
  },
};

export default function PaymentPage() {
  const [params] = useSearchParams();
  const plan = params.get("plan");
  const data = PLAN_DETAILS[plan];

  const [showForm, setShowForm] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!data) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-rose-50">
        <div className="p-8 bg-white shadow-xl rounded-3xl text-center border">
          <h1 className="text-xl font-bold text-rose-600">Invalid Plan</h1>
          <Link
            to="/app/premium"
            className="mt-4 inline-block px-4 py-2 rounded-full bg-rose-600 text-white text-sm"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  const handleConfirmPayment = () => {
    setShowForm(true);
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    setShowOtp(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 fixed inset-0">
      {/* HEADER */}
      <header className="w-full px-6 py-4 bg-white/80 backdrop-blur-lg shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/app/premium"
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="text-lg font-semibold text-slate-800">
            Secure Payment
          </h1>
          <div />
        </div>
      </header>

      <main className="flex justify-center px-4 py-6 overflow-y-auto h-[calc(100vh-70px)]">
        <div className="w-full max-w-4xl space-y-6">

          {/* PLAN CARD */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl shadow-xl border bg-white overflow-hidden"
          >
            <div
              className={`h-32 w-full bg-gradient-to-r ${data.color} relative flex items-center px-6`}
            >
              <Crown
                size={80}
                className="absolute right-3 bottom-2 opacity-20 text-white"
              />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white">
                  {data.title}
                </h2>
                <p className="text-sm text-white/80">
                  {data.duration} • One-time payment
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="p-4 bg-slate-50 rounded-2xl border">
                <p className="text-sm text-slate-600">Amount Payable</p>
                <p className="text-3xl font-bold text-slate-900">
                  {data.price}
                </p>
              </div>
            </div>
          </motion.div>

          {/* FEATURES */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-6 border shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              What’s Included
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-800">
              {data.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* PAYMENT */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-6 border shadow-sm space-y-4"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              Card Payment
            </h2>

            {!showForm && !isSuccess && (
              <button
                onClick={handleConfirmPayment}
                className="w-full rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700 transition"
              >
                Confirm Payment
              </button>
            )}

            {/* CARD FORM */}
            {showForm && !showOtp && !isSuccess && (
              <form onSubmit={handleCardSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  maxLength="16"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <input
                  type="text"
                  placeholder="Card Holder Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="border p-3 rounded-xl"
                    required
                  />

                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="border p-3 rounded-xl"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-indigo-600 text-white py-3 font-semibold"
                >
                  Proceed to OTP
                </button>
              </form>
            )}

            {/* OTP FORM */}
            {showOtp && !isSuccess && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border p-3 rounded-xl"
                  required
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-emerald-600 text-white py-3 font-semibold"
                >
                  Verify & Pay
                </button>
              </form>
            )}

            {/* SUCCESS */}
            {isSuccess && (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                <h2 className="text-lg font-bold mt-3 text-green-700">
                  Payment Successful ✅
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Your premium plan is now active
                </p>
                <Link
                  to="/app/dashboard"
                  className="inline-block mt-4 px-5 py-2 bg-emerald-600 text-white rounded-full text-sm"
                >
                  Go to Dashboard
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
