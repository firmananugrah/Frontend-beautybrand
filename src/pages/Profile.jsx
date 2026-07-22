import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCamera,
  FaSave,
  FaBars,
  FaSignOutAlt,
  FaUser,
  FaEnvelope,
  FaSpa,
  FaExclamationCircle,
  FaCalendarAlt,
} from "react-icons/fa";

import ChatSidebar from "../components/ChatSidebar";
import { loadChatHistory, getProfile, getSkinProfile } from "../services/chatService";

const Profile = () => {

  const navigate = useNavigate();

  // ==========================
  // USER (dari localStorage)
  // ==========================

  const savedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userId = savedUser?.id;

  const [username, setUsername] = useState(savedUser.username || "");
  const [email, setEmail]       = useState(savedUser.email || "");
  const [password, setPassword] = useState("");
  const [photo, setPhoto]       = useState(localStorage.getItem("profilePhoto") || "");

  // ==========================
  // SKIN PROFILE (dari /skin-profile/{user_id})
  // field: skin_type, skin_problem, analysis_date
  // ==========================

  const [skinProfile, setSkinProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchSkinProfile = async () => {
    if (!userId) return;
    setProfileLoading(true);
    try {
      const data = await getSkinProfile(userId);
      if (data?.status && data.data) {
        setSkinProfile(data.data);
      } else {
        setSkinProfile(null); // belum pernah analisis
      }
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchSkinProfile();
  }, [userId]);

  // ==========================
  // SIDEBAR MOBILE
  // ==========================

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions]       = useState([]);
  const [sidebarLoading, setSidebarLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const fetch = async () => {
      setSidebarLoading(true);
      try {
        const data = await loadChatHistory(userId);
        if (data?.status) setSessions(data.chats || []);
      } finally {
        setSidebarLoading(false);
      }
    };
    fetch();
  }, [userId]);

  // ==========================
  // LOAD PHOTO
  // ==========================

  useEffect(() => {
    const img = localStorage.getItem("profilePhoto");
    if (img) setPhoto(img);
  }, []);

  // ==========================
  // HANDLE PHOTO
  // ==========================

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
      localStorage.setItem("profilePhoto", reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ==========================
  // SAVE PROFILE
  // ==========================

  const handleSave = () => {
    const updatedUser = { ...savedUser, username, email };
    if (password !== "") updatedUser.password = password;
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile berhasil diperbarui.");
  };

  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (!confirmLogout) return;
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("profilePhoto");
    navigate("/login");
  };

  // ==========================
  // FORMAT TANGGAL
  // ==========================

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });
  };

  // ==========================
  // 4 INFO CARDS
  // ==========================

  const infoCards = [
    {
      icon: <FaUser className="text-[#1A237E] text-xl" />,
      label: "Nama",
      value: skinProfile?.username || username || "-",
    },
    {
      icon: <FaEnvelope className="text-[#1A237E] text-xl" />,
      label: "Email",
      value: skinProfile?.email || email || "-",
    },
    {
      icon: <FaSpa className="text-[#1A237E] text-xl" />,
      label: "Jenis Kulit",
      value: skinProfile?.skin_type || "Belum dianalisis",
      empty: !skinProfile?.skin_type,
    },
    {
      icon: <FaExclamationCircle className="text-[#1A237E] text-xl" />,
      label: "Masalah Kulit",
      value: skinProfile?.skin_problem || "Belum dianalisis",
      empty: !skinProfile?.skin_problem,
    },
  ];

  // ==========================
  // RETURN
  // ==========================

  return (
    <div className="h-screen flex bg-[#F7F6FB] overflow-hidden">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <ChatSidebar
        sessions={sessions}
        activeSessionId={null}
        sidebarLoading={sidebarLoading}
        handleNewChat={() => navigate("/chatbot")}
        handleSelectChat={() => navigate("/chatbot")}
        handleDeleteChat={() => {}}
        handleRenameChat={() => {}}
        navigate={navigate}
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="bg-white h-[72px] border-b border-gray-200 flex items-center px-4 md:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4">
            <FaBars size={22} className="text-[#1A237E]" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A237E]">
            My Profile
          </h1>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* ================= 4 INFO CARDS ================= */}
            {profileLoading ? (
              <div className="flex items-center justify-center py-10 gap-3 text-gray-400">
                <div className="w-6 h-6 border-4 border-[#1A237E] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Memuat data profil...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {infoCards.map((card, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      {card.icon}
                      <span className="text-sm font-medium text-gray-500">
                        {card.label}
                      </span>
                    </div>
                    <p className={`text-lg font-bold leading-snug ${
                      card.empty ? "text-gray-400 italic" : "text-[#1A237E]"
                    }`}>
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tanggal analisis terakhir */}
            {skinProfile?.analysis_date && (
              <div className="bg-[#EEF0FF] rounded-2xl px-5 py-3 flex items-center gap-3">
                <FaCalendarAlt className="text-[#1A237E]" />
                <span className="text-sm text-[#1A237E] font-medium">
                  Analisis terakhir: {formatDate(skinProfile.analysis_date)}
                </span>
              </div>
            )}

            {/* ================= MAIN CARD ================= */}
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10">

              {/* FOTO */}
              <div className="flex flex-col items-center">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-[#1A237E]"
                  />
                ) : (
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#EEF0FF] flex items-center justify-center text-5xl font-bold text-[#1A237E]">
                    {username.charAt(0).toUpperCase()}
                  </div>
                )}

                <label className="mt-5 cursor-pointer bg-[#1A237E] hover:bg-[#11195E] text-white px-6 py-3 rounded-xl flex items-center gap-2 transition">
                  <FaCamera />
                  Upload Foto
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlePhoto}
                  />
                </label>
              </div>

              {/* INFO */}
              <div className="text-center mt-8">
                <h2 className="text-2xl font-bold">{username}</h2>
                <p className="text-gray-500 mt-2">{email}</p>
              </div>

              {/* FORM */}
              <div className="mt-10 space-y-6">

                <div>
                  <label className="block mb-2 font-medium">Nama Lengkap</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#1A237E]"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#1A237E]"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Password Baru</label>
                  <input
                    type="password"
                    placeholder="Kosongkan jika tidak ingin mengganti password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#1A237E]"
                  />
                </div>

              </div>

              {/* BUTTON */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">

                <button
                  onClick={handleSave}
                  className="w-full bg-[#1A237E] hover:bg-[#11195E] text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-3 transition"
                >
                  <FaSave />
                  Simpan Perubahan
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-3 transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;