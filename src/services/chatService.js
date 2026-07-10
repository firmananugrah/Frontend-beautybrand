// ==============================================================
// chatService.js — Service terpusat untuk API Riwayat Chat
// Base URL: http://127.0.0.1:8000
// Dokumentasi: chat_history_api_docs.md
// ==============================================================

const BASE_URL = "http://127.0.0.1:8000";

// --------------------------------------------------------------
// Helper: wrapper fetch dengan penanganan error seragam
// --------------------------------------------------------------
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Terjadi kesalahan pada server.");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    return null;
  }
}

// ==============================================================
// 1. POST /save-chat — Simpan satu pesan ke sesi
// ==============================================================
//
// Alur:
//   - Sesi baru  → kirim session_id: null, backend buat sesi baru
//   - Sesi lama  → kirim session_id yang sudah ada
//
// Return: { status, session_id, message_id } | null
// ==============================================================
export async function saveMessage(userId, currentSessionId, sender, message, title = null) {
  const body = {
    session_id: currentSessionId ?? null,
    user_id: userId,
    sender,        // "user" | "bot"
    message,
    title: title ?? generateTitle(message),
  };

  return await apiCall(`${BASE_URL}/save-chat`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ==============================================================
// 2. GET /chat-history/{user_id} — Daftar semua sesi milik user
// ==============================================================
//
// Return: { status, chats: [{ id, title, created_at, message_count }] } | null
// ==============================================================
export async function loadChatHistory(userId) {
  return await apiCall(`${BASE_URL}/chat-history/${userId}`);
}

// ==============================================================
// 3. GET /chat-session/{session_id}?user_id= — Detail satu sesi
// ==============================================================
//
// Return: { status, session: { id, title, created_at, messages: [...] } } | null
// ==============================================================
export async function loadChatSession(sessionId, userId) {
  return await apiCall(`${BASE_URL}/chat-session/${sessionId}?user_id=${userId}`);
}

// ==============================================================
// 4. PUT /chat-session/{session_id}/rename?user_id= — Rename sesi
// ==============================================================
//
// Return: { status, message, session_id, new_title } | null
// ==============================================================
export async function renameSession(sessionId, userId, newTitle) {
  return await apiCall(
    `${BASE_URL}/chat-session/${sessionId}/rename?user_id=${userId}`,
    {
      method: "PUT",
      body: JSON.stringify({ title: newTitle }),
    }
  );
}

// ==============================================================
// 5. DELETE /chat-session/{session_id}?user_id= — Hapus sesi
// ==============================================================
//
// Return: { status, message } | null
// ==============================================================
export async function deleteSession(sessionId, userId) {
  return await apiCall(
    `${BASE_URL}/chat-session/${sessionId}?user_id=${userId}`,
    { method: "DELETE" }
  );
}

// ==============================================================
// HELPER: generate judul otomatis dari 5 kata pertama pesan
// ==============================================================
export function generateTitle(message) {
  if (!message) return "Percakapan Baru";
  const words = message.trim().split(/\s+/);
  const titleWords = words.slice(0, 5).join(" ");
  return titleWords.length < message.trim().length ? titleWords + "..." : titleWords;
}
