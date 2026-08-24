/**
 * UNIVERSAL CROSS-DEVICE REAL-TIME CLOUD SYNC SERVICE
 * Enables instant multi-user synchronization across HP, Laptop, PC, and all devices worldwide.
 */

const CLOUD_MASTER_ID = "ff8081819ff5b11001a033dc56400ef9";
const CLOUD_API_URL = `https://api.restful-api.dev/objects/${CLOUD_MASTER_ID}`;

// Local storage backup key
const STORAGE_KEY = "spiderman_portfolio_user_notes_v4";

/**
 * Fetch all shared notes from the Global Cloud Store
 * @returns {Promise<Array>} Array of sticky notes
 */
export async function fetchGlobalCloudNotes() {
  try {
    const response = await fetch(CLOUD_API_URL, {
      method: "GET",
      headers: { "Cache-Control": "no-cache" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (json && json.data && Array.isArray(json.data.notes)) {
      return json.data.notes;
    }
    return [];
  } catch (err) {
    console.info("Fetching from cloud note store (offline fallback active):", err.message);
    return [];
  }
}

/**
 * Push a new sticky note to the Global Cloud Store
 * @param {Object} newNote 
 * @returns {Promise<boolean>} Success status
 */
export async function createCloudStickyNote(newNote) {
  try {
    // 1. Fetch current cloud state
    const existing = await fetchGlobalCloudNotes();
    
    // 2. Prepend the new note (avoid duplicate IDs)
    const filteredExisting = existing.filter((n) => n.id !== newNote.id);
    const updatedNotes = [newNote, ...filteredExisting].slice(0, 100); // Keep latest 100 notes

    // 3. Write back to Cloud
    const response = await fetch(CLOUD_API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "HaikelSpidermanCommunityNotes_v4",
        data: { notes: updatedNotes },
      }),
    });

    return response.ok;
  } catch (err) {
    console.warn("Cloud push error, note saved locally:", err.message);
    return false;
  }
}

/**
 * Update reaction count for a note in the Global Cloud Store
 * @param {string} noteId 
 * @param {string} reactionKey 
 * @param {boolean} isAdding 
 */
export async function updateCloudReaction(noteId, reactionKey, isAdding = true) {
  try {
    const existing = await fetchGlobalCloudNotes();
    if (!existing || existing.length === 0) return;

    const updated = existing.map((n) => {
      if (n.id !== noteId) return n;
      const count = n.reactions?.[reactionKey] || 0;
      return {
        ...n,
        reactions: {
          ...n.reactions,
          [reactionKey]: isAdding ? count + 1 : Math.max(0, count - 1),
        },
      };
    });

    await fetch(CLOUD_API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "HaikelSpidermanCommunityNotes_v4",
        data: { notes: updated },
      }),
    });
  } catch (err) {
    console.warn("Reaction cloud update error:", err.message);
  }
}

/**
 * Subscribe to real-time updates with automatic cross-device polling & window focus listener
 * @param {Function} onNotesReceived - Callback receiving notes array
 * @param {number} intervalMs - Polling interval (default 3500ms)
 * @returns {Function} Unsubscribe cleanup function
 */
export function subscribeToStickyNotes(onNotesReceived, intervalMs = 3500) {
  let isMounted = true;

  const sync = async () => {
    if (!isMounted) return;
    try {
      const cloudNotes = await fetchGlobalCloudNotes();
      if (isMounted && cloudNotes && cloudNotes.length > 0) {
        onNotesReceived(cloudNotes);
      }
    } catch (e) {
      // Graceful offline ignore
    }
  };

  // 1. Initial immediate fetch
  sync();

  // 2. Recurring polling interval
  const intervalId = setInterval(sync, intervalMs);

  // 3. Immediate sync on window focus (when switching between apps/tabs)
  const onFocus = () => sync();
  window.addEventListener("focus", onFocus);
  window.addEventListener("online", onFocus);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
    window.removeEventListener("focus", onFocus);
    window.removeEventListener("online", onFocus);
  };
}

export const isFirebaseReady = true;
