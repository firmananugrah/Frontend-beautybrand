import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ChatSidebar from "../components/ChatSidebar";
import ChatHeader from "../components/ChatHeader";
import EmptyState from "../components/EmptyState";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";

import {
  saveMessage,
  loadChatHistory,
  loadChatSession,
  renameSession,
  deleteSession,
  generateTitle,
  getSkinProfile,
} from "../services/chatService";

// ==============================================================
// sessionStorage key — menyimpan sesi aktif agar tidak hilang
// saat user pindah halaman (Profile, dll.) dan kembali.
// ==============================================================
const SS_KEY = "bb_active_chat";

const Chatbot = () => {
  const navigate = useNavigate();

  // ==========================
  // USER
  // ==========================

  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "User",
    email: "",
  };
  const userId = user?.id;

  // ==========================
  // SIDEBAR MOBILE
  // ==========================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==========================
  // SIDEBAR SESSIONS
  // ==========================

  const [sessions, setSessions]             = useState([]);
  const [sidebarLoading, setSidebarLoading] = useState(false);

  // ==========================
  // PESAN AKTIF — restore dari sessionStorage
  // ==========================

  const restoreFromSession = () => {
    try {
      const raw = sessionStorage.getItem(SS_KEY);
      if (!raw) return { messages: [], sessionId: null };
      return JSON.parse(raw);
    } catch {
      return { messages: [], sessionId: null };
    }
  };

  const [messages, setMessages]           = useState(() => restoreFromSession().messages);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // ==========================
  // SESSION AKTIF
  // ==========================

  const currentSessionId = useRef(restoreFromSession().sessionId);
  const [activeSessionId, setActiveSessionId] = useState(
    () => restoreFromSession().sessionId
  );

  const [input, setInput]     = useState("");
  const messagesEndRef        = useRef(null);

  // ==========================
  // SIMPAN KE sessionStorage
  // ==========================

  useEffect(() => {
    try {
      sessionStorage.setItem(
        SS_KEY,
        JSON.stringify({ messages, sessionId: currentSessionId.current })
      );
    } catch {
      // sessionStorage penuh — abaikan
    }
  }, [messages]);

  // ==========================
  // SKIN PROFILE — dari /skin-profile/{user_id}
  // Field: skin_type, skin_problem, analysis_date
  //
  // chatPhase:
  //   "loading"      → sedang cek ke backend
  //   "show_profile" → sudah analisis, tampilkan banner + 2 tombol
  //   "chatting"     → mode chat bebas (belum analisis / klik Lanjut Chat)
  //   "analyzing"    → sedang proses 9 pertanyaan (klik Analisis Lagi)
  // ==========================

  const [skinProfile, setSkinProfile] = useState(null);
  const [chatPhase, setChatPhase]     = useState("loading");

  // ==========================
  // AUTO SCROLL
  // ==========================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ==========================
  // MOUNT: load sesi + cek profil
  // ==========================

  useEffect(() => {
    if (!userId) return;
    fetchSessions();
    checkSkinProfile();
  }, [userId]);

  const fetchSessions = async () => {
    setSidebarLoading(true);
    try {
      const data = await loadChatHistory(userId);
      if (data?.status) setSessions(data.chats || []);
    } finally {
      setSidebarLoading(false);
    }
  };

  // Cek /skin-profile/{user_id}
  const checkSkinProfile = async () => {
    setChatPhase("loading");
    try {
      const data = await getSkinProfile(userId);

      if (data?.status && data.data) {
        // ✅ Sudah pernah analisis
        setSkinProfile(data.data);
        // Hanya tampilkan banner jika tidak ada chat aktif
        if (restoreFromSession().messages.length === 0) {
          setChatPhase("show_profile");
        } else {
          setChatPhase("chatting");
        }
      } else {
        // ❌ Belum pernah analisis → langsung mode chat
        setSkinProfile(null);
        setChatPhase("chatting");
      }
    } catch {
      setChatPhase("chatting");
    }
  };

  // ==========================
  // NEW CHAT
  // ==========================

  const handleNewChat = () => {
    currentSessionId.current = null;
    setActiveSessionId(null);
    setMessages([]);
    setInput("");
    setSidebarOpen(false);
    sessionStorage.removeItem(SS_KEY);
    // Kembali ke show_profile jika pernah analisis
    if (skinProfile) {
      setChatPhase("show_profile");
    } else {
      setChatPhase("chatting");
    }
  };

  // ==========================
  // PILIH SESI DI SIDEBAR
  // ==========================

  const handleSelectChat = async (sessionId) => {
    setSidebarOpen(false);
    setActiveSessionId(sessionId);
    currentSessionId.current = sessionId;
    setChatPhase("chatting");

    setMessagesLoading(true);
    setMessages([]);
    sessionStorage.removeItem(SS_KEY);

    try {
      const data = await loadChatSession(sessionId, userId);
      if (data?.status) {
        const msgs = (data.session.messages || []).map((m) => ({
          sender: m.sender,
          text: m.text,
        }));
        setMessages(msgs);
      }
    } finally {
      setMessagesLoading(false);
    }
  };

  // ==========================
  // DELETE SESI
  // ==========================

  const handleDeleteChat = async (sessionId) => {
    const confirmed = window.confirm("Yakin ingin menghapus percakapan ini?");
    if (!confirmed) return;

    const data = await deleteSession(sessionId, userId);
    if (data?.status) {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (currentSessionId.current === sessionId) {
        currentSessionId.current = null;
        setActiveSessionId(null);
        setMessages([]);
        sessionStorage.removeItem(SS_KEY);
      }
    }
  };

  // ==========================
  // RENAME SESI
  // ==========================

  const handleRenameChat = async (sessionId) => {
    const newTitle = prompt("Masukkan nama baru percakapan:");
    if (!newTitle?.trim()) return;
    const data = await renameSession(sessionId, userId, newTitle.trim());
    if (data?.status) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId ? { ...s, title: data.new_title } : s
        )
      );
    }
  };

  // ==========================
  // BANNER: Lanjut Chat
  // ==========================

  const handleLanjutChat = () => {
    setChatPhase("chatting");
    // Tampilkan pesan selamat datang dengan konteks kulit
    const welcomeMsg = {
      sender: "bot",
      text:
        `Halo ${user.username}! Saya siap membantu kamu. 😊\n\n` +
        `Berdasarkan analisis sebelumnya:\n` +
        `🧴 Jenis Kulit: ${skinProfile.skin_type}\n` +
        `⚠️ Masalah: ${skinProfile.skin_problem || "-"}\n\n` +
        `Mau cari rekomendasi produk atau konsultasi skincare hari ini?`,
    };
    setMessages([welcomeMsg]);
  };

  // ==========================
  // BANNER: Analisis Lagi
  // ==========================

  const handleAnalisisLagi = async () => {
    setChatPhase("analyzing");
    currentSessionId.current = null;
    setActiveSessionId(null);
    sessionStorage.removeItem(SS_KEY);

    // Tampilkan pesan user "konsultasi" di UI
    const userMsg = { sender: "user", text: "konsultasi" };
    const loadingMsg = { sender: "bot", loading: true };
    setMessages([userMsg, loadingMsg]);

    // Kirim "konsultasi" ke backend untuk trigger 9 pertanyaan
    await handleSend("konsultasi", true);
  };

  // ==========================
  // SEND MESSAGE
  // ==========================

  const handleSend = async (selectedChoice = null, skipUIAppend = false) => {
    // Mencegah Event object (misal dari onClick) masuk sebagai selectedChoice
    const isEvent = selectedChoice && typeof selectedChoice !== "string";
    const choice = isEvent ? null : selectedChoice;
    
    const question = choice || input.trim();
    if (!question) return;

    setSidebarOpen(false);
    if (!skipUIAppend) {
      setChatPhase("chatting");
      const userMessage    = { sender: "user", text: question };
      const loadingMessage = { sender: "bot", loading: true };
      setMessages((prev) => [...prev, userMessage, loadingMessage]);
    }
    setInput("");

    const isNewSession = currentSessionId.current === null;

    // Simpan pesan user ke backend
    const title       = isNewSession ? generateTitle(question) : null;
    const saveUserRes = await saveMessage(
      userId,
      currentSessionId.current,
      "user",
      question,
      title
    );

    if (saveUserRes?.status) {
      currentSessionId.current = saveUserRes.session_id;

      if (isNewSession) {
        const newSession = {
          id: saveUserRes.session_id,
          title: title || generateTitle(question),
          created_at: new Date().toISOString(),
          message_count: 1,
        };
        setSessions((prev) => [newSession, ...prev]);
        setActiveSessionId(saveUserRes.session_id);
      } else {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId.current
              ? { ...s, message_count: (s.message_count || 0) + 1 }
              : s
          )
        );
      }
    }

    // Kirim ke AI — WAJIB sertakan user_id
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        {
          message: question,
          user_id: userId,   // ← WAJIB: agar hasil analisis tersimpan ke profil
        }
      );

      const data = response.data;
      let botMessage = { sender: "bot" };
      let isAnalysisDone = false;

      if (data.type === "recommendation") {
        botMessage = {
          sender: "bot",
          text: "✨ Berikut rekomendasi skincare terbaik berdasarkan hasil analisis BeautyBrain Chatbot.",
          recommendations: data.recommendations,
        };

      } else if (data.type === "analysis") {
        botMessage = {
          sender: "bot",
          text: data.analysis?.kesimpulan || "Berikut hasil analisis kulit Anda.",
          analysis: data.analysis,
          recommendations: data.recommendations,
        };
        isAnalysisDone = true;

      } else if (data.type === "question") {
        // Handle format baru (string) dan lama (object)
        const isStringFormat  = typeof data.question === "string";
        const questionText    = isStringFormat ? data.question : (data.question?.question || "");
        const choices         = isStringFormat ? [] : (data.question?.choices || []);

        botMessage = {
          sender: "bot",
          type: "question",
          text: data.message
            ? `${data.message}\n\n${questionText}`
            : questionText,
          choices,
        };

      } else {
        botMessage = {
          sender: "bot",
          text:
            data.response ||
            "Maaf, saya belum memahami pertanyaan Anda.\n\nSilakan tanyakan mengenai skincare atau lakukan konsultasi kulit.",
        };
      }

      // Ganti loading dengan respons bot
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = botMessage;
        return updated;
      });

      // Simpan pesan bot ke backend
      const botText = botMessage.text || "";
      const saveBotRes = await saveMessage(
        userId,
        currentSessionId.current,
        "bot",
        botText
      );

      if (saveBotRes?.status) {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId.current
              ? { ...s, message_count: (s.message_count || 0) + 1 }
              : s
          )
        );
      }

      // Setelah analisis selesai → update skinProfile dari backend
      if (isAnalysisDone) {
        setChatPhase("chatting");
        setTimeout(async () => {
          const profileData = await getSkinProfile(userId);
          if (profileData?.status && profileData.data) {
            setSkinProfile(profileData.data);
          }
        }, 800);
      }

    } catch (error) {
      console.error(error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "bot",
          text: "❌ Tidak dapat terhubung ke BeautyBrain AI.",
        };
        return updated;
      });
    }
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
  // RENDER SKIN BANNER
  // (muncul saat chatPhase === "show_profile")
  // ==========================

  const renderSkinBanner = () => {
    if (chatPhase !== "show_profile" || !skinProfile) return null;

    return (
      <div className="flex justify-start mb-6">
        <div className="flex items-start gap-3 w-full">

          {/* Avatar BB */}
          <div className="w-10 h-10 rounded-full bg-[#1A237E] text-white flex items-center justify-center font-bold shrink-0">
            BB
          </div>

          <div className="bg-gradient-to-br from-[#EEF0FF] to-[#F5F6FF] border border-[#C5CAE9] rounded-2xl rounded-tl-md p-5 shadow-sm max-w-lg w-full">

            <p className="text-gray-800 leading-7">
              Hei <strong>{user.username}</strong>! 👋<br />
              Kamu sudah pernah melakukan analisis kulit.
            </p>

            {/* Hasil analisis sebelumnya */}
            <div className="mt-4 grid grid-cols-1 gap-2">
              <div className="bg-white rounded-xl px-4 py-3 flex gap-3 items-start border border-gray-100">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-28 mt-0.5 shrink-0">
                  🧴 Jenis Kulit
                </span>
                <span className="font-bold text-[#1A237E]">
                  {skinProfile.skin_type}
                </span>
              </div>

              <div className="bg-white rounded-xl px-4 py-3 flex gap-3 items-start border border-gray-100">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-28 mt-0.5 shrink-0">
                  ⚠️ Masalah
                </span>
                <span className="font-bold text-[#1A237E]">
                  {skinProfile.skin_problem || "Tidak ada masalah khusus"}
                </span>
              </div>

              <div className="bg-white rounded-xl px-4 py-3 flex gap-3 items-start border border-gray-100">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-28 mt-0.5 shrink-0">
                  📅 Dianalisis
                </span>
                <span className="text-sm text-gray-600">
                  {formatDate(skinProfile.analysis_date)}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mt-4 leading-7 text-sm">
              Apakah kamu ingin melakukan analisis kulit lagi?
            </p>

            {/* 2 Tombol */}
            <div className="flex gap-3 mt-4 flex-wrap">
              <button
                onClick={handleAnalisisLagi}
                className="bg-[#1A237E] hover:bg-[#11195E] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-sm"
              >
                🔄 Analisis Lagi
              </button>
              <button
                onClick={handleLanjutChat}
                className="bg-white hover:bg-gray-50 text-[#1A237E] border border-[#1A237E] px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-sm"
              >
                💬 Lanjut Chat
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  };

  // ==========================
  // RETURN
  // ==========================

  const isLoading   = chatPhase === "loading" || messagesLoading;
  const showBanner  = chatPhase === "show_profile";
  const showEmpty   = !showBanner && messages.length === 0 &&
                      chatPhase !== "loading";

  return (
    <div className="h-screen flex bg-[#F7F6FB] overflow-hidden">

      {/* SIDEBAR */}
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        sidebarLoading={sidebarLoading}
        handleNewChat={handleNewChat}
        handleSelectChat={handleSelectChat}
        handleDeleteChat={handleDeleteChat}
        handleRenameChat={handleRenameChat}
        navigate={navigate}
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">

        <ChatHeader
          user={user}
          navigate={navigate}
          openSidebar={() => setSidebarOpen(true)}
        />

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">

          {/* Loading cek profil */}
          {chatPhase === "loading" && messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-8 h-8 border-4 border-[#1A237E] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Memeriksa profil kulit kamu...</p>
              </div>
            </div>
          ) : messagesLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-8 h-8 border-4 border-[#1A237E] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Memuat percakapan...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Banner profil kulit (jika sudah pernah analisis) */}
              {renderSkinBanner()}

              {/* Pesan-pesan chat */}
              {messages.length > 0 && (
                <ChatBubble
                  messages={messages}
                  user={user}
                  handleChoice={(choice) => {
                    setInput(choice);
                    setTimeout(() => handleSend(choice), 100);
                  }}
                />
              )}

              {/* Empty state */}
              {showEmpty && (
                <EmptyState
                  onSuggestionClick={(prompt) => handleSend(prompt)}
                />
              )}

              <div ref={messagesEndRef} />
            </>
          )}

        </div>

        {/* INPUT */}
        <ChatInput input={input} setInput={setInput} handleSend={handleSend} />

      </div>
    </div>
  );
};

export default Chatbot;
