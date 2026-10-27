'use client';

import React, { useState, useMemo } from 'react';
import { DocumentAnalysis } from '@/lib/ai/types';
import { Language, translations } from '@/lib/i18n/translations';
import { auditLog } from '@/lib/storage/auditLog';
import { cpgramsPortalUrl } from '@/lib/utils/reportGenerator';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  Share2, 
  ShieldCheck, 
  Edit3, 
  Send,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface GrievanceDraftGeneratorProps {
  analysis: DocumentAnalysis;
  language: Language;
}

type DraftType = 'objection_letter' | 'rti_application' | 'cpgrams_grievance';

export const GrievanceDraftGenerator: React.FC<GrievanceDraftGeneratorProps> = ({
  analysis,
  language,
}) => {
  const t = translations[language];
  const [draftType, setDraftType] = useState<DraftType>('objection_letter');
  
  // Extract key facts for initial default values
  const issuingDept = analysis.sources?.[0]?.publisher || 'Competent Authority / Executive Officer';
  const consumerIdFact = analysis.key_facts.find(f => 
    f.label.toLowerCase().includes('id') || 
    f.label.toLowerCase().includes('নম্বর') || 
    f.label.toLowerCase().includes('नंबर') ||
    f.label.toLowerCase().includes('consumer')
  );
  const amountFact = analysis.key_facts.find(f => 
    f.label.toLowerCase().includes('amount') || 
    f.label.toLowerCase().includes('পরিমাণ') || 
    f.label.toLowerCase().includes('राशि') ||
    f.label.toLowerCase().includes('₹')
  );
  const deadlineFact = analysis.deadlines?.[0];

  // Editable citizen inputs
  const [citizenName, setCitizenName] = useState<string>('Shri / Smt. Citizen');
  const [citizenAddress, setCitizenAddress] = useState<string>('Residential Address, Dist: Jurisdiction');
  const [citizenPhone, setCitizenPhone] = useState<string>('+91 98765 43210');
  const [grievanceReason, setGrievanceReason] = useState<string>(
    language === 'bn' 
      ? 'বিল বা নোটিশে উল্লিখিত তথ্যের গরমিল রয়েছে এবং পুনঃপরীক্ষার জন্য অতিরিক্ত ১৫ দিন সময় প্রার্থনা করছি।'
      : language === 'hi'
      ? 'नोटिस में उल्लिखित विवरण की पुनर्जांच हेतु तथा दस्तावेज़ सत्यापन के लिए १५ दिनों का अतिरिक्त समय देने की प्रार्थना है।'
      : 'Discrepancy in billing assessment; requesting physical verification and a 15-day extension to comply.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Generate Draft Text based on inputs and selection
  const generatedDraft = useMemo(() => {
    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    const refId = consumerIdFact?.value || 'N/A';
    const amountVal = amountFact?.value || 'N/A';
    const deadlineVal = deadlineFact?.date || deadlineFact?.original_text || 'Stipulated Date';

    if (draftType === 'objection_letter') {
      if (language === 'bn') {
        return `তারিখ: ${todayStr}

বরাবর,
ভারপ্রাপ্ত আধিকারিক / বিভাগীয় প্রধান
${issuingDept}

বিষয়: ${analysis.document_type.label} সংক্রান্ত বিষয়ে জবাব ও বিবেচনা প্রার্থনা।
নথি/গ্রাহক নম্বর (Ref / Consumer ID): ${refId}

মান্যবর মহাশয়/মহাশয়া,

সবিনয় নিবেদন এই যে, আমি ${citizenName}, ঠিকানা: ${citizenAddress}। সম্প্রতি আপনার দপ্তর হইতে প্রেরিত উপরিউক্ত নোটিশটি (${analysis.document_type.label}) গ্রহণ করিয়াছি। নোটিশে ${deadlineVal} তারিখের মধ্যে ব্যবস্থা গ্রহণের নির্দেশ দেওয়া হইয়াছে।

এই প্রসঙ্গে আমার বক্তব্য ও প্রার্থনাসমূহ নিম্নরূপ:
১. ${grievanceReason}
২. উল্লিখিত আর্থিক দাবির পরিমাণ (${amountVal}) বর্তমান রেকর্ডের সহিত সামঞ্জস্যপূর্ণ নহে বিধায় দপ্তরীয় লেজার ও পরিদর্শনের বিস্তারিত বিবরণ প্রদান করা হউক।
৩. কোনো প্রকার একতরফা ব্যবস্থা বা সংযোগ বিচ্ছিন্নকরণের পূর্বে আমাকে ব্যক্তিগত শুনানির সুযোগ এবং অতিরিক্ত ১৫ দিন সময় মঞ্জুর করার অনুরোধ জানাচ্ছি।

অতএব, মহাশয়ের নিকট বিনীত প্রার্থনা, উক্ত বিষয়টি মানবিক ও প্রশাসনিক সহানুভূতি সহকারে বিবেচনা করিয়া সুবিধাজনক সমাধানের নির্দেশ দানে বাধিত করিবেন।

ধন্যবাদান্তে,
স্বাক্ষর:
নাম: ${citizenName}
মোবাইল: ${citizenPhone}
সংযুক্ত নথি (Enclosures):
${analysis.required_documents.map((d, i) => `${i + 1}. ${d.name} এর জেরক্স কপি`).join('\n')}`;
      } else if (language === 'hi') {
        return `दिनांक: ${todayStr}

सेवा में,
सक्षम प्राधिकारी / संभागीय अधिकारी
${issuingDept}

विषय: नोटिस (${analysis.document_type.label}) के संबंध में प्रत्युत्तर एवं समय-सीमा विस्तार हेतु आवेदन।
संदर्भ / उपभोक्ता संख्या (Ref / Consumer ID): ${refId}

महोदय/महोदया,

सविनय निवेदन है कि मैं ${citizenName}, निवासी: ${citizenAddress} हूँ। मुझे आपके कार्यालय से उक्त नोटिस प्राप्त हुआ है जिसमें ${deadlineVal} तक कार्रवाई करने का निर्देश दिया गया है।

इस संदर्भ में मेरे निम्नलिखित तथ्य एवं आपत्तियां हैं:
१. ${grievanceReason}
२. नोटिस में दर्शायी गई राशि (${amountVal}) पर पुनर्विचार किया जाए तथा विभागीय लेखा विवरणी (Ledger Summary) उपलब्ध कराई जाए।
३. किसी भी कठोर कार्रवाई अथवा सेवा विच्छेद से पूर्व मुझे अपना पक्ष रखने का अवसर तथा १५ दिनों की अतिरिक्त अवधि प्रदान की जाए।

अतः आपसे विनम्र अनुरोध है कि उक्त मामले पर सहानुभूतिपूर्वक विचार करते हुए आवश्यक राहत प्रदान करने की कृपा करें।

सादर धन्यवाद,
हस्ताक्षर:
नाम: ${citizenName}
संपर्क: ${citizenPhone}
संलग्नक (Enclosures):
${analysis.required_documents.map((d, i) => `${i + 1}. ${d.name} की छायाप्रति`).join('\n')}`;
      } else {
        return `Date: ${todayStr}

To,
The Competent Authority / Issuing Officer
${issuingDept}

Subject: Formal Response and Representation regarding ${analysis.document_type.label}
Reference / Consumer ID: ${refId}

Respected Sir/Madam,

I, ${citizenName}, residing at ${citizenAddress}, acknowledge the receipt of the administrative notice (${analysis.document_type.label}) directing compliance by ${deadlineVal}.

In response to the aforementioned notice, I respectfully submit as follows:
1. Ground of Representation: ${grievanceReason}
2. Clarification on Demand: The claimed statutory amount (${amountVal}) requires departmental re-audit and reconciliation against historical records.
3. Prayer for Natural Justice: I pray that no coercive, punitive, or disconnection action be initiated until this representation is disposed of following due verification, and an extension of 15 days be granted.

Kindly acknowledge receipt of this representation and accord a fair consideration.

Yours faithfully,

(Signature)
Name: ${citizenName}
Contact: ${citizenPhone}

Enclosures:
${analysis.required_documents.map((d, i) => `${i + 1}. Certified copy of ${d.name}`).join('\n')}`;
      }
    } else if (draftType === 'rti_application') {
      return `FORM 'A' - APPLICATION FOR INFORMATION UNDER SECTION 6(1) OF RIGHT TO INFORMATION ACT, 2005

To,
The State / Central Public Information Officer (SPIO / CPIO)
Office of: ${issuingDept}

1. Full Name of Applicant: ${citizenName}
2. Complete Address: ${citizenAddress}
3. Contact Number: ${citizenPhone}
4. Particulars of Information Sought:
   Concerning official notice: "${analysis.document_type.label}"
   Reference / Identifier: ${refId}

   Please provide certified true copies of the following:
   (a) Certified inspection notes, field verification reports, and calculation worksheets based on which the demand of ${amountVal} was raised.
   (b) Certified extract of the file notings and approval sheets of the competent authority regarding notice dated ${deadlineVal}.
   (c) Certified copy of the statutory rules, circulars, or tariff orders authorizing the levy of late fees/penalties in this matter.

5. Application Fee: ₹10 (Rupees Ten only) enclosed via IPO / Court Fee Stamp / Online Transaction.
6. Mode of Delivery: Registered Post / In-person collection.

Place: [Jurisdiction]
Date: ${todayStr}

Applicant Signature: _______________________
(${citizenName})`;
    } else {
      // CPGRAMS / Public Grievance Portal format
      return `CPGRAMS / PUBLIC GRIEVANCE PORTAL SUBMISSION DRAFT
Portal: https://pgportal.gov.in (Department of Administrative Reforms & Public Grievances)

Grievance Category: Administrative / Utility Grievance
Organization: ${issuingDept}
Subject: Unresolved Grievance regarding ${analysis.document_type.label} (Ref: ${refId})

Grievance Description:
I am a bonafide citizen (${citizenName}, Contact: ${citizenPhone}, Address: ${citizenAddress}). 
I have received notice "${analysis.document_type.label}" issued by ${issuingDept} referencing ID ${refId}.
The notice stipulates deadline ${deadlineVal} for payment/compliance of ${amountVal}.

Issue Description:
${grievanceReason}

Action Requested:
1. Immediate departmental review and recalculation of statutory amounts.
2. Suspension of punitive action until formal hearing and verification of documents.
3. Issuance of clear revised order in accordance with citizen charter guidelines.`;
    }
  }, [draftType, language, citizenName, citizenAddress, citizenPhone, grievanceReason, analysis, consumerIdFact, amountFact, deadlineFact, issuingDept]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDraft);
      setCopied(true);
      auditLog.append('grievance_draft', `Copied ${draftType} draft`, analysis.id);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert('Unable to copy directly. Please select and copy manually.');
    }
  };

  const handleDownloadTxt = () => {
    const filename = `Sahay_Grievance_Draft_${draftType}_${Date.now()}.txt`;
    const blob = new Blob([generatedDraft], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    auditLog.append('grievance_draft', `Downloaded ${draftType} draft TXT`, analysis.id);
  };

  const handlePrint = () => {
    auditLog.append('grievance_draft', `Printed ${draftType} draft`, analysis.id);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Sahay Official Citizen Representation</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; font-size: 14pt; color: #111; }
            pre { white-space: pre-wrap; font-family: inherit; }
          </style>
        </head>
        <body>
          <pre>${generatedDraft}</pre>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleWhatsAppShare = () => {
    auditLog.append('share', `Shared ${draftType} draft via WhatsApp`, analysis.id);
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(generatedDraft)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenCpgrams = () => {
    auditLog.append('grievance_draft', 'Opened CPGRAMS portal from draft', analysis.id);
    window.open(cpgramsPortalUrl(analysis), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '1.25rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-primary">
              {language === 'bn' ? 'স্বয়ংক্রিয় চিঠি ও আবেদন প্রস্তুতকারী' : language === 'hi' ? 'स्वतः आवेदन एवं पत्र निर्माता' : 'AI Grievance & Response Generator'}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {analysis.document_type.label}
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {language === 'bn' ? 'অফিসিয়াল জবাব ও আরটিআই (RTI) আবেদনপত্র' : language === 'hi' ? 'आधिकारिक उत्तर एवं आरटीआई आवेदन' : 'Official Reply & RTI Representation Draft'}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            {language === 'bn' 
              ? 'এই নথির ভিত্তিতে অবিলম্বে সংশ্লিষ্ট সরকারি দপ্তরে জমা দেওয়ার মতো উপযুক্ত আইনি চিঠি বা আরটিআই আবেদন তৈরি করুন।' 
              : language === 'hi'
              ? 'इस नोटिस के आधार पर संबंधित विभाग में जमा करने हेतु उपयुक्त कानूनी पत्र या आरटीआई आवेदन तैयार करें।'
              : 'Generate legally structured reply letters, RTI Act 2005 queries, or portal grievances pre-populated with extracted reference numbers.'}
          </p>
        </div>

        {/* Draft Type Toggle */}
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--color-bg-subtle)',
          padding: '3px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          gap: '4px',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={() => setDraftType('objection_letter')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.825rem',
              fontWeight: draftType === 'objection_letter' ? 700 : 500,
              backgroundColor: draftType === 'objection_letter' ? 'var(--color-primary)' : 'transparent',
              color: draftType === 'objection_letter' ? '#ffffff' : 'var(--color-text-main)',
              cursor: 'pointer',
            }}
          >
            {language === 'bn' ? 'আপত্তি / সময়সীমা বৃদ্ধি' : language === 'hi' ? 'आपत्ति / विस्तार पत्र' : 'Formal Reply'}
          </button>
          <button
            onClick={() => setDraftType('rti_application')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.825rem',
              fontWeight: draftType === 'rti_application' ? 700 : 500,
              backgroundColor: draftType === 'rti_application' ? 'var(--color-primary)' : 'transparent',
              color: draftType === 'rti_application' ? '#ffffff' : 'var(--color-text-main)',
              cursor: 'pointer',
            }}
          >
            {language === 'bn' ? 'RTI আবেদন (তথ্য জানার অধিকার)' : language === 'hi' ? 'RTI आवेदन पत्र' : 'RTI Application (Sec 6)'}
          </button>
          <button
            onClick={() => setDraftType('cpgrams_grievance')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.825rem',
              fontWeight: draftType === 'cpgrams_grievance' ? 700 : 500,
              backgroundColor: draftType === 'cpgrams_grievance' ? 'var(--color-primary)' : 'transparent',
              color: draftType === 'cpgrams_grievance' ? '#ffffff' : 'var(--color-text-main)',
              cursor: 'pointer',
            }}
          >
            {language === 'bn' ? 'অনলাইন পোর্টাল অভিযোগ' : language === 'hi' ? 'पोर्टल शिकायत (CPGRAMS)' : 'Portal Grievance'}
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem',
      }}>
        {/* Left: Interactive Details Customizer */}
        <div className="card" style={{ backgroundColor: '#ffffff' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Edit3 size={18} />
            <span>{language === 'bn' ? 'আপনার তথ্য ও কারণ পূরণ করুন' : language === 'hi' ? 'अपनी जानकारी एवं कारण दर्ज करें' : 'Customize Citizen Details'}</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--color-text-main)' }}>
                {language === 'bn' ? 'আবেদনকারীর পুরো নাম' : language === 'hi' ? 'आवेदक का पूरा नाम' : 'Full Name of Citizen'}
              </label>
              <input
                type="text"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--color-text-main)' }}>
                {language === 'bn' ? 'ঠিকানা' : language === 'hi' ? 'आवासीय पता' : 'Residential Address'}
              </label>
              <input
                type="text"
                value={citizenAddress}
                onChange={(e) => setCitizenAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--color-text-main)' }}>
                {language === 'bn' ? 'মোবাইল নম্বর' : language === 'hi' ? 'मोबाइल नंबर' : 'Phone / Mobile'}
              </label>
              <input
                type="text"
                value={citizenPhone}
                onChange={(e) => setCitizenPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--color-text-main)' }}>
                {language === 'bn' ? 'আপত্তি বা সময়ের মূল কারণ' : language === 'hi' ? 'आपत्ति अथवा समय मांगने का मुख्य कारण' : 'Primary Ground / Reason for Relief'}
              </label>
              <textarea
                rows={4}
                value={grievanceReason}
                onChange={(e) => setGrievanceReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{
              backgroundColor: 'var(--color-primary-bg)',
              border: '1px solid var(--color-primary-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem',
              fontSize: '0.825rem',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
            }}>
              <ShieldCheck size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>{language === 'bn' ? 'প্রশাসনিক নিশ্চয়তা:' : language === 'hi' ? 'प्रशासनिक गारंटी:' : 'Legal Compliance Tip:'}</strong>
                <p style={{ margin: '0.25rem 0 0' }}>
                  {language === 'bn'
                    ? 'সরকারি নিয়ম অনুযায়ী চিঠির এক কপি অফিসে সিলমোহর দিয়ে নিজের কাছে রিসিভ কপি হিসেবে রাখুন।'
                    : language === 'hi'
                    ? 'सरकारी नियमानुसार पत्र की एक प्रति कार्यालय से मुहर लगवाकर अपने पास पावती (Receiving) के रूप में अवश्य रखें।'
                    : 'Always submit in duplicate and obtain an official receiving stamp with date and dispatch seal for your records.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Formatted Draft Preview & Actions */}
        <div className="card" style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} />
              <span>{language === 'bn' ? 'প্রস্তুতকৃত চিঠির খসড়া' : language === 'hi' ? 'तैयार पत्र का प्रारूप' : 'Formatted Output Preview'}</span>
            </h3>

            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleCopy}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
                title="Copy to clipboard"
              >
                {copied ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
                <span>{copied ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied!') : (language === 'bn' ? 'কপি করুন' : 'Copy')}</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
                title="Download as text file"
              >
                <Download size={14} />
                <span>TXT</span>
              </button>

              <button
                onClick={handlePrint}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
                title="Print official letter"
              >
                <Printer size={14} />
                <span>{language === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem', color: '#16a34a' }}
                title="Share on WhatsApp"
              >
                <Share2 size={14} />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleOpenCpgrams}
                className="btn btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
                title="Open CPGRAMS to lodge this grievance"
              >
                <Send size={14} />
                <span>CPGRAMS Lodge</span>
              </button>
            </div>
          </div>

          <pre style={{
            flex: 1,
            backgroundColor: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            fontFamily: 'monospace, sans-serif',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: 'var(--color-text-main)',
            maxHeight: '480px',
            overflowY: 'auto',
          }}>
            {generatedDraft}
          </pre>
        </div>
      </div>
    </div>
  );
};
