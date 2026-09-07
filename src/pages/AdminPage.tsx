import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  ShieldAlert,
  Search,
  Download,
  Copy,
  Check,
  Trash2,
  UserPlus,
  RefreshCw,
  Mail,
  Users,
  Sparkles,
  LogOut,
  X,
} from 'lucide-react';
import { subscriberService, type DropSubscriber } from '../services/subscriberService';
import { Button } from '../components/common/Button';

const ADMIN_SESSION_KEY = 'mute_admin_auth_session';
const REQUIRED_PASSCODE = 'Bavin@2004';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated';
  });

  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [subscribers, setSubscribers] = useState<DropSubscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'first_drop_modal' | 'footer_newsletter' | 'manual'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCopiedAll, setIsCopiedAll] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newSource, setNewSource] = useState<'first_drop_modal' | 'footer_newsletter' | 'manual'>('first_drop_modal');
  const [newNote, setNewNote] = useState('Manual VIP Reserve');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Load subscribers
  const reloadData = () => {
    const list = subscriberService.getSubscribers();
    setSubscribers(list);
  };

  useEffect(() => {
    if (isAuthenticated) {
      reloadData();
    }
  }, [isAuthenticated]);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === REQUIRED_PASSCODE) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
      setIsAuthenticated(true);
      setPasscodeError('');
      setPasscode('');
    } else {
      setPasscodeError('Invalid access credential. Access denied.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleCopyAllVisible = () => {
    if (filteredSubscribers.length === 0) return;
    const emails = filteredSubscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(emails);
    setIsCopiedAll(true);
    showToast(`Copied ${filteredSubscribers.length} email addresses to clipboard`);
    setTimeout(() => {
      setIsCopiedAll(false);
    }, 2500);
  };

  const handleDelete = (id: string, email: string) => {
    if (window.confirm(`Remove ${email} from drop registry?`)) {
      subscriberService.removeSubscriber(id);
      reloadData();
      showToast(`Removed ${email}`);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('WARNING: Are you sure you want to clear ALL drop subscribers? This cannot be undone.')) {
      subscriberService.clearAllSubscribers();
      reloadData();
      showToast('All subscribers cleared.');
    }
  };

  const handleRestoreSamples = () => {
    const restored = subscriberService.restoreSampleData();
    setSubscribers(restored);
    showToast('Sample dataset restored.');
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    const added = subscriberService.addSubscriber(newEmail.trim(), newSource, newNote);
    if (added) {
      reloadData();
      setNewEmail('');
      setIsAddModalOpen(false);
      showToast(`Added ${newEmail.trim()} to registry.`);
    }
  };

  // Filtered subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((s) => {
      const matchSearch =
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.batchNote && s.batchNote.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchSource = sourceFilter === 'all' || s.source === sourceFilter;
      return matchSearch && matchSource;
    });
  }, [subscribers, searchQuery, sourceFilter]);

  // Key metrics
  const totalCount = subscribers.length;
  const firstDropCount = subscribers.filter((s) => s.source === 'first_drop_modal').length;
  const newsletterCount = subscribers.filter((s) => s.source === 'footer_newsletter').length;
  const latestSubscriber = subscribers[0];

  // Auth Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050607] text-[#F3F3F0] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient Dark Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-md bg-[#0A0C0E] border border-[#20242A] p-8 sm:p-10 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[#14171A]">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#8E9399] uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>SECURITY GATEWAY</span>
            </div>
            <div className="font-mono text-[10px] text-[#5A606A] tracking-wider uppercase">
              CONSOLE 01
            </div>
          </div>

          <div className="py-8 space-y-3 text-center">
            <div className="inline-flex p-3.5 rounded-full bg-[#14171A] border border-[#262B33] text-[#F3F3F0] mb-2">
              <Lock size={24} />
            </div>
            <h1 className="font-display font-light text-2xl tracking-tight text-[#F3F3F0] uppercase">
              MUTE // ADMIN DESK
            </h1>
            <p className="text-xs text-[#8E9399] font-light max-w-xs mx-auto leading-relaxed">
              Enter your authorization key to inspect drop subscriber queues and lead allocations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Passcode"
                  className="w-full bg-[#050607] border border-[#2A2F36] focus:border-[#F3F3F0] px-4 py-3.5 text-xs text-[#F3F3F0] placeholder-[#5A606A] font-mono tracking-widest focus:outline-none transition-colors text-center"
                  autoFocus
                />
              </div>
              {passcodeError && (
                <p className="text-[11px] font-mono text-rose-400 mt-2 flex items-center justify-center gap-1.5">
                  <ShieldAlert size={12} />
                  <span>{passcodeError}</span>
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Unlock size={14} />}
            >
              AUTHENTICATE CONSOLE
            </Button>
          </form>

          <div className="pt-6 mt-6 border-t border-[#14171A] text-center">
            <p className="font-mono text-[9px] text-[#5A606A] tracking-widest uppercase">
              CONFIDENTIAL // MUTE BEVERAGES INTERNAL USE ONLY
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050607] text-[#F3F3F0] pt-28 pb-20 px-6 sm:px-8 lg:px-12 relative">
      {/* Toast Feedback Notification */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-50 bg-[#14171A] border border-[#2F353E] text-[#F3F3F0] px-4 py-2.5 font-mono text-xs shadow-2xl flex items-center gap-2"
          >
            <Check size={14} className="text-emerald-400" />
            <span>{feedbackMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#1A1E23]">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#8E9399]">
                COMMAND CONSOLE // ENCRYPTED
              </span>
            </div>
            <h1 className="font-display font-light text-2xl sm:text-4xl tracking-tight text-[#F3F3F0] uppercase">
              DROP SUBSCRIBER REGISTRY
            </h1>
            <p className="text-xs text-[#8E9399] font-light">
              Live records of customers who joined the First Drop Queue (Batch 002) and newsletter dispatches.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              icon={<UserPlus size={13} />}
            >
              + ADD LEAD
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => subscriberService.exportToCSV(filteredSubscribers)}
              icon={<Download size={13} />}
            >
              EXPORT CSV
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              icon={<LogOut size={13} />}
            >
              LOCK CONSOLE
            </Button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0A0C0E] border border-[#1E2228] p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase">
                TOTAL LEADS
              </span>
              <Users size={16} className="text-[#8E9399]" />
            </div>
            <div className="font-mono text-3xl font-light text-[#F3F3F0]">
              {totalCount.toString().padStart(2, '0')}
            </div>
            <p className="text-[10px] font-mono text-[#5A606A] uppercase">
              Combined queue & dispatches
            </p>
          </div>

          <div className="bg-[#0A0C0E] border border-[#1E2228] p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase">
                BATCH 002 QUEUE
              </span>
              <Sparkles size={16} className="text-emerald-400" />
            </div>
            <div className="font-mono text-3xl font-light text-[#F3F3F0]">
              {firstDropCount.toString().padStart(2, '0')}
            </div>
            <p className="text-[10px] font-mono text-[#5A606A] uppercase">
              Direct First Drop signups
            </p>
          </div>

          <div className="bg-[#0A0C0E] border border-[#1E2228] p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase">
                NEWSLETTER DISPATCH
              </span>
              <Mail size={16} className="text-[#8E9399]" />
            </div>
            <div className="font-mono text-3xl font-light text-[#F3F3F0]">
              {newsletterCount.toString().padStart(2, '0')}
            </div>
            <p className="text-[10px] font-mono text-[#5A606A] uppercase">
              Footer quiet circle members
            </p>
          </div>

          <div className="bg-[#0A0C0E] border border-[#1E2228] p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase">
                LATEST SIGNUP
              </span>
              <RefreshCw size={14} className="text-[#8E9399]" />
            </div>
            <div className="font-mono text-sm font-medium text-[#F3F3F0] truncate" title={latestSubscriber?.email || 'None'}>
              {latestSubscriber ? latestSubscriber.email : 'No entries'}
            </div>
            <p className="text-[10px] font-mono text-[#5A606A] uppercase">
              {latestSubscriber
                ? new Date(latestSubscriber.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Waiting for leads'}
            </p>
          </div>
        </div>

        {/* Filter & Control Bar */}
        <div className="bg-[#0A0C0E] border border-[#1E2228] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A606A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by email address..."
              className="w-full bg-[#050607] border border-[#20252C] focus:border-[#F3F3F0] pl-9 pr-4 py-2 text-xs text-[#F3F3F0] placeholder-[#5A606A] font-mono tracking-wider focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E9399] hover:text-[#F3F3F0]"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Source Tabs */}
          <div className="flex items-center gap-1 bg-[#050607] p-1 border border-[#20252C] w-full md:w-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setSourceFilter('all')}
              className={`px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-colors whitespace-nowrap ${
                sourceFilter === 'all'
                  ? 'bg-[#F3F3F0] text-[#050607] font-semibold'
                  : 'text-[#8E9399] hover:text-[#F3F3F0]'
              }`}
            >
              All ({subscribers.length})
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter('first_drop_modal')}
              className={`px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-colors whitespace-nowrap ${
                sourceFilter === 'first_drop_modal'
                  ? 'bg-[#F3F3F0] text-[#050607] font-semibold'
                  : 'text-[#8E9399] hover:text-[#F3F3F0]'
              }`}
            >
              First Drop ({firstDropCount})
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter('footer_newsletter')}
              className={`px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-colors whitespace-nowrap ${
                sourceFilter === 'footer_newsletter'
                  ? 'bg-[#F3F3F0] text-[#050607] font-semibold'
                  : 'text-[#8E9399] hover:text-[#F3F3F0]'
              }`}
            >
              Newsletter ({newsletterCount})
            </button>
          </div>

          {/* Quick Bulk Copy Button */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={handleCopyAllVisible}
              className="px-3 py-2 bg-[#14171A] hover:bg-[#1E232B] text-[#F3F3F0] border border-[#2A303A] font-mono text-[10px] tracking-widest uppercase transition-colors flex items-center gap-1.5"
            >
              {isCopiedAll ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{isCopiedAll ? 'COPIED ALL' : `COPY ALL (${filteredSubscribers.length})`}</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#0A0C0E] border border-[#1E2228] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E2228] bg-[#0E1013] font-mono text-[10px] uppercase tracking-widest text-[#8E9399]">
                  <th className="py-3.5 px-5">#</th>
                  <th className="py-3.5 px-5">Email Address</th>
                  <th className="py-3.5 px-5">Channel / Source</th>
                  <th className="py-3.5 px-5">Note / Campaign</th>
                  <th className="py-3.5 px-5">Date Joined</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14171A] text-xs font-mono">
                {filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-[#5A606A] font-mono text-xs">
                      <div className="max-w-xs mx-auto space-y-3">
                        <Users size={28} className="mx-auto text-[#383D45]" />
                        <p>No drop subscribers matching query.</p>
                        <Button variant="outline" size="sm" onClick={handleRestoreSamples}>
                          LOAD SAMPLE DATASET
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#111417]/70 transition-colors group"
                    >
                      <td className="py-4 px-5 text-[#5A606A] text-[11px]">
                        {(idx + 1).toString().padStart(2, '0')}
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-[#F3F3F0] select-all font-medium">
                            {item.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        {item.source === 'first_drop_modal' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-wider">
                            <Sparkles size={10} />
                            <span>First Drop Modal</span>
                          </span>
                        ) : item.source === 'footer_newsletter' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#14171A] border border-[#2E333D] text-[#8E9399] text-[10px] uppercase tracking-wider">
                            <Mail size={10} />
                            <span>Footer Dispatch</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-950/40 border border-purple-500/30 text-purple-300 text-[10px] uppercase tracking-wider">
                            <UserPlus size={10} />
                            <span>Manual VIP</span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-[#8E9399] text-[11px]">
                        {item.batchNote || 'Batch 002 Priority'}
                      </td>
                      <td className="py-4 px-5 text-[#8E9399] text-[11px] whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                        <span className="text-[10px] text-emerald-400 tracking-wider uppercase">
                          CONFIRMED
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyEmail(item.email, item.id)}
                            title="Copy email to clipboard"
                            className="p-1.5 text-[#8E9399] hover:text-[#F3F3F0] hover:bg-[#1C2025] transition-colors"
                          >
                            {copiedId === item.id ? (
                              <Check size={14} className="text-emerald-400" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.email)}
                            title="Remove subscriber"
                            className="p-1.5 text-[#5A606A] hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Controls */}
          <div className="p-4 bg-[#0A0C0E] border-t border-[#1E2228] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#5A606A]">
            <div>
              Showing {filteredSubscribers.length} of {subscribers.length} registered leads
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRestoreSamples}
                className="hover:text-[#8E9399] uppercase tracking-wider transition-colors"
              >
                Reset Samples
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={handleClearAll}
                className="hover:text-rose-400 uppercase tracking-wider transition-colors"
              >
                Clear Database
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Add Lead Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-[#050607]/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#0A0C0E] border border-[#20242A] shadow-2xl p-6 sm:p-8 z-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#14171A] pb-4">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#8E9399] uppercase">
                  <UserPlus size={12} />
                  <span>MANUAL LEAD ENTRY</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-[#8E9399] hover:text-[#F3F3F0]"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#8E9399] block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="member@company.com"
                    className="w-full bg-[#050607] border border-[#2A2F36] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] font-mono tracking-wider focus:outline-none"
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#8E9399] block">
                    Channel Source
                  </label>
                  <select
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value as any)}
                    className="w-full bg-[#050607] border border-[#2A2F36] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] font-mono tracking-wider focus:outline-none"
                  >
                    <option value="first_drop_modal">First Drop Modal (Batch 002)</option>
                    <option value="footer_newsletter">Newsletter Dispatch</option>
                    <option value="manual">Manual VIP Entry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#8E9399] block">
                    Internal Campaign Note
                  </label>
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="e.g. VIP Concierge Invite"
                    className="w-full bg-[#050607] border border-[#2A2F36] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] font-mono tracking-wider focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    icon={<Check size={13} />}
                  >
                    Save Lead
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
