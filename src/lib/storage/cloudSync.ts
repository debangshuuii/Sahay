/**
 * Pluggable persistence: localStorage today, Supabase/Postgres tomorrow.
 * Set NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY to enable cloud.
 * All methods degrade gracefully to local when unconfigured/offline.
 */

import { localStorageManager } from './localStorageManager';
import type { DocumentAnalysis } from '../ai/types';

export const cloudSync = {
  isCloudEnabled(): boolean {
    return Boolean(
      (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) &&
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)
    );
  },

  /** Queue stub — when cloud is enabled this would push via /api/documents */
  async syncDocument(analysis: DocumentAnalysis): Promise<{ synced: boolean; reason: string }> {
    if (!this.isCloudEnabled()) {
      return { synced: false, reason: 'cloud-disabled-local-only' };
    }
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis }),
      });
      return { synced: res.ok, reason: res.ok ? 'synced' : `http-${res.status}` };
    } catch (e) {
      return { synced: false, reason: `network-error:${String(e).slice(0, 80)}` };
    }
  },

  async pullDocuments() {
    if (!this.isCloudEnabled()) return localStorageManager.getSavedDocuments();
    try {
      const res = await fetch('/api/documents', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.documents)) return data.documents;
      }
    } catch { /* fallback */ }
    return localStorageManager.getSavedDocuments();
  },
};
