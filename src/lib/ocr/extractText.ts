/**
 * Improved offline text extraction for PDFs and images.
 * No native deps — pure TS heuristics that handle scanned
 * Bengali/Hindi/English notices better than naive printable slicing.
 */

export type OcrQuality = 'high' | 'medium' | 'low' | 'unreadable';

export interface ExtractedTextResult {
  text: string;
  quality: OcrQuality;
  method: 'pdf-text' | 'printable-fallback' | 'provided-text' | 'empty';
  charCount: number;
  hasBengali: boolean;
  hasDevanagari: boolean;
  signals: string[];
}

/**
 * Try to extract real PDF text operators (Tj / TJ / ') from raw buffer.
 * Works for uncompressed / partially-compressed PDFs without extra deps.
 */
function extractPdfOperators(raw: string): string {
  const chunks: string[] = [];

  // (text) Tj  and  [ (a) (b) ] TJ
  const tjRegex = /\((?:\\.|[^\\()])*\)\s*Tj/g;
  const tjArrayRegex = /\[(?:[^\[\]]*?)\]\s*TJ/g;

  const decodePdfString = (s: string): string => {
    // strip outer parens
    let inner = s.slice(0, s.lastIndexOf(')T') >= 0 ? s.length : s.length);
    // simpler: extract content inside first (...) before Tj/TJ
    return inner;
  };

  try {
    let m: RegExpExecArray | null;
    const parenRe = /\((\\.|[^\\()])*\)/g;
    // Collect Tj strings
    while ((m = tjRegex.exec(raw)) !== null) {
      const inner = m[0].match(parenRe);
      if (inner) {
        chunks.push(
          inner
            .map((p) =>
              p
                .slice(1, -1)
                .replace(/\\n/g, '\n')
                .replace(/\\r/g, '\r')
                .replace(/\\\(/g, '(')
                .replace(/\\\)/g, ')')
                .replace(/\\\\/g, '\\')
            )
            .join(' ')
        );
      }
    }
    // Collect TJ arrays
    while ((m = tjArrayRegex.exec(raw)) !== null) {
      const inners = m[0].match(parenRe);
      if (inners) {
        chunks.push(
          inners
            .map((p) =>
              p
                .slice(1, -1)
                .replace(/\\n/g, '\n')
                .replace(/\\r/g, '\r')
            )
            .join(' ')
        );
      }
    }
    void decodePdfString;
  } catch {
    // ignore, fall through
  }
  return chunks.join('\n').trim();
}

function printableFallback(buffer: Buffer): string {
  const raw = buffer.toString('utf8');
  // Keep Latin + Bengali (0980-09FF) + Devanagari (0900-097F) + common punctuation
  const cleaned = raw
    .replace(/[^\x20-\x7E\u0900-\u097F\u0980-\u09FF\n\r.,/:;₹Rs()\-–—_@#%+]/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return cleaned.slice(0, 12000);
}

export function detectOcrQuality(text: string): OcrQuality {
  const t = (text || '').trim();
  if (t.length < 30) return 'unreadable';
  if (t.length < 150) return 'low';
  // garble ratio: mostly replacement chars or single-char tokens
  const tokens = t.split(/\s+/);
  const avgLen = t.length / Math.max(1, tokens.length);
  const alphaNum = (t.match(/[A-Za-z0-9\u0900-\u097F\u0980-\u09FF]/g) || []).length;
  const ratio = alphaNum / Math.max(1, t.length);
  if (ratio < 0.5 || avgLen < 2.2) return 'low';
  if (t.length < 600 || ratio < 0.7) return 'medium';
  return 'high';
}

export function extractTextFromBuffer(
  buffer: Buffer,
  mimeType: string,
  providedText?: string
): ExtractedTextResult {
  if (providedText && providedText.trim().length > 30) {
    const text = providedText.slice(0, 12000);
    return {
      text,
      quality: detectOcrQuality(text),
      method: 'provided-text',
      charCount: text.length,
      hasBengali: /[\u0980-\u09FF]/.test(text),
      hasDevanagari: /[\u0900-\u097F]/.test(text),
      signals: ['client-or-form-text-used'],
    };
  }

  const signals: string[] = [];
  let text = '';

  if (mimeType.includes('pdf') || buffer.slice(0, 5).toString() === '%PDF-') {
    try {
      const raw = buffer.toString('latin1');
      const viaOperators = extractPdfOperators(raw);
      if (viaOperators.trim().length > 40) {
        text = viaOperators.slice(0, 12000);
        signals.push('pdf-operator-extraction');
      } else {
        signals.push('pdf-operators-empty-fallback-printable');
      }
    } catch {
      signals.push('pdf-parse-failed');
    }
  }

  if (!text || text.trim().length < 40) {
    const fb = printableFallback(buffer);
    if (fb.length > text.trim().length) {
      text = fb;
      signals.push('printable-fallback');
    }
  }

  // Image tip: if very little text from an image, mark unreadable so UI
  // can suggest retaking photo with better light / cropping.
  if (!text.trim()) {
    signals.push('no-text-detected-suggest-retake');
  }

  const quality = detectOcrQuality(text);
  return {
    text,
    quality,
    method: text ? (signals.includes('pdf-operator-extraction') ? 'pdf-text' : 'printable-fallback') : 'empty',
    charCount: text.length,
    hasBengali: /[\u0980-\u09FF]/.test(text),
    hasDevanagari: /[\u0900-\u097F]/.test(text),
    signals,
  };
}
