import {
  FaHome,
  FaPlus,
  FaPen,
  FaTrash,
  FaUserCircle,
  FaComments,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";

import logo from "../assets/images/logo.png";

// ==============================================================
// Helper: format tanggal ke string singkat
// ==============================================================
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

// ==============================================================
// ChatSidebar
// Props:
//   sessions        — array sesi dari backend [{ id, title, created_at, message_count }]
//   activeSessionId — ID sesi yang sedang aktif (untuk highlight)
//   sidebarLoading  — boolean loading saat fetch /chat-history
//   handleNewChat   — buat sesi baru
//   handleSelectChat(sessionId) — pilih sesi
//   handleDeleteChat(sessionId) — hapus sesi
//   handleRenameChat(sessionId) — rename sesi
//   navigate        — react-router navigate
//   isOpen          — mobile sidebar open
//   closeSidebar    — tutup sidebar mobile
// ==============================================================
const ChatSidebar = ({
  sessions = [],
  activeSessionId = null,
  sidebarLoading = false,
  handleNewChat,
  handleSelectChat = () => {},
  handleDeleteChat = () => {},
  handleRenameChat = () => {},
  navigate,
  isOpen,
  closeSidebar,
}) => {
  return (
    <>
      {/* ================= OVERLAY MOBILE ================= */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-screen
          w-[290px]
          bg-white
          border-r border-gray-200
          flex flex-col
          z-50
          transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* ================= CLOSE MOBILE ================= */}

        <div className="lg:hidden flex justify-end p-4">
          <button onClick={closeSidebar}>
            <FaTimes
              size={22}
              className="text-gray-600"
            />
          </button>
        </div>

        {/* ================= LOGO ================= */}

        <div className="h-[72px] px-6 border-b border-gray-100 flex items-center">

          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt="BeautyBrain AI"
              className="w-10 h-10 object-contain"
            />

            <div>

              <h1 className="font-bold text-xl text-[#1A237E] leading-none">
                BeautyBrain
              </h1>

              <p className="text-xs text-gray-400 mt-1">
                Skincare Assistant
              </p>

            </div>

          </div>

        </div>

        {/* ================= NEW CHAT ================= */}

        <div className="p-4">

          <button
            onClick={() => {
              handleNewChat();
              closeSidebar();
            }}
            className="
              w-full
              bg-[#1A237E]
              hover:bg-[#11195E]
              text-white
              rounded-xl
              py-3
              flex
              justify-center
              items-center
              gap-2
              transition
              font-medium
            "
          >
            <FaPlus />

            New Chat

          </button>

        </div>

        {/* ================= RECENT CHAT ================= */}

        <div className="flex-1 overflow-y-auto px-3">

          <p className="text-xs text-gray-400 uppercase font-semibold mb-3">
            Recent Chat
          </p>

          {/* Loading state */}
          {sidebarLoading && (
            <div className="flex items-center justify-center py-8 gap-2 text-gray-400">
              <FaSpinner className="animate-spin" />
              <span className="text-xs">Memuat riwayat...</span>
            </div>
          )}

          {/* Kosong */}
          {!sidebarLoading && sessions.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <FaComments size={24} className="mx-auto mb-2 opacity-40" />
              <p className="text-xs">Belum ada percakapan</p>
            </div>
          )}

          {/* Daftar sesi */}
          {!sidebarLoading &&
            sessions.map((session) => (

              <div
                key={session.id}
                onClick={() => {
                  handleSelectChat(session.id);
                  closeSidebar();
                }}
                className={`
                  rounded-xl
                  p-3
                  mb-2
                  cursor-pointer
                  transition
                  ${
                    activeSessionId === session.id
                      ? "bg-[#EEF0FF]"
                      : "hover:bg-gray-100"
                  }
                `}
              >

                <div className="flex justify-between items-start gap-2">

                  {/* Ikon + judul */}
                  <div className="flex items-start gap-2 overflow-hidden flex-1">

                    <FaComments
                      className="text-[#1A237E] mt-0.5 flex-shrink-0"
                    />

                    <div className="overflow-hidden">
                      <span className="text-sm truncate block font-medium text-gray-800">
                        {session.title}
                      </span>

                      {/* Metadata: tanggal & jumlah pesan */}
                      <span className="text-xs text-gray-400 block mt-0.5">
                        {session.message_count != null
                          ? `${session.message_count} pesan`
                          : ""}
                        {session.message_count != null && session.created_at
                          ? " · "
                          : ""}
                        {formatDate(session.created_at)}
                      </span>
                    </div>

                  </div>

                  {/* Aksi: rename & delete */}
                  <div className="flex gap-2 flex-shrink-0">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRenameChat(session.id);
                      }}
                      className="text-blue-400 hover:text-blue-600 transition"
                      title="Rename"
                    >
                      <FaPen size={11} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(session.id);
                      }}
                      className="text-red-400 hover:text-red-600 transition"
                      title="Hapus"
                    >
                      <FaTrash size={11} />
                    </button>

                  </div>

                </div>

              </div>

            ))}
                </div>

        {/* ================= MENU ================= */}

        <div className="border-t border-gray-200 p-4">

          <p className="text-xs text-gray-400 uppercase font-semibold mb-3">
            Menu
          </p>

          <div className="space-y-2">

            {/* Profile */}

            <button
              onClick={() => {
                navigate("/profile");
                closeSidebar();
              }}
              className="
                w-full
                flex
                items-center
                gap-3
                px-3
                py-3
                rounded-xl
                hover:bg-[#EEF0FF]
                transition
              "
            >

              <FaUserCircle
                className="text-[#1A237E]"
              />

              <span className="font-medium">
                Profile
              </span>

            </button>

            {/* Home */}

            <button
              onClick={() => {
                navigate("/");
                closeSidebar();
              }}
              className="
                w-full
                flex
                items-center
                gap-3
                px-3
                py-3
                rounded-xl
                hover:bg-[#EEF0FF]
                transition
              "
            >

              <FaHome
                className="text-[#1A237E]"
              />

              <span className="font-medium">
                Home
              </span>

            </button>

          </div>

        </div>

      </aside>

    </>
  );
};

export default ChatSidebar;