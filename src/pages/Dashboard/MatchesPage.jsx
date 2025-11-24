import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  ChevronDown,
  ListFilter,
  CheckCircle2,
  X,
} from "lucide-react";

// 🌸 YOUR PROFILE (demo) – later replace with Redux data
const myProfile = {
  id: "ME0001",
  name: "My Profile",
  age: 24,
  height: `5'3"`,
  caste: "Nadar",
  edu: "B.Sc Computer Science",
  working: "Software Engineer",
  place: "Chennai",
  img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  religion: "Hindu",
  eating: "Non-vegetarian",
  horoscope: true,
  hobbies: ["Music", "Reading", "Movies"],
  languages: ["Tamil", "English"],
};

// 🌸 SAMPLE PROFILES – with extra details for matching
const allProfiles = [
  {
    id: "M8863015",
    name: "Selva Sapthika",
    age: 21,
    height: `5'0"`,
    caste: "Nadar",
    edu: "B.Com",
    working: "Not Working",
    place: "Thoothukudi",
    lastSeen: "2 hours ago",
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    premium: true,
    horoscope: true,
    new: true,
    seen: false,
    religion: "Hindu",
    eating: "Non-vegetarian",
    hobbies: ["Music", "Movies", "Languages"],
    languages: ["Tamil", "English"],
  },
  {
    id: "M9910021",
    name: "Sutharsana Devi",
    age: 23,
    height: `5'2"`,
    caste: "Naidu",
    edu: "B.Sc",
    working: "Teacher",
    place: "Chennai",
    lastSeen: "online",
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    premium: false,
    horoscope: true,
    new: false,
    seen: true,
    religion: "Hindu",
    eating: "Vegetarian",
    hobbies: ["Reading", "Languages", "Movies"],
    languages: ["Tamil", "English"],
  },
  {
    id: "M7723411",
    name: "Vinodhini",
    age: 25,
    height: `5'5"`,
    caste: "Pillai",
    edu: "MBA",
    working: "HR",
    place: "Madurai",
    lastSeen: "3 days ago",
    img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    premium: true,
    horoscope: false,
    new: true,
    seen: false,
    religion: "Hindu",
    eating: "Non-vegetarian",
    hobbies: ["Fitness", "Sports", "Music"],
    languages: ["Tamil", "English"],
  },
  {
    id: "M4501022",
    name: "Pavithra",
    age: 24,
    height: `5'3"`,
    caste: "Mudaliyar",
    edu: "B.Tech",
    working: "Software Engineer",
    place: "Coimbatore",
    lastSeen: "yesterday",
    img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg",
    premium: true,
    horoscope: true,
    new: false,
    seen: false,
    religion: "Hindu",
    eating: "Non-vegetarian",
    hobbies: ["Music", "Movies", "Fitness"],
    languages: ["Tamil", "English"],
  },
  {
    id: "M2201478",
    name: "Pooja",
    age: 22,
    height: `5'1"`,
    caste: "SC",
    edu: "B.A",
    working: "Not Working",
    place: "Trichy",
    lastSeen: "online",
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    premium: false,
    horoscope: true,
    new: false,
    seen: true,
    religion: "Christian",
    eating: "Non-vegetarian",
    hobbies: ["Music", "Reading"],
    languages: ["Tamil"],
  },
  {
    id: "M6604211",
    name: "Vidha Shree",
    age: 26,
    height: `5'4"`,
    caste: "Vanniyar",
    edu: "B.Sc",
    working: "Nurse",
    place: "Salem",
    lastSeen: "5 days ago",
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    premium: true,
    horoscope: false,
    new: false,
    seen: false,
    religion: "Hindu",
    eating: "Vegetarian",
    hobbies: ["Sports", "Fitness", "Languages"],
    languages: ["Tamil", "English"],
  },
];

const filterButtons = [
  { key: "sort", label: "Sort by age" },
  { key: "new", label: "Newly joined" },
  { key: "seen", label: "Not seen" },
  { key: "photo", label: "With photo" },
  { key: "horoscope", label: "With horoscope" },
  { key: "premium", label: "Premium only" },
];

