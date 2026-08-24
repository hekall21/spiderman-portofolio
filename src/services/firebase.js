import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  increment,
  limit,
} from "firebase/firestore";

// Firebase configuration with environment variable support & safe fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForSpidermanPortfolio2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "spiderman-portfolio-haikel.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "spiderman-portfolio-haikel",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "spiderman-portfolio-haikel.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "842199042100",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:842199042100:web:spideyverse2026",
};

// Initialize Firebase safely
let app = null;
let db = null;
let isFirebaseReady = false;

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    isFirebaseReady = true;
  }
} catch (e) {
  console.info("Firebase initialized in hybrid-offline mode:", e.message);
  isFirebaseReady = false;
}

export { db, isFirebaseReady };

/**
 * Subscribe to real-time sticky notes updates from Firestore
 * @param {Function} onNotesReceived - Callback with notes array
 * @param {Function} onError - Optional error callback
 * @returns {Function} Unsubscribe function
 */
export function subscribeToStickyNotes(onNotesReceived, onError) {
  if (!db || !isFirebaseReady) {
    return () => {};
  }

  try {
    const notesRef = collection(db, "sticky_notes");
    const q = query(notesRef, orderBy("createdAt", "desc"), limit(100));

    return onSnapshot(
      q,
      (snapshot) => {
        const cloudNotes = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            author: data.author || "Multiverse Visitor",
            aliasBadge: data.aliasBadge || "🕷️ Web Visitor",
            category: data.category || "feedback",
            colorId: data.colorId || "crimson",
            title: data.title || "Web Message",
            message: data.message || "",
            timestamp: data.createdAt?.toDate ? formatTimestamp(data.createdAt.toDate()) : "Just now",
            reactions: data.reactions || { web: 1, love: 1, zap: 1, fire: 1 },
            rotation: data.rotation || 0,
            isUserCreated: true,
            isCloudSynced: true,
          };
        });
        onNotesReceived(cloudNotes);
      },
      (error) => {
        console.warn("Firestore subscription error (fallback to local):", error.message);
        if (onError) onError(error);
      }
    );
  } catch (err) {
    console.warn("Could not start Firestore listener:", err.message);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Add a new sticky note to Firebase Firestore
 * @param {Object} noteData 
 * @returns {Promise<string>} Created document ID
 */
export async function createCloudStickyNote(noteData) {
  if (!db || !isFirebaseReady) {
    throw new Error("Firebase Firestore is not initialized");
  }

  const notesRef = collection(db, "sticky_notes");
  const docRef = await addDoc(notesRef, {
    author: noteData.author,
    aliasBadge: noteData.aliasBadge,
    category: noteData.category,
    colorId: noteData.colorId,
    title: noteData.title,
    message: noteData.message,
    rotation: noteData.rotation || (Math.random() - 0.5) * 4,
    reactions: { web: 1, love: 1, zap: 1, fire: 1 },
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Increment reaction on cloud sticky note
 * @param {string} noteId 
 * @param {string} reactionKey 
 * @param {boolean} incrementByOne 
 */
export async function updateCloudReaction(noteId, reactionKey, incrementByOne = true) {
  if (!db || !isFirebaseReady) return;

  try {
    const noteDocRef = doc(db, "sticky_notes", noteId);
    await updateDoc(noteDocRef, {
      [`reactions.${reactionKey}`]: increment(incrementByOne ? 1 : -1),
    });
  } catch (err) {
    console.warn("Failed to update cloud reaction:", err.message);
  }
}

function formatTimestamp(date) {
  const now = new Date();
  const diffSec = Math.floor((now - date) / 1000);
  if (diffSec < 60) return "Just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hours ago`;
  return `${Math.floor(diffSec / 86400)} days ago`;
}
