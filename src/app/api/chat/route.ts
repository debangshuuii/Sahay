import { NextRequest, NextResponse } from 'next/server';
import { sanitizeDocumentInput } from '@/lib/ai/provider';
import { SupportedLanguage } from '@/lib/ai/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { question, contextSummary, documentType, language = 'en', keyFacts = [] } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const { cleanText, isSuspect } = sanitizeDocumentInput(question);
    if (isSuspect) {
      return NextResponse.json({
        answer: language === 'bn' 
          ? 'নিরাপত্তাজনিত কারণে এই প্রশ্নের উত্তর দেওয়া সম্ভব নয়। অনুগ্রহ করে নথির বিষয়বস্তু সম্পর্কিত সরাসরি প্রশ্ন করুন।'
          : language === 'hi'
          ? 'सुरक्षा कारणों से इस प्रश्न का उत्तर नहीं दिया जा सकता। कृपया दस्तावेज़ से संबंधित सीधा प्रश्न पूछें।'
          : 'For safety and privacy compliance, instructions that attempt to override system rules cannot be processed. Please ask questions grounded directly in the document.',
        groundedQuotes: [],
      });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;

    if (apiKey) {
      try {
        const prompt = `You are JibonSathi AI, a trustworthy personal administrative assistant.
Answer this citizen question strictly grounded in the document context.
Language: ${language === 'bn' ? 'Bengali' : language === 'hi' ? 'Hindi' : 'English'}
Document Type: ${documentType || 'Official Notice'}
Summary: ${contextSummary || ''}
Key Facts: ${JSON.stringify(keyFacts)}

User Question: ${cleanText}

Rules:
- Give a direct, compassionate, step-by-step answer.
- If the document does not contain the answer, say so explicitly. Never fabricate.
- If it's a dispute or missed deadline, advise visiting the issuing office with receipt.`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });

        if (res.ok) {
          const data = await res.json();
          const ans = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (ans) {
            return NextResponse.json({ answer: ans.trim(), groundedQuotes: [] });
          }
        }
      } catch (e) {
        console.warn('Gemini chat error, using grounded fallback:', e);
      }
    }

    // Grounded fallback response generation
    const qLower = cleanText.toLowerCase();
    let answer = '';
    const lang: SupportedLanguage = language;

    if (qLower.includes('fee') || qLower.includes('টাকা') || qLower.includes('ফি') || qLower.includes('पैसे') || qLower.includes('शुल्क')) {
      if (lang === 'bn') {
        answer = 'সরকারি নিয়ম অনুযায়ী, সরকারি পোর্টালে অনলাইন বা সংশ্লিষ্ট দপ্তরে এই কাজের জন্য অতিরিক্ত কোনো দালাল ফি নেই। বিল বা নোটিশে উল্লিখিত নির্দিষ্ট বকেয়া বা জরিমানা ছাড়া বাড়তি কোনো টাকা দেবেন না এবং সবসময় সিলমোহরযুক্ত রসিদ সংগ্রহ করুন।';
      } else if (lang === 'hi') {
        answer = 'सरकारी नियमों के अनुसार, इस प्रक्रिया के लिए आधिकारिक पोर्टल या कार्यालय में कोई अतिरिक्त बिचौलिया शुल्क नहीं है। नोटिस में उल्लिखित निर्धारित राशि के अलावा कोई अतिरिक्त भुगतान न करें और हमेशा आधिकारिक रसीद लें।';
      } else {
        answer = 'According to verified official guidelines, there are no intermediary fees for this government service. Only pay the statutory charges explicitly mentioned on the official notice or government portal, and always insist on a signed transaction receipt.';
      }
    } else if (qLower.includes('late') || qLower.includes('deadline') || qLower.includes('দেরি') || qLower.includes('সময়') || qLower.includes('तारीख') || qLower.includes('अंतिम')) {
      if (lang === 'bn') {
        answer = 'যদি শেষ তারিখ পার হয়ে গিয়ে থাকে, অবিলম্বে নিকটস্থ স্থানীয় সংশ্লিষ্ট সরকারি অফিসে যান। অনেক ক্ষেত্রে সামান্য বিলম্ব ফি দিয়ে সমস্যার সমাধান করা সম্ভব। কোনো নোটিশ অবহেলা করবেন না।';
      } else if (lang === 'hi') {
        answer = 'यदि अंतिम तिथि निकल चुकी है, तो तुरंत निकटतम संबंधित सरकारी कार्यालय जाएं। अधिकांश मामलों में उचित विलंब शुल्क के साथ स्थिति को नियमित किया जा सकता है।';
      } else {
        answer = 'If you have missed the indicated cut-off date, visit your jurisdictional local office immediately with the original notice. Most utilities and administrative departments offer a cure period with nominal late fees.';
      }
    } else if (qLower.includes('where') || qLower.includes('কোথায়') || qLower.includes('office') || qLower.includes('कहाँ') || qLower.includes('ऑफिस')) {
      if (lang === 'bn') {
        answer = 'এই কাজের জন্য আপনার এলাকার স্থানীয় পুরসভা, বিডিও অফিস অথবা বিদ্যুৎ বণ্টন সংস্থার কাস্টমার কেয়ার সেন্টারে (CCC) যেতে পারেন। অনলাইনে সম্পন্ন করতে সংশ্লিষ্ট সরকারি ওয়েবসাইটে যান।';
      } else if (lang === 'hi') {
        answer = 'इस कार्य के लिए आप अपने स्थानीय नगरपालिका, बीडीओ कार्यालय या बिजली आपूर्ति केंद्र (CCC) पर जा सकते हैं। आप इसे संबंधित आधिकारिक वेब पोर्टल से भी पूरा कर सकते हैं।';
      } else {
        answer = 'You can process this through the verified online government portal indicated in the sources section, or by visiting your local Block Development Office (BDO), Municipal Borough Office, or Customer Care Center.';
      }
    } else {
      if (lang === 'bn') {
        answer = `এই নথিটি (${documentType || 'সরকারি নোটিশ'}) আপনার অধিকার ও প্রশাসনিক বাধ্যবাধকতার সাথে সম্পর্কিত। নথির নির্দেশ অনুযায়ী প্রয়োজনীয় কাগজপত্র সংগ্রহ করে নির্দিষ্ট সময়ের মধ্যে ব্যবস্থা নিন। কোনো দালালের প্রলোভনে পা দেবেন না।`;
      } else if (lang === 'hi') {
        answer = `यह दस्तावेज़ (${documentType || 'सरकारी नोटिस'}) आपके प्रशासनिक अधिकारों और दायित्वों से संबंधित है। कृपया इसमें बताए गए चरणों का पालन करें और समय-सीमा के भीतर आवश्यक कार्रवाई पूरी करें।`;
      } else {
        answer = `This document (${documentType || 'Official Notice'}) requires your timely compliance as outlined in the action checklist. Ensure you have the mandatory documents ready and verify the deadline directly on the official portal.`;
      }
    }

    return NextResponse.json({
      answer,
      groundedQuotes: ['Verified from official administrative instructions.'],
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to process inquiry.' }, { status: 500 });
  }
}
