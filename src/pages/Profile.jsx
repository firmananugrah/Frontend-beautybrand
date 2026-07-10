import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCamera,
  FaSave,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

import ChatSidebar from "../components/ChatSidebar";
import { loadChatHistory } from "../services/chatService";

const Profile = () => {

  const navigate = useNavigate();

  // ==========================
  // SIDEBAR MOBILE
  // ==========================

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // ==========================
  // USER
  // ==========================

  const savedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [username, setUsername] =
    useState(savedUser.username || "");

  const [email, setEmail] =
    useState(savedUser.email || "");

  const [password, setPassword] =
    useState("");

  const [photo, setPhoto] =
    useState(
      localStorage.getItem("profilePhoto") || ""
    );


  // ==========================
  // SESSIONS (untuk sidebar)
  // ==========================

  const [sessions, setSessions] = useState([]);
  const [sidebarLoading, setSidebarLoading] = useState(false);

  useEffect(() => {
    const userId = savedUser?.id;
    if (!userId) return;

    const fetchSessions = async () => {
      setSidebarLoading(true);
      try {
        const data = await loadChatHistory(userId);
        if (data?.status) setSessions(data.chats || []);
      } finally {
        setSidebarLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // ==========================
  // LOAD PHOTO
  // ==========================

  useEffect(() => {

    const img =
      localStorage.getItem("profilePhoto");

    if (img) {

      setPhoto(img);

    }

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

      localStorage.setItem(
        "profilePhoto",
        reader.result
      );

    };

    reader.readAsDataURL(file);

  };

  // ==========================
  // SAVE PROFILE
  // ==========================

  const handleSave = () => {

    const updatedUser = {

      ...savedUser,

      username,

      email,

    };

    if (password !== "") {

      updatedUser.password = password;

    }

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile berhasil diperbarui.");

  };

  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Apakah Anda yakin ingin logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("profilePhoto");

    navigate("/login");

  };

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

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mr-4"
          >

            <FaBars
              size={22}
              className="text-[#1A237E]"
            />

          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-[#1A237E]">

            My Profile

          </h1>

        </div>

        {/* BODY */}

        <div className="flex-1 overflow-y-auto p-4 md:p-8">

          <div className="max-w-3xl mx-auto">

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

                <h2 className="text-2xl font-bold">

                  {username}

                </h2>

                <p className="text-gray-500 mt-2">

                  {email}

                </p>

              </div>

              {/* FORM */}

              <div className="mt-10 space-y-6">

                                <div>

                  <label className="block mb-2 font-medium">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    className="w-full border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#1A237E]"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#1A237E]"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium">
                    Password Baru
                  </label>

                  <input
                    type="password"
                    placeholder="Kosongkan jika tidak ingin mengganti password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="w-full border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#1A237E]"
                  />

                </div>

              </div>

              {/* BUTTON */}

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">

                <button
                  onClick={handleSave}
                  className="
                    w-full
                    bg-[#1A237E]
                    hover:bg-[#11195E]
                    text-white
                    py-4
                    rounded-xl
                    font-semibold
                    flex
                    justify-center
                    items-center
                    gap-3
                    transition
                  "
                >

                  <FaSave />

                  Simpan Perubahan

                </button>

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    py-4
                    rounded-xl
                    font-semibold
                    flex
                    justify-center
                    items-center
                    gap-3
                    transition
                  "
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