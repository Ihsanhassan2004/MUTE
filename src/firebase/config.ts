import { initializeApp, getApps } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDmPpHy7zXgv3lGWorYdWFjAEhAaFZ9SDg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mute-energy.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mute-energy",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mute-energy.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "65837647613",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:65837647613:web:3224a50a1dadc06c916094",
};

export const isFirebaseConfigured = true;


let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let db: Firestore | null = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  db = getFirestore(app);
} catch (error) {
  console.info('Firebase running in local client mode:', error);
}

export { app, auth, googleProvider, db };

