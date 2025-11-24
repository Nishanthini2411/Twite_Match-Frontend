import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SuccessStories() {
  const [stories, setStories] = useState([
    {
      name: "Sneha & Rahul",
      text: "The detailed profiles and advanced search helped us find our perfect match. Highly recommended!",
      image: "pngtree-royal-indian-wedding-couple-image_17272717.jpg",
    },
    {
      name: "Priya & Arjun",
      text: "We found each other through this platform. We are now happily married!",
      image: "free-photos-just-married-muslim-wedding-couple-with-bouquet-photo---a-man-and-a-woman-likely-a-newly-married-cou-th-1004215578.jpg",
    },
    {
      name: "Aisha & Varun",
      text: "Thanks to PerfectMatch—our love story started here.",
      image: "ai-generated-happy-beautiful-and-indian-couple-smiling-looking-at-camera-while-standing-against-blurred-indian-free-photo.jpeg",
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [newImage, setNewImage] = useState("");

  const handleAddStory = () => {
    if (!newName || !newText || !newImage) return;

    setStories([
      ...stories,
      { name: newName, text: newText, image: newImage },
    ]);

    setShowAddModal(false);
    setNewName("");
    setNewText("");
    setNewImage("");
  };

  return (
    <div className="min-h-screen bg-pink-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* Title Row */}
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
              Success Stories
            </h1>
            <p className="text-gray-600 mb-10">
              Real couples who found love through{" "}
              <span className="text-pink-600 font-semibold">TwiteMatch</span>
            </p>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow hover:bg-pink-700"
          >
            + Add Story
          </button>
        </div>

        {/* Story Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-4 text-center cursor-pointer"
              onClick={() => setSelected(s)}
            >
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-56 object-cover rounded-lg"
              />
              <h3 className="font-semibold text-lg mt-3">{s.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{s.text.slice(0, 40)}...</p>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <NavLink
            to="/"
            className="px-5 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
          >
            ← Back to Home
          </NavLink>
        </div>
      </div>

      {/* ================= VIEW STORY MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50">
          <div
            className="relative rounded-3xl shadow-xl p-6 w-full max-w-md animate-fadeIn"
            style={{
              background: "linear-gradient(135deg, #fff5f9, #ffe7ef)",
              borderRadius: "30px",
            }}
          >
            {/* Close dot */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            </button>

            <div className="flex justify-center -mt-12 mb-3">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                style={{
                  boxShadow: "0 0 20px rgba(233, 30, 99, 0.3)",
                }}
              />
            </div>

            <h2 className="text-xl font-bold text-center text-gray-800">
              {selected.name}
            </h2>

            <p className="text-center text-gray-700 italic mt-3 px-4">
              “{selected.text}”
            </p>

            <div className="flex justify-center mt-4 text-yellow-400 text-xl tracking-wider">
              ★★★★★
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD STORY MODAL ================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-fadeIn shadow-xl">

            <h2 className="text-xl font-bold text-center mb-4 text-pink-600">
              Add New Story
            </h2>

            <input
              type="text"
              placeholder="Couple Name"
              className="w-full mb-3 p-2 border rounded-lg"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <textarea
              placeholder="Their Love Story"
              className="w-full mb-3 p-2 border rounded-lg"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            ></textarea>

            <input
              type="text"
              placeholder="Image URL"
              className="w-full mb-4 p-2 border rounded-lg"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="w-1/2 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleAddStory}
                className="w-1/2 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Add Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn .25s ease-out;
        }
      `}</style>
    </div>
  );
}
