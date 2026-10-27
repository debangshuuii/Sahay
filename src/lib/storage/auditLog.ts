/**
 * Audit log + feedback store (local-first).
 * Cloud sync hook reads from here when SUPABASE_* env is configured.
 */

export interface AuditEvent {
  id: string;
  at: string;
  kind: 'analysis' | 'grievance_draft' | 'chat' | 'share' | 'calendar_export' | 'feedback' | 'data_purge';
  detail: string;
  docId?: string;
}

export interface ChatFeedback {
  id: string;
  at: string;
  docId?: string;
  question: string;
  answer: string;
  rating: 'up' | 'down';
  note?: string;
}

const AUDIT_KEY = 'sahay_audit_log_v1';
const FEEDBACK_KEY = 'sahay_chat_feedback_v1';
const MAX = 100;

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* ignore */ }
  return fallback;
}
function write(key: string, val: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch { /* quota ignore */ }
}

export const auditLog = {
  append(kind: AuditEvent['kind'], detail: string, docId?: string) {
    const list = read<AuditEvent[]>(AUDIT_KEY, []);
    const ev: AuditEvent = {
      id: `ev_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      at: new Date().toISOString(),
      kind, detail, docId,
    };
    write(AUDIT_KEY, [ev, ...list].slice(0, MAX));
    return ev;
  },
  list(): AuditEvent[] {
    return read<AuditEvent[]>(AUDIT_KEY, []);
  },
  clear() {
    write(AUDIT_KEY, []);
  },
};

export const feedbackStore = {
  append(f: Omit<ChatFeedback, 'id' | 'at'>) {
    const list = read<ChatFeedback[]>(FEEDBACK_KEY, []);
    const rec: ChatFeedback = {
      ...f,
      id: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      at: new Date().toISOString(),
    };
    write(FEEDBACK_KEY, [rec, ...list].slice(0, MAX));
    // best-effort cloud beacon
    try {
      fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rec),
      }).catch(() => undefined);
    } catch { /* ignore */ }
    auditLog.append('feedback', `Chat feedback ${f.rating}: ${(f.question || '').slice(0, 80)}`, f.docId);
    return rec;
  },
  list(): ChatFeedback[] {
    return read<ChatFeedback[]>(FEEDBACK_KEY, []);
  },
};
