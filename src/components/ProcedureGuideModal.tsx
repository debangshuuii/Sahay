'use client';

import React, { useState } from 'react';
import { Language, translations } from '@/lib/i18n/translations';
import { VERIFIED_OFFICIAL_PROCEDURES, VerifiedOfficialProcedure } from '@/lib/ai/sources';
import { 
  X, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  ShieldAlert, 
  FileCheck, 
  Filter,
  AlertTriangle 
} from 'lucide-react';

interface ProcedureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ProcedureGuideModal: React.FC<ProcedureGuideModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProcedure, setSelectedProcedure] = useState<VerifiedOfficialProcedure | null>(
    VERIFIED_OFFICIAL_PROCEDURES[0]
  );

  if (!isOpen) return null;

  const filteredProcedures = VERIFIED_OFFICIAL_PROCEDURES.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery = !searchQuery || 
      p.titleEn.toLowerCase().includes(q) ||
      p.titleBn.toLowerCase().includes(q) ||
      p.titleHi.toLowerCase().includes(q) ||
      p.departmentEn.toLowerCase().includes(q) ||
      p.summaryEn.toLowerCase().includes(q) ||
      p.summaryBn.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

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
        maxWidth: '920px',
        width: '100%',
        maxHeight: '90vh',
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {t.procedureGuideTitle}
              </h2>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>
                {t.procedureGuideSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: '0.25rem',
            }}
            aria-label="Close procedure modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{
            flex: 1,
            minWidth: '240px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}>
            <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.75rem' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchProcedures}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem 0.55rem 2.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: '0.875rem',
              }}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              fontSize: '0.875rem',
              backgroundColor: '#ffffff',
            }}
          >
            <option value="all">{language === 'bn' ? 'সব বিভাগ' : language === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}</option>
            <option value="bills">{language === 'bn' ? 'বিদ্যুৎ ও বিল' : 'Bills & Utilities'}</option>
            <option value="govt_schemes">{language === 'bn' ? 'রেশন ও প্রকল্প' : 'Govt Schemes'}</option>
            <option value="certificates">{language === 'bn' ? 'সার্টিফিকেট' : 'Certificates'}</option>
            <option value="banking">{language === 'bn' ? 'ব্যাঙ্কিং কেওয়াইসি' : 'Banking & KYC'}</option>
          </select>
        </div>

        {/* Two-Column Explorer Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(250px, 320px) 1fr',
          gap: '1rem',
          overflowY: 'auto',
          flex: 1,
        }} className="procedure-modal-grid">
          {/* List Sidebar */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            overflowY: 'auto',
            maxHeight: '480px',
            borderRight: '1px solid var(--color-border)',
            paddingRight: '0.5rem',
          }}>
            {filteredProcedures.map(proc => {
              const isSelected = selectedProcedure?.id === proc.id;
              const title = language === 'bn' ? proc.titleBn : language === 'hi' ? proc.titleHi : proc.titleEn;
              const dept = language === 'bn' ? proc.departmentBn : language === 'hi' ? proc.departmentHi : proc.departmentEn;

              return (
                <button
                  key={proc.id}
                  onClick={() => setSelectedProcedure(proc)}
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-bg-canvas)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{
                    fontWeight: isSelected ? 700 : 600,
                    fontSize: '0.875rem',
                    color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                    lineHeight: 1.3,
                  }}>
                    {title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                    {dept}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Procedure Detail View */}
          {selectedProcedure && (
            <div style={{ overflowY: 'auto', maxHeight: '480px', paddingRight: '0.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>
                  ✓ {t.officialVerifiedBadge}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1.3 }}>
                  {language === 'bn' ? selectedProcedure.titleBn : language === 'hi' ? selectedProcedure.titleHi : selectedProcedure.titleEn}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                  {language === 'bn' ? selectedProcedure.departmentBn : language === 'hi' ? selectedProcedure.departmentHi : selectedProcedure.departmentEn}
                </div>
              </div>

              {/* Summary */}
              <div style={{
                backgroundColor: 'var(--color-bg-subtle)',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                color: 'var(--color-text-main)',
                marginBottom: '1rem',
              }}>
                {language === 'bn' ? selectedProcedure.summaryBn : language === 'hi' ? selectedProcedure.summaryHi : selectedProcedure.summaryEn}
              </div>

              {/* Steps */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  {language === 'bn' ? 'সঠিক ধাপসমূহ:' : language === 'hi' ? 'क्रमबद्ध चरण:' : 'Step-by-Step Instructions:'}
                </h4>
                <ol style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                  {(language === 'bn' ? selectedProcedure.stepsBn : language === 'hi' ? selectedProcedure.stepsHi : selectedProcedure.stepsEn).map((step, idx) => (
                    <li key={idx} style={{ marginBottom: '0.35rem' }}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Required Documents */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  {language === 'bn' ? 'প্রয়োজনীয় কাগজপত্র:' : language === 'hi' ? 'ज़रूरी दस्तावेज़:' : 'Mandatory Documents:'}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {(language === 'bn' ? selectedProcedure.mandatoryDocsBn : language === 'hi' ? selectedProcedure.mandatoryDocsHi : selectedProcedure.mandatoryDocsEn).map((doc, idx) => (
                    <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.8rem' }}>
                      • {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fees and Fraud Warning */}
              <div style={{
                backgroundColor: 'var(--color-amber-bg)',
                border: '1px solid var(--color-amber-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                fontSize: '0.85rem',
                color: 'var(--color-amber-accent)',
                marginBottom: '1rem',
                display: 'flex',
                gap: '0.5rem',
              }}>
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>{language === 'bn' ? 'ফি এবং সতর্কতা:' : 'Fee & Consumer Protection:'}</strong>{' '}
                  {language === 'bn' ? selectedProcedure.feesNoteBn : selectedProcedure.feesNoteEn}{' '}
                  {language === 'bn' ? selectedProcedure.warningsBn : selectedProcedure.warningsEn}
                </div>
              </div>

              {/* Direct Official Link */}
              <a
                href={selectedProcedure.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', fontSize: '0.9rem' }}
              >
                <span>{language === 'bn' ? 'সরকারি ওয়েবসাইটে যান' : 'Open Official Government Portal'}</span>
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 700px) {
          .procedure-modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
