import { z } from 'zod';

export type SupportedLanguage = 'bn' | 'hi' | 'en';

export const KeyFactSchema = z.object({
  label: z.string(),
  value: z.string(),
  source_page: z.number().optional().default(1),
  confidence: z.number().min(0).max(1).optional().default(0.95),
  is_sensitive: z.boolean().optional().default(false),
});

export const ActionStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.enum(['high', 'normal', 'low']),
  status: z.enum(['required', 'recommended', 'unverified']),
  evidence: z.string().optional(),
  completed: z.boolean().optional().default(false),
});

export const DeadlineSchema = z.object({
  id: z.string().optional(),
  description: z.string(),
  date: z.string().nullable(),
  original_text: z.string(),
  confidence: z.number().min(0).max(1).optional().default(0.9),
  urgency: z.enum(['critical', 'upcoming', 'passed', 'normal']).optional().default('normal'),
});

export const RequiredDocumentSchema = z.object({
  id: z.string(),
  name: z.string(),
  verification_status: z.enum(['verified', 'unverified']),
  source_url: z.string().nullable().optional(),
  collected: z.boolean().optional().default(false),
});

export const SourceCitationSchema = z.object({
  title: z.string(),
  url: z.string(),
  publisher: z.string(),
  supports: z.string(),
  last_verified_at: z.string().nullable(),
  is_official: z.boolean().default(true),
});

export const DocumentAnalysisSchema = z.object({
  id: z.string().optional(),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  fileType: z.string().optional(),
  uploadedAt: z.string().optional(),
  language: z.enum(['bn', 'hi', 'en']),
  document_type: z.object({
    label: z.string(),
    confidence: z.number().min(0).max(1),
  }),
  summary: z.string(),
  why_received: z.string().optional(),
  what_it_means: z.string().optional(),
  key_facts: z.array(KeyFactSchema),
  action_steps: z.array(ActionStepSchema),
  deadlines: z.array(DeadlineSchema),
  required_documents: z.array(RequiredDocumentSchema),
  sources: z.array(SourceCitationSchema),
  uncertainties: z.array(z.string()),
  follow_up_questions: z.array(z.string()),
  raw_extracted_text: z.string().optional(),
  unreadable_sections: z.array(z.string()).optional().default([]),
  ocr_quality: z.enum(['high', 'medium', 'low', 'unreadable']).optional().default('high'),
});

export type KeyFact = z.infer<typeof KeyFactSchema>;
export type ActionStep = z.infer<typeof ActionStepSchema>;
export type Deadline = z.infer<typeof DeadlineSchema>;
export type RequiredDocument = z.infer<typeof RequiredDocumentSchema>;
export type SourceCitation = z.infer<typeof SourceCitationSchema>;
export type DocumentAnalysis = z.infer<typeof DocumentAnalysisSchema>;

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  groundedQuotes?: string[];
  suggestedActions?: string[];
}
