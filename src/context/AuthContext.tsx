import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile } from '../types/auth';
import { authService } from '../firebase/authService';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<UserProfile>;
  loginWithEmail: (email: string, pass: string) => Promise<UserProfile>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<UserProfile>;
  loginDemoUser: () => Promise<UserProfile>;
  logout: () => Promise<void>;
  updateShippingAddress: (address: NonNullable<UserProfile['shippingAddress']>) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getStoredUser());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial check from localStorage
    const saved = authService.getStoredUser();
    if (saved) {
      setUser(saved);
      setLoading(false);
    }

    // If Firebase is configured with real credentials, attach listener
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const profile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'MUTE Member',
            photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firebaseUser.email || 'MUTE')}&backgroundColor=14171a&textColor=f3f3f0`,
            createdAt: new Date().toISOString(),
          };
          setUser(profile);
          authService.setStoredUser(profile);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const clearError = () => setError(null);

  const loginWithGoogle = async (): Promise<UserProfile> => {
    try {
      setLoading(true);
      setError(null);
      const profile = await authService.loginWithGoogle();
      setUser(profile);
      return profile;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google authentication failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, pass: string): Promise<UserProfile> => {
    try {
      setLoading(true);
      setError(null);
      const profile = await authService.loginWithEmail(email, pass);
      setUser(profile);
      return profile;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to sign in';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string): Promise<UserProfile> => {
    try {
      setLoading(true);
      setError(null);
      const profile = await authService.registerWithEmail(email, pass, name);
      setUser(profile);
      return profile;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginDemoUser = async (): Promise<UserProfile> => {
    try {
      setLoading(true);
      setError(null);
      const profile = await authService.loginDemoUser();
      setUser(profile);
      return profile;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Demo login failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateShippingAddress = (address: NonNullable<UserProfile['shippingAddress']>) => {
    if (!user) return;
    const updated = { ...user, shippingAddress: address };
    setUser(updated);
    authService.setStoredUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        loginDemoUser,
        logout,
        updateShippingAddress,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
