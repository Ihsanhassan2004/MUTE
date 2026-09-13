import { db, isFirebaseConfigured } from '../firebase/config';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

export interface DropSubscriber {
  id: string;
  email: string;
  source: 'first_drop_modal' | 'footer_newsletter' | 'manual';
  createdAt: string;
  status: 'active' | 'archived';
  batchNote?: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}

const LOCAL_STORAGE_KEY = 'mute_first_drop_subscribers';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

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

// Optional forwarder to send email straight to admin's Gmail via Web3Forms
async function forwardEmailNotification(subject: string, data: Record<string, string>) {
  if (!WEB3FORMS_ACCESS_KEY) return;
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `[MUTE Brand Alert] ${subject}`,
        from_name: 'MUTE Cloud Notifier',
        ...data,
      }),
    });
  } catch (err) {
    console.info('Email notification dispatch error:', err);
  }
}

export const subscriberService = {
  isCloudConnected(): boolean {
    return isFirebaseConfigured && db !== null;
  },

  getSubscribers(): DropSubscriber[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_SUBSCRIBERS));
        return INITIAL_SAMPLE_SUBSCRIBERS;
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return INITIAL_SAMPLE_SUBSCRIBERS;

      return parsed.map((item, index) => {
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
    } catch {
      return INITIAL_SAMPLE_SUBSCRIBERS;
    }
  },

  async fetchCloudSubscribers(): Promise<DropSubscriber[]> {
    if (this.isCloudConnected() && db) {
      try {
        const subsCol = collection(db, 'subscribers');
        const q = query(subsCol, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const cloudList: DropSubscriber[] = [];

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          cloudList.push({
            id: docSnap.id,
            email: data.email || '',
            source: data.source || 'first_drop_modal',
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
            status: data.status || 'active',
            batchNote: data.batchNote || 'Batch 002 Priority',
          });
        });

        if (cloudList.length > 0) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cloudList));
          return cloudList;
        }
      } catch (error) {
        console.warn('Failed to load from Firestore, using local cache:', error);
      }
    }
    return this.getSubscribers();
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

    // Save to local cache immediately
    const updated = [newSubscriber, ...list];
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save subscriber to localStorage', e);
    }

    // Save to Firestore Cloud Database in background
    if (this.isCloudConnected() && db) {
      addDoc(collection(db, 'subscribers'), {
        email: trimmedEmail,
        source,
        batchNote,
        status: 'active',
        createdAt: serverTimestamp(),
      }).catch((err) => {
        console.warn('Firestore cloud save background error:', err);
      });
    }

    // Forward notification to owner's inbox if key is configured
    forwardEmailNotification('New Drop Subscriber', {
      Subscriber_Email: trimmedEmail,
      Source: source,
      Batch_Note: batchNote,
      Timestamp: new Date().toLocaleString(),
    });

    return newSubscriber;
  },

  async sendContactInquiry(inquiry: {
    name: string;
    email: string;
    inquiryType: string;
    message: string;
  }): Promise<boolean> {
    const inquiryData: ContactInquiry = {
      ...inquiry,
      createdAt: new Date().toISOString(),
    };

    // Save to Firestore
    if (this.isCloudConnected() && db) {
      try {
        await addDoc(collection(db, 'inquiries'), {
          ...inquiryData,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn('Error saving inquiry to Firestore:', err);
      }
    }

    // Also forward to owner inbox via Web3Forms
    await forwardEmailNotification(`Inquiry from ${inquiry.name} (${inquiry.inquiryType})`, {
      Sender_Name: inquiry.name,
      Sender_Email: inquiry.email,
      Inquiry_Type: inquiry.inquiryType,
      Message: inquiry.message,
      Timestamp: new Date().toLocaleString(),
    });

    return true;
  },

  async removeSubscriber(idOrEmail: string): Promise<void> {
    const list = this.getSubscribers();
    const updated = list.filter(
      (s) => s.id !== idOrEmail && s.email.toLowerCase() !== idOrEmail.toLowerCase()
    );
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to remove subscriber', e);
    }

    // If Firestore ID, remove from cloud
    if (this.isCloudConnected() && db && !idOrEmail.startsWith('sub-') && !idOrEmail.startsWith('lead-')) {
      try {
        await deleteDoc(doc(db, 'subscribers', idOrEmail));
      } catch (e) {
        console.warn('Failed to delete subscriber from Firestore:', e);
      }
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

