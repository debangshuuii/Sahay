import type { SupportedLanguage } from '@/lib/ai/types';

/**
 * Lightweight script-based language detection.
 * No deps. Counts Bengali / Devanagari / Latin blocks.
 */
export function detectLanguageFromText(text: string): SupportedLanguage {
  const t = text || '';
  if (!t.trim()) return 'en';
  const bn = (t.match(/[\u0980-\u09FF]/g) || []).length;
  const hi = (t.match(/[\u0900-\u097F]/g) || []).length;
  const latin = (t.match(/[A-Za-z]/g) || []).length;

  // Strong script signals win even with fewer chars
  if (bn >= 8 && bn >= hi) return 'bn';
  if (hi >= 8 && hi > bn) return 'hi';

  // Hindi-in-Latin (Hinglish) hints
  if (/(kripya|yojana|praman|shulk|aavedan|jankari|sampark)/i.test(t)) return 'hi';
  // Bengali-in-Latin hints
  if (/(anumodan|abedan|pramanpatra|bidyut|ration|khadya)/i.test(t)) return 'bn';

  void latin;
  return 'en';
}

export function suggestLanguage(
  detected: SupportedLanguage,
  userSelected: SupportedLanguage
): { keep: boolean; suggestion: SupportedLanguage | null } {
  if (detected === userSelected) return { keep: true, suggestion: null };
  return { keep: false, suggestion: detected };
}
