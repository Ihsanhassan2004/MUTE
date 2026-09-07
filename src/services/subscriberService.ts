export interface DropSubscriber {
  id: string;
  email: string;
  source: 'first_drop_modal' | 'footer_newsletter' | 'manual';
  createdAt: string;
  status: 'active' | 'archived';
  batchNote?: string;
}

const LOCAL_STORAGE_KEY = 'mute_first_drop_subscribers';

const INITIAL_SAMPLE_SUBSCRIBERS: DropSubscriber[] = [
  {
    id: 'lead-001',
    email: 'katherine.ross@monolith.design',
    source: 'first_drop_modal',
    createdAt: '2026-03-01T09:24:00.000Z',
    status: 'active',
    batchNote: 'Batch 002 Priority',
  },
  {
    id: 'lead-002',
    email: 'david.chen@hyperfocus.io',
    source: 'first_drop_modal',
    createdAt: '2026-03-02T14:12:00.000Z',
    status: 'active',
    batchNote: 'Batch 002 Priority',
  },
  {
    id: 'lead-003',
    email: 'elena.rostova@archstudio.de',
    source: 'footer_newsletter',
    createdAt: '2026-03-04T18:45:00.000Z',
    status: 'active',
    batchNote: 'Quiet Circle Newsletter',
  },
  {
    id: 'lead-004',
    email: 'marcus.vance@soundlab.co',
    source: 'first_drop_modal',
    createdAt: '2026-03-06T11:05:00.000Z',
    status: 'active',
    batchNote: 'Batch 002 Priority',
  },
];

export const subscriberService = {
  getSubscribers(): DropSubscriber[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_SUBSCRIBERS));
        return INITIAL_SAMPLE_SUBSCRIBERS;
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return INITIAL_SAMPLE_SUBSCRIBERS;

      // Check if it's legacy format (array of strings) or object format
      const normalized: DropSubscriber[] = parsed.map((item, index) => {
        if (typeof item === 'string') {
          return {
            id: `legacy-${index}-${Date.now()}`,
            email: item,
            source: 'first_drop_modal',
            createdAt: new Date().toISOString(),
            status: 'active',
            batchNote: 'Batch 002 Priority',
          };
        }
        return item;
      });

      return normalized;
    } catch {
      return INITIAL_SAMPLE_SUBSCRIBERS;
    }
  },

  addSubscriber(
    email: string,
    source: 'first_drop_modal' | 'footer_newsletter' | 'manual' = 'first_drop_modal',
    batchNote: string = 'Batch 002 Priority'
  ): DropSubscriber | null {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes('@')) return null;

    const list = this.getSubscribers();
    const existing = list.find((s) => s.email.toLowerCase() === trimmedEmail);

    if (existing) {
      return existing;
    }

    const newSubscriber: DropSubscriber = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email: trimmedEmail,
      source,
      createdAt: new Date().toISOString(),
      status: 'active',
      batchNote,
    };

    const updated = [newSubscriber, ...list];
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save subscriber to localStorage', e);
    }

    return newSubscriber;
  },

  removeSubscriber(idOrEmail: string): void {
    const list = this.getSubscribers();
    const updated = list.filter(
      (s) => s.id !== idOrEmail && s.email.toLowerCase() !== idOrEmail.toLowerCase()
    );
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to remove subscriber', e);
    }
  },

  clearAllSubscribers(): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    } catch (e) {
      console.warn('Failed to clear subscribers', e);
    }
  },

  restoreSampleData(): DropSubscriber[] {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_SUBSCRIBERS));
    } catch (e) {
      console.warn('Failed to restore samples', e);
    }
    return INITIAL_SAMPLE_SUBSCRIBERS;
  },

  exportToCSV(subscribers: DropSubscriber[]): void {
    const headers = ['ID', 'Email', 'Source', 'Batch Note', 'Status', 'Date Joined'];
    const rows = subscribers.map((s) => [
      `"${s.id}"`,
      `"${s.email}"`,
      `"${s.source}"`,
      `"${s.batchNote || ''}"`,
      `"${s.status}"`,
      `"${new Date(s.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `mute_drop_subscribers_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
