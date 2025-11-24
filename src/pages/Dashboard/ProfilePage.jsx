import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Camera, X } from "lucide-react";

// ------------- DEFAULT / FALLBACK PROFILE -------------
const defaultProfile = {
  basic: {
    firstName: "Priya",
    lastName: "Sharma",
    age: 23,
    skinTone: "Fair",
  },
  location: {
    country: "India",
    state: "Tamil Nadu",
    city: "Chennai",
  },
  education: {
    qualification: "B.Com",
    institute: "Madras University",
  },
  work: {
    occupation: "Accountant",
    income: "25,000 / month",
    company: "ABC Pvt Ltd",
  },

  // NEW Family object (must match Register)
  family: {
    father: "",
    mother: "",
    familyType: "",
    familyValues: "",
    familyStatus: "",
    specialBackground: "",
  },

  siblings: {
    brothersMarried: 0,
    brothersUnmarried: 0,
    sistersMarried: 0,
    sistersUnmarried: 0,
  },

  partner: {
    minAge: 24,
    maxAge: 28,
    country: "India",
    state: "Tamil Nadu",
    city: "Chennai",
  },

  contact: {
    phoneCode: "+91",
    phoneNumber: "9876543210",
  },

  heightWeight: {
    heightFromCm: 152,
    heightToCm: 165,
    weightFromKg: 50,
    weightToKg: 65,
  },

  eating: {
    foodType: "Non-Vegetarian",
  },

  religion: {
    religion: "Hindu",
    caste: "Nadar",
    dosham: "-",
    gothra: "-",
  },

  horoscope: {
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    nakshatra: "",
    raasi: "",
  },

  hobbies: {
    music: [],
    reading: [],
    sports: [],
    fitness: [],
    movies: [],
    languages: [],
    other: [],
  },
};

