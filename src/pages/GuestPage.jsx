import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, MapPin, Briefcase, User, Heart } from "lucide-react";

export default function GuestPage() {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState(null);

  const profiles = [
    {
      id: 1,
      name: "Anitha",
      age: 23,
      from: "Chennai",
      job: "Nurse",
      img: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      id: 2,
      name: "Karthik",
      age: 27,
      from: "Coimbatore",
      job: "Software Engineer",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 3,
      name: "Priya",
      age: 25,
      from: "Madurai",
      job: "Teacher",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      id: 4,
      name: "Rahul",
      age: 28,
      from: "Trichy",
      job: "Electrician",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 5,
      name: "Divya",
      age: 22,
      from: "Salem",
      job: "Designer",
      img: "https://randomuser.me/api/portraits/women/13.jpg",
    },
    {
      id: 6,
      name: "Vikram",
      age: 29,
      from: "Tirunelveli",
      job: "Bank Staff",
      img: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      id: 7,
      name: "Sneha",
      age: 24,
      from: "Bangalore",
      job: "HR Executive",
      img: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 8,
      name: "Daniel",
      age: 30,
      from: "Hyderabad",
      job: "Manager",
      img: "https://randomuser.me/api/portraits/men/14.jpg",
    },
    {
      id: 9,
      name: "Jasmine",
      age: 26,
      from: "Chennai",
      job: "Dentist",
      img: "https://randomuser.me/api/portraits/women/15.jpg",
    },
    {
      id: 10,
      name: "Sanjay",
      age: 27,
      from: "Delhi",
      job: "Business",
      img: "https://randomuser.me/api/portraits/men/15.jpg",
    },
  ];

  const handleSeeMore = () => {
    alert("Please login to see more profiles.");
    navigate("/login");
  };

  const handleSendInterest = () => {
    alert("Please login to send interest.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-5 text-[#e91e63] font-semibold hover:underline"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Heading */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Guest Profiles
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Showing <span className="font-semibold">10</span> sample matches
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 bg-white/60 backdrop-blur px-3 py-1.5 rounded-full border border-pink-100">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1" />
            Browse limited profiles as a guest
          </div>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {profiles.map((p) => (
            <div
              key={p.id}
              className="group relative bg-white rounded-2xl shadow-sm border border-pink-50 overflow-hidden hover:shadow-pink-200/80 hover:-translate-y-1 transition-all"
            >
              {/* Top Ribbon */}
              <div className="absolute top-3 left-3 z-10 bg-pink-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                Guest View
              </div>

              {/* Heart Icon (top-right) */}
              <button
                type="button"
                onClick={handleSendInterest}
                className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm hover:shadow-md border border-pink-100 hover:bg-pink-50 transition"
              >
                <Heart
                  size={16}
                  className="text-pink-500"
                  strokeWidth={2.2}
                />
              </button>

              {/* Photo */}
              <div className="pt-4 pb-2 flex justify-center">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-24 h-24 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Content */}
              <div className="px-3 pb-3">
                <h3 className="font-semibold text-base text-gray-900 text-center mt-1">
                  {p.name}, {p.age}
                </h3>

                <p className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                  <Briefcase size={14} className="text-gray-400" />
                  <span className="truncate max-w-[120px]">{p.job}</span>
                </p>

                <p className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{p.from}</span>
                </p>

                {/* Footer buttons */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProfile(p)}
                    className="flex-1 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-pink-500 text-white shadow-sm hover:bg-pink-600 transition"
                  >
                    View Profile
                  </button>

                  <button
                    type="button"
                    onClick={handleSendInterest}
                    className="hidden sm:inline-flex items-center justify-center text-[11px] font-medium px-2.5 py-1.5 rounded-full border border-pink-200 text-pink-500 hover:bg-pink-50 transition"
                  >
                    <Heart size={13} className="mr-1" />
                    Interest
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleSeeMore}
            className="px-7 py-2.5 rounded-full text-white font-semibold shadow-lg shadow-pink-200 hover:shadow-pink-300 transform hover:-translate-y-0.5 transition"
            style={{ backgroundColor: "#e91e63" }}
          >
            See More Profiles
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Login required to view full profiles &amp; contact details
          </p>
        </div>
      </div>

      {/* Popup Profile Details */}
      {selectedProfile && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Top Accent */}
            <div className="h-2 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-400" />

            {/* Close button */}
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
            >
              ✕
            </button>

            <div className="p-6 pt-7">
              {/* Header row */}
              <div className="flex gap-4 items-center">
                <img
                  src={selectedProfile.img}
                  alt={selectedProfile.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-md"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    {selectedProfile.name}
                    <span className="text-sm font-semibold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full">
                      Guest Preview
                    </span>
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                    <User size={16} className="text-gray-400" />
                    Age: <span className="font-semibold">{selectedProfile.age}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                    <Briefcase size={16} className="text-gray-400" />
                    {selectedProfile.job}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-gray-400">
                    Location
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} className="text-pink-500" />
                    {selectedProfile.from}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-gray-400">
                    Profile Type
                  </span>
                  <span>Sample Matrimony Profile</span>
                </div>

                <div className="flex flex-col gap-1 col-span-2">
                  <span className="text-xs uppercase tracking-wide text-gray-400">
                    Note
                  </span>
                  <span className="text-xs sm:text-[13px] text-gray-500">
                    You are browsing as a guest. Login or create an account to
                    send interest and view full details.
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleSendInterest}
                  className="w-full py-2.5 rounded-full font-semibold text-white flex items-center justify-center gap-2 shadow-md shadow-pink-200 bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 transition"
                >
                  <Heart size={18} className="text-white" />
                  Send Interest (Login Required)
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-2.5 rounded-full font-semibold text-pink-500 bg-pink-50 border border-pink-100 hover:bg-pink-100 transition text-sm"
                >
                  Login to Contact
                </button>

                <p className="text-[11px] text-center text-gray-400">
                  By logging in, you can view contact details, horoscope, family
                  information and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
