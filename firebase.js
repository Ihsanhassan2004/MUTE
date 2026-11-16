// ─────────────────────────────────────────────────────────────────────────────
// MUTE — Firebase configuration
// STEP: Replace the placeholder values below with your actual Firebase project
// config (see the guide artifact for instructions on where to find these).
// ─────────────────────────────────────────────────────────────────────────────
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            "AIzaSyBCpEjctYmDv9jx9vjtbKBPg5R6A3UnmWQ",
  authDomain:        "mute-launch.firebaseapp.com",
  projectId:         "mute-launch",
  storageBucket:     "mute-launch.firebasestorage.app",
  messagingSenderId: "818974454563",
  appId:             "1:818974454563:web:cedc79e2364cca72395296"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

/**
 * Save an email submission to Firestore.
 * @param {string} email      - The user's email address
 * @param {string} source     - e.g. "early_access" | "game_reward"
 * @param {string} [note]     - Optional extra info (e.g. reward code)
 * @returns {Promise<boolean>} true on success, false on failure
 */
export async function saveEmail(email, source, note = '') {
  try {
    await addDoc(collection(db, 'subscribers'), {
      email:     email.trim().toLowerCase(),
      source,
      note,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (err) {
    console.error('[MUTE] Firestore write failed:', err);
    return false;
  }
}
