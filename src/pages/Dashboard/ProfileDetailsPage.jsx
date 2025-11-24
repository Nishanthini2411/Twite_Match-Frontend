// src/pages/Dashboard/ProfileDetailsPage.jsx

import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  User,
  Heart,
  Briefcase,
  Calendar,
  Ruler,
  Weight,
  Globe2,
  Users,
  BookOpen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function ProfileDetailsPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  // 👉 profile passed from card (HomePage / SearchPage etc.)
  const profileFromState = state || {};

  // ✅ fallback demo values (so page won't break if refresh / direct URL)
  const mergedProfile = {
    id: id || profileFromState.id || "M0001",
    name: profileFromState.name || "Demo Profile",
    age: profileFromState.age || 28,
    gender: profileFromState.gender || "Female",
    location: profileFromState.location || "Chennai, Tamil Nadu",
    occupation: profileFromState.occupation || "Software Engineer",
    match: profileFromState.match || 90,
    image:
      profileFromState.image ||
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    height: profileFromState.height || `5'4"`,
    weight: profileFromState.weight || "55 kg",
    religion: profileFromState.religion || "Hindu",
    caste: profileFromState.caste || "Naidu",
    maritalStatus: profileFromState.maritalStatus || "Single",
    education: profileFromState.education || "B.E. Computer Science",
    eduCountry: profileFromState.eduCountry || "India",
    university:
      profileFromState.university || "Anna University, Chennai (Sample)",
    company: profileFromState.company || "TCS (Sample)",
    income: profileFromState.income || "₹8,00,000 / year",
    incomeCurrency: profileFromState.incomeCurrency || "INR",
    familyType: profileFromState.familyType || "Nuclear",
    familyValues: profileFromState.familyValues || "Moderate",
    brothersMarried: profileFromState.brothersMarried || 0,
    brothersUnmarried: profileFromState.brothersUnmarried || 1,
    sistersMarried: profileFromState.sistersMarried || 1,
    sistersUnmarried: profileFromState.sistersUnmarried || 0,
    food: profileFromState.food || "Non-Vegetarian",
    hobbies:
      profileFromState.hobbies || [
        "Music",
        "Reading",
        "Movies",
        "Travel",
      ],
    partnerAgeMin: profileFromState.partnerAgeMin || 26,
    partnerAgeMax: profileFromState.partnerAgeMax || 32,
    partnerLocation:
      profileFromState.partnerLocation || "Tamil Nadu, India (Flexible)",
    partnerEducation:
      profileFromState.partnerEducation || "Any Degree, Prefer IT/Professional",
    partnerExpectations:
      profileFromState.partnerExpectations ||
      "Looking for a caring, understanding and family-oriented partner.",
  };

  const p = mergedProfile;

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
          >
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
              Profile Details
            </p>
            <h1 className="text-lg md:text-xl font-semibold text-slate-900 flex items-center gap-2">
              <User size={18} className="text-pink-600" />
              {p.name}
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                ID: {p.id}
              </span>
            </h1>
          </div>
        </div>

        {/* Match badge */}
        <div className="hidden sm:flex items-center gap-2 bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-full">
          <Heart className="text-pink-600 fill-pink-500" size={16} />
          <span className="text-xs font-semibold text-pink-700">
            {p.match}% Match
          </span>
        </div>
      </div>

      {/* MAIN LAYOUT: LEFT PROFILE CARD + RIGHT DETAILS */}
      <div className="grid lg:grid-cols-[1.1fr,1.6fr] gap-6">
        {/* LEFT: MAIN PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="relative">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-64 object-cover"
            />

            {/* gradient overlay bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

            {/* name + basic */}
            <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-1 text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold flex items-center gap-2">
                  {p.name}
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/15 border border-white/20">
                    {p.age} yrs • {p.gender}
                  </span>
                </p>
              </div>

              <p className="text-xs text-white/85 flex items-center gap-1">
                <MapPin size={14} /> {p.location}
              </p>

              <p className="text-xs text-white/85 flex items-center gap-1">
                <Briefcase size={14} /> {p.occupation} @ {p.company}
              </p>
            </div>

            {/* top-right match pill */}
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-pink-600/95 text-white text-xs font-semibold shadow-md flex items-center gap-1">
              <Heart size={14} className="fill-white" />
              {p.match}% Match
            </div>
          </div>

          {/* quick stats */}
          <div className="p-4 grid grid-cols-2 gap-3 text-xs text-slate-700 border-t border-slate-100">
            <StatPill icon={<Ruler size={14} />} label="Height" value={p.height} />
            <StatPill
              icon={<Weight size={14} />}
              label="Weight"
              value={p.weight}
            />
            <StatPill
              icon={<Globe2 size={14} />}
              label="Religion"
              value={`${p.religion} • ${p.caste}`}
            />
            <StatPill
              icon={<Calendar size={14} />}
              label="Marital Status"
              value={p.maritalStatus}
            />
          </div>

          {/* action buttons (you can wire later) */}
          <div className="p-4 flex flex-col sm:flex-row gap-3 border-t border-slate-100 bg-slate-50/60">
            <button className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-full bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition shadow-sm">
              <Heart size={15} className="fill-white" />
              Send Interest
            </button>
            <button className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-full border border-pink-200 text-pink-700 text-xs font-semibold bg-white hover:bg-pink-50 transition">
              <ShieldCheck size={15} />
              Shortlist Profile
            </button>
          </div>
        </div>

        {/* RIGHT: SECTIONS */}
        <div className="space-y-5">
          {/* BASIC INFO */}
          <SectionCard title="Basic Information">
            <TwoCol>
              <Field label="Full Name" value={p.name} />
              <Field label="Age / Gender" value={`${p.age} yrs • ${p.gender}`} />
              <Field label="Marital Status" value={p.maritalStatus} />
              <Field label="Location" value={p.location} />
              <Field label="Height" value={p.height} />
              <Field label="Weight" value={p.weight} />
              <Field label="Food Preference" value={p.food} />
            </TwoCol>
          </SectionCard>

          {/* EDUCATION & WORK */}
          <SectionCard
            title="Education & Career"
            icon={<BookOpen size={16} className="text-pink-600" />}
          >
            <TwoCol>
              <Field label="Highest Qualification" value={p.education} />
              <Field
                label="Studied In"
                value={`${p.university}, ${p.eduCountry}`}
              />
              <Field label="Occupation" value={p.occupation} />
              <Field label="Company" value={p.company} />
              <Field
                label="Annual Income"
                value={`${p.income} (${p.incomeCurrency})`}
              />
            </TwoCol>
          </SectionCard>

          {/* FAMILY & SIBLINGS */}
          <SectionCard
            title="Family & Siblings"
            icon={<Users size={16} className="text-pink-600" />}
          >
            <TwoCol>
              <Field label="Family Type" value={p.familyType} />
              <Field label="Family Values" value={p.familyValues} />
              <Field
                label="Brothers"
                value={`${p.brothersMarried} married • ${p.brothersUnmarried} unmarried`}
              />
              <Field
                label="Sisters"
                value={`${p.sistersMarried} married • ${p.sistersUnmarried} unmarried`}
              />
            </TwoCol>
          </SectionCard>

          {/* HOBBIES */}
          <SectionCard
            title="Hobbies & Interests"
            icon={<Sparkles size={16} className="text-pink-600" />}
          >
            {Array.isArray(p.hobbies) && p.hobbies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {p.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="px-3 py-1 rounded-full bg-pink-50 text-[11px] font-medium text-pink-700 border border-pink-100"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Hobbies and interests not added.
              </p>
            )}
          </SectionCard>

          {/* PARTNER PREFERENCES */}
          <SectionCard
            title="Partner Preferences"
            icon={<Heart size={16} className="text-pink-600" />}
          >
            <TwoCol>
              <Field
                label="Preferred Age"
                value={`${p.partnerAgeMin} – ${p.partnerAgeMax} yrs`}
              />
              <Field
                label="Preferred Location"
                value={p.partnerLocation}
              />
              <Field
                label="Preferred Education / Career"
                value={p.partnerEducation}
              />
            </TwoCol>
            <div className="mt-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold mb-1">
                Additional Expectations
              </p>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3 border border-slate-100">
                {p.partnerExpectations}
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small helper components ---------- */

function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        {icon && (
          <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center">
            {icon}
          </div>
        )}
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function TwoCol({ children }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
      {children}
    </div>
  );
}

function Field({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-0.5">
        {label}
      </p>
      <p className="text-xs text-slate-800">{value}</p>
    </div>
  );
}

function StatPill({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
          {label}
        </p>
        <p className="text-xs font-medium text-slate-800 truncate">{value}</p>
      </div>
    </div>
  );
}
