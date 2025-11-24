import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Crown,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ProfileCard from "../../components/ProfileCard";

const recommended = [
  {
    id: 1,
    name: "Sanjay Kumar",
    age: 30,
    location: "Chennai",
    occupation: "Software Engineer",
    match: 90,
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
  {
    id: 2,
    name: "Anitha R",
    age: 27,
    location: "Coimbatore",
    occupation: "Doctor",
    match: 87,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    id: 3,
    name: "Praveen Raj",
    age: 29,
    location: "Madurai",
    occupation: "Bank Manager",
    match: 92,
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
  },
  {
    id: 4,
    name: "Lakshmi",
    age: 26,
    location: "Trichy",
    occupation: "Teacher",
    match: 89,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    id: 5,
    name: "Vignesh",
    age: 31,
    location: "Salem",
    occupation: "Entrepreneur",
    match: 93,
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
];

export default function HomePage() {
  const profile = useSelector((state) => state.profile);
  const premium = useSelector((state) => state.premium);

  const completion = Number(profile?.completion || 0);
  const isPremium = Boolean(premium?.isPremium);
  const tierLabel = premium?.tier || "Premium";
  const expiresAt = premium?.expiresAt || "—";

  return (
    <div className="space-y-8">

      {/* TOP ROW: PROFILE COMPLETION + PREMIUM STATUS */}
      <section className="grid lg:grid-cols-[2.1fr,1.2fr] gap-6">

        {/* PROFILE COMPLETION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm"
        >
          {/* soft gradient background */}
          <div className="absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(circle_at_top,_#ffe4f0,_transparent_55%),radial-gradient(circle_at_bottom,_#e0f2fe,_transparent_50%)]" />
          <div className="relative p-5 sm:p-6 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-stretch">

            {/* LEFT : TEXT + BUTTON */}
            <div className="flex-1">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-600">
                <CheckCircle2 size={14} />
                Profile Progress
              </p>

              <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-900">
                Boost your profile to get better matches
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md">
                Complete a few more details like family, career & partner
                preferences to appear on top of search results.
              </p>

              <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500 text-pink-600 text-xs sm:text-sm font-semibold bg-white/80 hover:bg-pink-50 transition shadow-sm">
                Complete Profile
                <ArrowRight size={14} />
              </button>
            </div>

            {/* RIGHT : CIRCULAR PROGRESS */}
            <div className="flex items-center justify-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                {/* base circle */}
                <div className="absolute inset-0 rounded-full border-4 border-pink-100" />

                {/* progress circle – using conic gradient */}
                <div
                  className="absolute inset-1 rounded-full bg-[conic-gradient(from_270deg,_#e91e63_0,_#ff2e74_var(--value),_#f3e8ff_var(--value))]"
                  style={{
                    "--value": `${Math.min(Math.max(completion, 0), 100)}%`,
                  }}
                />

                {/* inner white circle */}
                <div className="absolute inset-3 rounded-full bg-white flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-slate-900">
                    {completion}%
                  </span>
                  <span className="text-[11px] text-slate-500">
                    completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PREMIUM STATUS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative overflow-hidden rounded-2xl shadow-md bg-gradient-to-br from-[#e91e63] via-[#ff2e74] to-[#f97316] text-white"
        >
          {/* glossy overlay */}
          <div className="absolute inset-x-0 -top-16 h-28 bg-white/15 blur-2xl pointer-events-none" />
          <div className="relative p-5 sm:p-6 flex flex-col h-full">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 backdrop-blur">
                  <Crown size={18} className="text-yellow-300" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/75 font-semibold">
                    Premium Status
                  </p>
                  <p className="text-sm font-medium text-white/90">
                    Make your profile stand out
                  </p>
                </div>
              </div>
              <Sparkles size={20} className="text-yellow-200 hidden sm:block" />
            </div>

            {isPremium ? (
              <>
                <div className="mt-4 space-y-1">
                  <p className="text-lg font-semibold">
                    {tierLabel} Member
                  </p>
                  <p className="text-xs text-white/80">
                    Valid till <span className="font-medium">{expiresAt}</span>
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-white/85">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    Priority support
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={14} />
                    Top of search
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    Unlimited chats
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Crown size={14} />
                    Profile highlight
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="mt-4 text-sm leading-snug text-white/90">
                  You&apos;re currently on the{" "}
                  <span className="font-semibold">Free</span> plan. Unlock
                  contact details, priority visibility and advanced filters with
                  premium membership.
                </p>

                <div className="mt-5 flex flex-col gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="w-full py-2 rounded-full bg-white text-[#e91e63] font-semibold text-xs sm:text-sm shadow-md hover:bg-pink-50 transition"
                  >
                    View Premium Plans
                  </motion.button>
                  <p className="text-[11px] text-white/80 text-center">
                    Start with as low as <span className="font-semibold">₹299 / month</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* RECOMMENDATIONS SECTION */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 border border-pink-100">
              <Star className="text-yellow-500" size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Today&apos;s Recommendations
              </h2>
              <p className="text-[11px] text-slate-500">
                Handpicked profiles based on your preferences.
              </p>
            </div>
          </div>

          <button className="self-start sm:self-auto inline-flex items-center gap-1 text-[12px] font-semibold text-[#e91e63] hover:text-[#c2185b]">
            View all matches
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {recommended.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <ProfileCard profile={p} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
