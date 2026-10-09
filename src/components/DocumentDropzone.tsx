'use client';

import React, { useState, useRef } from 'react';
import { Language, translations } from '@/lib/i18n/translations';
import { SAMPLE_DOCUMENTS, SampleDocumentPreset } from '@/lib/ai/provider';
import { 
  UploadCloud, 
  Camera, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw,
  Loader2,
  FileCheck
} from 'lucide-react';

interface DocumentDropzoneProps {
  language: Language;
  onAnalyzeFile: (file: File | null, samplePreset?: SampleDocumentPreset) => Promise<void>;
  isLoading: boolean;
  statusMessage?: string;
}

export const DocumentDropzone: React.FC<DocumentDropzoneProps> = ({
  language,
  onAnalyzeFile,
  isLoading,
  statusMessage,
}) => {
  const t = translations[language];
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    setErrorMessage(null);
    const maxBytes = 15 * 1024 * 1024; // 15MB
    if (file.size > maxBytes) {
      setErrorMessage(
        language === 'bn' 
          ? 'ফাইলের সাইজ ১৫ মেগাবাইটের বেশি হতে পারবে না।' 
          : language === 'hi' 
          ? 'फ़ाइल का आकार 15MB से अधिक नहीं हो सकता।' 
          : 'File size exceeds maximum 15MB limit.'
      );
      return;
    }

    const validExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'webp'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !validExtensions.includes(ext)) {
      setErrorMessage(
        language === 'bn' 
          ? 'অনুগ্রহ করে পিডিএফ (PDF) বা ছবি (JPG/PNG) আপলোড করুন।' 
          : language === 'hi' 
          ? 'कृपया पीडीएफ (PDF) या फोटो (JPG/PNG) अपलोड करें।' 
          : 'Please select a valid PDF, JPG, or PNG document.'
      );
      return;
    }

    setSelectedFile(file);
    onAnalyzeFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleSampleSelect = (preset: SampleDocumentPreset) => {
    setSelectedFile(null);
    setErrorMessage(null);
    onAnalyzeFile(null, preset);
  };

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div className="card" style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
            marginBottom: '0.35rem',
          }}>
            {t.uploadAreaTitle}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            {t.uploadAreaSubtitle}
          </p>
        </div>

        {/* Hidden inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg,image/webp"
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              validateAndProcessFile(e.target.files[0]);
            }
          }}
        />

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              validateAndProcessFile(e.target.files[0]);
            }
          }}
        />

        {/* Drop Area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !isLoading && fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? 'var(--color-primary)' : 'var(--color-border-hover)'}`,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: dragOver ? 'var(--color-primary-light)' : 'var(--color-bg-canvas)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            cursor: isLoading ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload document drop area"
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !isLoading) {
              fileInputRef.current?.click();
            }
          }}
        >
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Loader2 size={42} color="var(--color-primary)" className="animate-spin" />
              <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                {statusMessage || t.processingDocument}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', maxWidth: '420px' }}>
                {t.generatingExplanation}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <UploadCloud size={32} />
              </div>

              <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
                {t.dragDropText}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                {t.supportedFormats}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  <FileText size={18} />
                  {t.orChooseFile}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    cameraInputRef.current?.click();
                  }}
                >
                  <Camera size={18} />
                  {t.cameraCapture}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--color-error-bg)',
            border: '1px solid var(--color-error-border)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-error)',
            fontSize: '0.9rem',
          }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Sample Document Section (Works without personal upload) */}
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Sparkles size={18} color="var(--color-amber-accent)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
              {language === 'bn' 
                ? 'ব্যক্তিগত তথ্য ছাড়াই নমুনা নথি দিয়ে এখনই পরীক্ষা করুন:' 
                : language === 'hi' 
                ? 'बिना व्यक्तिगत जानकारी के तुरंत नमूना दस्तावेज़ से देखें:' 
                : 'Try Immediately with Pre-Loaded Real Document Demonstrations:'}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {SAMPLE_DOCUMENTS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSampleSelect(preset)}
                disabled={isLoading}
                style={{
                  textAlign: 'left',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-canvas)',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'border-color 0.15s ease, background-color 0.15s ease',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
                className="sample-preset-btn"
              >
                <FileCheck size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.3 }}>
                    {preset.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                    {preset.category} • {preset.fileName}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .sample-preset-btn:hover {
          border-color: var(--color-primary) !important;
          background-color: var(--color-primary-light) !important;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};
