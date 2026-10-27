import { TRUSTED_GOV_DOMAINS } from '@/lib/ai/sources';

export type FraudRisk = 'safe' | 'caution' | 'high';

export interface FraudSignal {
  id: string;
  severity: 'info' | 'warn' | 'critical';
  messageEn: string;
  messageBn: string;
  messageHi: string;
  evidence?: string;
}

export interface FraudReport {
  risk: FraudRisk;
  score: number; // 0-100, higher = riskier
  signals: FraudSignal[];
  isLikelyScam: boolean;
  verifiedSender: boolean;
}

/**
 * Heuristic scam / fake-notice detector for Indian gov notices.
 * Flags: non-gov payment links, UPI IDs, OTP/PIN requests,
 * shortened URLs, threats + urgency pressure, fee anomalies.
 */
export function analyzeFraudSignals(
  rawText: string,
  opts?: { officialUrls?: string[]; expectedDepartment?: string }
): FraudReport {
  const text = rawText || '';
  const lower = text.toLowerCase();
  const signals: FraudSignal[] = [];
  let score = 0;

  const push = (s: FraudSignal, pts: number) => {
    signals.push(s);
    score += pts;
  };

  // 1. URLs — check domains
  const urlRe = /https?:\/\/[^\s)>\]]+/gi;
  const urls = text.match(urlRe) || [];
  const shortenerRe = /(bit\.ly|tinyurl|t\.ly|shorturl|is\.gd|cutt\.ly)/i;
  let hasUnofficialPaymentUrl = false;

  for (const u of urls.slice(0, 8)) {
    try {
      const host = new URL(u).hostname.toLowerCase();
      const trusted = TRUSTED_GOV_DOMAINS.some(
        (d) => host === d || host.endsWith(d.startsWith('.') ? d : '.' + d)
      );
      if (!trusted) {
        hasUnofficialPaymentUrl = true;
        push(
          {
            id: `unofficial-url-${host}`,
            severity: 'warn',
            messageEn: `Link ${host} is not a verified government domain. Pay only via official portals.`,
            messageBn: `লিংক ${host} যাচাইকৃত সরকারি ডোমেইন নয়। শুধুমাত্র অফিসিয়াল পোর্টালে পেমেন্ট করুন।`,
            messageHi: `लिंक ${host} सत्यापित सरकारी डोमेन नहीं है। केवल आधिकारिक पोर्टल पर भुगतान करें।`,
            evidence: u.slice(0, 120),
          },
          22
        );
      }
      if (shortenerRe.test(u)) {
        push(
          {
            id: 'shortened-url',
            severity: 'critical',
            messageEn: 'Shortened link detected — government departments never use bit.ly-style links for payments.',
            messageBn: 'সংক্ষিপ্ত লিংক পাওয়া গেছে — সরকারি দপ্তর পেমেন্টের জন্য এমন লিংক ব্যবহার করে না।',
            messageHi: 'छोटा लिंक मिला — सरकारी विभाग भुगतान के लिए ऐसे लिंक का उपयोग नहीं करते।',
            evidence: u.slice(0, 120),
          },
          30
        );
      }
    } catch {
      // ignore malformed
    }
  }

  // 2. UPI / personal payment handles in a "gov notice"
  const upiRe = /[a-zA-Z0-9._-]{2,}@(upi|ybl|okhdfc|paytm|ibl|axl)/gi;
  if (upiRe.test(text)) {
    const m = text.match(upiRe)?.[0];
    push(
      {
        id: 'upi-handle',
        severity: 'critical',
        messageEn: 'Personal UPI handle found in notice. Genuine govt dues are paid on portals, never to personal UPI IDs.',
        messageBn: 'নোটিশে ব্যক্তিগত UPI আইডি পাওয়া গেছে। সরকারি বিল কখনো ব্যক্তিগত UPI-তে দেওয়া হয় না।',
        messageHi: 'नोटिस में व्यक्तिगत UPI हैंडल मिला। सरकारी बकाया कभी व्यक्तिगत UPI पर नहीं मांगा जाता।',
        evidence: m,
      },
      35
    );
  }

  // 3. OTP / PIN / CVV / password requests — always scam
  if (/(otp|pin|cvv|password|atm.*pin|share.*otp|send.*otp)/i.test(text) && /(share|send|tell|provide|enter.*phone|call)/i.test(text)) {
    push(
      {
        id: 'otp-phishing',
        severity: 'critical',
        messageEn: 'Notice asks for OTP/PIN/password. Banks and govt offices NEVER ask for these on call or SMS.',
        messageBn: 'নোটিশে OTP/PIN চাওয়া হয়েছে। ব্যাংক বা সরকারি অফিস কখনো ফোনে এগুলো চায় না।',
        messageHi: 'नोटिस में OTP/PIN मांगा गया है। बैंक या सरकारी कार्यालय कभी फोन पर ये नहीं मांगते।',
      },
      40
    );
  }

  // 4. Threat + urgency pressure + personal mobile numbers
  const mobileRe = /(\+91[\s-]?)?[6-9]\d{9}/g;
  const mobiles = text.match(mobileRe) || [];
  if (/(disconnect|cut|freeze|block|arrest|penalty|24 hours|immediately|urgent)/i.test(text) && mobiles.length > 0 && urls.length === 0) {
    push(
      {
        id: 'threat-no-portal',
        severity: 'warn',
        messageEn: 'Threatening language with only a mobile number and no official portal link. Verify at the office before paying.',
        messageBn: 'হুমকিমূলক ভাষা, শুধু মোবাইল নম্বর — কোনো সরকারি পোর্টাল লিংক নেই। টাকা দেওয়ার আগে অফিসে যাচাই করুন।',
        messageHi: 'धमकी भरी भाषा, केवल मोबाइल नंबर — कोई आधिकारिक पोर्टल लिंक नहीं। भुगतान से पहले कार्यालय में सत्यापित करें।',
        evidence: mobiles[0],
      },
      18
    );
  }

  // 5. Cash-to-agent without receipt
  if (/(cash.*agent|agent.*cash|doorstep.*cash|pay.*home.*cash)/i.test(text)) {
    push(
      {
        id: 'cash-agent',
        severity: 'warn',
        messageEn: 'Cash collection without stamped receipt is a red flag. Always demand an official receipt.',
        messageBn: 'সিলমোহরযুক্ত রসিদ ছাড়া নগদ টাকা দেবেন না।',
        messageHi: 'मुहर लगी रसीद के बिना नकद भुगतान न करें।',
      },
      15
    );
  }

  // 6. Positive signal: references official portal from allowlist
  const officialUrls = opts?.officialUrls || [];
  const mentionsOfficial = officialUrls.some((u) => lower.includes(u.toLowerCase().replace('https://', '').replace('http://', '').split('/')[0]));
  if (mentionsOfficial || /(wbsedcl\.in|food\.wb\.gov\.in|edistrict\.wb\.gov\.in|rbi\.org\.in|uidai\.gov\.in)/i.test(text)) {
    push(
      {
        id: 'official-portal-mentioned',
        severity: 'info',
        messageEn: 'Notice references a verified official portal — good authenticity signal.',
        messageBn: 'নোটিশে যাচাইকৃত সরকারি পোর্টালের উল্লেখ আছে — ভালো সংকেত।',
        messageHi: 'नोटिस में सत्यापित आधिकारिक पोर्टल का उल्लेख है — अच्छा संकेत।',
      },
      -10
    );
  }

  score = Math.max(0, Math.min(100, score));
  void hasUnofficialPaymentUrl;

  let risk: FraudRisk = 'safe';
  if (score >= 50) risk = 'high';
  else if (score >= 20) risk = 'caution';

  return {
    risk,
    score,
    signals,
    isLikelyScam: risk === 'high',
    verifiedSender: risk === 'safe' && signals.some((s) => s.id === 'official-portal-mentioned'),
  };
}
