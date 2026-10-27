'use client';

import React, { useState, useEffect } from 'react';
import { DocumentAnalysis, SupportedLanguage, KeyFact, ActionStep, Deadline, RequiredDocument } from '@/lib/ai/types';
import { Language, translations } from '@/lib/i18n/translations';
import { maskSensitiveValue } from '@/lib/utils/masking';
import { calculateDaysRemaining, toVernacularDigits } from '@/lib/utils/dateUtils';
import {
  FileText,
  CheckSquare,
  Square,
  Calendar,
  Clock,
  ShieldCheck,
  ExternalLink,
  Eye,
  EyeOff,
  MessageSquare,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  HelpCircle,
  Send,
  Mic,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  CalendarPlus,
  FileSignature,
  Bell,
  ThumbsUp,
  ThumbsDown,
  FileDown
} from 'lucide-react';
import { downloadDeadlineICS } from '@/lib/utils/calendarUtils';
import { shareAnalysisViaWhatsApp, triggerPrintAnalysis } from '@/lib/utils/shareUtils';
import { googleCalendarTemplateUrl, downloadCitizenReport, downloadMarkdownBrief, cpgramsPortalUrl, digiLockerUrl } from '@/lib/utils/reportGenerator';
import { checkAndNotifyUpcoming, requestNotificationPermission, getReminderPrefs, saveReminderPrefs } from '@/lib/utils/reminders';
import { localStorageManager } from '@/lib/storage/localStorageManager';
import { auditLog, feedbackStore } from '@/lib/storage/auditLog';
import { FraudAlert } from '@/components/FraudAlert';
import { GrievanceDraftGenerator } from '@/components/GrievanceDraftGenerator';

interface DocumentWorkspaceProps {
  analysis: DocumentAnalysis;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBackToHome: () => void;
  onSaveDocument: (doc: DocumentAnalysis) => void;
  isSaved?: boolean;
}

