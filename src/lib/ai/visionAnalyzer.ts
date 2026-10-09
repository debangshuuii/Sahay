import { DocumentAnalysis, DocumentAnalysisSchema, SupportedLanguage } from './types';
import { sanitizeDocumentInput } from './provider';

interface AnalyzeWithVisionParams {
  fileBase64?: string;
  mimeType: string;
  fileName: string;
  fileSize: number;
  language: SupportedLanguage;
  textContent?: string;
}

export async function analyzeDocumentWithGeminiVision({
  fileBase64,
  mimeType,
  fileName,
  fileSize,
  language,
  textContent,
}: AnalyzeWithVisionParams): Promise<{ analysis: DocumentAnalysis; notice: string } | null> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const langLabel = language === 'bn' ? 'Bengali (বাংলা)' : language === 'hi' ? 'Hindi (हिन्दी)' : 'English';

    const systemPrompt = `You are Sahay (सहाय), an expert AI citizen assistant and legal/administrative document analyst in India.
Analyze the provided official Indian administrative document/notice (image, PDF, or text).
Translate and explain everything in ${langLabel} clearly so a layperson citizen can understand without confusion.

Rules:
1. Extract exact reference/notice numbers, issuing department, financial amounts, and critical deadlines.
2. Formulate clear, empathetic step-by-step citizen action steps.
3. If an Aadhaar number, PAN, or Bank Account number appears, mark is_sensitive as true in key_facts.
4. Output MUST be strictly valid JSON matching the specified schema.

Output JSON format:
{
  "document_type": {
    "label": "Name of notice/document in ${langLabel}",
    "confidence": 0.95
  },
  "summary": "Clear, concise 2-3 sentence explanation of this notice in ${langLabel}",
  "why_received": "Why the citizen received this notice in ${langLabel}",
  "what_it_means": "Consequences and legal/administrative implications in ${langLabel}",
  "key_facts": [
    { "label": "Label in ${langLabel}", "value": "Extracted value", "source_page": 1, "confidence": 0.95, "is_sensitive": false }
  ],
  "action_steps": [
    { "id": "step-1", "title": "Step title in ${langLabel}", "description": "Step detail in ${langLabel}", "priority": "high", "status": "required", "evidence": "Reference text from document", "completed": false }
  ],
  "deadlines": [
    { "id": "dl-1", "description": "Deadline description in ${langLabel}", "date": "YYYY-MM-DD or null", "original_text": "Exact text from document", "confidence": 0.95, "urgency": "critical" }
  ],
  "required_documents": [
    { "id": "doc-1", "name": "Document name in ${langLabel}", "verification_status": "verified", "source_url": null, "collected": false }
  ],
  "sources": [
    { "title": "Official Portal Name", "url": "https://official-government-url.gov.in", "publisher": "Issuing Authority", "supports": "Official regulatory compliance", "last_verified_at": "2026-03", "is_official": true }
  ],
  "uncertainties": [
    "Any faint, unreadable, or missing text warnings in ${langLabel}"
  ],
  "follow_up_questions": [
    "Common question 1 in ${langLabel}",
    "Common question 2 in ${langLabel}"
  ],
  "raw_extracted_text": "First 1000 characters of extracted text",
  "unreadable_sections": [],
  "ocr_quality": "high"
}`;

    const parts: any[] = [{ text: systemPrompt }];

    if (textContent && textContent.length > 20) {
      parts.push({ text: `Document text excerpt:\n${textContent}` });
    }

    if (fileBase64) {
      // Normalize mimeType if needed
      let normalizedMime = mimeType;
      if (!normalizedMime || normalizedMime === 'application/octet-stream') {
        if (fileName.endsWith('.pdf')) normalizedMime = 'application/pdf';
        else if (fileName.endsWith('.png')) normalizedMime = 'image/png';
        else normalizedMime = 'image/jpeg';
      }

      parts.push({
        inline_data: {
          mime_type: normalizedMime,
          data: fileBase64,
        },
      });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.2,
          response_mime_type: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini Vision API error response:', response.status, errText);
      return null;
    }

    const data = await response.json();
    const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) {
      return null;
    }

    const parsed = JSON.parse(rawJson);

    // Merge metadata
    const completeAnalysis: DocumentAnalysis = {
      ...parsed,
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fileName,
      fileSize,
      fileType: mimeType,
      uploadedAt: new Date().toISOString(),
      language,
      action_steps: (parsed.action_steps || []).map((s: any, idx: number) => ({
        ...s,
        id: s.id || `step-${idx + 1}`,
        completed: false,
      })),
      required_documents: (parsed.required_documents || []).map((d: any, idx: number) => ({
        ...d,
        id: d.id || `doc-${idx + 1}`,
        collected: false,
      })),
      deadlines: (parsed.deadlines || []).map((dl: any, idx: number) => ({
        ...dl,
        id: dl.id || `dl-${idx + 1}`,
      })),
    };

    // Validate with Zod
    const validated = DocumentAnalysisSchema.parse(completeAnalysis);

    return {
      analysis: validated,
      notice: 'Analyzed with Gemini Multimodal Vision and grounded in official Indian administrative procedures.',
    };
  } catch (err) {
    console.warn('Gemini Vision analysis failed or returned invalid schema, falling back to rules engine:', err);
    return null;
  }
}