// 🔍 Compare logic
function computeCompatibility(me, other) {
  const hobbyOverlap = (me.hobbies || []).filter((h) =>
    (other.hobbies || []).includes(h)
  );
  const languageOverlap = (me.languages || []).filter((l) =>
    (other.languages || []).includes(l)
  );

  const checks = [
    {
      label: "Religion",
      my: me.religion,
      their: other.religion,
      match: me.religion === other.religion,
    },
    {
      label: "Caste",
      my: me.caste,
      their: other.caste,
      match: me.caste === other.caste,
    },
    {
      label: "Eating Habits",
      my: me.eating,
      their: other.eating,
      match: me.eating === other.eating,
    },
    {
      label: "Education",
      my: me.edu,
      their: other.edu,
      match: me.edu === other.edu,
    },
    {
      label: "Occupation / Work",
      my: me.working,
      their: other.working,
      match: me.working === other.working,
    },
    {
      label: "Location",
      my: me.place,
      their: other.place,
      match: me.place === other.place,
    },
    {
      label: "Horoscope Preference",
      my: me.horoscope ? "Required" : "Not required",
      their: other.horoscope ? "Available" : "Not available",
      match: me.horoscope ? other.horoscope : true,
    },
    {
      label: "Hobbies",
      my: (me.hobbies || []).join(", ") || "-",
      their: (other.hobbies || []).join(", ") || "-",
      match: hobbyOverlap.length > 0,
      extra: hobbyOverlap.length
        ? `Common: ${hobbyOverlap.join(", ")}`
        : "No common hobbies",
    },
    {
      label: "Languages",
      my: (me.languages || []).join(", ") || "-",
      their: (other.languages || []).join(", ") || "-",
      match: languageOverlap.length > 0,
      extra: languageOverlap.length
        ? `Common: ${languageOverlap.join(", ")}`
        : "No common languages",
    },
  ];

  const matchedCount = checks.filter((c) => c.match).length;
  const percent = Math.round((matchedCount / checks.length) * 100);

  return { percent, checks };
}