export const DocumentWorkspace: React.FC<DocumentWorkspaceProps> = ({
  analysis: initialAnalysis,
  language,
  onLanguageChange,
  onBackToHome,
  onSaveDocument,
  isSaved = false,
}) => {
  const t = translations[language];
  const [analysis, setAnalysis] = useState<DocumentAnalysis>(initialAnalysis);
  const [activeTab, setActiveTab] = useState<'explanation' | 'checklist' | 'dates' | 'docs' | 'facts' | 'sources' | 'chat' | 'draft'>('explanation');
  
  // Sensitive masking toggle
  const [maskSensitive, setMaskSensitive] = useState<boolean>(true);
  
  // Action steps checklist state
  const [actionSteps, setActionSteps] = useState<ActionStep[]>(initialAnalysis.action_steps);
  
  // Required docs collected checklist state
  const [requiredDocs, setRequiredDocs] = useState<RequiredDocument[]>(initialAnalysis.required_documents);
  
  // Document raw text / preview toggle
  const [showRawText, setShowRawText] = useState<boolean>(false);
  
  // Audio Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  
  // Contextual Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; sources?: Array<{ title: string; url: string; publisher: string }>; groundedQuotes?: string[] }>>([
    {
      sender: 'assistant',
      text: language === 'bn'
        ? `নমস্কার! আমি এই নথির বিষয়ে আপনার যে কোনো প্রশ্নের উত্তর দিতে প্রস্তুত। উপরে দেওয়া তথ্য বা করণীয় পদক্ষেপ নিয়ে কোনো প্রশ্ন থাকলে নিচে লিখুন বা বলুন।`
        : language === 'hi'
        ? `नमस्ते! मैं इस दस्तावेज़ के संबंध में आपके किसी भी प्रश्न का उत्तर देने के लिए तैयार हूँ। कोई भी प्रश्न पूछें।`
        : `Hello! I am ready to answer any questions regarding this document or official procedures. Ask below or select a suggested question.`
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [remindersOn, setRemindersOn] = useState<boolean>(() => getReminderPrefs().enabled);

  useEffect(() => {
    setAnalysis(initialAnalysis);
    // Restore persisted checklist progress (survives reload)
    const saved = initialAnalysis.id ? localStorageManager.getProgress(initialAnalysis.id) : null;
    if (saved) {
      setActionSteps(initialAnalysis.action_steps.map(s => ({ ...s, completed: saved.completedSteps.includes(s.id) })));
      setRequiredDocs(initialAnalysis.required_documents.map(d => ({ ...d, collected: saved.collectedDocs.includes(d.id) })));
    } else {
      setActionSteps(initialAnalysis.action_steps);
      setRequiredDocs(initialAnalysis.required_documents);
    }
    // Deadline reminder check (browser notification if enabled)
    if (getReminderPrefs().enabled) {
      checkAndNotifyUpcoming(initialAnalysis.deadlines, initialAnalysis.document_type.label);
    }
  }, [initialAnalysis]);

  // Handle Action step completion toggle (persisted)
  const toggleStepCompleted = (id: string) => {
    setActionSteps(prev => {
      const next = prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s);
      if (analysis.id) {
        localStorageManager.saveProgress(
          analysis.id,
          next.filter(s => s.completed).map(s => s.id),
          requiredDocs.filter(d => d.collected).map(d => d.id)
        );
      }
      return next;
    });
  };

  // Handle Required Document collected toggle (persisted)
  const toggleDocCollected = (id: string) => {
    setRequiredDocs(prev => {
      const next = prev.map(d => d.id === id ? { ...d, collected: !d.collected } : d);
      if (analysis.id) {
        localStorageManager.saveProgress(
          analysis.id,
          actionSteps.filter(s => s.completed).map(s => s.id),
          next.filter(d => d.collected).map(d => d.id)
        );
      }
      return next;
    });
  };

  const handleToggleReminders = async () => {
    if (!remindersOn) {
      const perm = await requestNotificationPermission();
      if (perm !== 'granted') {
        alert(language === 'bn' ? 'ব্রাউজারে নোটিফিকেশন অনুমতি দিন।' : 'Please allow browser notifications to enable reminders.');
        return;
      }
      saveReminderPrefs({ enabled: true });
      setRemindersOn(true);
      const n = checkAndNotifyUpcoming(analysis.deadlines, analysis.document_type.label);
      auditLog.append('calendar_export', `Reminders enabled (${n} immediate)`, analysis.id);
    } else {
      saveReminderPrefs({ enabled: false });
      setRemindersOn(false);
    }
  };

  // Audio Read Aloud functionality using SpeechSynthesis
  const handleToggleSpeak = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${analysis.document_type.label}. ${analysis.summary} ${analysis.why_received || ''} ${analysis.what_it_means || ''}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Pick appropriate voice
    const voices = window.speechSynthesis.getVoices();
    if (language === 'bn') {
      utterance.lang = 'bn-IN';
      const bnVoice = voices.find(v => v.lang.includes('bn'));
      if (bnVoice) utterance.voice = bnVoice;
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
      const hiVoice = voices.find(v => v.lang.includes('hi'));
      if (hiVoice) utterance.voice = hiVoice;
    } else {
      utterance.lang = 'en-IN';
      const enVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en'));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.rate = 0.95; // Slightly slower for clear administrative understanding
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Handle Chat Question submission (with citations + feedback loop)
  const handleSendChat = async (questionText?: string) => {
    const q = (questionText || chatInput).trim();
    if (!q || isChatLoading) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: q }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          contextSummary: analysis.summary,
          documentType: analysis.document_type.label,
          language,
          keyFacts: analysis.key_facts,
          sources: analysis.sources,
          deadlines: analysis.deadlines,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setChatMessages(prev => [...prev, { sender: 'assistant', text: data.answer, sources: data.sources, groundedQuotes: data.groundedQuotes }]);
        auditLog.append('chat', q.slice(0, 120), analysis.id);
      } else {
        setChatMessages(prev => [...prev, { 
          sender: 'assistant', 
          text: language === 'bn' ? 'উত্তর পেতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Failed to retrieve answer. Please try again.' 
        }]);
      }
    } catch {
      setChatMessages(prev => [...prev, { 
        sender: 'assistant', 
        text: language === 'bn' ? 'নেটওয়ার্ক সংযোগ পরীক্ষা করুন।' : 'Network error. Please check your connection.' 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleChatFeedback = (idx: number, rating: 'up' | 'down') => {
    const msg = chatMessages[idx];
    if (!msg || msg.sender !== 'assistant') return;
    const prevUser = [...chatMessages.slice(0, idx)].reverse().find(m => m.sender === 'user');
    feedbackStore.append({
      docId: analysis.id,
      question: prevUser?.text || '',
      answer: msg.text,
      rating,
    });
    alert(language === 'bn' ? 'মতামতের জন্য ধন্যবাদ!' : language === 'hi' ? 'प्रतिक्रिया हेतु धन्यवाद!' : 'Thanks for your feedback!');
  };

  const completedStepsCount = actionSteps.filter(s => s.completed).length;
  const collectedDocsCount = requiredDocs.filter(d => d.collected).length;

  return (
    <div style={{ padding: '1.5rem 0 4rem' }}>
      <div className="container">
        {/* Navigation & Controls Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <button
            onClick={onBackToHome}
            className="btn btn-secondary"
            style={{ fontSize: '0.875rem' }}
          >
            <ArrowLeft size={16} />
            {t.backToHome}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Read Aloud Button */}
            <button
              onClick={handleToggleSpeak}
              className={`btn ${isSpeaking ? 'btn-amber' : 'btn-secondary'}`}
              style={{ fontSize: '0.875rem' }}
              title={isSpeaking ? t.voiceStopAudio : t.voicePlayAnswer}
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isSpeaking ? (language === 'bn' ? 'পড়া বন্ধ করুন' : 'Stop Audio') : (language === 'bn' ? 'পড়ে শুনুন' : 'Read Aloud')}</span>
            </button>

            {/* Bookmark / Save Document */}
            <button
              onClick={() => onSaveDocument(analysis)}
              className="btn btn-secondary"
              style={{ fontSize: '0.875rem' }}
            >
              {isSaved ? <BookmarkCheck size={16} color="var(--color-primary)" /> : <Bookmark size={16} />}
              <span>{isSaved ? (language === 'bn' ? 'সংরক্ষিত হয়েছে' : 'Saved') : (language === 'bn' ? 'সংরক্ষণ করুন' : 'Bookmark')}</span>
            </button>

            {/* Share via WhatsApp */}
            <button
              onClick={() => shareAnalysisViaWhatsApp(analysis)}
              className="btn btn-secondary"
              style={{ fontSize: '0.875rem', color: '#16a34a' }}
              title={t.shareWhatsApp}
            >
              <Share2 size={16} />
              <span className="btn-label-desktop">{t.shareWhatsApp}</span>
            </button>

            {/* Print / Save PDF */}
            <button
              onClick={triggerPrintAnalysis}
              className="btn btn-secondary"
              style={{ fontSize: '0.875rem' }}
              title={t.printSummary}
            >
              <Download size={16} />
              <span className="btn-label-desktop">{t.printSummary}</span>
            </button>

            {/* Language Switcher for Active Document */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '2px',
            }}>
              {(['bn', 'hi', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onLanguageChange(l)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: language === l ? '700' : '500',
                    backgroundColor: language === l ? 'var(--color-primary)' : 'transparent',
                    color: language === l ? '#ffffff' : 'var(--color-text-main)',
                    cursor: 'pointer',
                  }}
                >
                  {l === 'bn' ? 'বাংলা' : l === 'hi' ? 'हिन्दी' : 'EN'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Document Header Card */}
        <div className="card" style={{
          backgroundColor: '#ffffff',
          marginBottom: '1.5rem',
          borderLeft: '5px solid var(--color-primary)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-primary">
                  {analysis.document_type.confidence >= 0.9 ? t.confidenceHigh : t.confidenceMedium}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  {analysis.fileName || 'Document'}
                </span>
              </div>
              <h1 style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                fontWeight: 700,
                color: 'var(--color-primary)',
                lineHeight: 1.25,
              }}>
                {analysis.document_type.label}
              </h1>
            </div>

            {/* Sensitive Data Mask Toggle */}
            <button
              onClick={() => setMaskSensitive(!maskSensitive)}
              className="btn btn-secondary"
              style={{ fontSize: '0.825rem', padding: '0.45rem 0.85rem' }}
              title={maskSensitive ? t.unmaskSensitive : t.maskSensitive}
            >
              {maskSensitive ? <Eye size={16} /> : <EyeOff size={16} />}
              <span>{maskSensitive ? t.unmaskSensitive : t.maskSensitive}</span>
            </button>
          </div>
        </div>

        {/* Fraud / authenticity screen */}
        <div style={{ marginBottom: '1.25rem' }}>
          <FraudAlert
            rawText={analysis.raw_extracted_text || `${analysis.summary} ${analysis.why_received || ''}`}
            language={language}
            officialUrls={analysis.sources?.map(s => s.url)}
          />
        </div>

        {/* Quick actions: reminders + full report + portals */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <button onClick={handleToggleReminders} className={`btn ${remindersOn ? 'btn-amber' : 'btn-secondary'}`} style={{ fontSize: '0.82rem' }}>
            <Bell size={15} />
            <span>{remindersOn ? (language === 'bn' ? 'রিমাইন্ডার চালু' : 'Reminders ON') : (language === 'bn' ? 'ডেডলাইন রিমাইন্ডার' : 'Enable Reminders')}</span>
          </button>
          <button onClick={() => { downloadCitizenReport(analysis); auditLog.append('share', 'Citizen PDF report', analysis.id); }} className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
            <FileDown size={15} />
            <span>{language === 'bn' ? 'সম্পূর্ণ রিপোর্ট (PDF)' : 'Full Report (PDF)'}</span>
          </button>
          <button onClick={() => downloadMarkdownBrief(analysis)} className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
            <Download size={15} />
            <span>Markdown Brief</span>
          </button>
          <a href={cpgramsPortalUrl(analysis)} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.82rem', textDecoration: 'none' }}>
            <ExternalLink size={15} />
            <span>CPGRAMS Lodge</span>
          </a>
          <a href={digiLockerUrl()} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.82rem', textDecoration: 'none' }}>
            <ExternalLink size={15} />
            <span>DigiLocker</span>
          </a>
        </div>

        {/* 7 Section Navigation Tabs */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '0.5rem',
          paddingBottom: '0.5rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--color-border)',
        }} role="tablist">
          {[
            { id: 'explanation', label: t.tabSimpleWords, icon: Sparkles },
            { 
              id: 'checklist', 
              label: `${t.tabActionSteps} (${completedStepsCount}/${actionSteps.length})`, 
              icon: CheckSquare 
            },
            { 
              id: 'dates', 
              label: `${t.tabDeadlines} (${analysis.deadlines.length})`, 
              icon: Calendar 
            },
            { 
              id: 'docs', 
              label: `${t.tabRequiredDocs} (${collectedDocsCount}/${requiredDocs.length})`, 
              icon: FileText 
            },
            { id: 'facts', label: t.tabKeyDetails, icon: Eye },
            { id: 'sources', label: t.tabSources, icon: ShieldCheck },
            { id: 'chat', label: t.tabAskQuestion, icon: MessageSquare },
            { id: 'draft', label: t.tabDraftGrievance, icon: FileSignature },
          ].map(tab => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: isActive ? 'var(--color-primary)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--color-text-main)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                <IconComponent size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: In Simple Words */}
        {activeTab === 'explanation' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card" style={{ backgroundColor: '#ffffff' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                {t.tabSimpleWords}
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
                {analysis.summary}
              </p>

              <div className="grid-2" style={{ gap: '1rem', marginTop: '1rem' }}>
                {analysis.why_received && (
                  <div style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    border: '1px solid var(--color-border)',
                  }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                      {t.whyReceivedTitle}
                    </h3>
                    <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)' }}>
                      {analysis.why_received}
                    </p>
                  </div>
                )}

                {analysis.what_it_means && (
                  <div style={{
                    backgroundColor: 'var(--color-primary-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    border: '1px solid var(--color-primary-border)',
                  }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                      {t.whatItMeansTitle}
                    </h3>
                    <p style={{ fontSize: '0.925rem', color: 'var(--color-primary)' }}>
                      {analysis.what_it_means}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Uncertainties Section if any */}
            {analysis.uncertainties && analysis.uncertainties.length > 0 && (
              <div style={{
                backgroundColor: 'var(--color-amber-bg)',
                border: '1px solid var(--color-amber-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
              }}>
                <AlertTriangle size={20} color="var(--color-amber-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-amber-accent)', marginBottom: '0.35rem' }}>
                    {t.uncertaintiesTitle}
                  </h3>
                  <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                    {analysis.uncertainties.map((u, i) => (
                      <li key={i} style={{ marginBottom: '0.25rem' }}>{u}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: What You Need To Do (Action Checklist) */}
        {activeTab === 'checklist' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
            }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {t.tabActionSteps}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {t.tabActionStepsDesc}
                </p>
              </div>
              <div className="badge badge-primary" style={{ fontSize: '0.85rem' }}>
                {completedStepsCount} / {actionSteps.length} {t.stepCompleted}
              </div>
            </div>

            {completedStepsCount === actionSteps.length && actionSteps.length > 0 && (
              <div style={{
                backgroundColor: 'var(--color-success-bg)',
                border: '1px solid var(--color-success-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-success)',
                fontWeight: 600,
              }}>
                <CheckCircle2 size={20} />
                <span>{t.allStepsDone}</span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {actionSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className="card"
                  style={{
                    backgroundColor: step.completed ? 'var(--color-bg-subtle)' : '#ffffff',
                    borderLeft: `5px solid ${step.priority === 'high' ? 'var(--color-amber-accent)' : 'var(--color-primary)'}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleStepCompleted(step.id)}
                >
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0',
                      color: step.completed ? 'var(--color-success)' : 'var(--color-text-muted)',
                      flexShrink: 0,
                      marginTop: '3px',
                    }}
                    aria-label={`Toggle completion of ${step.title}`}
                  >
                    {step.completed ? <CheckSquare size={24} /> : <Square size={24} />}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      <span style={{
                        textDecoration: step.completed ? 'line-through' : 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: step.completed ? 'var(--color-text-muted)' : 'var(--color-text-main)',
                      }}>
                        {idx + 1}. {step.title}
                      </span>
                      <span className={`badge ${step.status === 'required' ? 'badge-amber' : 'badge-neutral'}`}>
                        {step.status === 'required' ? t.requiredBadge : t.recommendedBadge}
                      </span>
                    </div>

                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.5,
                      marginBottom: step.evidence ? '0.45rem' : '0',
                    }}>
                      {step.description}
                    </p>

                    {step.evidence && (
                      <div style={{
                        fontSize: '0.8rem',
                        fontStyle: 'italic',
                        color: 'var(--color-text-light)',
                        backgroundColor: 'var(--color-bg-canvas)',
                        padding: '0.35rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        display: 'inline-block',
                      }}>
                        {language === 'bn' ? 'নথির ভিত্তি:' : 'Evidence:'} "{step.evidence}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Important Dates & Deadlines */}
        {activeTab === 'dates' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analysis.deadlines.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <Clock size={32} color="var(--color-text-muted)" style={{ margin: '0 auto 0.75rem' }} />
                <p style={{ color: 'var(--color-text-muted)' }}>{t.noDeadlinesFound}</p>
              </div>
            ) : (
              analysis.deadlines.map((dl, idx) => {
                const daysInfo = calculateDaysRemaining(dl.date);
                const isCritical = daysInfo.status === 'critical' || dl.urgency === 'critical';

                return (
                  <div
                    key={dl.id || idx}
                    className="card"
                    style={{
                      backgroundColor: '#ffffff',
                      borderLeft: `5px solid ${isCritical ? 'var(--color-amber-accent)' : 'var(--color-primary)'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} color={isCritical ? 'var(--color-amber-accent)' : 'var(--color-primary)'} />
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{dl.description}</h3>
                      </div>

                      {daysInfo.days !== null && (
                        <span className={`badge ${isCritical ? 'badge-amber' : 'badge-primary'}`}>
                          {toVernacularDigits(daysInfo.formattedNotice, language)}
                        </span>
                      )}
                    </div>

                    <div style={{
                      backgroundColor: 'var(--color-bg-subtle)',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}>
                      <div>
                        <strong>{t.dateContext}:</strong> "{dl.original_text}"
                      </div>
                      {dl.date && (
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => { downloadDeadlineICS(dl, analysis.document_type.label, analysis.sources?.[0]?.publisher); auditLog.append('calendar_export', dl.description, analysis.id); }}
                            className="btn btn-secondary"
                            style={{ fontSize: '0.8rem', padding: '0.3rem 0.65rem' }}
                            title="Add deadline to calendar"
                          >
                            <CalendarPlus size={14} color="var(--color-primary)" />
                            <span>{t.addToCalendar}</span>
                          </button>
                          {googleCalendarTemplateUrl(dl, analysis.document_type.label) && (
                            <a
                              href={googleCalendarTemplateUrl(dl, analysis.document_type.label) as string}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-secondary"
                              style={{ fontSize: '0.8rem', padding: '0.3rem 0.65rem', textDecoration: 'none' }}
                            >
                              <span>Google Calendar</span>
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 4: Documents You May Need */}
        {activeTab === 'docs' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
            }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {t.tabRequiredDocs}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {language === 'bn' ? 'প্রক্রিয়াটি সম্পন্ন করতে যে কাগজপত্র সাথে রাখতে হবে' : 'Paperwork verified for completing this official procedure'}
                </p>
              </div>
              <div className="badge badge-primary">
                {collectedDocsCount} / {requiredDocs.length} {t.docsCollectedCount}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {requiredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="card"
                  style={{
                    backgroundColor: doc.collected ? 'var(--color-bg-subtle)' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleDocCollected(doc.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0',
                        color: doc.collected ? 'var(--color-success)' : 'var(--color-text-muted)',
                      }}
                      aria-label={`Toggle collected status for ${doc.name}`}
                    >
                      {doc.collected ? <CheckSquare size={22} /> : <Square size={22} />}
                    </button>
                    <div>
                      <div style={{
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textDecoration: doc.collected ? 'line-through' : 'none',
                        color: doc.collected ? 'var(--color-text-muted)' : 'var(--color-text-main)',
                      }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
                        {doc.verification_status === 'verified' ? (
                          <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                            ✓ {t.officialVerifiedBadge}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--color-amber-accent)' }}>
                            {t.unverifiedNotice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {doc.source_url && (
                    <a
                      href={doc.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', minHeight: '32px' }}
                    >
                      <ExternalLink size={14} />
                      <span style={{ display: 'none' }} className="btn-label-desktop">{t.visitOfficialPortal}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Important Details & Key Facts */}
        {activeTab === 'facts' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              backgroundColor: 'var(--color-bg-subtle)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <ShieldCheck size={18} color="var(--color-primary)" />
              <span>{t.sensitiveProtected}</span>
            </div>

            <div className="grid-2" style={{ gap: '0.75rem' }}>
              {analysis.key_facts.map((fact, idx) => {
                const displayVal = (fact.is_sensitive && maskSensitive)
                  ? maskSensitiveValue(fact.value)
                  : fact.value;

                return (
                  <div key={idx} className="card" style={{ backgroundColor: '#ffffff' }}>
                    <div style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                      {fact.label}
                    </div>
                    <div style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      fontFamily: fact.is_sensitive ? 'monospace' : 'inherit',
                    }}>
                      {toVernacularDigits(displayVal, language)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.35rem' }}>
                      {language === 'bn' ? 'পৃষ্ঠা' : 'Page'} {fact.source_page || 1} • {language === 'bn' ? 'নির্ভুলতা' : 'Confidence'}: {Math.round((fact.confidence || 0.95) * 100)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 6: Official Sources & Verification */}
        {activeTab === 'sources' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              backgroundColor: 'var(--color-primary-light)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-primary-border)',
              fontSize: '0.9rem',
              color: 'var(--color-primary)',
            }}>
              <strong>{language === 'bn' ? 'সরকারি নির্ভরযোগ্যতার নীতি:' : 'Government Verification Principle:'}</strong>{' '}
              {language === 'bn' 
                ? 'সহায় (Sahay) কোনো আনভেরিফায়েড ব্লগ বা সোশ্যাল মিডিয়ার তথ্য ব্যবহার করে না। নির্দেশিত প্রতিটি লিঙ্ক সরাসরি সরকারি বা নিয়ামক সংস্থার নিজস্ব পোর্টাল (.gov.in, .nic.in)।' 
                : 'Sahay avoids unofficial blogs and forums. All links are strictly audited against official government domains (.gov.in, .nic.in, or verified utilities).'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {analysis.sources.map((src, idx) => (
                <div key={idx} className="card" style={{ backgroundColor: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                        {src.title}
                      </h3>
                      <div style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>
                        {src.publisher}
                      </div>
                    </div>
                    <span className="badge badge-success">
                      ✓ {t.officialVerifiedBadge}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                    <strong>{language === 'bn' ? 'কী নিশ্চিত করে:' : 'Supports:'}</strong> {src.supports}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
                      {t.lastChecked}: {src.last_verified_at ? src.last_verified_at.split('T')[0] : 'Verified Active'}
                    </div>

                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ fontSize: '0.825rem', padding: '0.45rem 0.85rem' }}
                    >
                      <span>{t.visitOfficialPortal}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Ask About This Document (Q&A Chat) */}
        {activeTab === 'chat' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Suggested Questions */}
            {analysis.follow_up_questions && analysis.follow_up_questions.length > 0 && (
              <div style={{
                backgroundColor: 'var(--color-bg-subtle)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                  {t.suggestedQuestions}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.follow_up_questions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendChat(q)}
                      disabled={isChatLoading}
                      className="btn btn-secondary"
                      style={{
                        fontSize: '0.825rem',
                        padding: '0.4rem 0.75rem',
                        backgroundColor: '#ffffff',
                        textAlign: 'left',
                        minHeight: 'auto',
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages Log */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              minHeight: '260px',
              maxHeight: '440px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    backgroundColor: msg.sender === 'user' ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--color-text-main)',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.925rem',
                    lineHeight: 1.5,
                  }}
                >
                  <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                  {msg.sender === 'assistant' && (msg.groundedQuotes?.length || msg.sources?.length) ? (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.76rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '0.4rem' }}>
                      {msg.groundedQuotes?.map((g, i) => (
                        <div key={i} style={{ marginBottom: 2 }}>“{g}”</div>
                      ))}
                      {msg.sources?.map((s, i) => (
                        <div key={i}>
                          <a href={s.url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)' }}>
                            [{s.publisher}] {s.title}
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {msg.sender === 'assistant' && idx > 0 ? (
                    <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.35rem' }}>
                      <button onClick={() => handleChatFeedback(idx, 'up')} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', minHeight: 28 }} title="Helpful">
                        <ThumbsUp size={13} />
                      </button>
                      <button onClick={() => handleChatFeedback(idx, 'down')} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', minHeight: 28 }} title="Not helpful">
                        <ThumbsDown size={13} />
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
              {isChatLoading && (
                <div style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'var(--color-bg-subtle)',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                }}>
                  {t.loading}
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat();
              }}
              style={{ display: 'flex', gap: '0.5rem' }}
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.askPlaceholder}
                disabled={isChatLoading}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.95rem',
                }}
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="btn btn-primary"
                style={{ minWidth: '80px' }}
              >
                <Send size={18} />
                <span>{t.sendBtn}</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 8: Grievance Response & RTI Draft Generator */}
        {activeTab === 'draft' && (
          <GrievanceDraftGenerator
            analysis={analysis}
            language={language}
          />
        )}
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .btn-label-desktop {
            display: inline !important;
          }
        }
      `}</style>
    </div>
  );
};
