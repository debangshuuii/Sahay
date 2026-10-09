import { DocumentAnalysis } from '../ai/types';

export interface StoredDocumentRecord {
  id: string;
  savedAt: string;
  fileName: string;
  language: string;
  documentType: string;
  summary: string;
  analysis: DocumentAnalysis;
}

const STORAGE_KEY = 'jibonsathi_saved_documents';
const PREFS_KEY = 'jibonsathi_user_preferences';

export interface UserPreferences {
  fontSize: 'normal' | 'large' | 'extralarge';
  highContrast: boolean;
  autoSpeak: boolean;
  preferredLanguage: 'bn' | 'hi' | 'en';
}

export const defaultPreferences: UserPreferences = {
  fontSize: 'normal',
  highContrast: false,
  autoSpeak: false,
  preferredLanguage: 'en',
};

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
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  },

  saveDocument(analysis: DocumentAnalysis): StoredDocumentRecord {
    const list = this.getSavedDocuments();
    const id = analysis.id || `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const record: StoredDocumentRecord = {
      id,
      savedAt: new Date().toISOString(),
      fileName: analysis.fileName || 'Document',
      language: analysis.language,
      documentType: analysis.document_type.label,
      summary: analysis.summary,
      analysis: { ...analysis, id },
    };

    // Filter out if already exists, then add to front
    const updated = [record, ...list.filter(item => item.id !== id)].slice(0, 15);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage quota exceeded:', err);
    }
    return record;
  },

  deleteDocument(id: string): void {
    if (typeof window === 'undefined') return;
    const list = this.getSavedDocuments();
    const filtered = list.filter(item => item.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch {
      // ignore
    }
  },

  clearAllData(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(PREFS_KEY);
      sessionStorage.clear();
    } catch {
      // ignore
    }
  },
};
