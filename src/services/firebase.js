/**
 * =========================================================================
 * 🕷️ SPIDER-MAN PORTFOLIO - CLOUD SYNC FACADE (GOOGLE APPS SCRIPT / BACKEND)
 * =========================================================================
 * Re-exports cloud sync functions from stickyNotesService for seamless integration
 * =========================================================================
 */

export {
  fetchGlobalCloudNotes,
  createCloudStickyNote,
  updateCloudReaction,
  subscribeToStickyNotes,
  isCloudConfigured,
  isFirebaseReady,
} from "./stickyNotesService";
