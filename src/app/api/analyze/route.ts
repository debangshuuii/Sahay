import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocumentWithGroundedEngine } from '@/lib/ai/provider';
import { analyzeDocumentWithGeminiVision } from '@/lib/ai/visionAnalyzer';
import { SupportedLanguage } from '@/lib/ai/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let fileName = 'Uploaded_Document.pdf';
    let fileSize = 150000;
    let mimeType = 'application/pdf';
    let textContent = '';
    let fileBase64: string | undefined = undefined;
    let language: SupportedLanguage = 'en';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const langParam = formData.get('language') as string | null;
      const textParam = formData.get('extractedText') as string | null;

      if (langParam === 'bn' || langParam === 'hi' || langParam === 'en') {
        language = langParam;
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
          // Attempt basic UTF8 printable text extraction from raw stream if available
          const raw = buffer.toString('utf8');
          const printable = raw.replace(/[^\x20-\x7E\u0980-\u09FF\u0900-\u097F\n\r]/g, ' ');
          if (printable.trim().length > 30) {
            textContent = printable.slice(0, 5000);
          }
        }
      }
    } else {
      const body = await req.json();
      fileName = body.fileName || fileName;
      fileSize = body.fileSize || fileSize;
      mimeType = body.mimeType || mimeType;
      textContent = body.text || '';
      language = body.language || 'en';
      fileBase64 = body.fileBase64;
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
        return NextResponse.json({
          success: true,
          analysis: visionResult.analysis,
          providerUsed: 'gemini_multimodal_vision',
          notice: visionResult.notice,
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

    return NextResponse.json({
      success: true,
      analysis,
      providerUsed,
      notice,
    });
  } catch (error) {
    console.error('Error analyzing document:', error);
    return NextResponse.json(
      { error: 'An error occurred during document analysis. Please try again with a clearer file.' },
      { status: 500 }
    );
  }
}
