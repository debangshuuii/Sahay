'use client';
import React, { useMemo } from 'react';
import { Calendar, ArrowRight, Bell } from 'lucide-react';
import { localStorageManager } from '@/lib/storage/localStorageManager';
import { calculateDaysRemaining } from '@/lib/utils/dateUtils';
import type { Language } from '@/lib/i18n/translations';
import type { DocumentAnalysis } from '@/lib/ai/types';

interface Props {
  language: Language;
  onSelectDocument: (doc: DocumentAnalysis) => void;
  refreshKey: number;
}

export const DeadlineDashboard: React.FC<Props> = ({ language, onSelectDocument, refreshKey }) => {
  const items = useMemo(() => {
    void refreshKey;
    const all = localStorageManager.getAllDeadlines();
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return all
      .map((it) => {
        const info = calculateDaysRemaining(it.deadline.date);
        let sortKey = 99999;
        if (it.deadline.date) {
          const t = new Date(it.deadline.date);
          if (!isNaN(t.getTime())) sortKey = Math.ceil((t.getTime() - today.getTime()) / 86400000);
        }
        return { ...it, info, sortKey };
      })
      .filter((i) => i.deadline.date)
      .sort((a, b) => a.sortKey - b.sortKey)
      .slice(0, 5);
  }, [refreshKey]);

  if (items.length === 0) return null;

  return (
    <div className="container" style={{ marginTop: '1.5rem' }}>
      <div className="card" style={{ backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Bell size={18} color="var(--color-amber-accent)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {language === 'bn' ? 'আসন্ন সময়সীমা (সংরক্ষিত নথি)' : language === 'hi' ? 'आगामी समय-सीमाएं (सहेजे गए दस्तावेज़)' : 'Upcoming deadlines (saved docs)'}
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.map((it) => (
            <button
              key={`${it.docId}-${it.deadline.id}`}
              onClick={() => {
                const rec = localStorageManager.getSavedDocuments().find((d) => d.id === it.docId);
                if (rec) onSelectDocument(rec.analysis);
              }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-bg-canvas)', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Calendar size={16} color="var(--color-primary)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{it.deadline.description}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>{it.docLabel} • {it.deadline.date}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`badge ${it.info.status === 'critical' || it.info.status === 'passed' ? 'badge-amber' : 'badge-primary'}`} style={{ fontSize: '0.75rem' }}>
                  {it.info.formattedNotice || it.deadline.original_text}
                </span>
                <ArrowRight size={14} color="var(--color-primary)" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
