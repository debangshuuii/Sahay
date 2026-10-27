import { DocumentAnalysis } from '../ai/types';

export interface StoredDocumentRecord {
  id: string;
  savedAt: string;
  fileName: string;
  language: string;
  documentType: string;
  summary: string;
  analysis: DocumentAnalysis;
  /** persisted checklist progress */
  progress?: {
    completedSteps: string[];
    collectedDocs: string[];
    updatedAt: string;
  };
}

const STORAGE_KEY = 'jibonsathi_saved_documents';
const PREFS_KEY = 'jibonsathi_user_preferences';

export interface UserPreferences {
  fontSize: 'normal' | 'large' | 'extralarge';
  highContrast: boolean;
  autoSpeak: boolean;
  preferredLanguage: 'bn' | 'hi' | 'en';
  remindersEnabled?: boolean;
}

export const defaultPreferences: UserPreferences = {
  fontSize: 'normal',
  highContrast: false,
  autoSpeak: false,
  preferredLanguage: 'en',
  remindersEnabled: false,
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const localStorageManager = {
  getPreferences(): UserPreferences {
    if (typeof window === 'undefined') return defaultPreferences;
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) return { ...defaultPreferences, ...JSON.parse(raw) };
    } catch {
      // ignore
    }
    return defaultPreferences;
  },

  savePreferences(prefs: Partial<UserPreferences>): void {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  },

  getSavedDocuments(): StoredDocumentRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return safeParse<StoredDocumentRecord[]>(raw, []);
    } catch {
      // ignore
    }
    return [];
  },

  saveDocument(analysis: DocumentAnalysis): StoredDocumentRecord {
    const list = this.getSavedDocuments();
    const id = analysis.id || `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const existing = list.find((i) => i.id === id);
    const record: StoredDocumentRecord = {
      id,
      savedAt: existing?.savedAt || new Date().toISOString(),
      fileName: analysis.fileName || 'Document',
      language: analysis.language,
      documentType: analysis.document_type.label,
      summary: analysis.summary,
      analysis: { ...analysis, id },
      progress: existing?.progress,
    };

    // Filter out if already exists, then add to front
    const updated = [record, ...list.filter((item) => item.id !== id)].slice(0, 30);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage quota exceeded:', err);
    }
    return record;
  },

  /** Persist checklist toggles so progress survives reloads. */
  saveProgress(docId: string, completedSteps: string[], collectedDocs: string[]): void {
    if (typeof window === 'undefined') return;
    const list = this.getSavedDocuments();
    const idx = list.findIndex((d) => d.id === docId);
    const progress = { completedSteps, collectedDocs, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = {
        ...list[idx],
        progress,
        analysis: {
          ...list[idx].analysis,
          action_steps: list[idx].analysis.action_steps.map((s) => ({
            ...s,
            completed: completedSteps.includes(s.id),
          })),
          required_documents: list[idx].analysis.required_documents.map((d) => ({
            ...d,
            collected: collectedDocs.includes(d.id),
          })),
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch { /* ignore */ }
    } else {
      // unsaved workspace doc — stash under ephemeral key
      try {
        localStorage.setItem(`sahay_progress_${docId}`, JSON.stringify(progress));
      } catch { /* ignore */ }
    }
  },

  getProgress(docId: string): { completedSteps: string[]; collectedDocs: string[] } | null {
    const list = this.getSavedDocuments();
    const rec = list.find((d) => d.id === docId);
    if (rec?.progress) return rec.progress;
    // merge from analysis flags (e.g. loaded sample) or ephemeral stash
    if (rec) {
      return {
        completedSteps: rec.analysis.action_steps.filter((s) => s.completed).map((s) => s.id),
        collectedDocs: rec.analysis.required_documents.filter((d) => d.collected).map((d) => d.id),
      };
    }
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(`sahay_progress_${docId}`);
      if (raw) {
        const p = safeParse<{ completedSteps: string[]; collectedDocs: string[] } | null>(raw, null);
        if (p) return p;
      }
    }
    return null;
  },

  /** All deadlines across saved docs for dashboard/reminders. */
  getAllDeadlines(): Array<{
    docId: string;
    docLabel: string;
    fileName: string;
    deadline: DocumentAnalysis['deadlines'][number];
  }> {
    return this.getSavedDocuments().flatMap((d) =>
      (d.analysis.deadlines || []).map((deadline) => ({
        docId: d.id,
        docLabel: d.documentType,
        fileName: d.fileName,
        deadline,
      }))
    );
  },

  searchDocuments(query: string): StoredDocumentRecord[] {
    const q = query.trim().toLowerCase();
    const all = this.getSavedDocuments();
    if (!q) return all;
    return all.filter(
      (d) =>
        d.documentType.toLowerCase().includes(q) ||
        d.fileName.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q)
    );
  },

  deleteDocument(id: string): void {
    if (typeof window === 'undefined') return;
    const list = this.getSavedDocuments();
    const filtered = list.filter((item) => item.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      localStorage.removeItem(`sahay_progress_${id}`);
    } catch {
      // ignore
    }
  },

  clearAllData(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(PREFS_KEY);
      // clear ephemeral progress + audit-adjacent keys but keep audit for accountability
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('sahay_progress_')) keys.push(k);
      }
      keys.forEach((k) => localStorage.removeItem(k));
      sessionStorage.clear();
    } catch {
      // ignore
    }
  },
};
