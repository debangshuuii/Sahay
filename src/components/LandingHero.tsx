'use client';

import React from 'react';
import { Language, translations } from '@/lib/i18n/translations';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  FileCheck, 
  HelpCircle,
  Zap,
  Globe,
  Lock,
  ChevronRight
} from 'lucide-react';

interface LandingHeroProps {
  language: Language;
  onStartUpload: () => void;
  onTrySample: () => void;
  onOpenProcedures: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  language,
  onStartUpload,
  onTrySample,
  onOpenProcedures,
}) => {
  const t = translations[language];

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Hero Section */}
      <section style={{
        padding: '3rem 0 2.5rem',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-subtle)',
      }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            {/* Privacy Badge */}
            <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
              <span className="badge badge-primary" style={{ padding: '0.35rem 0.85rem' }}>
                <ShieldCheck size={16} />
                {t.privacyBadge} • {t.privacyGuarantee}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: '800',
              lineHeight: 1.15,
              color: 'var(--color-primary)',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}>
              {t.heroHeadline}
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '680px',
              marginInline: 'auto',
            }}>
              {t.heroSubheadline}
            </p>

            {/* Call to Actions */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <button
                onClick={onStartUpload}
                className="btn btn-primary"
                style={{
                  fontSize: '1.1rem',
                  padding: '0.85rem 1.75rem',
                  boxShadow: '0 4px 12px rgba(15, 76, 58, 0.25)',
                }}
              >
                {t.explainDocumentBtn}
                <ArrowRight size={20} />
              </button>

              <button
                onClick={onTrySample}
                className="btn btn-secondary"
                style={{
                  fontSize: '1.05rem',
                  padding: '0.85rem 1.5rem',
                  backgroundColor: '#ffffff',
                }}
              >
                <Zap size={18} color="var(--color-amber-accent)" />
                {t.trySampleBtn}
              </button>
            </div>
          </div>

          {/* Interactive Visual Comparison Preview */}
          <div style={{
            marginTop: '3.5rem',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
          }}>
            <div style={{
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}>
              <span>
                {language === 'bn' 
                  ? 'রূপান্তর পূর্বরূপ: জটিল সরকারি নোটিশ ➔ স্পষ্ট ও সহজ নির্দেশিকা' 
                  : language === 'hi'
                  ? 'रूपांतरण पूर्वावलोकन: कठिन सरकारी नोटिस ➔ सरल व स्पष्ट निर्देश'
                  : 'Live Demonstration: Official Complex Notice ➔ Plain-Language Actionable Checklist'}
              </span>
              <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                {language === 'bn' ? 'বাংলা • हिन्दी • English' : 'Bengali • Hindi • English'}
              </span>
            </div>

            <div className="grid-2" style={{ padding: '1.5rem', gap: '1.5rem' }}>
              {/* Left Side: Before (Official Jargon) */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px dashed #cbd5e1',
                fontSize: '0.875rem',
                color: '#475569',
                fontFamily: 'monospace',
                lineHeight: 1.5,
              }}>
                <div style={{ 
                  color: '#dc2626', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.35rem' 
                }}>
                  <AlertTriangle size={15} />
                  {language === 'bn' ? 'আসল নোটিশ (কঠিন ইংরেজি ও ধারা)' : language === 'hi' ? 'मूल नोटिस (कठिन अंग्रेज़ी व धाराएं)' : 'Original Notice (Bureaucratic Jargon)'}
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: '0.75rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                  <strong>NOTICE U/S 56(1) ELEC. ACT 2003</strong><br />
                  Ref: DIS/BNG/2026/0892 | Cons. ID: 201849302<br />
                  Total arrears amounting to Rs. 4,820.00 remain unliquidated. Failing liquidation within 15 days, supply will be disconnected forthwith on or after 16/03/2026. Reconnection shall attract penal surcharge of Rs. 350.00...
                </div>
                <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
                  {language === 'bn' ? '⚠️ অনেকেই বিভ্রান্ত হন: টাকা কোথায় জমা দেবেন? শেষ তারিখ কবে? কোন ওয়েবসাইটে যেতে হবে?' : '⚠️ Citizens are often confused: Where to pay? What is the cutoff? Which official website to visit?'}
                </p>
              </div>

              {/* Right Side: After (JibonSathi Plain Guide) */}
              <div style={{
                backgroundColor: 'var(--color-primary-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--color-primary-border)',
              }}>
                <div style={{
                  color: 'var(--color-primary)',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.95rem',
                }}>
                  <CheckCircle2 size={18} />
                  {language === 'bn' ? 'জীবনসাথী এআই-এর সহজ ব্যাখ্যা ও চেকলিস্ট' : language === 'hi' ? 'जीवनसाथी एआई का सरल समाधान व चेकलिस्ट' : 'JibonSathi AI Plain-Language Checklist'}
                </div>

                <div style={{
                  backgroundColor: '#ffffff',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '0.75rem',
                  border: '1px solid var(--color-border)',
                }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                    {language === 'bn' ? '১. সহজ ভাষায় অর্থ:' : language === 'hi' ? '१. सरल शब्दों में:' : '1. In Simple Words:'}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
                    {language === 'bn'
                      ? 'এটি বকেয়া বিদ্যুৎ বিলের নোটিশ। ১৫ই মার্চের মধ্যে বকেয়া ₹ ৪,৮২০ টাকা না মেটালে বিদ্যুৎ সংযোগ কাটা হতে পারে।'
                      : language === 'hi'
                      ? 'यह बिजली बिल का नोटिस है। 15 मार्च तक ₹ 4,820 न चुकाने पर बिजली कनेक्शन कट सकता है।'
                      : 'Statutory demand notice. Pay ₹ 4,820 by March 15 to avoid disconnection and a ₹ 350 reconnection penalty.'}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#ffffff',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                  }}>
                    <CheckCircle2 size={16} color="var(--color-success)" />
                    <span>
                      {language === 'bn' ? 'ধাপ ১: সরকারি পোর্টালে (wbsedcl.in) কনজিউমার আইডি দিয়ে বিল জমা দিন' : 'Step 1: Pay online at wbsedcl.in using Consumer ID 201849302'}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#ffffff',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                  }}>
                    <Calendar size={16} color="var(--color-amber-accent)" />
                    <span style={{ fontWeight: 600 }}>
                      {language === 'bn' ? 'শেষ তারিখ: ১৫ই মার্চ ২০২৬ (লাইন কাটা ১৬ই মার্চ)' : 'Cutoff Deadline: March 15, 2026'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process Explanation */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              {t.howItWorksTitle}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
              {language === 'bn'
                ? 'তিনটি সাধারণ ধাপে যেকোনো সরকারি কাগজপত্র সহজে বুঝে নিন'
                : language === 'hi'
                ? 'तीन सरल चरणों में किसी भी सरकारी दस्तावेज़ को समझें'
                : 'Three transparent steps to understand official documents with clarity'}
            </p>
          </div>

          <div className="grid-3">
            {/* Step 1 */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{t.step1Title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem' }}>
                {t.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{t.step2Title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem' }}>
                {t.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{t.step3Title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem' }}>
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Categories Grid */}
      <section style={{
        padding: '3rem 0',
        backgroundColor: 'var(--color-bg-subtle)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {t.categoriesTitle}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                {language === 'bn' ? 'যেকোনো ধরনের দৈনন্দিন সরকারি ও আইনি কাগজপত্রের জন্য' : 'Built for citizen everyday paperwork and administrative notices'}
              </p>
            </div>
            <button
              onClick={onOpenProcedures}
              className="btn btn-secondary"
              style={{ fontSize: '0.875rem' }}
            >
              {language === 'bn' ? 'সরকারি নির্দেশিকা দেখুন' : 'Explore Procedure Guides'}
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid-3">
            {[
              { title: t.catBills, desc: language === 'bn' ? 'বিদ্যুৎ, জল, ও মিউনিসিপ্যাল ট্যাক্স বিলের নোটিশ' : 'WBSEDCL, CESC, Water & Property Tax Notices' },
              { title: t.catCertificates, desc: language === 'bn' ? 'আয়, জাতি ও স্থায়ী বাসিন্দার শংসাপত্র' : 'Income, Caste, Domicile & SDO Approvals' },
              { title: t.catGovtSchemes, desc: language === 'bn' ? 'ডিজিটাল রেশন কার্ড, স্বাস্থ্যসাথী ও আধার লিঙ্ক' : 'Ration e-KYC, Swasthya Sathi & DBTs' },
              { title: t.catBankNotices, desc: language === 'bn' ? 'কেওয়াইসি আপডেট, অ্যাকাউন্ট ফ্রিজ ও প্যান লিঙ্ক' : 'Re-KYC notices, Form 60 & Account Freeze' },
              { title: t.catLegal, desc: language === 'bn' ? 'পঞ্চায়েত, পুরসভা ও আদালতের সমন নোটিশ' : 'Gram Panchayat, Municipal & Legal summons' },
              { title: t.catEducation, desc: language === 'bn' ? 'স্কলারশিপ আবেদন, হল টিকিট ও ভর্তি নিয়ম' : 'Oasis, Aikyashree Scholarships & Admissions' },
            ].map((cat, idx) => (
              <div key={idx} className="card" style={{ backgroundColor: '#ffffff' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                  {cat.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {cat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Responsible AI Disclaimer */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid var(--color-border)',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
        }}>
          <ShieldCheck size={22} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            <strong>{language === 'bn' ? 'দায়বদ্ধতা ও গোপনীয়তার অঙ্গীকার:' : 'Commitment to Truth & Privacy:'}</strong> {t.aiDisclaimer}
          </div>
        </div>
      </div>
    </div>
  );
};
