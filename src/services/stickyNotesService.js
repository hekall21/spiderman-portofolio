/**
 * =========================================================================
 * 🕷️ SPIDER-MAN PORTFOLIO - COMMUNITY STICKY NOTES SERVICE (GOOGLE APPS SCRIPT)
 * =========================================================================
 * Multi-Device Real-Time Sync via Google Sheets API (Serverless, No-Cost)
 * =========================================================================
 */

import { INITIAL_STICKY_NOTES } from "../data/stickyNotes";

// URL Google Apps Script Web App (diambil dari environment variable atau fallback aktif)
const GOOGLE_APPSCRIPT_URL =
  import.meta.env.VITE_APPSCRIPT_URL || "https://script.google.com/macros/s/AKfycbwPIWN5zgvwiiEz2PMK6rHSVWMk5pqtcrb3ZCDR7_eNHNBX457ZTMaY5nFFPXBBzcMhWg/exec";

// Storage key untuk fallback lokal
const STORAGE_KEY = "spiderman_portfolio_user_notes_v5";
const STORAGE_REACTED_KEY = "spiderman_reacted_notes_v5";

/**
 * Cek apakah backend Google Apps Script sudah terkonfigurasi
 */
export const isCloudConfigured = Boolean(GOOGLE_APPSCRIPT_URL && GOOGLE_APPSCRIPT_URL.startsWith("http"));

/**
 * Mengambil seluruh Sticky Notes dari Google Sheets
 * @returns {Promise<Array>} Array of sticky notes
 */
export async function fetchGlobalCloudNotes() {
  if (!GOOGLE_APPSCRIPT_URL) {
    // Mode offline / belum pasang URL: Gunakan localStorage + initial notes
    return getLocalFallbackNotes();
  }

  try {
    const response = await fetch(GOOGLE_APPSCRIPT_URL, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    if (result && result.success && Array.isArray(result.notes) && result.notes.length > 0) {
      return result.notes;
    }

    // Jika response kosong, fallback
    return getLocalFallbackNotes();
  } catch (err) {
    console.info("Info: Menggunakan cache lokal (Google Sheets sync standby):", err.message);
    return getLocalFallbackNotes();
  }
}

/**
 * Mengirim sticky note baru ke Google Sheets (Real-Time Cloud Push)
 * @param {Object} newNote 
 * @returns {Promise<boolean>} Status berhasil
 */
export async function createCloudStickyNote(newNote) {
  // 1. Simpan selalu ke localStorage sebagai cache offline
  saveNoteLocally(newNote);

  if (!GOOGLE_APPSCRIPT_URL) {
    return true; // Berhasil disimpan lokal
  }

  try {
    // Gunakan text/plain;charset=utf-8 untuk menghindari CORS preflight blocked di Google Apps Script
    const response = await fetch(GOOGLE_APPSCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "createNote",
        note: newNote,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data && data.success;
  } catch (err) {
    console.warn("Google Apps Script sync warning (tersimpan di lokal):", err.message);
    return false;
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
 * Polling update real-time secara hemat resource (tanpa bikin laptop panas)
 * @param {Function} onNotesReceived - Callback saat ada data catatan baru
 * @param {number} intervalMs - Interval polling (default 12000ms / 12 detik)
 * @returns {Function} Unsubscribe cleanup function
 */
export function subscribeToStickyNotes(onNotesReceived, intervalMs = 12000) {
  let isMounted = true;
  let lastNotesHash = "";

  const sync = async () => {
    if (!isMounted) return;
    try {
      const notes = await fetchGlobalCloudNotes();
      if (!isMounted || !Array.isArray(notes)) return;

      // Cek apakah data berubah sebelum memicu re-render
      const currentHash = JSON.stringify(notes.map((n) => `${n.id}_${JSON.stringify(n.reactions)}`));
      if (currentHash !== lastNotesHash) {
        lastNotesHash = currentHash;
        onNotesReceived(notes);
      }
    } catch (e) {
      // Abaikan error background sync secara graceful
    }
  };

  // 1. Initial fetch segera saat komponen dimuat
  sync();

  // 2. Interval polling berkala hemat daya
  const intervalId = setInterval(sync, intervalMs);

  // 3. Sync instan saat pengguna kembali membuka tab browser
  const onFocus = () => {
    sync();
  };

  window.addEventListener("focus", onFocus);
  window.addEventListener("online", onFocus);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
    window.removeEventListener("focus", onFocus);
    window.removeEventListener("online", onFocus);
  };
}

/**
 * Helper: Ambil catatan gabungan dari localStorage + Initial Notes
 */
function getLocalFallbackNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    const localIds = new Set(parsed.map((n) => n.id));
    const curated = INITIAL_STICKY_NOTES.filter((n) => !localIds.has(n.id));
    return [...parsed, ...curated];
  } catch {
    return INITIAL_STICKY_NOTES;
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
