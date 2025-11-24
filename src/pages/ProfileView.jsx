// src/pages/ProfileView.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Heart,
  MessageCircle,
  Star,
  ShieldCheck,
  User,
  Briefcase,
  BookOpen,
  Home,
  Users,
  Sparkles,
} from "lucide-react";

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        {Icon && (
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-pink-50 text-pink-600">
            <Icon size={18} />
          </div>
        )}
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-[0.12em]">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {children}
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-400">
        {label}
      </span>
      <span className="text-sm text-slate-900">
        {value !== undefined && value !== null && value !== ""
          ? value
          : "—"}
      </span>
    </div>
  );
}

export default function ProfileView() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 We expect the full profile data from router state or API
  const profile = location.state?.profile || {};

  // Basic fallbacks
  const fullName =
    profile.name ||
    `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
    "Member Name";

  const age = profile.age || profile.basic_age || "—";
  const gender = profile.gender || profile.basic_gender || "—";
  const locationDisplay =
    profile.location ||
    [profile.city, profile.state, profile.country].filter(Boolean).join(", ") ||
    "—";

  const matchPercent = profile.match || profile.match_percent || 0;
  const isVerified = profile.isVerified || profile.verified || false;
  const memberId = profile.member_id || profile.profile_id || "MXXXXXXX";

  const mainPhoto =
    (profile.photos && profile.photos[0]) ||
    profile.image ||
    "https://via.placeholder.com/400x500.png?text=Profile+Photo";

  const hobbies =
    profile.hobbies && Array.isArray(profile.hobbies)
      ? profile.hobbies
      : profile.hobbies_text
      ? profile.hobbies_text.split(",").map((x) => x.trim())
      : [];

  return (
    <div className="min-h-screen bg-[#F8EEDF] px-4 py-6 md:px-8">
      {/* TOP BAR */}
      <div className="max-w-6xl mx-auto mb-4 flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-pink-600"
        >
          <ArrowLeft size={16} />
          Back to matches
        </button>

        <span className="text-[11px] px-3 py-1 rounded-full bg-white/70 border border-pink-100 text-slate-600">
          Profile ID: <span className="font-semibold">{memberId}</span>
        </span>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-md">
          {/* soft bg */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffe4f0,_transparent_55%),radial-gradient(circle_at_bottom,_#e0f2fe,_transparent_50%)] opacity-80 pointer-events-none" />
          <div className="relative p-5 sm:p-7 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* LEFT: PHOTO */}
            <div className="w-full max-w-xs mx-auto lg:mx-0">
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[3/4] bg-slate-100">
                <img
                  src={mainPhoto}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
                {/* match pill on photo */}
                <div className="absolute bottom-3 left-3 rounded-full bg-black/60 text-white text-xs px-3 py-1 flex items-center gap-1.5">
                  <Star size={14} className="text-yellow-300" />
                  <span>{matchPercent}% Match</span>
                </div>
                {isVerified && (
                  <div className="absolute top-3 left-3 rounded-full bg-green-600/90 text-white text-[11px] px-2.5 py-0.5 flex items-center gap-1">
                    <ShieldCheck size={14} />
                    Verified
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: INFO + ACTIONS */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {fullName}
                  </h1>
                  <span className="px-3 py-1 text-xs rounded-full bg-pink-50 text-pink-600 border border-pink-100">
                    {age !== "—" ? `${age} yrs` : "Age N/A"}
                  </span>
                  <span className="px-3 py-1 text-[11px] rounded-full bg-white/70 text-slate-700 border border-slate-200 flex items-center gap-1.5">
                    <User size={13} />
                    {gender}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-1">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} className="text-pink-500" />
                    {locationDisplay}
                  </span>
                  {profile.religion && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/70 border border-pink-50">
                      <Sparkles size={13} className="text-pink-500" />
                      {profile.religion} {profile.caste && `• ${profile.caste}`}
                    </span>
                  )}
                  {profile.occupation && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/70 border border-pink-50">
                      <Briefcase size={13} className="text-pink-500" />
                      {profile.occupation}
                    </span>
                  )}
                </div>

                {/* Summary */}
                {profile.summary && (
                  <p className="mt-2 text-sm text-slate-700 bg-white/70 rounded-xl p-3 border border-pink-50">
                    {profile.summary}
                  </p>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#e91e63] to-[#ff2e74] text-white text-sm font-semibold shadow-md hover:opacity-90">
                  <Heart size={16} />
                  Send Interest
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white text-[#e91e63] text-sm font-semibold border border-pink-300 hover:bg-pink-50 shadow-sm">
                  <MessageCircle size={16} />
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            {/* BASIC / PERSONAL */}
            <SectionCard title="Basic Details" icon={User}>
              <DetailRow label="Full Name" value={fullName} />
              <DetailRow label="Gender" value={gender} />
              <DetailRow
                label="Age"
                value={age !== "—" ? `${age} years` : "—"}
              />
              <DetailRow label="Marital Status" value={profile.marital_status} />
              <DetailRow label="Skin Tone" value={profile.skin_tone} />
              <DetailRow label="Profile For" value={profile.profile_for} />
              {profile.divorce_date && (
                <DetailRow
                  label="Divorce Date"
                  value={new Date(profile.divorce_date).toLocaleDateString()}
                />
              )}
            </SectionCard>

            {/* LOCATION */}
            <SectionCard title="Location" icon={MapPin}>
              <DetailRow label="Country" value={profile.country} />
              <DetailRow label="State" value={profile.state} />
              <DetailRow label="City" value={profile.city} />
              <DetailRow
                label="Living With Family"
                value={profile.living_with_family}
              />
              <DetailRow label="Native Place" value={profile.native_place} />
              <DetailRow label="Contact Number" value={profile.phone_number} />
            </SectionCard>

            {/* EDUCATION */}
            <SectionCard title="Education" icon={BookOpen}>
              <DetailRow label="Highest Qualification" value={profile.qualification} />
              <DetailRow label="Education Country" value={profile.edu_country} />
              <DetailRow label="University / College" value={profile.education_institute} />
              <DetailRow label="Field of Study" value={profile.field_of_study} />
              <DetailRow
                label="Where Studied"
                value={profile.where_studied}
              />
            </SectionCard>

            {/* WORK */}
            <SectionCard title="Work & Career" icon={Briefcase}>
              <DetailRow label="Occupation" value={profile.occupation} />
              <DetailRow
                label="Employment Type"
                value={profile.employment_type}
              />
              <DetailRow
                label="Company Name"
                value={profile.company_name}
              />
              <DetailRow
                label="Work Location"
                value={profile.work_location}
              />
              <DetailRow
                label="Monthly Income"
                value={
                  profile.monthly_income
                    ? `${profile.currency || "₹"} ${profile.monthly_income}`
                    : "—"
                }
              />
            </SectionCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            {/* FAMILY */}
            <SectionCard title="Family Details" icon={Home}>
              <DetailRow
                label="Father's Occupation"
                value={profile.father_occupation}
              />
              <DetailRow
                label="Mother's Occupation"
                value={profile.mother_occupation}
              />
              <DetailRow label="Family Type" value={profile.family_type} />
              <DetailRow label="Family Values" value={profile.family_values} />
              <DetailRow label="Family Status" value={profile.family_status} />
            </SectionCard>

            {/* SIBLINGS */}
            <SectionCard title="Sibling Details" icon={Users}>
              <DetailRow
                label="Brothers (Married)"
                value={profile.brothers_married}
              />
              <DetailRow
                label="Brothers (Unmarried)"
                value={profile.brothers_unmarried}
              />
              <DetailRow
                label="Sisters (Married)"
                value={profile.sisters_married}
              />
              <DetailRow
                label="Sisters (Unmarried)"
                value={profile.sisters_unmarried}
              />
            </SectionCard>

            {/* RELIGION & HOROSCOPE */}
            <SectionCard title="Religion & Horoscope" icon={Sparkles}>
              <DetailRow label="Religion" value={profile.religion} />
              <DetailRow label="Caste" value={profile.caste} />
              <DetailRow label="Dosham" value={profile.dosham} />
              <DetailRow label="Gothra" value={profile.gothra} />
              <DetailRow label="Date of Birth" value={profile.dob} />
              <DetailRow label="Birth Time" value={profile.birth_time} />
              <DetailRow label="Birth Place" value={profile.birth_place} />
              <DetailRow label="Raasi" value={profile.raasi} />
              <DetailRow label="Nakshatra" value={profile.nakshatra} />
            </SectionCard>

            {/* LIFESTYLE & HOBBIES */}
            <SectionCard title="Lifestyle & Interests" icon={Heart}>
              <DetailRow label="Food Preference" value={profile.food_choice} />
              <DetailRow label="Drinking" value={profile.drinking} />
              <DetailRow label="Smoking" value={profile.smoking} />
              <DetailRow label="Height" value={profile.height_cm && `${profile.height_cm} cm`} />
              <DetailRow label="Weight" value={profile.weight_kg && `${profile.weight_kg} kg`} />
              <div className="sm:col-span-2">
                <DetailRow
                  label="Hobbies & Interests"
                  value={
                    hobbies.length
                      ? hobbies.join(", ")
                      : profile.hobbies || "—"
                  }
                />
              </div>
            </SectionCard>

            {/* PARTNER PREFERENCES */}
            <SectionCard title="Partner Preferences" icon={ShieldCheck}>
              <DetailRow
                label="Preferred Age Range"
                value={
                  profile.partner_min_age && profile.partner_max_age
                    ? `${profile.partner_min_age} – ${profile.partner_max_age} years`
                    : "—"
                }
              />
              <DetailRow
                label="Preferred Height Range"
                value={
                  profile.partner_min_height && profile.partner_max_height
                    ? `${profile.partner_min_height} – ${profile.partner_max_height} cm`
                    : "—"
                }
              />
              <DetailRow
                label="Preferred Country"
                value={profile.partner_country}
              />
              <DetailRow
                label="Preferred State"
                value={profile.partner_state}
              />
              <DetailRow
                label="Preferred City"
                value={profile.partner_city}
              />
              <DetailRow
                label="Preferred Religion"
                value={profile.partner_religion}
              />
              <DetailRow
                label="Other Expectations"
                value={profile.partner_expectations}
              />
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
