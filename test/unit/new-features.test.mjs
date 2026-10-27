import { test, describe } from 'node:test';
import assert from 'node:assert';
import { extractTextFromBuffer, detectOcrQuality } from '../../src/lib/ocr/extractText.ts';
import { detectLanguageFromText } from '../../src/lib/i18n/detectLanguage.ts';
import { analyzeFraudSignals } from '../../src/lib/security/fraudDetector.ts';
import { checkRateLimit } from '../../src/lib/security/rateLimit.ts';
import { googleCalendarTemplateUrl } from '../../src/lib/utils/reportGenerator.ts';
import { VERIFIED_OFFICIAL_PROCEDURES } from '../../src/lib/ai/sources.ts';
import { SAMPLE_DOCUMENTS } from '../../src/lib/ai/provider.ts';

describe('Sahay new-feature tests', () => {
  test('OCR extractor handles PDF text + quality scoring', () => {
    const fakePdf = Buffer.from('%PDF-1.4 (Hello Citizen) Tj more text here for quality scoring purposes 12345', 'latin1');
    const r = extractTextFromBuffer(fakePdf, 'application/pdf');
    assert.ok(r.text.length > 0);
    assert.ok(['high', 'medium', 'low', 'unreadable'].includes(r.quality));
    assert.strictEqual(detectOcrQuality(''), 'unreadable');
    assert.strictEqual(detectOcrQuality('a'.repeat(800) + ' test words here for ratio'), 'high');
  });

  test('Language auto-detect (bn/hi/en)', () => {
    assert.strictEqual(detectLanguageFromText('আমার রেশন কার্ড আধার লিঙ্ক'), 'bn');
    assert.strictEqual(detectLanguageFromText('मेरा राशन कार्ड आधार लिंक'), 'hi');
    assert.strictEqual(detectLanguageFromText('Electricity bill payment notice'), 'en');
  });

  test('Fraud detector flags UPI + short links, passes official', () => {
    const scam = analyzeFraudSignals('Pay urgently to xyz@upi via http://bit.ly/abc123 share OTP now 9876543210');
    assert.strictEqual(scam.risk, 'high');
    assert.ok(scam.score >= 50);
    const safe = analyzeFraudSignals('Pay at https://www.wbsedcl.in Quick Pay Consumer ID 201849302');
    assert.ok(safe.risk === 'safe' || safe.risk === 'caution');
  });

  test('Rate limiter blocks after limit', () => {
    const key = `test_${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      const r = checkRateLimit(key, { limit: 5, windowMs: 60000 });
      assert.strictEqual(r.allowed, true);
    }
    const blocked = checkRateLimit(key, { limit: 5, windowMs: 60000 });
    assert.strictEqual(blocked.allowed, false);
  });

  test('Calendar template URL + 8 procedures + 6 samples', () => {
    const url = googleCalendarTemplateUrl({ date: '2026-03-15', description: 'Pay bill', original_text: '15/03/2026' }, 'WBSEDCL');
    assert.ok(url && url.includes('calendar.google.com'));
    assert.strictEqual(googleCalendarTemplateUrl({ date: null, description: 'x', original_text: 'N/A' }, 't'), null);
    assert.ok(VERIFIED_OFFICIAL_PROCEDURES.length >= 8);
    assert.ok(SAMPLE_DOCUMENTS.length >= 6);
  });
});
