import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocumentWithGroundedEngine } from '@/lib/ai/provider';
import { SupportedLanguage } from '@/lib/ai/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let fileName = 'Uploaded_Document.pdf';
    let fileSize = 150000;
    let mimeType = 'application/pdf';
    let textContent = '';
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
        mimeType = file.type;

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

        // If it's a text-heavy file or text was not provided, read buffer
        if (!textContent) {
          const buffer = Buffer.from(await file.arrayBuffer());
          // Native text extraction attempt if ASCII/UTF8 strings exist in PDF/file
          const raw = buffer.toString('utf8');
          // Filter printable strings for basic OCR/text extraction
          const printable = raw.replace(/[^\x20-\x7E\u0980-\u09FF\u0900-\u097F\n\r]/g, ' ');
          if (printable.trim().length > 30) {
            textContent = printable.slice(0, 5000);
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
      language = body.language || 'en';
    }

    const { analysis, providerUsed, notice } = await analyzeDocumentWithGroundedEngine({
      fileName,
      fileSize,
      mimeType,
      text: textContent,
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
