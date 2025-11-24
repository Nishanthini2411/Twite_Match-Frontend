import { motion } from "framer-motion";
import { MapPin, Heart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileCard({ profile }) {
  const navigate = useNavigate();

  const openProfile = () => {
    navigate(`/app/profile-details/${profile.id}`, { state: profile });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden"
    >
      <div className="relative">
        <img
          src={profile.image}
          className="w-full h-52 object-cover"
          alt={profile.name}
        />

        {/* Pink Match Badge */}
        <div className="absolute bottom-2 right-2 px-3 py-1 bg-[#e91e63] text-white rounded-full shadow text-xs font-semibold">
          {profile.match}% Match
        </div>
      </div>

      <div className="p-4 space-y-1">
        {/* Name */}
        <p className="font-semibold text-slate-800 text-lg flex items-center gap-1">
          <User size={16} className="text-[#e91e63]" /> {profile.name}
        </p>

        {/* Age + Occupation */}
        <p className="text-sm text-slate-600">
          {profile.age} yrs •{" "}
          <span className="text-[#e91e63]">{profile.occupation}</span>
        </p>

        {/* Location */}
        <p className="text-sm text-slate-600 flex items-center gap-1">
          <MapPin size={15} className="text-[#e91e63]" /> {profile.location}
        </p>

        {/* Pink View Profile Button */}
        <button
          onClick={openProfile}
          className="mt-3 w-full py-2 rounded-lg bg-[#e91e63] text-white text-sm font-semibold hover:bg-[#d11655] transition flex items-center justify-center gap-2"
        >
          View Profile <Heart size={15} className="fill-white" />
        </button>
      </div>
    </motion.div>
  );
}
