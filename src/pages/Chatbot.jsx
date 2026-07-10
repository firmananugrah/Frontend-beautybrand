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
} from "../services/chatService";

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
  // SIDEBAR SESSIONS (dari backend)
  // ==========================

  const [sessions, setSessions] = useState([]);       // daftar sesi dari /chat-history
  const [sidebarLoading, setSidebarLoading] = useState(false);

  // ==========================
  // PESAN AKTIF
  // ==========================

  const [messages, setMessages] = useState([]);       // pesan sesi yang sedang aktif
  const [messagesLoading, setMessagesLoading] = useState(false);

  // ==========================
  // SESSION AKTIF
  // ==========================

  // currentSessionId: integer dari backend (null = sesi baru belum disimpan)
  const currentSessionId = useRef(null);

  // ID sesi yang dipilih di sidebar (untuk highlight)
  const [activeSessionId, setActiveSessionId] = useState(null);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // ==========================
  // AUTO SCROLL
  // ==========================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ==========================
  // LOAD DAFTAR SESI SAAT MOUNT
  // ==========================

  useEffect(() => {
    if (!userId) return;
    fetchSessions();
  }, [userId]);

  const fetchSessions = async () => {
    setSidebarLoading(true);
    try {
      const data = await loadChatHistory(userId);
      if (data?.status) {
        setSessions(data.chats || []);
      }
    } finally {
      setSidebarLoading(false);
    }
  };

  // ==========================
  // NEW CHAT
  // ==========================

  const handleNewChat = () => {
    // Reset session_id agar pesan berikutnya membuat sesi baru di backend
    currentSessionId.current = null;
    setActiveSessionId(null);
    setMessages([]);
    setInput("");
    setSidebarOpen(false);
  };

  // ==========================
  // PILIH SESI DI SIDEBAR
  // ==========================

  const handleSelectChat = async (sessionId) => {
    setSidebarOpen(false);
    setActiveSessionId(sessionId);
    currentSessionId.current = sessionId;

    setMessagesLoading(true);
    setMessages([]);

    try {
      const data = await loadChatSession(sessionId, userId);
      if (data?.status) {
        // Konversi format backend ke format UI
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

      // Jika sesi yang dihapus adalah yang aktif, reset ke new chat
      if (currentSessionId.current === sessionId) {
        currentSessionId.current = null;
        setActiveSessionId(null);
        setMessages([]);
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
  // SEND MESSAGE
  // ==========================

  const handleSend = async (selectedChoice = null) => {
    const question = selectedChoice || input.trim();
    if (!question) return;

    setSidebarOpen(false);

    // Apakah ini pesan pertama dalam sesi baru?
    const isNewSession = currentSessionId.current === null;

    // ---- Tampilkan pesan user di UI ----
    const userMessage = { sender: "user", text: question };
    const loadingMessage = { sender: "bot", loading: true };
    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");

    // ---- Simpan pesan user ke backend ----
    // Jika sesi baru, kirim title dari pesan pertama
    const title = isNewSession ? generateTitle(question) : null;
    const saveUserRes = await saveMessage(
      userId,
      currentSessionId.current,
      "user",
      question,
      title
    );

    if (saveUserRes?.status) {
      // PENTING: simpan session_id dari respons pertama
      currentSessionId.current = saveUserRes.session_id;

      // Jika sesi baru, tambahkan ke sidebar
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
        // Update message_count di sidebar
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId.current
              ? { ...s, message_count: (s.message_count || 0) + 1 }
              : s
          )
        );
      }
    }

    // ---- Kirim ke AI ----
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`, {
        message: question,
      });

      const data = response.data;
      let botMessage = { sender: "bot" };

      // ==========================
      // RECOMMENDATION
      // ==========================

      if (data.type === "recommendation") {
        botMessage = {
          sender: "bot",
          text: "✨ Berikut rekomendasi skincare terbaik berdasarkan hasil analisis BeautyBrain Chatbot.",
          recommendations: data.recommendations,
        };
      }

      // ==========================
      // ANALYSIS
      // ==========================

      else if (data.type === "analysis") {
        botMessage = {
          sender: "bot",
          text: data.analysis?.kesimpulan || "Berikut hasil analisis kulit Anda.",
          analysis: data.analysis,
          recommendations: data.recommendations,
        };
      }

      // ==========================
      // QUESTION
      // ==========================

      else if (data.type === "question") {
        botMessage = {
          sender: "bot",
          type: "question",
          text: data.message
            ? `${data.message}\n\n${data.question.question}`
            : data.question.question,
          choices: data.question.choices || [],
        };
      }

      // ==========================
      // DEFAULT
      // ==========================

      else {
        botMessage = {
          sender: "bot",
          text:
            data.response ||
            "Maaf, saya belum memahami pertanyaan Anda.\n\nSilakan tanyakan mengenai skincare atau lakukan konsultasi kulit.",
        };
      }

      // ---- Ganti loading dengan respons bot ----
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = botMessage;
        return updated;
      });

      // ---- Simpan pesan bot ke backend ----
      const saveBotRes = await saveMessage(
        userId,
        currentSessionId.current,
        "bot",
        botMessage.text || ""
      );

      if (saveBotRes?.status) {
        // Update message_count di sidebar
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId.current
              ? { ...s, message_count: (s.message_count || 0) + 1 }
              : s
          )
        );
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
  // RETURN
  // ==========================

  return (
    <div className="h-screen flex bg-[#F7F6FB] overflow-hidden">
      {/* ================= SIDEBAR ================= */}

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

      {/* ================= MAIN ================= */}

      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}

        <ChatHeader
          user={user}
          navigate={navigate}
          openSidebar={() => setSidebarOpen(true)}
        />

        {/* ================= CHAT ================= */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-4
            sm:px-6
            lg:px-8
            py-6
          "
        >
          {messagesLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-8 h-8 border-4 border-[#1A237E] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Memuat percakapan...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <EmptyState onSuggestionClick={(prompt) => handleSend(prompt)} />
          ) : (
            <>
              <ChatBubble
                messages={messages}
                user={user}
                handleChoice={(choice) => {
                  setInput(choice);
                  setTimeout(() => {
                    handleSend(choice);
                  }, 100);
                }}
              />

              {/* AUTO SCROLL */}

              <div ref={messagesEndRef}></div>
            </>
          )}
        </div>

        {/* ================= INPUT ================= */}

        <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
      </div>
    </div>
  );
};

export default Chatbot;