export default function ProfilePage() {
  // Load Profile
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem("matrimony_profile");
      if (stored) {
        const parsed = JSON.parse(stored);

        return {
          basic: { ...defaultProfile.basic, ...(parsed.basic || {}) },
          location: { ...defaultProfile.location, ...(parsed.location || {}) },
          education: { ...defaultProfile.education, ...(parsed.education || {}) },
          work: { ...defaultProfile.work, ...(parsed.work || {}) },

          family: {
            ...defaultProfile.family,
            ...(parsed.family || {}),
          },

          siblings: { ...defaultProfile.siblings, ...(parsed.siblings || {}) },

          partner: { ...defaultProfile.partner, ...(parsed.partner || {}) },

          contact: { ...defaultProfile.contact, ...(parsed.contact || {}) },

          heightWeight: {
            ...defaultProfile.heightWeight,
            ...(parsed.heightWeight || {}),
          },

          eating: { ...defaultProfile.eating, ...(parsed.eating || {}) },

          religion: { ...defaultProfile.religion, ...(parsed.religion || {}) },

          horoscope: {
            ...defaultProfile.horoscope,
            ...(parsed.horoscope || {}),
          },

          hobbies: { ...defaultProfile.hobbies, ...(parsed.hobbies || {}) },
        };
      }
    } catch (e) {
      console.error("Failed to parse stored profile:", e);
    }
    return defaultProfile;
  });

  const [isEditing, setIsEditing] = useState(false);

  /** --------------------- IMAGE UPLOAD ---------------------- **/
  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setPhotos(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
  };

  const handleChange = (section, key, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      localStorage.setItem("matrimony_profile", JSON.stringify(profile));
    }
    setIsEditing((prev) => !prev);
  };

  const formatList = (v) =>
    Array.isArray(v) ? (v.length ? v.join(", ") : "-") : v || "-";

  return (
    <div className="space-y-6 p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">My Profile</h1>
        <button
          onClick={handleToggleEdit}
          className="flex items-center gap-2 px-3 py-1 bg-pink-600 text-white rounded-lg text-xs shadow"
        >
          <Pencil size={14} />
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* --------------------- PHOTO GRID ---------------------- */}
      <PhotoGrid preview={preview} setPreview={setPreview} onUpload={handleImageUpload} />

      {/* ---------------- BASIC DETAILS ---------------- */}
      <Section title="Basic Details">
        {Object.entries(profile.basic).map(([key, val]) => (
          <InputRow
            key={key}
            label={toLabel(key)}
            value={val}
            editable={isEditing}
            onChange={(v) => handleChange("basic", key, v)}
          />
        ))}
      </Section>

      {/* ---------------- LOCATION ---------------- */}
      <Section title="Location">
        {Object.entries(profile.location).map(([key, val]) => (
          <InputRow
            key={key}
            label={toLabel(key)}
            value={val}
            editable={isEditing}
            onChange={(v) => handleChange("location", key, v)}
          />
        ))}
      </Section>

      {/* ---------------- CONTACT ---------------- */}
      <Section title="Contact / Phone">
        <InputRow
          label="Phone Number"
          value={`${profile.contact.phoneCode} ${profile.contact.phoneNumber}`}
          editable={isEditing}
          onChange={(v) => {
            const [code, ...num] = v.split(" ");
            handleChange("contact", "phoneCode", code);
            handleChange("contact", "phoneNumber", num.join(" "));
          }}
        />
      </Section>

      {/* ---------------- HEIGHT & WEIGHT ---------------- */}
      <Section title="Height & Weight">
        <InputRow label="Height Range" value={`${profile.heightWeight.heightFromCm} cm – ${profile.heightWeight.heightToCm} cm`} editable={false} />
        <InputRow label="Weight Range" value={`${profile.heightWeight.weightFromKg} kg – ${profile.heightWeight.weightToKg} kg`} editable={false} />
      </Section>

      {/* ---------------- EDUCATION ---------------- */}
      <Section title="Education">
        {Object.entries(profile.education).map(([key, val]) => (
          <InputRow
            key={key}
            label={toLabel(key)}
            value={val}
            editable={isEditing}
            onChange={(v) => handleChange("education", key, v)}
          />
        ))}
      </Section>

      {/* ---------------- WORK DETAILS ---------------- */}
      <Section title="Work Details">
        {Object.entries(profile.work).map(([key, val]) => (
          <InputRow
            key={key}
            label={toLabel(key)}
            value={val}
            editable={isEditing}
            onChange={(v) => handleChange("work", key, v)}
          />
        ))}
      </Section>

      {/* ---------------- EATING HABITS ---------------- */}
      <Section title="Eating Habits">
        <InputRow
          label="Food Preference"
          value={profile.eating.foodType}
          editable={isEditing}
          onChange={(v) => handleChange("eating", "foodType", v)}
        />
      </Section>

      {/* ---------------- RELIGION ---------------- */}
      <Section title="Religion Details">
        {Object.entries(profile.religion).map(([key, val]) => (
          <InputRow
            key={key}
            label={toLabel(key)}
            value={val}
            editable={isEditing}
            onChange={(v) => handleChange("religion", key, v)}
          />
        ))}
      </Section>

      {/* ---------------- HOROSCOPE ---------------- */}
      <Section title="Horoscope Details">
        {Object.entries(profile.horoscope).map(([key, val]) => (
          <InputRow
            key={key}
            label={toLabel(key)}
            value={val}
            editable={isEditing}
            onChange={(v) => handleChange("horoscope", key, v)}
          />
        ))}
      </Section>

      {/* ---------------- FAMILY DETAILS ---------------- */}
      <Section title="Family Details">
        {Object.entries(profile.family).map(([key, val]) => (
          <InputRow
            key={key}
            label={toLabel(key)}
            value={val || "-"}
            editable={isEditing}
            onChange={(v) => handleChange("family", key, v)}
          />
        ))}
      </Section>

      {/* ---------------- SIBLING DETAILS ---------------- */}
      <Section title="Sibling Details">
        {Object.entries(profile.siblings).map(([key, val]) => (
          <InputRow
            key={key}
            label={toLabel(key)}
            value={val}
            editable={isEditing}
            onChange={(v) => handleChange("siblings", key, v.replace(/\D/g, ""))}
          />
        ))}
      </Section>

      {/* ---------------- HOBBIES ---------------- */}
      <Section title="Hobbies & Interests">
        {Object.entries(profile.hobbies).map(([key, val]) => (
          <InputRow key={key} label={toLabel(key)} value={formatList(val)} editable={false} />
        ))}
      </Section>

      {/* ---------------- PARTNER PREFERENCES ---------------- */}
      <Section title="Partner Preferences">

        {/* ⭐ EDITABLE AGE SECTION (FIXED) */}
        <InputRow
          label="Preferred Age"
          value={`${profile.partner.minAge} to ${profile.partner.maxAge}`}
          editable={isEditing}
          onChange={(v) => {
            const [min, _to, max] = v.split(" ");
            handleChange("partner", "minAge", min);
            handleChange("partner", "maxAge", max);
          }}
        />

        <InputRow
          label="Preferred Country"
          value={profile.partner.country}
          editable={isEditing}
          onChange={(v) => handleChange("partner", "country", v)}
        />

        <InputRow
          label="Preferred State"
          value={profile.partner.state}
          editable={isEditing}
          onChange={(v) => handleChange("partner", "state", v)}
        />

        <InputRow
          label="Preferred City"
          value={profile.partner.city}
          editable={isEditing}
          onChange={(v) => handleChange("partner", "city", v)}
        />

      </Section>
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function PhotoGrid({ preview, setPreview, onUpload }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-4 rounded-xl shadow border">
      <h2 className="font-semibold text-slate-800 mb-3">Profile Photos</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {preview.map((src, i) => (
          <div key={i} className="relative group">
            <img src={src} className="w-full h-40 object-cover rounded-xl border shadow" />
            <button
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100"
              onClick={() => setPreview(preview.filter((_, idx) => idx !== i))}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {preview.length < 4 && (
          <label className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center h-40 cursor-pointer bg-slate-50 hover:bg-slate-100">
            <Camera size={26} className="text-slate-500" />
            <p className="text-xs text-slate-500 mt-1">Upload Photo</p>
            <input type="file" accept="image/*" multiple onChange={onUpload} className="hidden" />
          </label>
        )}
      </div>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-xl shadow border">
      <h2 className="font-semibold text-slate-800 mb-3">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </motion.div>
  );
}

function InputRow({ label, value, editable, onChange }) {
  return (
    <div>
      <p className="text-[11px] text-slate-500 mb-1">{label}</p>

      {editable ? (
        <input
          className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-pink-400"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <p className="text-sm font-medium text-slate-800">{value || "-"}</p>
      )}
    </div>
  );
}

const toLabel = (str) =>
  str.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
