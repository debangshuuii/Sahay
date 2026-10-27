import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocumentWithGroundedEngine } from '@/lib/ai/provider';
import { analyzeDocumentWithGeminiVision } from '@/lib/ai/visionAnalyzer';
import { extractTextFromBuffer } from '@/lib/ocr/extractText';
import { detectLanguageFromText } from '@/lib/i18n/detectLanguage';
import { analyzeFraudSignals } from '@/lib/security/fraudDetector';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';
import { SupportedLanguage } from '@/lib/ai/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // Basic rate limiting: 20 analyzes / minute / IP
    const ip = getClientIp(req);
    const rl = checkRateLimit(`analyze:${ip}`, { limit: 20, windowMs: 60_000 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and retry.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.resetAfterMs / 1000)) } }
      );
    }

    const contentType = req.headers.get('content-type') || '';
    let fileName = 'Uploaded_Document.pdf';
    let fileSize = 150000;
    let mimeType = 'application/pdf';
    let textContent = '';
    let fileBase64: string | undefined = undefined;
    let language: SupportedLanguage = 'en';
    let languageAuto = false;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const langParam = formData.get('language') as string | null;
      const textParam = formData.get('extractedText') as string | null;

      if (langParam === 'bn' || langParam === 'hi' || langParam === 'en') {
        language = langParam;
      } else if (!langParam || langParam === 'auto') {
        languageAuto = true;
      }

      if (textParam) {
        textContent = textParam;
      }

      if (file) {
        fileName = file.name;
        fileSize = file.size;
        mimeType = file.type || 'application/pdf';

        // File validation
        const maxSizeBytes = 15 * 1024 * 1024; // 15MB
        if (fileSize > maxSizeBytes) {
          return NextResponse.json(
            { error: 'File size exceeds maximum permitted limit (15MB).' },
            { status: 400 }
          );
        }

        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(mimeType) && !fileName.match(/\.(pdf|jpe?g|png|webp)$/i)) {
          return NextResponse.json(
            { error: 'Unsupported file format. Please upload a PDF, JPG, or PNG document.' },
            { status: 400 }
          );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        fileBase64 = buffer.toString('base64');

        if (!textContent) {
          // Improved offline extraction (PDF operators + printable fallback + quality score)
          const extracted = extractTextFromBuffer(buffer, mimeType);
          if (extracted.text.trim().length > 30) {
            textContent = extracted.text;
          } else {
            textContent = `Document: ${fileName}. Official administrative notice.`;
          }
        }
      }
    } else {
      const body = await req.json();
      fileName = body.fileName || fileName;
      fileSize = body.fileSize || fileSize;
      mimeType = body.mimeType || mimeType;
      textContent = body.text || '';
      if (body.language === 'bn' || body.language === 'hi' || body.language === 'en') {
        language = body.language;
      } else {
        languageAuto = true;
      }
      fileBase64 = body.fileBase64;
    }

    // Auto-detect language from script when requested
    let detectedLanguage: SupportedLanguage | null = null;
    if (languageAuto && textContent.trim().length > 10) {
      detectedLanguage = detectLanguageFromText(textContent);
      language = detectedLanguage;
    }

    // Attempt Gemini Multimodal Vision first if API key is present
    if (fileBase64 || textContent) {
      const visionResult = await analyzeDocumentWithGeminiVision({
        fileBase64,
        mimeType,
        fileName,
        fileSize,
        language,
        textContent,
      });

      if (visionResult) {
        const fraud = analyzeFraudSignals(textContent);
        return NextResponse.json({
          success: true,
          analysis: visionResult.analysis,
          providerUsed: 'gemini_multimodal_vision',
          notice: visionResult.notice,
          fraud,
          detectedLanguage,
        });
      }
    }

    // Grounded fallback rules engine
    const { analysis, providerUsed, notice } = await analyzeDocumentWithGroundedEngine({
      fileName,
      fileSize,
      mimeType,
      text: textContent || `Document: ${fileName}. Official administrative notice.`,
      language,
    });

    const fraud = analyzeFraudSignals(textContent || analysis.raw_extracted_text || '');

    return NextResponse.json({
      success: true,
      analysis,
      providerUsed,
      notice,
      fraud,
      detectedLanguage,
    });
  } catch (error) {
    console.error('Error analyzing document:', error);
    return NextResponse.json(
      { error: 'An error occurred during document analysis. Please try again with a clearer file.' },
      { status: 500 }
    );
  }
}
