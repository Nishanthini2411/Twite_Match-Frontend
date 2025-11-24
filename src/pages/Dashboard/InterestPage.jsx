import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Heart,
  XCircle,
  UserPlus,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ---------------- SAMPLE DATA ----------------

// Profiles who SENT interest to you
const receivedProfiles = [
  {
    id: "R101",
    name: "Sutharsana Devi",
    age: 23,
    location: "Chennai",
    status: "pending",
    img: "https://randomuser.me/api/portraits/women/11.jpg",
    images: [
      "https://randomuser.me/api/portraits/women/11.jpg",
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  {
    id: "R102",
    name: "Divya",
    age: 25,
    location: "Madurai",
    status: "accepted",
    img: "https://randomuser.me/api/portraits/women/17.jpg",
    images: [
      "https://randomuser.me/api/portraits/women/17.jpg",
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/3220376/pexels-photo-3220376.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  {
    id: "R103",
    name: "Lakshmi",
    age: 24,
    location: "Coimbatore",
    status: "pending",
    img: "https://randomuser.me/api/portraits/women/30.jpg",
    images: [
      "https://randomuser.me/api/portraits/women/30.jpg",
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
];

// Profiles YOU sent interest to
const sentProfiles = [
  {
    id: "S201",
    name: "Pavithra",
    age: 24,
    location: "Trichy",
    status: "pending",
    img: "https://randomuser.me/api/portraits/women/23.jpg",
    images: [
      "https://randomuser.me/api/portraits/women/23.jpg",
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  {
    id: "S202",
    name: "Vidha Shree",
    age: 26,
    location: "Salem",
    status: "accepted",
    img: "https://randomuser.me/api/portraits/women/19.jpg",
    images: [
      "https://randomuser.me/api/portraits/women/19.jpg",
      "https://images.pexels.com/photos/3220376/pexels-photo-3220376.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  {
    id: "S203",
    name: "Kavya",
    age: 22,
    location: "Erode",
    status: "pending",
    img: "https://randomuser.me/api/portraits/women/29.jpg",
    images: [
      "https://randomuser.me/api/portraits/women/29.jpg",
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
];

// ----------- ANIMATION VARIANTS -----------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.97,
    transition: { duration: 0.15 },
  },
};

const InterestPage = () => {
  const [mainTab, setMainTab] = useState("received"); // "received" | "sent"
  const [subTab, setSubTab] = useState("all"); // "all" | "pending" | "accepted"

  // modal + carousel state
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sourceList = mainTab === "received" ? receivedProfiles : sentProfiles;

  const profiles = useMemo(() => {
    if (subTab === "pending") {
      return sourceList.filter((p) => p.status === "pending");
    }
    if (subTab === "accepted") {
      return sourceList.filter((p) => p.status === "accepted");
    }
    return sourceList;
  }, [sourceList, subTab]);

  const mainLabel =
    mainTab === "received" ? "Interests Received" : "Interests Sent";

  const stats = useMemo(() => {
    const total = sourceList.length;
    const pending = sourceList.filter((p) => p.status === "pending").length;
    const accepted = sourceList.filter((p) => p.status === "accepted").length;
    return { total, pending, accepted };
  }, [sourceList]);

  // reset carousel index when opening a new profile
  useEffect(() => {
    if (selectedProfile) {
      setCurrentImageIndex(0);
    }
  }, [selectedProfile]);

  const getStatusBadge = (status) => {
    if (status === "accepted") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 size={12} />
          Accepted
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        Pending
      </span>
    );
  };

  const openProfileModal = (profile) => {
    setSelectedProfile(profile);
  };

  const closeProfileModal = () => {
    setSelectedProfile(null);
  };

  // --------- CAROUSEL HELPERS ----------
  const getCurrentImages = () => {
    if (!selectedProfile) return [];
    const imgs =
      selectedProfile.images && selectedProfile.images.length
        ? selectedProfile.images.slice(0, 4)
        : [selectedProfile.img];
    return imgs;
  };

  const handleNext = () => {
    const imgs = getCurrentImages();
    if (!imgs.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % imgs.length);
  };

  const handlePrev = () => {
    const imgs = getCurrentImages();
    if (!imgs.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
  };

  const currentImages = getCurrentImages();
  const currentImageUrl =
    currentImages.length > 0 ? currentImages[currentImageIndex] : null;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 p-3 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* HEADER + STATS */}
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                {mainLabel}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                View and manage your interest requests in one place.
              </p>
            </div>

            {/* Compact stats */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-white rounded-lg border border-slate-100 px-3 py-2 flex flex-col">
                <span className="text-[11px] text-slate-400 uppercase tracking-wide">
                  Total
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {stats.total}
                </span>
              </div>
              <div className="bg-white rounded-lg border border-slate-100 px-3 py-2 flex flex-col">
                <span className="text-[11px] text-slate-400 uppercase tracking-wide">
                  Pending
                </span>
                <span className="text-sm font-semibold text-amber-600">
                  {stats.pending}
                </span>
              </div>
              <div className="bg-white rounded-lg border border-slate-100 px-3 py-2 flex flex-col">
                <span className="text-[11px] text-slate-400 uppercase tracking-wide">
                  Accepted
                </span>
                <span className="text-sm font-semibold text-emerald-600">
                  {stats.accepted}
                </span>
              </div>
            </div>
          </div>

          {/* TABS BAR */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 md:p-4 flex flex-col gap-3">
            {/* Main tabs */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                Interest Center
              </div>

              <div className="relative inline-flex bg-slate-100 rounded-full p-1 text-xs md:text-[13px]">
                <button
                  onClick={() => setMainTab("received")}
                  className={`relative z-10 px-4 py-1.5 rounded-full flex items-center gap-1 transition ${
                    mainTab === "received"
                      ? "text-rose-600"
                      : "text-slate-600 hover:text-rose-600"
                  }`}
                >
                  {mainTab === "received" && (
                    <motion.span
                      layoutId="mainTabBg"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1">
                    <Heart size={14} />
                    <span>Received</span>
                  </span>
                </button>

                <button
                  onClick={() => setMainTab("sent")}
                  className={`relative z-10 px-4 py-1.5 rounded-full flex items-center gap-1 transition ${
                    mainTab === "sent"
                      ? "text-rose-600"
                      : "text-slate-600 hover:text-rose-600"
                  }`}
                >
                  {mainTab === "sent" && (
                    <motion.span
                      layoutId="mainTabBg"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1">
                    <UserPlus size={14} />
                    <span>Sent</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Sub tabs */}
            <div className="flex gap-2 text-xs md:text-sm">
              {["all", "pending", "accepted"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSubTab(tab)}
                  className={`relative px-3 py-1.5 rounded-full capitalize text-[11px] md:text-xs text-slate-600 transition ${
                    subTab === tab
                      ? "font-semibold text-rose-600"
                      : "hover:text-rose-600"
                  }`}
                >
                  {tab}
                  {subTab === tab && (
                    <motion.span
                      layoutId="subTabUnderline"
                      className="absolute left-2 right-2 -bottom-0.5 h-[2px] rounded-full bg-rose-500"
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LIST */}
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {profiles.length === 0 && (
            <motion.div
              className="bg-white border border-dashed border-slate-200 rounded-2xl py-10 flex flex-col items-center justify-center text-center shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mb-2">
                <Heart size={18} className="text-rose-500 animate-pulse" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                No profiles in this filter
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Try changing the filter or check again later.
              </p>
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4"
            >
              {profiles.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white border border-slate-100 rounded-2xl shadow-sm p-3 md:p-4 flex gap-3 md:gap-3 hover:shadow-md transition-shadow cursor-pointer h-full"
                  whileHover={{
                    y: -3,
                    boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
                  }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => openProfileModal(p)}
                >
                  {/* AVATAR */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-0">
                      {getStatusBadge(p.status)}
                    </div>
                  </div>

                  {/* DETAILS + ACTIONS */}
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-slate-900 text-sm md:text-base truncate">
                          {p.name}
                        </p>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {p.age} yrs
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {p.location}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                        {mainTab === "received"
                          ? "This profile has shown interest in you."
                          : "You have sent interest to this profile."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-1">
                      {mainTab === "received" ? (
                        <>
                          <button
                            className="inline-flex items-center justify-center px-3 py-1.5 text-[11px] md:text-xs rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition shadow-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <CheckCircle2 size={14} className="mr-1" />
                            Accept
                          </button>
                          <button
                            className="inline-flex items-center justify-center px-3 py-1.5 text-[11px] md:text-xs rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <XCircle size={14} className="mr-1" />
                            Decline
                          </button>
                        </>
                      ) : (
                        <div
                          className="inline-flex items-center gap-1 text-[11px] md:text-xs text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Heart size={13} />
                          Interest sent
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ---------- PROFILE IMAGE MODAL with CAROUSEL ---------- */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProfileModal}
          >
            <motion.div
              // 🔥 Smaller, nicely centered card
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-md md:max-w-lg max-h-[80vh] p-4 md:p-5 flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-slate-100 text-slate-500"
                onClick={closeProfileModal}
              >
                <X size={18} />
              </button>

              <div className="mb-3 pr-6">
                <h2 className="text-lg font-semibold text-slate-900 truncate">
                  {selectedProfile.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedProfile.age} yrs • {selectedProfile.location}
                </p>
              </div>

              {/* Carousel */}
              <div className="relative mt-2 flex-1 flex flex-col">
                <div className="w-full h-[320px] md:h-[380px] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {currentImageUrl && (
                      <motion.img
                        key={currentImageUrl}
                        src={currentImageUrl}
                        alt={selectedProfile.name}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Prev / Next controls */}
                {currentImages.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow hover:bg-white"
                      onClick={handlePrev}
                    >
                      <ChevronLeft size={18} className="text-slate-700" />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow hover:bg-white"
                      onClick={handleNext}
                    >
                      <ChevronRight size={18} className="text-slate-700" />
                    </button>
                  </>
                )}

                {/* Small dots indicator */}
                {currentImages.length > 1 && (
                  <div className="mt-3 flex justify-center gap-1.5">
                    {currentImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full ${
                          idx === currentImageIndex
                            ? "bg-rose-500"
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                  onClick={closeProfileModal}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InterestPage;
