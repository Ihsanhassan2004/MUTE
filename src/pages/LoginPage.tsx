import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/account';

  const { loginWithGoogle, loginWithEmail, registerWithEmail, loginDemoUser, loading, error, clearError } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    try {
      if (mode === 'signin') {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name);
      }
      navigate(`/${redirectPath.replace(/^\//, '')}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      setLocalError(msg);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError(null);
    clearError();
    try {
      await loginWithGoogle();
      navigate(`/${redirectPath.replace(/^\//, '')}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in cancelled';
      setLocalError(msg);
    }
  };

  const handleDemoLogin = async () => {
    setLocalError(null);
    clearError();
    try {
      await loginDemoUser();
      navigate(`/${redirectPath.replace(/^\//, '')}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Demo sign-in failed';
      setLocalError(msg);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#050607] text-[#F3F3F0] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#0A0C0E] border border-[#20242A] p-8 sm:p-10 space-y-8 relative shadow-2xl"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block mb-3">
            <span className="font-display font-black text-2xl tracking-[0.3em] text-[#F3F3F0]">
              MUTE
            </span>
          </Link>
          <h1 className="font-display font-light text-2xl sm:text-3xl tracking-tight text-[#F3F3F0] uppercase">
            WELCOME TO MUTE.
          </h1>
          <p className="text-xs text-[#8E9399] font-light italic font-serif">
            "Your pause starts here."
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="grid grid-cols-2 border-b border-[#1A1E23] text-center font-mono text-xs">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`pb-3 uppercase tracking-wider transition-colors ${
              mode === 'signin'
                ? 'border-b-2 border-[#F3F3F0] text-[#F3F3F0] font-medium'
                : 'text-[#6B7280] hover:text-[#8E9399]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`pb-3 uppercase tracking-wider transition-colors ${
              mode === 'signup'
                ? 'border-b-2 border-[#F3F3F0] text-[#F3F3F0] font-medium'
                : 'text-[#6B7280] hover:text-[#8E9399]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Feedback */}
        {(localError || error) && (
          <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-400 text-xs font-mono">
            {localError || error}
          </div>
        )}

        {/* Social / Google Sign In */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-[#14171A] hover:bg-[#1C2025] border border-[#2A2F36] hover:border-[#F3F3F0]/40 text-[#F3F3F0] py-3 px-4 flex items-center justify-center gap-3 transition-all text-xs font-mono uppercase tracking-wider disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-[#101316] hover:bg-[#161B20] border border-[#20242A] hover:border-emerald-500/40 p-3 text-left flex items-center justify-between text-xs font-mono text-[#8E9399] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-emerald-400" />
              <span className="text-[#F3F3F0]">1-Click Demo Account (Julian Vance)</span>
            </div>
            <span className="text-[10px] text-emerald-400 uppercase">Instant →</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#181B1F] w-full" />
          <span className="bg-[#0A0C0E] px-3 font-mono text-[10px] text-[#5A606A] uppercase tracking-widest absolute">
            OR WITH EMAIL
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none"
                />
                <User size={13} className="absolute right-3 top-3 text-[#6B7280]" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@drinkmute.com"
                className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none"
              />
              <Mail size={13} className="absolute right-3 top-3 text-[#6B7280]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none"
              />
              <Lock size={13} className="absolute right-3 top-3 text-[#6B7280]" />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              loading={loading}
              icon={<ArrowRight size={13} />}
            >
              {mode === 'signin' ? 'SIGN IN TO MUTE' : 'CREATE ACCOUNT'}
            </Button>
          </div>
        </form>

        {/* Security Footer */}
        <div className="text-center pt-2 border-t border-[#14171A]">
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#5A606A] uppercase">
            <ShieldCheck size={12} />
            <span>Encrypted Member Vault • Zero Spam Policy</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
