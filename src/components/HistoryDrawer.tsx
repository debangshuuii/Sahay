'use client';

import React from 'react';
import { Language, translations } from '@/lib/i18n/translations';
import { StoredDocumentRecord, localStorageManager } from '@/lib/storage/localStorageManager';
import { DocumentAnalysis } from '@/lib/ai/types';
import { X, Trash2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  savedDocuments: StoredDocumentRecord[];
  onSelectDocument: (doc: DocumentAnalysis) => void;
  onRefreshHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  language,
  savedDocuments,
  onSelectDocument,
  onRefreshHistory,
}) => {
  const t = translations[language];
  const [query, setQuery] = React.useState('');

  if (!isOpen) return null;

  const filtered = (() => {
    const q = query.trim().toLowerCase();
    if (!q) return savedDocuments;
    return savedDocuments.filter(
      (r) =>
        r.documentType.toLowerCase().includes(q) ||
        r.fileName.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q)
    );
  })();

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    localStorageManager.deleteDocument(id);
    onRefreshHistory();
  };

  const handleClearAll = () => {
    if (window.confirm(language === 'bn' ? 'আপনি কি সমস্ত সংরক্ষিত নথিপত্র মুছে ফেলতে চান?' : 'Are you sure you want to delete all saved documents?')) {
      savedDocuments.forEach(d => localStorageManager.deleteDocument(d.id));
      onRefreshHistory();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'flex-end',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '1rem',
          marginBottom: '1rem',
        }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {t.historyTitle}
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {savedDocuments.length} {language === 'bn' ? 'টি নথি সংরক্ষিত' : 'documents saved locally'}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
            aria-label="Close saved documents drawer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Privacy Note */}
        <div style={{
          backgroundColor: 'var(--color-primary-light)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.8rem',
          color: 'var(--color-primary)',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}>
          <ShieldCheck size={16} style={{ flexShrink: 0 }} />
          <span>
            {language === 'bn'
              ? 'এই তথ্য কেবলমাত্র আপনার নিজস্ব ব্রাউজারে সংরক্ষিত। কোনো সার্ভারে জমা রাখা হয় না।'
              : 'Stored strictly inside your local browser. Zero cloud retention.'}
          </span>
        </div>

        {/* Search */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={language === 'bn' ? 'নথি খুঁজুন (বিল, রেশন, KYC...)' : 'Search saved docs...'}
          style={{ padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.85rem', marginBottom: '0.75rem', width: '100%' }}
        />

        {/* List of Documents */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>
              <FileText size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
              <p style={{ fontSize: '0.9rem' }}>{query ? (language === 'bn' ? 'কোনো মিল পাওয়া যায়নি।' : 'No matches found.') : t.historyEmpty}</p>
            </div>
          ) : (
            filtered.map((record) => (
              <div
                key={record.id}
                onClick={() => {
                  onSelectDocument(record.analysis);
                  onClose();
                }}
                className="card"
                style={{
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-primary)', lineHeight: 1.3 }}>
                    {record.documentType}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.2rem' }}>
                    {record.fileName} • {new Date(record.savedAt).toLocaleDateString()}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    onClick={(e) => handleDelete(e, record.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-text-muted)',
                      padding: '0.35rem',
                    }}
                    title={t.deleteDoc}
                    aria-label={`Delete ${record.documentType}`}
                  >
                    <Trash2 size={16} />
                  </button>
                  <ArrowRight size={16} color="var(--color-primary)" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Clear All */}
        {savedDocuments.length > 0 && (
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem' }}>
            <button
              onClick={handleClearAll}
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: '0.85rem', color: 'var(--color-error)' }}
            >
              <Trash2 size={16} />
              <span>{t.clearHistory}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
