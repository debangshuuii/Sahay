'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '@/lib/i18n/translations';
import { Mic, MicOff, Volume2, VolumeX, X, Send, AlertCircle, Sparkles } from 'lucide-react';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAskQuestion: (transcript: string) => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  isOpen,
  onClose,
  language,
  onAskQuestion,
}) => {
  const t = translations[language];
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      setTranscript('');
      setErrorNotice(null);
    }
  }, [isOpen, isRecording]);

  const startVoiceRecording = () => {
    setErrorNotice(null);
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorNotice(
        language === 'bn'
          ? 'আপনার ব্রাউজারে স্বয়ংক্রিয় ভয়েস রিকগনিশন সমর্থিত নয়। আপনি নিচে সরাসরি বাংলায় টাইপ করতে পারেন।'
          : language === 'hi'
          ? 'आपके ब्राउज़र में ऑटोमैटिक वॉयस रिकॉग्निशन समर्थित नहीं है। आप नीचे टाइप कर सकते हैं।'
          : 'Speech recognition is not supported in this browser. Please type your query in the text box below.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Set recognition language
      if (language === 'bn') recognition.lang = 'bn-IN';
      else if (language === 'hi') recognition.lang = 'hi-IN';
      else recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorNotice(
            language === 'bn'
              ? 'মাইক্রোফোনের অনুমতি দেওয়া হয়নি। অনুগ্রহ করে ব্রাউজার সেটিংসে অনুমতি দিন অথবা টাইপ করুন।'
              : 'Microphone permission denied. Please allow microphone access or type your question.'
          );
        } else {
          setErrorNotice(`Speech error: ${event.error}`);
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e: any) {
      console.error(e);
      setErrorNotice('Could not initialize microphone. Please type your question.');
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleSubmit = () => {
    if (transcript.trim()) {
      onAskQuestion(transcript.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

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
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
          }}
          aria-label="Close voice assistant"
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: isRecording ? 'var(--color-error-bg)' : 'var(--color-primary-light)',
            color: isRecording ? 'var(--color-error)' : 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem',
          }}>
            {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {t.voiceTitle}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            {t.voiceSubtitle}
          </p>
        </div>

        {/* Big Tap-to-Speak Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
            className={`btn ${isRecording ? 'btn-amber' : 'btn-primary'}`}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.05rem',
              borderRadius: 'var(--radius-full)',
              minWidth: '200px',
            }}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            <span>{isRecording ? t.voiceStop : t.voiceStart}</span>
          </button>
        </div>

        {isRecording && (
          <div style={{
            textAlign: 'center',
            color: 'var(--color-amber-accent)',
            fontWeight: 600,
            fontSize: '0.9rem',
            marginBottom: '1rem',
          }}>
            ● {t.listening}
          </div>
        )}

        {/* Error notification */}
        {errorNotice && (
          <div style={{
            backgroundColor: 'var(--color-error-bg)',
            border: '1px solid var(--color-error-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem',
            fontSize: '0.85rem',
            color: 'var(--color-error)',
            marginBottom: '1rem',
            display: 'flex',
            gap: '0.5rem',
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorNotice}</span>
          </div>
        )}

        {/* Editable Transcript Area */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
            {t.speakTranscript} (
            {language === 'bn' ? 'দরকার হলে এডিট করুন' : language === 'hi' ? 'संपादित कर सकते हैं' : 'editable'}:
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={language === 'bn' ? 'কথা বলুন অথবা সরাসরি প্রশ্ন লিখুন...' : 'Speak or type your question here...'}
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              fontSize: '0.95rem',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ fontSize: '0.875rem' }}
          >
            {language === 'bn' ? 'বাতিল' : 'Cancel'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!transcript.trim()}
            className="btn btn-primary"
            style={{ fontSize: '0.875rem' }}
          >
            <Send size={16} />
            <span>{t.sendBtn}</span>
          </button>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--color-text-light)',
          marginTop: '1.25rem',
        }}>
          {t.voicePermissionNote}
        </p>
      </div>
    </div>
  );
};
