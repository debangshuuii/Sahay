'use client';

import React, { useState, useEffect } from 'react';
import { Language, translations } from '@/lib/i18n/translations';
import { DocumentAnalysis } from '@/lib/ai/types';
import { SampleDocumentPreset, SAMPLE_DOCUMENTS } from '@/lib/ai/provider';
import { localStorageManager, StoredDocumentRecord, UserPreferences, defaultPreferences } from '@/lib/storage/localStorageManager';
import { AppHeader } from '@/components/AppHeader';
import { LandingHero } from '@/components/LandingHero';
import { DocumentDropzone } from '@/components/DocumentDropzone';
import { DocumentWorkspace } from '@/components/DocumentWorkspace';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { ProcedureGuideModal } from '@/components/ProcedureGuideModal';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { AccessibilitySettingsModal } from '@/components/AccessibilitySettingsModal';
import { Sparkles, ArrowRight, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('en');
  const [view, setView] = useState<'landing' | 'upload' | 'workspace'>('landing');
  const [activeAnalysis, setActiveAnalysis] = useState<DocumentAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Modals & Drawers
  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState<boolean>(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState<boolean>(false);

  // Persistence
  const [savedDocs, setSavedDocs] = useState<StoredDocumentRecord[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  // Initialize preferences & history on mount
  useEffect(() => {
    const prefs = localStorageManager.getPreferences();
    setPreferences(prefs);
    if (prefs.preferredLanguage) {
      setLanguage(prefs.preferredLanguage);
    }
    setSavedDocs(localStorageManager.getSavedDocuments());
  }, []);

  // Sync preference visual changes (font size scaling and high contrast) to body
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.remove('font-large', 'font-extralarge', 'high-contrast');

    if (preferences.fontSize === 'large') {
      document.body.classList.add('font-large');
    } else if (preferences.fontSize === 'extralarge') {
      document.body.classList.add('font-extralarge');
    }

    if (preferences.highContrast) {
      document.body.classList.add('high-contrast');
    }
  }, [preferences]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorageManager.savePreferences({ preferredLanguage: newLang });

    // If viewing an active document analysis, see if we can switch its language
    if (activeAnalysis) {
      // Check if it's one of the sample presets
      const matchingPreset = SAMPLE_DOCUMENTS.find(p => 
        (activeAnalysis.fileName && p.fileName.toLowerCase() === activeAnalysis.fileName.toLowerCase()) ||
        (activeAnalysis.id && p.id === activeAnalysis.id)
      );

      if (matchingPreset && matchingPreset.analysis[newLang]) {
        setActiveAnalysis({
          ...matchingPreset.analysis[newLang],
          id: activeAnalysis.id,
        });
      } else {
        // Update language field
        setActiveAnalysis(prev => prev ? { ...prev, language: newLang } : null);
      }
    }
  };

  const handleUpdatePreferences = (updated: Partial<UserPreferences>) => {
    localStorageManager.savePreferences(updated);
    setPreferences(prev => ({ ...prev, ...updated }));
  };

  const handleRefreshHistory = () => {
    setSavedDocs(localStorageManager.getSavedDocuments());
  };

  const handleSaveActiveDocument = (doc: DocumentAnalysis) => {
    localStorageManager.saveDocument(doc);
    handleRefreshHistory();
  };

  // Analyze uploaded file or sample preset
  const handleAnalyzeFile = async (file: File | null, samplePreset?: SampleDocumentPreset) => {
    setIsLoading(true);
    const t = translations[language];
    setStatusMessage(t.processingDocument);

    try {
      if (samplePreset) {
        // Instant verified demonstration loading with realistic progress simulation
        setStatusMessage(t.extractingOcr);
        await new Promise(r => setTimeout(r, 600));
        setStatusMessage(t.generatingExplanation);
        await new Promise(r => setTimeout(r, 400));

        const analysisData = samplePreset.analysis[language] || samplePreset.analysis['en'];
        setActiveAnalysis({ ...analysisData, id: samplePreset.id });
        setView('workspace');
        return;
      }

      if (file) {
        setStatusMessage(t.extractingOcr);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', language);

        const res = await fetch('/api/analyze', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const json = await res.json();
          if (json.analysis) {
            setActiveAnalysis(json.analysis);
            setView('workspace');
          }
        } else {
          alert('Failed to analyze document. Please ensure the file is under 15MB and clearly legible.');
        }
      }
    } catch (err) {
      console.error('Analysis error:', err);
      alert('An unexpected error occurred while analyzing the document.');
    } finally {
      setIsLoading(false);
      setStatusMessage('');
    }
  };

  const t = translations[language];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Accessible Navigation Header */}
      <AppHeader
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenProcedures={() => setIsProcedureModalOpen(true)}
        onOpenHistory={() => setIsHistoryDrawerOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onResetToHome={() => {
          setView('landing');
          setActiveAnalysis(null);
        }}
        savedCount={savedDocs.length}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {view === 'landing' && (
          <div>
            <LandingHero
              language={language}
              onStartUpload={() => setView('upload')}
              onTrySample={() => {
                // Instantly load the electricity bill sample or open upload view
                handleAnalyzeFile(null, SAMPLE_DOCUMENTS[0]);
              }}
              onOpenProcedures={() => setIsProcedureModalOpen(true)}
            />

            {/* In-page direct dropzone */}
            <div className="container" id="upload-section">
              <DocumentDropzone
                language={language}
                onAnalyzeFile={handleAnalyzeFile}
                isLoading={isLoading}
                statusMessage={statusMessage}
              />
            </div>
          </div>
        )}

        {view === 'upload' && (
          <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <button
                onClick={() => setView('landing')}
                className="btn btn-secondary"
                style={{ fontSize: '0.875rem' }}
              >
                ← {t.backToHome}
              </button>
            </div>
            <DocumentDropzone
              language={language}
              onAnalyzeFile={handleAnalyzeFile}
              isLoading={isLoading}
              statusMessage={statusMessage}
            />
          </div>
        )}

        {view === 'workspace' && activeAnalysis && (
          <DocumentWorkspace
            analysis={activeAnalysis}
            language={language}
            onLanguageChange={handleLanguageChange}
            onBackToHome={() => setView('landing')}
            onSaveDocument={handleSaveActiveDocument}
            isSaved={savedDocs.some(d => d.id === activeAnalysis.id)}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-border)',
        padding: '2.5rem 0 1.5rem',
        marginTop: 'auto',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ maxWidth: '360px' }}>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-primary)' }}>
                {t.appName}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                {t.tagline}
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '0.5rem' }}>
                {language === 'bn' ? 'বাংলা • हिन्दी • English সমর্থিত' : 'Natively supporting Bengali, Hindi, and English.'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                  {language === 'bn' ? 'সরকারি নির্দেশিকা' : 'Official Guides'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
                  <button
                    onClick={() => setIsProcedureModalOpen(true)}
                    style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                  >
                    WBSEDCL Electricity Payment
                  </button>
                  <button
                    onClick={() => setIsProcedureModalOpen(true)}
                    style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                  >
                    Food & Supplies Ration e-KYC
                  </button>
                  <button
                    onClick={() => setIsProcedureModalOpen(true)}
                    style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                  >
                    e-District Income Certificate
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                  {language === 'bn' ? 'সুলভতা ও নীতি' : 'Accessibility & Privacy'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
                  <button
                    onClick={() => setIsSettingsModalOpen(true)}
                    style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                  >
                    {t.settingsTitle}
                  </button>
                  <button
                    onClick={() => setIsHistoryDrawerOpen(true)}
                    style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                  >
                    {t.historyTitle}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.78rem',
            color: 'var(--color-text-light)',
          }}>
            <div>
              © 2026 JibonSathi AI. Built for citizen administrative empowerment and social impact.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} color="var(--color-primary)" />
              <span>Zero Silent Cloud Retention Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Voice Assistant Modal */}
      <VoiceAssistant
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        language={language}
        onAskQuestion={(transcript) => {
          // Send to chat in workspace if active
          if (view !== 'workspace' && SAMPLE_DOCUMENTS[0]) {
            handleAnalyzeFile(null, SAMPLE_DOCUMENTS[0]);
          }
        }}
      />

      {/* Official Procedure Guide Modal */}
      <ProcedureGuideModal
        isOpen={isProcedureModalOpen}
        onClose={() => setIsProcedureModalOpen(false)}
        language={language}
      />

      {/* History and Saved Documents Drawer */}
      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        language={language}
        savedDocuments={savedDocs}
        onSelectDocument={(doc) => {
          setActiveAnalysis(doc);
          setView('workspace');
        }}
        onRefreshHistory={handleRefreshHistory}
      />

      {/* Accessibility Settings Modal */}
      <AccessibilitySettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        language={language}
        preferences={preferences}
        onUpdatePreferences={handleUpdatePreferences}
        onDataPurged={() => {
          setActiveAnalysis(null);
          setView('landing');
          handleRefreshHistory();
          setPreferences(defaultPreferences);
        }}
      />
    </div>
  );
}
