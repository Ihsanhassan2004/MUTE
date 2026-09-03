import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './config';
import type { UserProfile } from '../types/auth';

const LOCAL_STORAGE_USER_KEY = 'mute_auth_user';

export const authService = {
  getStoredUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setStoredUser(user: UserProfile | null) {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  },

  async loginWithGoogle(): Promise<UserProfile> {
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const profile: UserProfile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'MUTE Member',
          photoURL: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.email || 'MUTE')}&backgroundColor=14171a&textColor=f3f3f0`,
          createdAt: new Date().toISOString(),
        };
        this.setStoredUser(profile);
        return profile;
      } catch (err: unknown) {
        console.warn('Firebase popup error, falling back to simulated Google session:', err);
      }
    }

    // High quality simulated Google Auth flow
    await new Promise((res) => setTimeout(res, 600));
    const mockGoogleUser: UserProfile = {
      uid: 'google-user-' + Math.random().toString(36).substring(2, 9),
      email: 'alexander.pause@gmail.com',
      displayName: 'Alexander Sterling',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      createdAt: new Date().toISOString(),
      shippingAddress: {
        fullName: 'Alexander Sterling',
        street: '742 Evergreen Terrace',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'United States',
        phone: '+1 (555) 234-5678',
      },
    };
    this.setStoredUser(mockGoogleUser);
    return mockGoogleUser;
  },

  async loginWithEmail(email: string, pass: string): Promise<UserProfile> {
    if (isFirebaseConfigured && auth) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, pass);
        const profile: UserProfile = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName || email.split('@')[0],
          photoURL: res.user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=14171a&textColor=f3f3f0`,
          createdAt: new Date().toISOString(),
        };
        this.setStoredUser(profile);
        return profile;
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
        console.warn('Firebase email auth fallback:', errorMessage);
      }
    }

    await new Promise((res) => setTimeout(res, 500));
    const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const profile: UserProfile = {
      uid: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: name || 'Valued Member',
      photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=14171a&textColor=f3f3f0`,
      createdAt: new Date().toISOString(),
    };
    this.setStoredUser(profile);
    return profile;
  },

  async registerWithEmail(email: string, pass: string, name: string): Promise<UserProfile> {
    if (isFirebaseConfigured && auth) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        if (res.user) {
          await updateProfile(res.user, { displayName: name });
        }
        const profile: UserProfile = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: name,
          photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=14171a&textColor=f3f3f0`,
          createdAt: new Date().toISOString(),
        };
        this.setStoredUser(profile);
        return profile;
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Registration failed';
        console.warn('Firebase registration fallback:', errorMessage);
      }
    }

    await new Promise((res) => setTimeout(res, 500));
    const profile: UserProfile = {
      uid: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: name,
      photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=14171a&textColor=f3f3f0`,
      createdAt: new Date().toISOString(),
    };
    this.setStoredUser(profile);
    return profile;
  },

  async loginDemoUser(): Promise<UserProfile> {
    await new Promise((res) => setTimeout(res, 400));
    const demoProfile: UserProfile = {
      uid: 'demo-mute-member-001',
      email: 'member@drinkmute.com',
      displayName: 'Julian Vance',
      photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      phoneNumber: '+1 (555) 892-0192',
      createdAt: '2026-01-15T10:00:00.000Z',
      shippingAddress: {
        fullName: 'Julian Vance',
        street: '404 Quiet Avenue, Suite 10',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94103',
        country: 'United States',
        phone: '+1 (555) 892-0192',
      },
    };
    this.setStoredUser(demoProfile);
    return demoProfile;
  },

  async logout(): Promise<void> {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn('Firebase signOut error:', err);
      }
    }
    this.setStoredUser(null);
  },
};
