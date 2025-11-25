import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPremium } from "../../store/slices/premiumSlice";
import { motion } from "framer-motion";
import {
  Crown,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Eye,
  Star,
} from "lucide-react";

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
    features: [
      "Unlimited interests",
      "Chat instantly with accepted matches",
      "Profile highlighted in search results",
      "See contact details of matches",
    ],
    isRecommended: true,
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "₹3,499 / 6 months",
    durationMonths: 6,
    highlight: "For premium, focused search",
    features: [
      "Top placement in your community",
      "Dedicated relationship manager (optional)",
      "Advanced search filters",
      "Early access to new features",
    ],
  },
];

export default function PremiumPage() {
  const dispatch = useDispatch();
  const premium = useSelector((s) => s.premium); // { isPremium, tier, expiresAt }

  const activePlan = useMemo(
    () => PLANS.find((p) => p.id === premium.tier),
    [premium.tier]
  );

  const handleChoosePlan = (plan) => {
    const now = new Date();
    const expires = new Date(now);
    expires.setMonth(expires.getMonth() + plan.durationMonths);

    dispatch(
      setPremium({
        isPremium: true,
        tier: plan.id,
        expiresAt: expires.toISOString(),
      })
    );
  };

  const formattedExpiry = premium.expiresAt
    ? new Date(premium.expiresAt).toLocaleDateString()
    : null;

  return (
    <div className="space-y-8">
      {/* Top section – current status */}
      <section className="flex flex-col lg:flex-row gap-6 items-start">
        <motion.div
          className="flex-1 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white p-6 md:p-7 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute -right-10 -top-10 opacity-20">
            <Crown size={120} />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 border border-white/20">
              <Crown className="w-6 h-6 text-yellow-300" />
            </span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Upgrade to Premium
              </h1>
              <p className="text-xs md:text-sm text-pink-50">
                Get more visibility, more responses, and faster matches.
              </p>
            </div>
          </div>

          {premium.isPremium ? (
            <div className="mt-3 space-y-1 text-sm">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span>
                  You are currently on{" "}
                  <span className="font-semibold capitalize">
                    {premium.tier} plan
                  </span>
                  .
                </span>
              </p>
              {formattedExpiry && (
                <p className="text-pink-50 text-xs">
                  Valid until <span className="font-semibold">{formattedExpiry}</span>.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-3 text-sm">
              <p className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-200" />
                <span>You are currently on a free plan.</span>
              </p>
              <p className="text-pink-50 text-xs mt-1">
                Choose a plan below to start enjoying premium matrimony benefits.
              </p>
            </div>
          )}
        </motion.div>

        {/* Small benefits list */}
        <motion.div
          className="w-full lg:w-72 rounded-2xl bg-white shadow-sm border border-slate-100 p-4 space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h2 className="text-sm font-semibold text-slate-900">
            Why go Premium?
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-pink-500 mt-[2px]" />
              <span>Your profile is shown on top in relevant matches.</span>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="w-4 h-4 text-blue-500 mt-[2px]" />
              <span>Chat instantly with matches who accept your interest.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-[2px]" />
              <span>Serious members recognise premium profiles quickly.</span>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Choose a plan
          </h2>
          <p className="text-xs text-slate-500">
            You can upgrade or change plan anytime.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => {
            const isActive = premium.isPremium && premium.tier === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative rounded-2xl border p-4 flex flex-col gap-3 bg-white shadow-sm ${
                  plan.isRecommended
                    ? "border-pink-300 ring-2 ring-pink-100"
                    : "border-slate-200"
                }`}
              >
                {plan.isRecommended && (
                  <span className="absolute -top-2 right-3 rounded-full bg-pink-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                    Most popular
                  </span>
                )}

                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    {plan.name}
                    {isActive && (
                      <span className="text-[10px] font-semibold rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5">
                        Current plan
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {plan.highlight}
                  </p>
                  <p className="text-base font-semibold text-pink-600 mt-2">
                    {plan.price}
                  </p>
                </div>

                <ul className="flex-1 space-y-1.5 text-xs text-slate-600 mt-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-[2px]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleChoosePlan(plan)}
                  className={`mt-2 w-full rounded-full text-xs font-semibold py-2.5 transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                      : "bg-pink-500 text-white hover:bg-pink-600"
                  }`}
                  disabled={isActive}
                >
                  {isActive ? "Selected" : "Choose this plan"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