export default function MatchesPage() {
  const [selectedTab, setSelectedTab] = useState("Regular");
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [compatResult, setCompatResult] = useState(null);

  // 🔔 state for interest + premium modal
  const [sentInterests, setSentInterests] = useState([]); // array of profile IDs
  const [premiumProfile, setPremiumProfile] = useState(null); // for message click

  // 🌟 Toggle Filter
  const toggleFilter = (key) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const matchesStats = useMemo(() => {
    return {
      total: allProfiles.length,
      newCount: allProfiles.filter((x) => x.new).length,
      unseenCount: allProfiles.filter((x) => !x.seen).length,
      premiumCount: allProfiles.filter((x) => x.premium).length,
    };
  }, []);

  // 🌟 Actual Filtering Logic
  const filteredProfiles = useMemo(() => {
    let p = [...allProfiles];

    if (activeFilters.includes("new")) p = p.filter((x) => x.new);
    if (activeFilters.includes("seen")) p = p.filter((x) => !x.seen);
    if (activeFilters.includes("photo")) p = p.filter((x) => x.img);
    if (activeFilters.includes("horoscope")) p = p.filter((x) => x.horoscope);
    if (activeFilters.includes("premium")) p = p.filter((x) => x.premium);

    if (activeFilters.includes("sort")) p.sort((a, b) => a.age - b.age);

    // later: change by selectedTab (Regular / Prime)
    return p;
  }, [activeFilters]);

  const openMatchView = (profile) => {
    const result = computeCompatibility(myProfile, profile);
    setCompatResult(result);
    setSelectedProfile(profile);
  };

  const closeMatchView = () => {
    setSelectedProfile(null);
    setCompatResult(null);
  };

  // ❤️ Send interest (fake UI only)
  const handleSendInterest = (profileId) => {
    setSentInterests((prev) =>
      prev.includes(profileId) ? prev : [...prev, profileId]
    );
    // later: API call / Redux dispatch here
  };

  // 💬 Open premium modal for chat
  const openPremiumModal = (profile) => {
    setPremiumProfile(profile);
  };

  const closePremiumModal = () => {
    setPremiumProfile(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-slate-50 min-h-full -m-4 md:-m-6 rounded-2xl">
      {/* ============ HEADER ============ */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-1">
            Matches
          </p>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">
            Compatible profiles for you
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Adjust filters to fine-tune the kind of partner you&apos;re looking
            for.
          </p>
        </div>

        {/* small stats pill row */}
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="px-3 py-1.5 rounded-full bg-white text-slate-800 border border-slate-200 font-medium">
            {matchesStats.total} total matches
          </span>
          <span className="px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 border border-pink-100">
            {matchesStats.newCount} new
          </span>
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            {matchesStats.unseenCount} not seen
          </span>
        </div>
      </div>

      {/* ============ TABS (REGULAR / PRIME) + SORT ============ */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-1">
        {/* Tabs */}
        <div className="inline-flex bg-white rounded-full p-1 border border-slate-200 shadow-sm">
          {["Regular", "Prime"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-1.5 text-xs sm:text-sm rounded-full transition font-medium ${
                selectedTab === tab
                  ? "bg-[#e91e63] text-white shadow"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sort pill */}
        <button
          onClick={() => toggleFilter("sort")}
          className={`flex items-center gap-1 text-[11px] sm:text-xs px-3 py-1.5 rounded-full border self-start sm:self-auto ${
            activeFilters.includes("sort")
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
          }`}
        >
          Sort: Age
          <ChevronDown size={14} />
        </button>
      </div>

      {/* ============ FILTER CHIPS ============ */}
      <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar px-1">
        <button className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-full bg-white hover:bg-pink-50 border-slate-200">
          <ListFilter size={16} />
          Filters
        </button>

        {filterButtons.map((f) => (
          <button
            key={f.key}
            onClick={() => toggleFilter(f.key)}
            className={`text-xs border px-3 py-1.5 rounded-full whitespace-nowrap transition ${
              activeFilters.includes(f.key)
                ? "bg-[#e91e63] text-white border-[#e91e63]"
                : "bg-white text-slate-700 hover:bg-pink-50 border-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ============ MATCH COUNT TEXT ============ */}
      <p className="text-[12px] text-slate-600 px-1">
        Showing{" "}
        <span className="font-semibold text-slate-900">
          {filteredProfiles.length}
        </span>{" "}
        profiles based on your{" "}
        <span className="text-[#e91e63] underline cursor-pointer">
          current preferences
        </span>
        .
      </p>

      {/* ============ PROFILE CARDS GRID ============ */}
      {filteredProfiles.length === 0 ? (
        <div className="mt-4 bg-white border border-dashed border-slate-200 rounded-2xl p-6 text-center text-sm text-slate-500">
          No profiles found with the selected filters. Try removing some
          filters or updating your preferences.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProfiles.map((m, i) => {
            const interestSent = sentInterests.includes(m.id);

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
              >
                {/* IMAGE + OVERLAY */}
                <div className="relative">
                  <img
                    src={
                      m.img ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    className="w-full h-52 object-cover"
                    alt={m.name}
                  />

                  {/* gradient overlay bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* name + age over image */}
                  <div className="absolute left-3 bottom-3 text-white">
                    <p className="text-sm font-semibold drop-shadow">
                      {m.name}
                    </p>
                    <p className="text-[11px] text-white/80">
                      {m.age} yrs • {m.height}
                    </p>
                  </div>

                  {/* badges top-left */}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {m.premium && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                        Premium
                      </span>
                    )}
                    {m.new && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        New
                      </span>
                    )}
                    {interestSent && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-pink-100 text-pink-800 border border-pink-200">
                        Interest sent
                      </span>
                    )}
                  </div>

                  {/* last seen badge */}
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px]">
                    Last seen {m.lastSeen}
                  </div>
                </div>

                {/* DETAILS */}
                <div className="flex-1 p-4 space-y-2">
                  {/* ID + verified */}
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] text-slate-500">
                      ID: <span className="font-medium">{m.id}</span>
                    </p>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 text-[10px] text-emerald-700">
                      <CheckCircle2 size={12} />
                      ID verified
                    </span>
                  </div>

                  <p className="text-[12px] text-slate-700">
                    {m.caste} • {m.edu}
                  </p>
                  <p className="text-[12px] text-slate-700">{m.working}</p>
                  <p className="text-[12px] text-slate-500">{m.place}</p>

                  {m.horoscope && (
                    <p className="text-[11px] inline-flex px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 mt-1">
                      Horoscope details available
                    </p>
                  )}
                </div>

                {/* ACTION BAR */}
                <div className="border-t border-slate-100 px-4 py-3 bg-slate-50/80 flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 rounded-full border border-slate-200 text-[11px] text-slate-700 hover:bg-slate-100"
                      onClick={() => openMatchView(m)}
                    >
                      Show match
                    </button>
                    <button
                      className={`px-4 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                        interestSent
                          ? "bg-slate-200 text-slate-600 cursor-default"
                          : "bg-[#e91e63] text-white hover:bg-[#d81b60]"
                      }`}
                      onClick={() => !interestSent && handleSendInterest(m.id)}
                      disabled={interestSent}
                    >
                      <Heart size={14} className={interestSent ? "" : "fill-white"} />
                      {interestSent ? "Interest sent" : "Send interest"}
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {/* <button
                      className="p-1.5 rounded-full border border-slate-200 bg-white hover:bg-pink-50"
                      onClick={() => handleSendInterest(m.id)}
                    >
                      <Heart className="text-[#e91e63]" size={16} />
                    </button> */}
                    <button
                      className="p-1.5 rounded-full border border-slate-200 bg-white hover:bg-emerald-50"
                      onClick={() => openPremiumModal(m)}
                    >
                      <MessageCircle className="text-emerald-600" size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ============ MATCH DETAILS OVERLAY (2 PROFILES) ============ */}
      <AnimatePresence>
        {selectedProfile && compatResult && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-4 md:p-6"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
            >
              {/* HEADER */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-1">
                    Match details
                  </p>
                  <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                    {myProfile.name} &amp; {selectedProfile.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Based on your hobbies, religion, eating habits, education,
                    work and more.
                  </p>
                </div>
                <button
                  onClick={closeMatchView}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>

              {/* TOP ROW – IMAGES + MATCH % */}
              <div className="grid md:grid-cols-[1.4fr,auto,1.4fr] items-center gap-4 md:gap-6 mb-6">
                {/* MY CARD */}
                <div className="bg-slate-50 rounded-2xl p-3 flex gap-3 items-center">
                  <img
                    src={
                      myProfile.img ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={myProfile.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {myProfile.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {myProfile.age} yrs • {myProfile.height}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {myProfile.caste} • {myProfile.edu}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {myProfile.place}
                    </p>
                  </div>
                </div>

                {/* MATCH % */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full bg-pink-50" />
                    <div
                      className="absolute inset-1 rounded-full bg-[conic-gradient(from_270deg,_#e91e63_0,_#ff2e74_var(--value),_#e5e7eb_var(--value))]"
                      style={{
                        "--value": `${compatResult.percent}%`,
                      }}
                    />
                    <div className="absolute inset-3 rounded-full bg-white flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-slate-900">
                        {compatResult.percent}%
                      </span>
                      <span className="text-[10px] text-slate-500">
                        match
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 text-center max-w-[140px]">
                    Higher % means more things in common.
                  </p>
                </div>

                {/* THEIR CARD */}
                <div className="bg-slate-50 rounded-2xl p-3 flex gap-3 items-center">
                  <img
                    src={
                      selectedProfile.img ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={selectedProfile.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {selectedProfile.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {selectedProfile.age} yrs • {selectedProfile.height}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {selectedProfile.caste} • {selectedProfile.edu}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {selectedProfile.place}
                    </p>
                  </div>
                </div>
              </div>

              {/* DETAILS TABLE */}
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="grid grid-cols-[1.3fr,0.6fr,1.3fr] text-[11px] font-semibold text-slate-500 px-2 pb-2">
                  <span>My details</span>
                  <span className="text-center">Match</span>
                  <span className="text-right">Their details</span>
                </div>

                <div className="space-y-2">
                  {compatResult.checks.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[1.3fr,0.6fr,1.3fr] items-center gap-2 px-2 py-2 rounded-xl bg-white"
                    >
                      <div>
                        <p className="text-[11px] text-slate-400 mb-0.5">
                          {row.label}
                        </p>
                        <p className="text-[12px] text-slate-800">
                          {row.my || "-"}
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        {row.match ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px]">
                            <CheckCircle2 size={12} />
                            Match
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200 text-[10px]">
                            No match
                          </span>
                        )}
                        {row.extra && (
                          <p className="text-[10px] text-slate-500 mt-0.5 text-center">
                            {row.extra}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-[11px] text-slate-400 mb-0.5">
                          {row.label}
                        </p>
                        <p className="text-[12px] text-slate-800">
                          {row.their || "-"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTIONS FOOTER */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-[11px] text-slate-500">
                  This is an indicative compatibility view. You can review full
                  profile details before taking any step.
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={closeMatchView}
                    className="px-3 py-1.5 rounded-full border border-slate-200 text-[11px] text-slate-700 hover:bg-slate-100"
                  >
                    Close
                  </button>
                  <button
                    className={`px-4 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                      sentInterests.includes(selectedProfile.id)
                        ? "bg-slate-200 text-slate-600 cursor-default"
                        : "bg-[#e91e63] text-white hover:bg-[#d81b60]"
                    }`}
                    onClick={() =>
                      !sentInterests.includes(selectedProfile.id) &&
                      handleSendInterest(selectedProfile.id)
                    }
                    disabled={sentInterests.includes(selectedProfile.id)}
                  >
                    <Heart
                      size={14}
                      className={
                        sentInterests.includes(selectedProfile.id)
                          ? ""
                          : "fill-white"
                      }
                    />
                    {sentInterests.includes(selectedProfile.id)
                      ? "Interest sent"
                      : "Send interest"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ PREMIUM PLANS MODAL (MESSAGE CLICK) ============ */}
      <AnimatePresence>
        {premiumProfile && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 md:p-6"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-1">
                    Premium required
                  </p>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Start chat with {premiumProfile.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Sending messages is a premium feature. Upgrade to view
                    contact details and start unlimited conversations.
                  </p>
                </div>
                <button
                  onClick={closePremiumModal}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>

              {/* mini profile row */}
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3 mb-4">
                <img
                  src={
                    premiumProfile.img ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={premiumProfile.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {premiumProfile.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {premiumProfile.age} yrs • {premiumProfile.place}
                  </p>
                </div>
              </div>

              {/* simple plans */}
              <div className="space-y-3 mb-4">
                <div className="border rounded-2xl p-3 flex justify-between items-center bg-pink-50/60 border-pink-200">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Gold – 1 month
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      View contact details &amp; send messages to limited
                      profiles per day.
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#e91e63]">
                    ₹299
                  </p>
                </div>

                <div className="border rounded-2xl p-3 flex justify-between items-center bg-white border-slate-200">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Diamond – 3 months
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Higher visibility, more daily contacts &amp; read
                      receipts.
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#e91e63]">
                    ₹699
                  </p>
                </div>

                <div className="border rounded-2xl p-3 flex justify-between items-center bg-slate-900 text-white">
                  <div>
                    <p className="text-sm font-semibold">
                      Platinum – 6 months
                    </p>
                    <p className="text-[11px] text-white/80 mt-0.5">
                      Top of search, unlimited chats &amp; profile highlight.
                    </p>
                  </div>
                  <p className="text-sm font-semibold">₹1199</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] text-slate-500 max-w-xs">
                  You can change or cancel your plan anytime from account
                  settings.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={closePremiumModal}
                    className="px-3 py-1.5 rounded-full border border-slate-200 text-[11px] text-slate-700 hover:bg-slate-100"
                  >
                    Not now
                  </button>
                  <button className="px-4 py-1.5 rounded-full bg-[#e91e63] text-white text-[11px] font-semibold hover:bg-[#d81b60]">
                    View premium plans
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
