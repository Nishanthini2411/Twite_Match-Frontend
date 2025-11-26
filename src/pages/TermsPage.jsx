import { Link } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";
// 🔸 IMPORTANT: path must match your folder + file name
import termsBanner from "../assets/terms-banner.jpg"; 

// Dynamic sections
const sections = [
  {
    id: "account",
    type: "standard",
    number: "01",
    icon: "👤",
    accent: "from-sky-500 to-blue-500",
    title: "Account & Profile Rules",
    description:
      "You agree to provide accurate, truthful, and up-to-date information while creating and maintaining your profile. You are responsible for all activity under your account and for keeping your login details confidential.",
  },
  {
    id: "membership",
    type: "standard",
    number: "02",
    icon: "💳",
    accent: "from-emerald-500 to-teal-500",
    title: "Membership & Payments",
    description:
      "Premium features, if purchased, are non-transferable. Pricing and benefits may change from time to time. Any refunds or cancellations will be handled as per our refund policy. By subscribing, you authorise us or our payment partners to charge you using the selected payment method.",
  },
  {
    id: "photos",
    type: "photo",
    number: "03",
    icon: "📸",
    accent: "from-amber-400 to-orange-500",
    title: "Photo Upload Guidelines",
    intro:
      "To keep profiles genuine and respectful, we strictly review all uploaded photos. Please follow these rules so that your photos are approved quickly.",
    notAllowedTitle: "Photos NOT Allowed",
    notAllowedItems: [
      {
        label: "Inappropriate or Indecent Photos",
        description:
          "Shirtless photos, nude or semi-nude photos, or photos in underwear, towel, or revealing clothing.",
      },
      {
        label: "Misleading or Fake Photos",
        description:
          "Photos of movie actors, models, celebrities, or any images downloaded from the internet, heavily edited or over-filtered photos, and AI-generated or animated pictures.",
      },
      {
        label: "Group or Irrelevant Photos",
        description:
          "Group photos with multiple people, photos of children, photos where your face is not clearly visible, or body-only / side-view photos.",
      },
    ],
    allowedTitle: "Photos Allowed",
    allowedItems: [
      {
        label: "Clear and Real Photos",
        description:
          "Your face should be clearly visible. Avoid sunglasses, masks, or face coverings. Do not use filters that distort your appearance.",
      },
      {
        label: "Proper Background",
        description:
          "Use a simple or plain background where you are clearly visible. Avoid busy, crowded, or distracting backgrounds.",
      },
      {
        label: "Recent and True-to-Life",
        description:
          "Upload recent photos taken within the last 6–12 months and make sure they represent your current appearance.",
      },
    ],
    noteTitle: "Important Note",
    notePoints: [
      "Photos can be rejected if they do not follow these rules.",
      "Upload privileges may be temporarily suspended after repeated violations.",
      "Accounts can be permanently restricted in case of serious or continuous misuse.",
    ],
  },
  {
    id: "misuse",
    type: "standard",
    number: "04",
    icon: "⚠️",
    accent: "from-rose-500 to-red-500",
    title: "Misuse & Account Suspension",
    description:
      "Any misuse of the platform, harassment, offensive messages, fraudulent activity, or repeated violation of our policies may result in a warning, temporary suspension, or permanent ban of your account. We reserve the right to review, restrict, or remove any profile or content that is reported or found to be unsafe or inappropriate.",
  },
];

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <LandingNavbar />

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          {/* TOP BANNER WITH IMAGE LIKE YOUR SAMPLE */}
          <div className="flex justify-center mb-8 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-md border border-gray-200 px-6 py-4 flex items-center gap-4">
              {/* Banner image */}
              <img
                src={termsBanner}
                alt="Terms & Conditions"
                className="h-14 w-auto object-contain"
              />

              {/* Text support (for small screens / SEO) */}
              <div className="flex flex-col">
                <span className="text-xs tracking-[0.25em] text-gray-400 uppercase">
                  PerfectMatch
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
                  <span className="text-red-700 drop-shadow-sm">TERMS</span>
                  <span className="mx-1 text-gray-800">&amp;</span>
                  <span className="text-red-700 drop-shadow-sm">
                    CONDITIONS
                  </span>
                </h1>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Simple rules to protect your privacy and keep the platform
                  safe.
                </p>
              </div>
            </div>
          </div>

          {/* Intro */}
          <p className="text-sm md:text-base text-gray-600 text-center max-w-3xl mx-auto mb-10 animate-slideUp">
            By creating an account or using PerfectMatch, you agree to follow
            these terms and guidelines. Please read them carefully before you
            proceed.
          </p>

          {/* SECTIONS */}
          <div className="space-y-8">
            {sections.map((sec, index) => {
              if (sec.type === "standard") {
                return (
                  <section
                    key={sec.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 animate-slideUp"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sec.accent} flex items-center justify-center text-white text-lg shadow-sm`}
                      >
                        {sec.icon}
                      </div>
                      <div>
                        {/* <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-1">
                          Section {sec.number}
                        </p> */}
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                          {sec.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {sec.description}
                    </p>
                  </section>
                );
              }

              if (sec.type === "photo") {
                return (
                  <section
                    key={sec.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 animate-slideUp"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sec.accent} flex items-center justify-center text-white text-lg shadow-sm`}
                      >
                        {sec.icon}
                      </div>
                      <div>
                        {/* <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-1">
                          Section {sec.number}
                        </p> */}
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                          {sec.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-gray-700 mb-5">
                      {sec.intro}
                    </p>

                    {/* Good photo chips */}
                    <div className="mb-6 flex flex-wrap gap-3">
                      {[
                        { icon: "🙂", text: "Face clearly visible" },
                        { icon: "🧍‍♀️", text: "Single person only" },
                        { icon: "🧱", text: "Simple background" },
                      ].map((chip) => (
                        <div
                          key={chip.text}
                          className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-xs md:text-sm text-emerald-800"
                        >
                          <span>{chip.icon}</span>
                          <span>{chip.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* ❌ Not allowed */}
                      <div className="rounded-2xl border border-red-100 bg-red-50/70 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">❌</span>
                          <h3 className="text-lg md:text-xl font-semibold text-red-700">
                            {sec.notAllowedTitle}
                          </h3>
                        </div>
                        <p className="text-sm md:text-base text-gray-700 mb-3">
                          The following types of photos are strictly prohibited:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700">
                          {sec.notAllowedItems.map((item) => (
                            <li key={item.label}>
                              <span className="font-semibold">
                                {item.label}:
                              </span>{" "}
                              {item.description}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* ✅ Allowed */}
                      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">✅</span>
                          <h3 className="text-lg md:text-xl font-semibold text-emerald-700">
                            {sec.allowedTitle}
                          </h3>
                        </div>
                        <p className="text-sm md:text-base text-gray-700 mb-3">
                          The following photo types are acceptable and
                          recommended:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700">
                          {sec.allowedItems.map((item) => (
                            <li key={item.label}>
                              <span className="font-semibold">
                                {item.label}:
                              </span>{" "}
                              {item.description}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* Note */}
                    <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/80 p-5 text-sm md:text-base text-gray-800 flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-white text-lg shrink-0">
                        ⚠️
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{sec.noteTitle}</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {sec.notePoints.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                );
              }

              return null;
            })}
          </div>

          {/* Back / CTA buttons */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              className="px-4 py-2 rounded-full border border-gray-300 text-sm md:text-base text-gray-700 hover:bg-gray-100 transition"
            >
              ← Back to Home
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-full bg-pink-500 text-white text-sm md:text-base font-medium hover:bg-pink-600 transition"
            >
              Create Your Profile
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs md:text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} PerfectMatch Matrimony. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-pink-600">
              Home
            </Link>
            <Link to="/privacy" className="hover:text-pink-600">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
