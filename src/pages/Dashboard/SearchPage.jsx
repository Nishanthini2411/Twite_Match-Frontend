import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Heart, X, MessageCircle } from "lucide-react";

// ---------------- SAMPLE PROFILES (demo data) ----------------
const allProfiles = [
  {
    id: "P101",
    name: "Sutharsana Devi",
    age: 23,
    location: "Chennai",
    maritalStatus: "Never Married",
    religion: "Hindu",
    caste: "Nadar",
    star: "Mesha (Aries)",
    education: "Bachelor's",
    profession: "Software Engineer",
    income: "6L",
    eating: "Non-Veg",
    hobbies: ["Music", "Reading"],
    languages: ["Tamil", "English"],
    img: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    id: "P102",
    name: "Divya",
    age: 25,
    location: "Madurai",
    maritalStatus: "Never Married",
    religion: "Hindu",
    caste: "Naidu",
    star: "Rishaba (Taurus)",
    education: "Master's",
    profession: "Doctor",
    income: "12L",
    eating: "Veg",
    hobbies: ["Travel", "Cooking"],
    languages: ["Tamil", "English"],
    img: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    id: "P103",
    name: "Lakshmi",
    age: 24,
    location: "Coimbatore",
    maritalStatus: "Divorced",
    religion: "Christian",
    caste: "Nadar",
    star: "Mithuna (Gemini)",
    education: "Bachelor's",
    profession: "Teacher",
    income: "4L",
    eating: "Veg",
    hobbies: ["Drawing", "Movies"],
    languages: ["Tamil", "English"],
    img: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    id: "P104",
    name: "Pavithra",
    age: 22,
    location: "Trichy",
    maritalStatus: "Never Married",
    religion: "Hindu",
    caste: "Thevar",
    star: "Kadaga (Cancer)",
    education: "Diploma",
    profession: "Nurse",
    income: "3L",
    eating: "Non-Veg",
    hobbies: ["Dance", "Music"],
    languages: ["Tamil"],
    img: "https://randomuser.me/api/portraits/women/23.jpg",
  },
];

// --------- STATIC OPTIONS ---------

// 12 Raasi list
const RASI_LIST = [
  "Mesha (Aries)",
  "Rishaba (Taurus)",
  "Mithuna (Gemini)",
  "Kadaga (Cancer)",
  "Simha (Leo)",
  "Kanni (Virgo)",
  "Tula (Libra)",
  "Vrischika (Scorpio)",
  "Dhanusu (Sagittarius)",
  "Makara (Capricorn)",
  "Kumbha (Aquarius)",
  "Meena (Pisces)",
];

// Big language list
const LANGUAGE_LIST = [
  "Tamil",
  "English",
  "Hindi",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Urdu",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Punjabi",
  "Odia",
  "Assamese",
  "Konkani",
  "Tulu",
  "Rajasthani",
  "Bhojpuri",
  "Sindhi",
  "Arabic",
  "French",
  "German",
  "Spanish",
];

// 👉 FULL CASTE LIST (20+ items – customise as you like)
const CASTE_LIST = [
  "Nadar",
  "Naidu",
  "Thevar",
  "Pillai",
  "Vanniyar",
  "Gounder",
  "Mudaliar",
  "Chettiar",
  "Reddy",
  "Yadava",
  "Vellalar",
  "Nair",
  "Iyengar",
  "Iyer",
  "SC",
  "ST",
  "BC",
  "MBC",
  "OC",
  "Christian",
  "Muslim",
  "Jain",
  "Sindhi",
  "Others",
];

// Dynamic options from profiles (only for hobbies / profession)
const hobbyOptions = Array.from(
  new Set(allProfiles.flatMap((p) => p.hobbies))
);
const professionOptions = Array.from(
  new Set(allProfiles.map((p) => p.profession))
);

// ----------------------------------------------------------------

