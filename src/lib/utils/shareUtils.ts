import { DocumentAnalysis } from '../ai/types';

/**
 * Formats a clear WhatsApp briefing of the notice and opens WhatsApp share link.
 */
export function shareAnalysisViaWhatsApp(analysis: DocumentAnalysis) {
  const isBn = analysis.language === 'bn';
  const isHi = analysis.language === 'hi';

  const titlePrefix = isBn ? 'নথির বিশ্লেষণ' : isHi ? 'दस्तावेज़ विश्लेषण' : 'Notice Analysis';
  const deadlinePrefix = isBn ? 'গুরুত্বপূর্ণ সময়সীমা' : isHi ? 'महत्वपूर्ण समय-सीमा' : 'Critical Deadline';
  const actionPrefix = isBn ? 'করণীয় পদক্ষেপ' : isHi ? 'आवश्यक कदम' : 'Key Actions';
  const officialPrefix = isBn ? 'অফিসিয়াল পোর্টাল' : isHi ? 'आधिकारिक पोर्टल' : 'Official Portal';

  let message = `*🏛️ Sahay (सहाय) - ${titlePrefix}*\n\n`;
  message += `📄 *${analysis.document_type.label}*\n`;
  message += `_${analysis.summary}_\n\n`;

  if (analysis.deadlines && analysis.deadlines.length > 0) {
    message += `⚠️ *${deadlinePrefix}:*\n`;
    analysis.deadlines.slice(0, 2).forEach(dl => {
      message += `• ${dl.description}: ${dl.date || dl.original_text}\n`;
    });
    message += `\n`;
  }

  if (analysis.action_steps && analysis.action_steps.length > 0) {
    message += `✅ *${actionPrefix}:*\n`;
    analysis.action_steps.slice(0, 3).forEach((s, idx) => {
      message += `${idx + 1}. ${s.title}\n`;
    });
    message += `\n`;
  }

  if (analysis.sources && analysis.sources.length > 0) {
    message += `🌐 *${officialPrefix}:* ${analysis.sources[0].url}\n\n`;
  }

  message += `— _Shared via Sahay AI Citizen Assistant_`;

  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Triggers standard browser print with cleanly styled stylesheet for citizen summary.
 */
export function triggerPrintAnalysis() {
  if (typeof window !== 'undefined') {
    window.print();
  }
}
