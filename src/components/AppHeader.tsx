'use client';

import React from 'react';
import { Language, translations } from '@/lib/i18n/translations';
import { ShieldCheck, BookOpen, Bookmark, Settings, HelpCircle, FileText, Mic } from 'lucide-react';

interface AppHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenProcedures: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenVoice?: () => void;
  onResetToHome: () => void;
  savedCount?: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  language,
  onLanguageChange,
  onOpenProcedures,
  onOpenHistory,
  onOpenSettings,
  onOpenVoice,
  onResetToHome,
  savedCount = 0,
}) => {
  const t = translations[language];

  return (
    <header style={{
      backgroundColor: 'var(--color-bg-card)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        gap: '1rem',
      }}>
        {/* Brand / Logo */}
        <button
          onClick={onResetToHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            padding: '0.25rem',
          }}
          aria-label="Sahay Home"
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(15, 76, 58, 0.25)'
          }}>
            <FileText size={24} />
          </div>
          <div>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'var(--color-primary)',
              lineHeight: 1.2
            }}>
              {t.appName}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              display: 'none',
            }} className="header-tagline">
              {t.tagline}
            </div>
          </div>
        </button>

        {/* Right Actions & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Voice Assistant Trigger */}
          {onOpenVoice && (
            <button
              onClick={onOpenVoice}
              className="btn btn-secondary"
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.875rem',
                minHeight: '38px',
                color: 'var(--color-primary)',
              }}
              title={t.voiceTitle}
              aria-label={t.voiceTitle}
            >
              <Mic size={16} color="var(--color-primary)" />
              <span style={{ display: 'none' }} className="btn-label-desktop">
                {language === 'bn' ? 'কথা বলুন' : language === 'hi' ? 'बोलें' : 'Voice'}
              </span>
            </button>
          )}
          {/* Procedure Guide Button */}
          <button
            onClick={onOpenProcedures}
            className="btn btn-secondary"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.875rem',
              minHeight: '38px',
            }}
            title={t.procedureGuideTitle}
          >
            <BookOpen size={16} color="var(--color-primary)" />
            <span style={{ display: 'none' }} className="btn-label-desktop">
              {language === 'bn' ? 'সরকারি নিয়ম' : language === 'hi' ? 'सरकारी प्रक्रिया' : 'Procedures'}
            </span>
          </button>

          {/* Saved History Button */}
          <button
            onClick={onOpenHistory}
            className="btn btn-secondary"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.875rem',
              minHeight: '38px',
              position: 'relative'
            }}
            title={t.historyTitle}
          >
            <Bookmark size={16} />
            {savedCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: 'var(--color-amber-accent)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {savedCount}
              </span>
            )}
            <span style={{ display: 'none' }} className="btn-label-desktop">
              {language === 'bn' ? 'সংরক্ষিত' : language === 'hi' ? 'सहेजे गए' : 'Saved'}
            </span>
          </button>

          {/* Language Switcher Segmented Control */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '3px',
            border: '1px solid var(--color-border)',
          }} role="radiogroup" aria-label="Select Language">
            {(['bn', 'hi', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onLanguageChange(l)}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: language === l ? '700' : '500',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: language === l ? 'var(--color-primary)' : 'transparent',
                  color: language === l ? '#ffffff' : 'var(--color-text-main)',
                  transition: 'background-color 0.15s ease',
                }}
              >
                {l === 'bn' ? 'বাংলা' : l === 'hi' ? 'हिन्दी' : 'EN'}
              </button>
            ))}
          </div>

          {/* Settings & Accessibility Button */}
          <button
            onClick={onOpenSettings}
            className="btn btn-secondary"
            style={{
              padding: '0.45rem',
              minHeight: '38px',
              width: '38px',
            }}
            aria-label="Settings and Accessibility"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .header-tagline {
            display: block !important;
          }
          .btn-label-desktop {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
};