export default function SearchPage() {
  // Filter Toggles
  const [basicOpen, setBasicOpen] = useState(true);
  const [religionOpen, setReligionOpen] = useState(false);
  const [professionalOpen, setProfessionalOpen] = useState(false);
  const [lifestyleOpen, setLifestyleOpen] = useState(false);

  // Filter values
  const [ageFrom, setAgeFrom] = useState("");
  const [ageTo, setAgeTo] = useState("");
  const [location, setLocation] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");

  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [star, setStar] = useState("");

  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [income, setIncome] = useState("");

  const [eating, setEating] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [language, setLanguage] = useState("");

  // Search results
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // New: interest + modals
  const [sentInterests, setSentInterests] = useState({}); // { [id]: true }
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Helper: main filtering logic
  const applyFilters = () => {
    const filtered = allProfiles.filter((p) => {
      // BASIC
      if (ageFrom && p.age < Number(ageFrom)) return false;
      if (ageTo && p.age > Number(ageTo)) return false;
      if (
        location &&
        !p.location.toLowerCase().includes(location.toLowerCase().trim())
      )
        return false;
      if (maritalStatus && p.maritalStatus !== maritalStatus) return false;

      // RELIGION
      if (religion && p.religion !== religion) return false;
      if (caste && p.caste !== caste) return false;
      if (star && p.star !== star) return false;

      // PROFESSIONAL
      if (education && p.education !== education) return false;
      if (profession && p.profession !== profession) return false;
      if (income && !p.income.toLowerCase().includes(income.toLowerCase()))
        return false;

      // LIFESTYLE
      if (eating && p.eating !== eating) return false;
      if (hobbies && !p.hobbies.includes(hobbies)) return false;
      if (language && !p.languages.includes(language)) return false;

      return true;
    });

    setResults(filtered);
    setHasSearched(true);
  };

  const handleShowInterest = (profileId) => {
    setSentInterests((prev) => ({ ...prev, [profileId]: true }));
    // real app: call API to send interest
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Search</h1>
      </div>

      {/* BASIC FILTERS */}
      <FilterCard title="Basic Filters" open={basicOpen} setOpen={setBasicOpen}>
        <div className="grid md:grid-cols-3 gap-4 text-xs">
          {/* Age */}
          <div>
            <label className="font-medium text-slate-700">Age Range</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                placeholder="From"
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                value={ageFrom}
                onChange={(e) => setAgeFrom(e.target.value)}
              />
              <input
                type="number"
                placeholder="To"
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                value={ageTo}
                onChange={(e) => setAgeTo(e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="font-medium text-slate-700">Location</label>
            <input
              placeholder="Enter city or district"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="font-medium text-slate-700">Marital Status</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
            >
              <option value="">Any</option>
              <option>Never Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </div>
        </div>
      </FilterCard>

      {/* RELIGION FILTERS */}
      <FilterCard
        title="Religion Filters"
        open={religionOpen}
        setOpen={setReligionOpen}
      >
        <div className="grid md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-medium">Religion</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
            >
              <option value="">Any</option>
              <option>Hindu</option>
              <option>Christian</option>
              <option>Muslim</option>
              <option>Buddhist</option>
              <option>Jain</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Caste</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={caste}
              onChange={(e) => setCaste(e.target.value)}
            >
              <option value="">Any</option>
              {CASTE_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Raasi (12)</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={star}
              onChange={(e) => setStar(e.target.value)}
            >
              <option value="">Any</option>
              {RASI_LIST.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FilterCard>

      {/* PROFESSIONAL FILTERS */}
      <FilterCard
        title="Professional Filters"
        open={professionalOpen}
        setOpen={setProfessionalOpen}
      >
        <div className="grid md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-medium">Education</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            >
              <option value="">Any</option>
              <option>Bachelor's</option>
              <option>Master's</option>
              <option>PhD</option>
              <option>Diploma</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Profession</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            >
              <option value="">Any</option>
              {professionOptions.map((pr) => (
                <option key={pr} value={pr}>
                  {pr}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Annual Income</label>
            <input
              placeholder="e.g., 3L, 5L, 10L"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
        </div>
      </FilterCard>

      {/* LIFESTYLE FILTERS */}
      <FilterCard
        title="Lifestyle Filters"
        open={lifestyleOpen}
        setOpen={setLifestyleOpen}
      >
        <div className="grid md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-medium">Eating Habits</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={eating}
              onChange={(e) => setEating(e.target.value)}
            >
              <option value="">Any</option>
              <option>Veg</option>
              <option>Non-Veg</option>
              <option>Eggetarian</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Hobbies / Interests</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
            >
              <option value="">Any</option>
              {hobbyOptions.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Languages Known</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Any</option>
              {LANGUAGE_LIST.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FilterCard>

      {/* SHOW RESULTS BUTTON */}
      <div className="pt-2">
        <button
          className="w-full rounded-xl bg-pink-600 text-white py-3 text-sm font-semibold shadow hover:bg-pink-700"
          onClick={applyFilters}
        >
          Show Results
        </button>
      </div>

      {/* ---------------- SEARCH RESULTS SECTION ---------------- */}
      <div className="pt-2">
        <h2 className="text-sm font-semibold text-slate-800 mb-2">
          Search Results
        </h2>

        {!hasSearched && (
          <p className="text-xs text-slate-500">
            Apply filters and click{" "}
            <span className="font-medium">Show Results</span> to view matching
            profiles.
          </p>
        )}

        {hasSearched && results.length === 0 && (
          <div className="mt-3 text-xs text-slate-500 bg-white border border-dashed border-slate-200 rounded-xl p-4 text-center">
            No profiles found for the selected filters.
          </div>
        )}

        {hasSearched && results.length > 0 && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map((p) => {
              const isSent = sentInterests[p.id];

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 flex gap-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedProfile(p)}
                >
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {p.name}
                        </p>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {p.age} yrs
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin size={12} /> {p.location}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {p.religion} • {p.caste}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {p.education} • {p.profession}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Hobbies: {p.hobbies.join(", ")}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Languages: {p.languages.join(", ")}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500">
                        Eating: {p.eating}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isSent) handleShowInterest(p.id);
                          }}
                          disabled={isSent}
                          className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border ${
                            isSent
                              ? "bg-green-50 text-green-600 border-green-200 cursor-default"
                              : "bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100"
                          }`}
                        >
                          <Heart
                            size={12}
                            className={isSent ? "text-green-500" : ""}
                          />
                          {isSent ? "Interest Sent" : "Show Interest"}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPremiumModal(true);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                        >
                          <MessageCircle size={12} />
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ---------------- PROFILE DETAILS MODAL ---------------- */}
      {selectedProfile && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-5 relative">
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>

            <div className="flex gap-4">
              <div className="w-24 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={selectedProfile.img}
                  alt={selectedProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900">
                  {selectedProfile.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedProfile.age} yrs • {selectedProfile.location}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedProfile.religion} • {selectedProfile.caste}
                </p>
                <p className="text-xs text-slate-500">
                  Raasi: {selectedProfile.star}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <p>
                <span className="font-medium">Marital Status: </span>
                {selectedProfile.maritalStatus}
              </p>
              <p>
                <span className="font-medium">Education: </span>
                {selectedProfile.education}
              </p>
              <p>
                <span className="font-medium">Profession: </span>
                {selectedProfile.profession}
              </p>
              <p>
                <span className="font-medium">Income: </span>
                {selectedProfile.income}
              </p>
              <p>
                <span className="font-medium">Eating: </span>
                {selectedProfile.eating}
              </p>
              <p className="col-span-2">
                <span className="font-medium">Hobbies: </span>
                {selectedProfile.hobbies.join(", ")}
              </p>
              <p className="col-span-2">
                <span className="font-medium">Languages: </span>
                {selectedProfile.languages.join(", ")}
              </p>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setSelectedProfile(null)}
                className="px-3 py-1.5 text-xs rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowPremiumModal(true);
                }}
                className="px-3 py-1.5 text-xs rounded-full bg-pink-600 text-white hover:bg-pink-700 inline-flex items-center gap-1"
              >
                <MessageCircle size={12} />
                Chat (Premium)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- PREMIUM MODAL ---------------- */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-5 relative">
            <button
              onClick={() => setShowPremiumModal(false)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>

            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Upgrade to Premium
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Only premium members can start chat with profiles and see full
              contact details.
            </p>

            <div className="bg-pink-50 border border-pink-100 rounded-xl p-3 mb-3 text-xs text-slate-700">
              <p className="font-semibold text-pink-700 mb-1">
                Premium Benefits:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Unlimited chat with matches</li>
                <li>See who viewed your profile</li>
                <li>Priority listing in search results</li>
              </ul>
            </div>

            <button className="w-full bg-pink-600 text-white py-2.5 text-sm rounded-xl font-semibold hover:bg-pink-700">
              View Premium Plans
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------
// REUSABLE COLLAPSIBLE FILTER CARD COMPONENT
// ----------------------------------------------------------------
function FilterCard({ title, open, setOpen, children }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <h2 className="font-semibold text-sm">{title}</h2>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}
