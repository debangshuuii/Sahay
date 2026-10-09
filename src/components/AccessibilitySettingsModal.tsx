'use client';

import React from 'react';
import { Language, translations } from '@/lib/i18n/translations';
import { UserPreferences, localStorageManager } from '@/lib/storage/localStorageManager';
import { X, Settings, Eye, Volume2, ShieldCheck, Trash2, CheckCircle2 } from 'lucide-react';

interface AccessibilitySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
  onDataPurged: () => void;
}

export const AccessibilitySettingsModal: React.FC<AccessibilitySettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  preferences,
  onUpdatePreferences,
  onDataPurged,
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  const handleClearAllData = () => {
    if (window.confirm(
      language === 'bn'
        ? 'আপনি কি ব্রাউজারের সমস্ত নথি, হিস্ট্রি ও সেটিংস স্থায়ীভাবে মুছে ফেলতে চান?'
        : 'Are you sure you want to permanently erase all saved documents, session history, and preferences?'
    )) {
      localStorageManager.clearAllData();
      onDataPurged();
      alert(t.dataDeletedSuccess);
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem',
    }}>
      <div className="card" style={{
        maxWidth: '520px',
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '1.75rem',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '1rem',
          marginBottom: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Settings size={22} color="var(--color-primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {t.settingsTitle}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
            aria-label="Close settings modal"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Font Size Selector */}
          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)', display: 'block', marginBottom: '0.5rem' }}>
              {t.fontSize}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {[
                { key: 'normal', label: t.fontSizeNormal },
                { key: 'large', label: t.fontSizeLarge },
                { key: 'extralarge', label: t.fontSizeExtraLarge },
              ].map(opt => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => onUpdatePreferences({ fontSize: opt.key as any })}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: preferences.fontSize === opt.key ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: preferences.fontSize === opt.key ? 'var(--color-primary-light)' : '#ffffff',
                    color: preferences.fontSize === opt.key ? 'var(--color-primary)' : 'var(--color-text-main)',
                    fontWeight: preferences.fontSize === opt.key ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-md)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Eye size={18} color="var(--color-primary)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.highContrast}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {language === 'bn' ? 'উচ্চ দৃষ্টিগোচরতার জন্য গাঢ় বর্ডার ও স্পষ্ট রং' : 'Strong contrast and borders for optimal readability'}
                </div>
              </div>
            </div>

            <input
              type="checkbox"
              checked={preferences.highContrast}
              onChange={(e) => onUpdatePreferences({ highContrast: e.target.checked })}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
            />
          </div>

          {/* Auto Speak Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-md)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Volume2 size={18} color="var(--color-primary)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.autoSpeak}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {language === 'bn' ? 'উত্তর আসার সাথে সাথে স্বয়ংক্রিয়ভাবে পড়ে শোনানো হবে' : 'Automatically read out answers aloud on completion'}
                </div>
              </div>
            </div>

            <input
              type="checkbox"
              checked={preferences.autoSpeak}
              onChange={(e) => onUpdatePreferences({ autoSpeak: e.target.checked })}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
            />
          </div>

          {/* Privacy & Zero Retention Assurance */}
          <div style={{
            backgroundColor: 'var(--color-primary-light)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-primary-border)',
            fontSize: '0.825rem',
            color: 'var(--color-primary)',
            lineHeight: 1.4,
          }}>
            <div style={{ fontWeight: 700, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={16} />
              {t.privacyBadge}
            </div>
            {t.privacyGuarantee}
          </div>

          {/* Erase All Data Button */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
            <button
              onClick={handleClearAllData}
              className="btn btn-secondary"
              style={{
                width: '100%',
                color: 'var(--color-error)',
                borderColor: 'var(--color-error-border)',
                fontSize: '0.875rem',
              }}
            >
              <Trash2 size={16} />
              <span>{t.deleteAllData}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
