'use client';
import React, { useMemo } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { analyzeFraudSignals } from '@/lib/security/fraudDetector';
import type { Language } from '@/lib/i18n/translations';

interface Props {
  rawText: string;
  language: Language;
  officialUrls?: string[];
}

export const FraudAlert: React.FC<Props> = ({ rawText, language, officialUrls }) => {
  const report = useMemo(
    () => analyzeFraudSignals(rawText || '', { officialUrls }),
    [rawText, officialUrls]
  );

  const msg = (s: { messageEn: string; messageBn: string; messageHi: string }) =>
    language === 'bn' ? s.messageBn : language === 'hi' ? s.messageHi : s.messageEn;

  if (report.risk === 'safe' && report.signals.length <= 1) {
    return (
      <div style={{ backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
        <ShieldCheck size={20} color="var(--color-success)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: '0.875rem', color: 'var(--color-success)' }}>
          <strong>{language === 'bn' ? 'জালিয়াতি স্ক্রিন: নিরাপদ' : language === 'hi' ? 'धोखाधड़ी जांच: सुरक्षित' : 'Fraud screen: looks safe'}</strong>
          <div style={{ color: 'var(--color-text-muted)', marginTop: 2 }}>
            {language === 'bn' ? 'কোনো UPI, OTP বা ভুয়ো লিংকের সংকেত পাওয়া যায়নি। তবুও পেমেন্টের আগে পোর্টাল যাচাই করুন।' : language === 'hi' ? 'कोई UPI, OTP या फर्जी लिंक संकेत नहीं मिला। फिर भी भुगतान से पहले पोर्टल सत्यापित करें।' : 'No UPI, OTP or fake-link signals found. Still verify the portal before paying.'}
          </div>
        </div>
      </div>
    );
  }

  const bg = report.risk === 'high' ? 'var(--color-error-bg)' : 'var(--color-amber-bg)';
  const border = report.risk === 'high' ? 'var(--color-error-border)' : 'var(--color-amber-border)';
  const color = report.risk === 'high' ? 'var(--color-error)' : 'var(--color-amber-accent)';

  return (
    <div style={{ backgroundColor: bg, border: `1px solid ${border}`, borderRadius: 'var(--radius-md)', padding: '1rem 1.1rem' }}>
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
        {report.risk === 'high' ? <ShieldAlert size={22} color={color} /> : <AlertTriangle size={22} color={color} />}
        <div>
          <div style={{ fontWeight: 700, color, fontSize: '0.95rem' }}>
            {report.risk === 'high'
              ? language === 'bn' ? `উচ্চ জালিয়াতি ঝুঁকি (${report.score}/100) — টাকা দেবেন না` : language === 'hi' ? `उच्च धोखाधड़ी जोखिम (${report.score}/100) — भुगतान न करें` : `High fraud risk (${report.score}/100) — do not pay yet`
              : language === 'bn' ? `সতর্কতা (${report.score}/100) — অফিসে যাচাই করুন` : language === 'hi' ? `सावधानी (${report.score}/100) — कार्यालय में सत्यापित करें` : `Caution (${report.score}/100) — verify at office`}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
            {language === 'bn' ? 'সরকারি দপ্তর কখনো ব্যক্তিগত UPI, OTP বা bit.ly লিংকে টাকা চায় না।' : language === 'hi' ? 'सरकारी विभाग कभी व्यक्तिगत UPI, OTP या bit.ly लिंक पर पैसे नहीं मांगते।' : 'Govt offices never demand money via personal UPI, OTP, or bit.ly links.'}
          </div>
        </div>
      </div>
      <ul style={{ paddingLeft: '1.4rem', fontSize: '0.865rem', color: 'var(--color-text-main)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {report.signals.filter((s) => s.severity !== 'info').map((s) => (
          <li key={s.id}>{msg(s)}{s.evidence ? <code style={{ marginLeft: 6, fontSize: '0.75rem', background: '#fff', padding: '1px 6px', borderRadius: 4 }}>{s.evidence.slice(0, 80)}</code> : null}</li>
        ))}
      </ul>
      <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}>
          <ExternalLink size={14} /> {language === 'bn' ? 'সাইবার ক্রাইমে রিপোর্ট করুন' : 'Report: cybercrime.gov.in'}
        </a>
      </div>
    </div>
  );
};
