import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPremium } from "../../store/slices/premiumSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Crown,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Eye,
  Star,
} from "lucide-react";

// ⭐ UPDATED PLANS — Platinum removed & merged into Gold
const PLANS = [
  {
    id: "silver",
    name: "Silver",
    price: "₹799 / 1 month",
    durationMonths: 1,
    highlight: "Best for quick trial",
    features: [
      "See who viewed your profile",
      "Send up to 25 interests / month",
      "Priority customer support",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "₹1,999 / 3 months",
    durationMonths: 3,
    highlight: "Most popular for serious matches",
    isRecommended: true,

    // ⭐ Gold + Platinum features merged
    features: [
      "Unlimited interests",
      "Chat instantly with accepted matches",
      "Profile highlighted in search results",
      "See contact details of matches",
      "Top placement in your community",
      "Dedicated relationship manager (optional)",
      "Advanced search filters",
      "Early access to new features",
    ],
  },
];

export default function PremiumPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const premium = useSelector((s) => s.premium);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [previewExpiry, setPreviewExpiry] = useState(null);

  const activePlan = useMemo(
    () => PLANS.find((p) => p.id === premium.tier),
    [premium.tier]
  );

  const formattedExpiry = premium.expiresAt
    ? new Date(premium.expiresAt).toLocaleDateString()
    : null;

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan.id);
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + plan.durationMonths);
    setPreviewExpiry(expiry.toLocaleDateString());
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ========================= */}
      {/*     TOP PREMIUM CARD     */}
      {/* ========================= */}
      <section className="flex flex-col lg:flex-row gap-6 items-start">
        <motion.div
          className="flex-1 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white p-6 md:p-7 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Background Icon */}
          <motion.div
            className="absolute -right-10 -top-10 opacity-20"
            initial={{ rotate: -15, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Crown size={130} />
          </motion.div>

          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 border border-white/20">
              <Crown className="w-6 h-6 text-yellow-300" />
            </span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
                Upgrade to Premium
              </h1>
              <p className="text-xs md:text-sm text-pink-50">
                Get more visibility, more responses, and faster matches.
              </p>
            </div>
          </div>

          {/* Already premium */}
          {premium.isPremium ? (
            <motion.div
              className="mt-3 space-y-1 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                You are on{" "}
                <span className="font-semibold capitalize">{premium.tier}</span> plan
              </p>
              {formattedExpiry && (
                <p className="text-pink-50 text-xs">Valid until {formattedExpiry}</p>
              )}
            </motion.div>
          ) : (
            <>
              <p className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-200" />
                You are on free plan
              </p>

              {previewExpiry && (
                <motion.p
                  className="text-white text-xs mt-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Selected plan valid till:{" "}
                  <span className="font-semibold">{previewExpiry}</span>
                </motion.p>
              )}
            </>
          )}
        </motion.div>

        {/* Why Premium? */}
        <motion.div
          className="w-full lg:w-72 rounded-2xl bg-white shadow-md border border-slate-100 p-5 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-sm font-semibold text-slate-900">Why go Premium?</h2>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-pink-500 mt-[2px]" />
              Your profile appears on top
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="w-4 h-4 text-blue-500 mt-[2px]" />
              Chat instantly with matches
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-[2px]" />
              Verified members trust premium profiles
            </li>
          </ul>
        </motion.div>
      </section>

      {/* ========================= */}
      {/*      PLAN CARDS          */}
      {/* ========================= */}
      <motion.section
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`relative rounded-2xl border p-5 flex flex-col gap-4 bg-white shadow-md transition-all ${
                  plan.isRecommended
                    ? "border-pink-300 ring-2 ring-pink-100"
                    : "border-slate-200"
                }`}
              >
                {plan.isRecommended && (
                  <span className="absolute -top-2 right-3 bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                    Most popular
                  </span>
                )}

                <h3 className="text-sm font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500">{plan.highlight}</p>
                <p className="text-lg font-semibold text-pink-600">
                  {plan.price}
                </p>

                <ul className="flex-1 space-y-2 text-xs text-slate-600">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-[2px]" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Choose button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChoosePlan(plan)}
                  className="mt-2 w-full rounded-full bg-pink-500 text-white text-xs font-semibold py-2.5 hover:bg-pink-600 transition"
                >
                  Choose this plan
                </motion.button>

                {/* Pay Now button */}
                {selectedPlan === plan.id && (
                  <motion.button
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/app/payment?plan=${plan.id}`)}
                    className="mt-1 w-full rounded-full bg-purple-600 text-white text-xs font-semibold py-2.5 hover:bg-purple-700 transition"
                  >
                    Pay Now
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
