import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Circle, Search } from "lucide-react";

// ---------------- SAMPLE CHAT LIST ----------------
const chatUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    lastMsg: "Hi, how are you?",
    img: "https://randomuser.me/api/portraits/women/11.jpg",
    online: true,
    chat: [
      { from: "them", text: "Hi! How are you?" },
      { from: "me", text: "I'm good! What about you?" },
    ],
  },
  {
    id: 2,
    name: "Arun Kumar",
    lastMsg: "Let's talk this weekend.",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    online: false,
    chat: [
      { from: "them", text: "Hey there!" },
      { from: "them", text: "Let's talk this weekend." },
    ],
  },
  {
    id: 3,
    name: "Divya",
    lastMsg: "Good morning!",
    img: "https://randomuser.me/api/portraits/women/30.jpg",
    online: true,
    chat: [
      { from: "them", text: "Good morning! Have a great day!" },
      { from: "me", text: "You too!" },
    ],
  },
  {
    id: 4,
    name: "Kavya",
    lastMsg: "Can we talk?",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
    online: false,
    chat: [{ from: "them", text: "Can we talk?" }],
  },
  {
    id: 5,
    name: "Vignesh",
    lastMsg: "I'll call you later.",
    img: "https://randomuser.me/api/portraits/men/20.jpg",
    online: true,
    chat: [{ from: "them", text: "I'll call you later." }],
  },
];

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(chatUsers[0]);
  const [message, setMessage] = useState("");

  const filteredChats = chatUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!message.trim()) return;

    selectedChat.chat.push({
      from: "me",
      text: message,
    });

    setMessage("");
  };

  return (
    <div className="grid md:grid-cols-3 gap-4 h-[70vh]">

      {/* ---------------- LEFT: CHAT LIST ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-3 bg-white rounded-xl shadow-md border flex flex-col"
      >
        <h2 className="text-sm font-semibold text-slate-800 mb-2">Chats</h2>

        {/* SEARCH BAR */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-xs bg-slate-50 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        {/* CHAT USERS */}
        <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
          {filteredChats.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedChat(user)}
              className={`p-2 rounded-lg cursor-pointer flex items-center gap-3 transition ${
                selectedChat.id === user.id
                  ? "bg-pink-100 border border-pink-300"
                  : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              {/* Profile Pic */}
              <div className="relative">
                <img
                  src={user.img}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {user.online && (
                  <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
                )}
              </div>

              {/* Name + Last Msg */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {user.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {user.lastMsg}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ---------------- RIGHT: CHAT WINDOW ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-3 bg-white rounded-xl shadow-md border md:col-span-2 flex flex-col"
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 border-b pb-3 mb-3">
          <img
            src={selectedChat.img}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {selectedChat.name}
            </p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <Circle
                size={8}
                className={
                  selectedChat.online ? "text-green-500" : "text-slate-400"
                }
              />
              {selectedChat.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* CONVERSATION AREA */}
        <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar px-1">
          {selectedChat.chat.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`max-w-xs px-3 py-2 rounded-2xl text-xs shadow-sm ${
                  msg.from === "me"
                    ? "bg-[#e91e63] text-white rounded-br-sm"
                    : "bg-slate-100 text-slate-700 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* MESSAGE INPUT */}
        <div className="mt-3 flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-xs 
              focus:ring-2 focus:ring-pink-400 outline-none"
            placeholder="Type a message..."
          />

          <button
            onClick={sendMessage}
            className="bg-[#e91e63] text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition"
          >
            <Send size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
