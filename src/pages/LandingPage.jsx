import { Link } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";

const features = [
  {
    title: "30 Day Money Back Guarantee",
    desc: "Get matched with someone special within 30 days, or we’ll refund your money—guaranteed!",
    icon: "₹",
    bg: "bg-[#E6F9FF]", // light cyan
  },
  {
    title: "Blue Tick to find your Green Flag",
    desc: "Did you know our blue-tick profiles get 40% more connection requests than others?",
    icon: "✔",
    bg: "bg-[#EAF4FF]", // light blue
  },
  {
    title: "Matchmaking Powered by AI",
    desc: "Cutting-edge technology with two decades of matchmaking expertise to help you find \"the one\".",
    icon: "AI",
    bg: "bg-[#E9F8FF]", // light teal
  },
];

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* NAVBAR */}
      <LandingNavbar />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section
          className="w-full h-[90vh] bg-cover bg-center flex items-center justify-end px-6 md:px-20 relative animate-fadeIn"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* RIGHT SIDE TEXT */}
          <div className="relative z-10 text-white max-w-xl space-y-5 text-right animate-slideUp">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
              Perfect Weddings
              <br />
              <span className="text-[#ffb3c6]">Happen Here!</span>
            </h1>

            <p className="text-sm md:text-lg drop-shadow">
              Find verified profiles, match with the right one and start your
              beautiful journey.
            </p>

            {/* BUTTONS RIGHT-ALIGNED */}
            <div className="flex justify-end gap-3">
              <Link
                to="/register"
                className="px-5 py-2 rounded-lg text-white font-semibold shadow-lg hover:scale-105 transition"
                style={{ backgroundColor: "#e91e63" }}
              >
                Register Free
              </Link>

              <Link
                to="/guest"
                className="px-5 py-2 rounded-lg border border-white text-white font-semibold shadow-lg hover:bg-white hover:text-black transition"
              >
                Guest View
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION – like screenshot */}
        <section className="w-full bg-[#FDF5F8] py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10 animate-fadeIn">
              Why families love PerfectMatch
            </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, index) => (
              <div
                key={f.title}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-7 flex flex-col justify-between animate-slideUp
                           hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 ${f.bg} rounded-2xl flex items-center justify-center mb-6 
                              shadow-sm group-hover:scale-105 transition-transform duration-300`}
                >
                  {f.icon === "AI" ? (
                    <span className="text-sm font-bold tracking-[0.15em] text-[#00A3FF]">
                      AI
                    </span>
                  ) : (
                    <span className="text-2xl text-[#00A3FF]">{f.icon}</span>
                  )}
                </div>

                {/* Title + Text */}
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>
      </main>

      {/* BOTTOM BAR / FOOTER – NEW STYLE */}
      <footer className="w-full">
        {/* Gradient CTA strip */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm uppercase tracking-widest opacity-90">
                Ready to begin your story?
              </p>
              <p className="text-lg md:text-xl font-semibold">
                Join thousands of happy couples on PerfectMatch.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-white text-pink-600 text-sm font-semibold shadow-md hover:bg-pink-50 transition"
              >
                Start Free Today
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-full border border-white/80 text-sm font-medium hover:bg-white/10 transition"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>

        {/* Small bottom line */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm text-gray-500">
            <p>© {new Date().getFullYear()} PerfectMatch Matrimony.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-pink-600">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-pink-600">
                Terms & Conditions
              </Link>
              <Link to="/help" className="hover:text-pink-600">
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
