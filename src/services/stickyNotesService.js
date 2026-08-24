/**
 * =========================================================================
 * 🕷️ SPIDER-MAN PORTFOLIO - COMMUNITY STICKY NOTES SERVICE (GOOGLE APPS SCRIPT)
 * =========================================================================
 * Ultra Fast Real-Time Multi-Device Sync
 * =========================================================================
 */

import { INITIAL_STICKY_NOTES } from "../data/stickyNotes";

const GOOGLE_APPSCRIPT_URL =
  import.meta.env.VITE_APPSCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwPIWN5zgvwiiEz2PMK6rHSVWMk5pqtcrb3ZCDR7_eNHNBX457ZTMaY5nFFPXBBzcMhWg/exec";

const STORAGE_KEY = "spiderman_portfolio_user_notes_v7";
const STORAGE_REACTED_KEY = "spiderman_reacted_notes_v7";

export const isCloudConfigured = Boolean(
  GOOGLE_APPSCRIPT_URL && GOOGLE_APPSCRIPT_URL.startsWith("http")
);

// Active listeners for real-time broadcasting across components
const noteListeners = new Set();

export function notifyAllListeners(notes) {
  noteListeners.forEach((listener) => {
    try {
      listener(notes);
    } catch (e) {}
  });
}

/**
 * Mengambil seluruh Sticky Notes dari Google Sheets
 * @returns {Promise<Array>} Array of sticky notes
 */
export async function fetchGlobalCloudNotes() {
  if (!GOOGLE_APPSCRIPT_URL) {
    return getLocalFallbackNotes();
  }

  try {
    const response = await fetch(
      `${GOOGLE_APPSCRIPT_URL}?t=${Date.now()}`,
      {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    if (!text.trim().startsWith("{") && !text.trim().startsWith("[")) {
      throw new Error("Respon bukan JSON valid");
    }

    const result = JSON.parse(text);
    if (result && result.success && Array.isArray(result.notes)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result.notes));
      } catch (e) {}
      return result.notes;
    }

    return getLocalFallbackNotes();
  } catch (err) {
    console.info("Info: Memuat cache lokal:", err.message);
    return getLocalFallbackNotes();
  }
}

/**
 * Mengirim sticky note baru ke Google Sheets dan langsung update semua pendengar
 * @param {Object} newNote 
 * @returns {Promise<boolean>} Status berhasil
 */
export async function createCloudStickyNote(newNote) {
  saveNoteLocally(newNote);

  if (!GOOGLE_APPSCRIPT_URL) {
    return true;
  }

  const payload = JSON.stringify({
    action: "createNote",
    note: newNote,
  });

  const sendPost = async () => {
    return await fetch(GOOGLE_APPSCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      cache: "no-cache",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: payload,
    });
  };

  try {
    await sendPost();
    // Langsung trigger fetch cloud instan setelah kirim
    setTimeout(async () => {
      const freshNotes = await fetchGlobalCloudNotes();
      if (Array.isArray(freshNotes)) {
        notifyAllListeners(freshNotes);
      }
    }, 600);
    return true;
  } catch (err) {
    console.warn("Retrying cloud push...", err.message);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      await sendPost();
      setTimeout(async () => {
        const freshNotes = await fetchGlobalCloudNotes();
        if (Array.isArray(freshNotes)) {
          notifyAllListeners(freshNotes);
        }
      }, 600);
      return true;
    } catch (retryErr) {
      console.warn("Cloud push saved to offline local:", retryErr.message);
      return false;
    }
  }
}

/**
 * Memperbarui hitungan reaksi (Web, Love, Zap, Fire) di Google Sheets
 * @param {string} noteId 
 * @param {string} reactionKey 
 * @param {boolean} isAdding 
 */
export async function updateCloudReaction(noteId, reactionKey, isAdding = true) {
  if (!GOOGLE_APPSCRIPT_URL) return;

  try {
    await fetch(GOOGLE_APPSCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      cache: "no-cache",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "reaction",
        noteId: noteId,
        reactionKey: reactionKey,
        isAdding: isAdding,
      }),
    });
  } catch (err) {
    console.warn("Reaction update warning:", err.message);
  }
}

/**
 * Polling update real-time pintar
 * @param {Function} onNotesReceived - Callback saat ada data catatan baru
 * @param {number} intervalMs - Interval polling (default 6000ms / 6 detik)
 * @returns {Function} Unsubscribe cleanup function
 */
export function subscribeToStickyNotes(onNotesReceived, intervalMs = 6000) {
  let isMounted = true;
  let lastNotesHash = "";
  let isSyncing = false;

  noteListeners.add(onNotesReceived);

  const sync = async () => {
    if (!isMounted || isSyncing) return;
    if (document.hidden) return;

    isSyncing = true;
    try {
      const notes = await fetchGlobalCloudNotes();
      if (!isMounted || !Array.isArray(notes)) return;

      const currentHash = JSON.stringify(
        notes.map((n) => `${n.id}_${JSON.stringify(n.reactions)}`)
      );
      if (currentHash !== lastNotesHash) {
        lastNotesHash = currentHash;
        onNotesReceived(notes);
      }
    } catch (e) {
      // Silent
    } finally {
      isSyncing = false;
    }
  };

  // Initial fetch segera saat dimuat
  sync();

  const intervalId = setInterval(sync, intervalMs);

  const onWakeup = () => {
    if (!document.hidden) {
      sync();
    }
  };

  window.addEventListener("focus", onWakeup);
  window.addEventListener("visibilitychange", onWakeup);
  window.addEventListener("online", onWakeup);

  return () => {
    isMounted = false;
    noteListeners.delete(onNotesReceived);
    clearInterval(intervalId);
    window.removeEventListener("focus", onWakeup);
    window.removeEventListener("visibilitychange", onWakeup);
    window.removeEventListener("online", onWakeup);
  };
}

/**
 * Helper: Ambil catatan dari localStorage
 */
function getLocalFallbackNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return parsed;
  } catch {
    return [];
  }
}

/**
 * Helper: Simpan catatan buatan user ke localStorage
 */
function saveNoteLocally(note) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    const filtered = parsed.filter((n) => n.id !== note.id);
    const updated = [note, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Local storage error:", e);
  }
}

export const isFirebaseReady = true;
