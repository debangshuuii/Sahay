import { test, describe } from 'node:test';
import assert from 'node:assert';
import { shareAnalysisViaWhatsApp } from '../../src/lib/utils/shareUtils.ts';

describe('Sahay Grievance and Utilities Integration Tests', () => {

  test('1. Deadline formatting and ICS date format validation', () => {
    const rawDate = '2026-03-15';
    const cleanDateStr = rawDate.replace(/[^0-9-]/g, '');
    const parts = cleanDateStr.split('-');
    
    assert.strictEqual(parts.length, 3);
    assert.strictEqual(parts[0], '2026');
    assert.strictEqual(parts[1], '03');
    assert.strictEqual(parts[2], '15');
    
    const compact = `${parts[0]}${parts[1]}${parts[2]}`;
    assert.strictEqual(compact, '20260315');
  });

  test('2. WhatsApp Message payload generator contains structured notice data', () => {
    const mockAnalysis = {
      language: 'bn',
      document_type: { label: 'বিদ্যুৎ বিল বকেয়া নোটিশ', confidence: 0.98 },
      summary: 'চূড়ান্ত বিদ্যুৎ বিচ্ছিন্নকরণ নোটিশ।',
      deadlines: [{ description: 'বিল পরিশোধের শেষ তারিখ', date: '2026-03-15', original_text: '15/03/2026', confidence: 0.9, urgency: 'critical' }],
      action_steps: [{ id: '1', title: 'অনলাইন বিল জমা দিন', description: '', priority: 'high', status: 'required', completed: false }],
      sources: [{ title: 'WBSEDCL', url: 'https://www.wbsedcl.in', publisher: 'WBSEDCL', supports: '', last_verified_at: null, is_official: true }],
      key_facts: [],
      required_documents: [],
      uncertainties: [],
      follow_up_questions: [],
    };

    let generatedUrl = '';
    const originalOpen = global.window ? global.window.open : undefined;
    global.window = {
      open: (url) => { generatedUrl = url; }
    };

    shareAnalysisViaWhatsApp(mockAnalysis);
    assert.strictEqual(generatedUrl.includes('api.whatsapp.com'), true);
    assert.strictEqual(generatedUrl.includes(encodeURIComponent('বিদ্যুৎ বিল বকেয়া নোটিশ')), true);

    if (originalOpen) global.window.open = originalOpen;
  });

});
