import type { SampleDocumentPreset } from './provider';

/**
 * Extended sample presets (4) covering banking, certificates,
 * legal and education — so all 6 landing categories have live demos.
 * Shapes match DocumentAnalysisSchema.
 */
const now = () => new Date().toISOString();

export const EXTRA_SAMPLE_DOCUMENTS: SampleDocumentPreset[] = [
  {
    id: 'sample-bank-kyc',
    name: 'Bank Re-KYC Notice — Account Freeze Warning',
    fileName: 'Bank_ReKYC_Notice_2026.pdf',
    category: 'Bank Notices',
    language: 'en',
    extractedText: `STATE BANK OF INDIA, Salt Lake Branch, Kolkata
NOTICE FOR PERIODIC UPDATION OF KYC (Re-KYC)
Ref: SBI/SL/REKYC/2026/1120 Date: 05/02/2026
Account No: 389122XXXX45 Customer: S. Banerjee
Dear Customer, as per RBI guidelines your KYC is due for updation. Please submit Officially Valid Documents (PAN + Aadhaar/Voter ID) within 30 days, i.e. on or before 07/03/2026, failing which operations may be restricted.
No fee is charged for re-KYC. Never share OTP/PIN. Visit home branch or update via netbanking if address unchanged.`,
    analysis: {
      bn: {
        language: 'bn', fileName: 'Bank_ReKYC_Notice_2026.pdf', fileSize: 165000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'ব্যাংক রি-কেওয়াইসি নোটিশ — অ্যাকাউন্ট সীমাবদ্ধতার সতর্কতা', confidence: 0.96 },
        summary: 'এটি স্টেট ব্যাংকের রি-কেওয়াইসি নোটিশ। ৭ই মার্চ ২০২৬-এর মধ্যে PAN + আধার/ভোটার কার্ড জমা না দিলে অ্যাকাউন্ট লেনদেন সীমাবদ্ধ হতে পারে।',
        why_received: 'RBI নির্দেশিকা অনুযায়ী নির্দিষ্ট সময় পরপর KYC হালনাগাদ বাধ্যতামূলক, তাই এই নোটিশ পাঠানো হয়েছে।',
        what_it_means: 'সময়মতো KYC না করালে টাকা তোলা/জমা বন্ধ হতে পারে। KYC সম্পূর্ণ বিনামূল্যে; OTP/PIN কাউকে দেবেন না।',
        key_facts: [
          { label: 'অ্যাকাউন্ট নম্বর', value: '389122XXXX45', source_page: 1, confidence: 0.95, is_sensitive: true },
          { label: 'শেষ তারিখ', value: '2026-03-07', source_page: 1, confidence: 0.97, is_sensitive: false },
          { label: 'ফি', value: '₹ ০ (বিনামূল্যে)', source_page: 1, confidence: 0.99, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'ঠিকানা বদল না হলে নেটব্যাংকিং/এটিএম-এ স্ব-ঘোষণা দিন', description: 'রেজিস্টার্ড মোবাইল/নেটব্যাংকিং থেকে re-KYC self-declaration জমা করুন।', priority: 'high', status: 'required', evidence: 'update via netbanking if address unchanged', completed: false },
          { id: 'step-2', title: 'ঠিকানা বদল হলে শাখায় মূল নথি নিয়ে যান', description: 'PAN + আধার/ভোটার + ছবি + পাসবই নিয়ে হোম ব্রাঞ্চে ফর্ম জমা দিন ও সিলমোহরযুক্ত রসিদ নিন।', priority: 'high', status: 'required', evidence: 'submit Officially Valid Documents', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'KYC জমার শেষ তারিখ', date: '2026-03-07', original_text: 'on or before 07/03/2026', confidence: 0.97, urgency: 'critical' }],
        required_documents: [
          { id: 'doc-1', name: 'প্যান কার্ড / ফর্ম ৬০', verification_status: 'verified', source_url: 'https://www.rbi.org.in', collected: false },
          { id: 'doc-2', name: 'আধার / ভোটার কার্ড', verification_status: 'verified', source_url: 'https://uidai.gov.in', collected: false },
        ],
        sources: [{ title: 'RBI KYC Guidelines', url: 'https://www.rbi.org.in', publisher: 'Reserve Bank of India', supports: 'Re-KYC is free; never share OTP', last_verified_at: '2026-01-10T00:00:00Z', is_official: true }],
        uncertainties: ['নোটিশে অ্যাকাউন্টের শেষ ৪ সংখ্যা মাস্ক করা থাকলে শাখায় গিয়ে পূর্ণ নম্বর যাচাই করুন।'],
        follow_up_questions: ['ঠিকানা না বদলালে কি শাখায় যেতেই হবে?', 'KYC না করলে কি টাকা আটকে যাবে?', 'ফোনে OTP চাইলে কী করব?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
      en: {
        language: 'en', fileName: 'Bank_ReKYC_Notice_2026.pdf', fileSize: 165000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'Bank Re-KYC Notice — Account Restriction Warning', confidence: 0.96 },
        summary: 'SBI has issued a periodic Re-KYC notice. Submit PAN + Aadhaar/Voter ID by March 7, 2026 to avoid restriction of operations.',
        why_received: 'RBI mandates periodic KYC refresh; your account is due, hence the notice.',
        what_it_means: 'Transactions may be frozen after the cut-off. Re-KYC is free; never share OTP/PIN.',
        key_facts: [
          { label: 'Account No', value: '389122XXXX45', source_page: 1, confidence: 0.95, is_sensitive: true },
          { label: 'KYC Due Date', value: '2026-03-07', source_page: 1, confidence: 0.97, is_sensitive: false },
          { label: 'Fee', value: 'Free (₹ 0)', source_page: 1, confidence: 0.99, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'Self-declare via netbanking if address unchanged', description: 'Submit re-KYC self-declaration from registered netbanking/ATM.', priority: 'high', status: 'required', evidence: 'update via netbanking if address unchanged', completed: false },
          { id: 'step-2', title: 'Visit home branch with originals if address changed', description: 'Carry PAN + OVD + photo + passbook, submit form, collect stamped receipt.', priority: 'high', status: 'required', evidence: 'submit Officially Valid Documents', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'KYC submission deadline', date: '2026-03-07', original_text: 'on or before 07/03/2026', confidence: 0.97, urgency: 'critical' }],
        required_documents: [
          { id: 'doc-1', name: 'PAN Card / Form 60', verification_status: 'verified', source_url: 'https://www.rbi.org.in', collected: false },
          { id: 'doc-2', name: 'Aadhaar / Voter ID', verification_status: 'verified', source_url: 'https://uidai.gov.in', collected: false },
        ],
        sources: [{ title: 'RBI KYC Guidelines', url: 'https://www.rbi.org.in', publisher: 'Reserve Bank of India', supports: 'Re-KYC is free; never share OTP', last_verified_at: '2026-01-10T00:00:00Z', is_official: true }],
        uncertainties: ['If account digits are masked, confirm full number at branch before transacting.'],
        follow_up_questions: ['Can I do Re-KYC without visiting branch?', 'What happens if I miss the date?', 'Bank caller asked for OTP — is it fraud?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
      hi: {
        language: 'hi', fileName: 'Bank_ReKYC_Notice_2026.pdf', fileSize: 165000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'बैंक री-केवाईसी नोटिस — खाता प्रतिबंध चेतावनी', confidence: 0.96 },
        summary: 'SBI द्वारा समयबद्ध री-केवाईसी नोटिस जारी किया गया है। 7 मार्च 2026 तक PAN + आधार/वोटर ID जमा न करने पर लेनदेन सीमित हो सकता है।',
        why_received: 'RBI दिशानिर्देशों के तहत समय-समय पर KYC अद्यतन अनिवार्य है।',
        what_it_means: 'समय पर KYC न कराने पर खाता फ्रीज हो सकता है। री-केवाईसी निःशुल्क है; OTP/PIN कभी साझा न करें।',
        key_facts: [
          { label: 'खाता संख्या', value: '389122XXXX45', source_page: 1, confidence: 0.95, is_sensitive: true },
          { label: 'अंतिम तिथि', value: '2026-03-07', source_page: 1, confidence: 0.97, is_sensitive: false },
          { label: 'शुल्क', value: 'निःशुल्क (₹ 0)', source_page: 1, confidence: 0.99, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'पता न बदला हो तो नेटबैंकिंग से स्व-घोषणा करें', description: 'पंजीकृत नेटबैंकिंग/ATM से री-केवाईसी स्व-घोषणा जमा करें।', priority: 'high', status: 'required', evidence: 'update via netbanking if address unchanged', completed: false },
          { id: 'step-2', title: 'पता बदला हो तो मूल दस्तावेजों सहित शाखा जाएं', description: 'PAN + OVD + फोटो + पासबुक लेकर फॉर्म जमा करें व मुहर लगी रसीद लें।', priority: 'high', status: 'required', evidence: 'submit Officially Valid Documents', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'KYC जमा करने की अंतिम तिथि', date: '2026-03-07', original_text: 'on or before 07/03/2026', confidence: 0.97, urgency: 'critical' }],
        required_documents: [
          { id: 'doc-1', name: 'पैन कार्ड / फॉर्म 60', verification_status: 'verified', source_url: 'https://www.rbi.org.in', collected: false },
          { id: 'doc-2', name: 'आधार / वोटर ID', verification_status: 'verified', source_url: 'https://uidai.gov.in', collected: false },
        ],
        sources: [{ title: 'RBI KYC दिशानिर्देश', url: 'https://www.rbi.org.in', publisher: 'भारतीय रिज़र्व बैंक', supports: 'री-केवाईसी निःशुल्क; OTP कभी साझा न करें', last_verified_at: '2026-01-10T00:00:00Z', is_official: true }],
        uncertainties: ['यदि खाता संख्या मास्क है तो शाखा में पूर्ण संख्या सत्यापित करें।'],
        follow_up_questions: ['क्या बिना शाखा जाए KYC हो सकता है?', 'तारीख निकल जाए तो क्या होगा?', 'फोन पर OTP मांगे तो क्या करें?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
    },
  },
  {
    id: 'sample-income-cert',
    name: 'e-District Income Certificate — Application Guide',
    fileName: 'WB_Income_Certificate_2026.pdf',
    category: 'Certificates',
    language: 'bn',
    extractedText: `GOVT OF WEST BENGAL e-District: Application for Income Certificate
Applicant: R. Das, Vill: Baruipur. Purpose: Oasis Scholarship.
Steps: Panchayat Pradhan certificate -> edistrict.wb.gov.in -> Certificates -> Issuance of Income Certificate -> fill income, upload residence + income proof + photo -> submit -> AIN generated. Approval by BDO/SDO in 7-15 working days. Fee: Nil. Download QR-coded certificate.`,
    analysis: {
      bn: {
        language: 'bn', fileName: 'WB_Income_Certificate_2026.pdf', fileSize: 148000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'ই-ডিস্ট্রিক্ট ইনকাম সার্টিফিকেট আবেদন নির্দেশিকা', confidence: 0.95 },
        summary: 'ওয়েসিস স্কলারশিপের জন্য BDO/SDO অনুমোদিত আয় শংসাপত্র পেতে e-District পোর্টালে আবেদনের নিয়ম। ফি নেই; অনুমোদনে ৭-১৫ কর্মদিবস লাগে।',
        why_received: 'স্কলারশিপ/ভর্তির জন্য পারিবারিক আয়ের সরকারি প্রমাণ দরকার, তাই এই নির্দেশিকা প্রযোজ্য।',
        what_it_means: 'প্রধান/কাউন্সিলরের প্রাথমিক শংসাপত্র নিয়ে অনলাইনে আবেদন করে AIN সংগ্রহ করুন; QR-যুক্ত সার্টিফিকেট ডাউনলোড করুন।',
        key_facts: [
          { label: 'পোর্টাল', value: 'edistrict.wb.gov.in', source_page: 1, confidence: 0.99, is_sensitive: false },
          { label: 'ফি', value: '₹ ০', source_page: 1, confidence: 0.99, is_sensitive: false },
          { label: 'সময়', value: '৭-১৫ কর্মদিবস', source_page: 1, confidence: 0.94, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'প্রধান/কাউন্সিলরের থেকে প্রাথমিক আয় শংসাপত্র নিন', description: 'স্থানীয় প্রমাণ ছাড়া অনলাইন আবেদন অসম্পূর্ণ থাকে।', priority: 'high', status: 'required', evidence: 'Panchayat Pradhan certificate', completed: false },
          { id: 'step-2', title: 'e-District-এ আবেদন করে AIN সংগ্রহ করুন', description: 'Certificates -> Issuance of Income Certificate-এ তথ্য + নথি আপলোড করে জমা দিন।', priority: 'high', status: 'required', evidence: 'submit -> AIN generated', completed: false },
          { id: 'step-3', title: 'QR-যুক্ত সার্টিফিকেট ডাউনলোড করুন', description: 'BDO/SDO অনুমোদনের পর ডিজিটাল সইযুক্ত কপি নিন; নতুন সিল লাগে না।', priority: 'normal', status: 'recommended', evidence: 'Download QR-coded certificate', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'কোনো কঠোর সময়সীমা নেই — স্কলারশিপ ডেডলাইনের আগেই আবেদন করুন', date: null, original_text: 'N/A — apply before scholarship cutoff', confidence: 0.9, urgency: 'upcoming' }],
        required_documents: [
          { id: 'doc-1', name: 'ঠিকানার প্রমাণ (ভোটার/আধার)', verification_status: 'verified', source_url: 'https://edistrict.wb.gov.in', collected: false },
          { id: 'doc-2', name: 'আয়ের প্রমাণ (প্রধানের শংসাপত্র/বেতন রসিদ)', verification_status: 'verified', source_url: 'https://edistrict.wb.gov.in', collected: false },
          { id: 'doc-3', name: 'পাসপোর্ট ছবি', verification_status: 'verified', source_url: 'https://edistrict.wb.gov.in', collected: false },
        ],
        sources: [{ title: 'WB e-District Portal', url: 'https://edistrict.wb.gov.in', publisher: 'Govt. of West Bengal', supports: 'Income certificate issuance & tracking', last_verified_at: '2026-01-20T00:00:00Z', is_official: true }],
        uncertainties: ['স্কলারশিপের কাট-অফ তারিখ এই নথিতে নেই; প্রতিষ্ঠান থেকে নিশ্চিত করুন।'],
        follow_up_questions: ['প্রধানের শংসাপত্র ছাড়া কি আবেদন হবে?', 'AIN দিয়ে স্ট্যাটাস কীভাবে দেখব?', 'QR সার্টিফিকেটে কি সিল লাগে?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
      en: {
        language: 'en', fileName: 'WB_Income_Certificate_2026.pdf', fileSize: 148000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'e-District Income Certificate Application Guide', confidence: 0.95 },
        summary: 'Process to obtain a BDO/SDO-signed income certificate via e-District for Oasis scholarship. Free; approval in 7-15 working days.',
        why_received: 'Scholarship/admission requires official proof of household income.',
        what_it_means: 'Get Pradhan/Councillor verification, apply online for an AIN, then download the QR-coded certificate.',
        key_facts: [
          { label: 'Portal', value: 'edistrict.wb.gov.in', source_page: 1, confidence: 0.99, is_sensitive: false },
          { label: 'Fee', value: '₹ 0', source_page: 1, confidence: 0.99, is_sensitive: false },
          { label: 'Timeline', value: '7-15 working days', source_page: 1, confidence: 0.94, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'Get Pradhan/Councillor income verification', description: 'Local proof is required before online filing.', priority: 'high', status: 'required', evidence: 'Panchayat Pradhan certificate', completed: false },
          { id: 'step-2', title: 'Apply on e-District and save AIN', description: 'Go to Certificates -> Issuance of Income Certificate, upload docs, submit.', priority: 'high', status: 'required', evidence: 'submit -> AIN generated', completed: false },
          { id: 'step-3', title: 'Download QR-coded certificate', description: 'After BDO/SDO approval, download digitally signed copy.', priority: 'normal', status: 'recommended', evidence: 'Download QR-coded certificate', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'No hard cutoff — apply before scholarship deadline', date: null, original_text: 'N/A — apply before scholarship cutoff', confidence: 0.9, urgency: 'upcoming' }],
        required_documents: [
          { id: 'doc-1', name: 'Residence proof (Voter/Aadhaar)', verification_status: 'verified', source_url: 'https://edistrict.wb.gov.in', collected: false },
          { id: 'doc-2', name: 'Income proof (Pradhan/salary slip)', verification_status: 'verified', source_url: 'https://edistrict.wb.gov.in', collected: false },
          { id: 'doc-3', name: 'Passport photo', verification_status: 'verified', source_url: 'https://edistrict.wb.gov.in', collected: false },
        ],
        sources: [{ title: 'WB e-District Portal', url: 'https://edistrict.wb.gov.in', publisher: 'Govt. of West Bengal', supports: 'Income certificate issuance & tracking', last_verified_at: '2026-01-20T00:00:00Z', is_official: true }],
        uncertainties: ['Scholarship cutoff is not in this notice; confirm with institute.'],
        follow_up_questions: ['Can I apply without Pradhan certificate?', 'How to track with AIN?', 'Is seal needed on QR certificate?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
      hi: {
        language: 'hi', fileName: 'WB_Income_Certificate_2026.pdf', fileSize: 148000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'ई-डिस्ट्रिक्ट आय प्रमाण-पत्र आवेदन मार्गदर्शिका', confidence: 0.95 },
        summary: 'ओएसिस छात्रवृत्ति हेतु BDO/SDO हस्ताक्षरित आय प्रमाण-पत्र के लिए e-District प्रक्रिया। निःशुल्क; स्वीकृति में 7-15 कार्यदिवस।',
        why_received: 'छात्रवृत्ति/प्रवेश हेतु पारिवारिक आय का सरकारी प्रमाण आवश्यक है।',
        what_it_means: 'प्रधान/पार्षद सत्यापन लेकर ऑनलाइन आवेदन कर AIN लें; QR-युक्त प्रमाण-पत्र डाउनलोड करें।',
        key_facts: [
          { label: 'पोर्टल', value: 'edistrict.wb.gov.in', source_page: 1, confidence: 0.99, is_sensitive: false },
          { label: 'शुल्क', value: '₹ 0', source_page: 1, confidence: 0.99, is_sensitive: false },
          { label: 'समय', value: '7-15 कार्यदिवस', source_page: 1, confidence: 0.94, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'प्रधान/पार्षद से प्राथमिक आय सत्यापन लें', description: 'स्थानीय प्रमाण के बिना ऑनलाइन आवेदन अधूरा रहता है।', priority: 'high', status: 'required', evidence: 'Panchayat Pradhan certificate', completed: false },
          { id: 'step-2', title: 'e-District पर आवेदन कर AIN सुरक्षित करें', description: 'Certificates -> Issuance में विवरण + दस्तावेज अपलोड कर जमा करें।', priority: 'high', status: 'required', evidence: 'submit -> AIN generated', completed: false },
          { id: 'step-3', title: 'QR-युक्त प्रमाण-पत्र डाउनलोड करें', description: 'BDO/SDO स्वीकृति के बाद डिजिटल हस्ताक्षरित प्रति लें।', priority: 'normal', status: 'recommended', evidence: 'Download QR-coded certificate', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'कोई कठोर समय-सीमा नहीं — छात्रवृत्ति कट-ऑफ से पहले आवेदन करें', date: null, original_text: 'N/A — apply before scholarship cutoff', confidence: 0.9, urgency: 'upcoming' }],
        required_documents: [
          { id: 'doc-1', name: 'निवास प्रमाण (वोटर/आधार)', verification_status: 'verified', source_url: 'https://edistrict.wb.gov.in', collected: false },
          { id: 'doc-2', name: 'आय प्रमाण (प्रधान/वेतन पर्ची)', verification_status: 'verified', source_url: 'https://edistrict.wb.gov.in', collected: false },
          { id: 'doc-3', name: 'पासपोर्ट फोटो', verification_status: 'verified', source_url: 'https://edistrict.wb.gov.in', collected: false },
        ],
        sources: [{ title: 'WB e-District पोर्टल', url: 'https://edistrict.wb.gov.in', publisher: 'पश्चिम बंगाल सरकार', supports: 'आय प्रमाण-पत्र जारी व ट्रैकिंग', last_verified_at: '2026-01-20T00:00:00Z', is_official: true }],
        uncertainties: ['छात्रवृत्ति कट-ऑफ इस नोटिस में नहीं है; संस्थान से पुष्टि करें।'],
        follow_up_questions: ['क्या बिना प्रधान प्रमाणपत्र आवेदन होगा?', 'AIN से स्थिति कैसे देखें?', 'क्या QR प्रमाणपत्र पर मुहर चाहिए?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
    },
  },
  {
    id: 'sample-court-summons',
    name: 'Court Summons — Appearance Notice (eCourts)',
    fileName: 'Court_Summons_2026.pdf',
    category: 'Legal',
    language: 'en',
    extractedText: `DISTRICT COURT, South 24 Parganas, Alipore
SUMMONS TO APPEAR Case No: TS/118/2026 Date: 10/02/2026
To: Respondent, Vill: Sonarpur. You are required to appear before Civil Judge (Jr. Divn), Room 4, on 20/03/2026 at 10:30 AM. Verify on districts.ecourts.gov.in with CNR. Bring summons copy + ID. Non-appearance may lead to ex-parte order.`,
    analysis: {
      bn: {
        language: 'bn', fileName: 'Court_Summons_2026.pdf', fileSize: 132000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'আদালত সমন — হাজিরার নোটিশ', confidence: 0.94 },
        summary: 'এটি দক্ষিণ ২৪ পরগণা আদালতের হাজিরার সমন (মামলা TS/118/2026)। ২০শে মার্চ ২০২৬ সকাল ১০:৩০-এ সিভিল জজের এজলাসে হাজির হতে হবে।',
        why_received: 'মামলায় আপনাকে পক্ষ করা হয়েছে, তাই আইন অনুযায়ী হাজিরার নির্দেশ দেওয়া হয়েছে।',
        what_it_means: 'নির্দিষ্ট দিনে হাজির না হলে একতরফা আদেশ হতে পারে। eCourts-এ CNR দিয়ে যাচাই করে আইনজীবীর পরামর্শ নিন।',
        key_facts: [
          { label: 'মামলা নম্বর', value: 'TS/118/2026', source_page: 1, confidence: 0.98, is_sensitive: false },
          { label: 'হাজিরার তারিখ', value: '2026-03-20', source_page: 1, confidence: 0.97, is_sensitive: false },
          { label: 'আদালত', value: 'Civil Judge, Alipore, Room 4', source_page: 1, confidence: 0.95, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'eCourts-এ মামলা যাচাই করুন', description: 'districts.ecourts.gov.in-এ CNR/মামলা নম্বর দিয়ে তারিখ-সময় মিলিয়ে নিন।', priority: 'high', status: 'required', evidence: 'Verify on districts.ecourts.gov.in', completed: false },
          { id: 'step-2', title: 'আইনজীবীর পরামর্শ নিয়ে হাজির হন', description: 'সমন কপি + ID + ২ সেট জেরক্স নিয়ে সময়মতো পৌঁছান।', priority: 'high', status: 'required', evidence: 'appear before Civil Judge', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'আদালতে হাজিরার তারিখ', date: '2026-03-20', original_text: 'on 20/03/2026 at 10:30 AM', confidence: 0.97, urgency: 'critical' }],
        required_documents: [
          { id: 'doc-1', name: 'সমনের কপি (মামলা নম্বরসহ)', verification_status: 'verified', source_url: 'https://districts.ecourts.gov.in', collected: false },
          { id: 'doc-2', name: 'পরিচয়পত্র', verification_status: 'verified', source_url: 'https://districts.ecourts.gov.in', collected: false },
        ],
        sources: [{ title: 'eCourts District Courts', url: 'https://districts.ecourts.gov.in', publisher: 'eCommittee, Supreme Court of India', supports: 'Case status & cause-list verification', last_verified_at: '2026-02-01T00:00:00Z', is_official: true }],
        uncertainties: ['CNR নম্বর সমনে না থাকলে আদালতের ফ্রন্ট অফিসে যাচাই করুন।'],
        follow_up_questions: ['হাজির হতে না পারলে কী হবে?', 'CNR কীভাবে খুঁজব?', 'কি উকিল ছাড়া হাজির হওয়া যায়?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
      en: {
        language: 'en', fileName: 'Court_Summons_2026.pdf', fileSize: 132000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'Court Summons — Appearance Notice', confidence: 0.94 },
        summary: 'Summons from District Court South 24 Parganas (Case TS/118/2026) directing appearance before Civil Judge on March 20, 2026 at 10:30 AM.',
        why_received: 'You are arrayed as a party; appearance is legally required.',
        what_it_means: 'Non-appearance risks ex-parte orders. Verify on eCourts via CNR and consult counsel.',
        key_facts: [
          { label: 'Case No', value: 'TS/118/2026', source_page: 1, confidence: 0.98, is_sensitive: false },
          { label: 'Appearance Date', value: '2026-03-20', source_page: 1, confidence: 0.97, is_sensitive: false },
          { label: 'Court', value: 'Civil Judge, Alipore, Room 4', source_page: 1, confidence: 0.95, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'Verify case on eCourts', description: 'Search CNR/case number on districts.ecourts.gov.in to confirm date/time.', priority: 'high', status: 'required', evidence: 'Verify on districts.ecourts.gov.in', completed: false },
          { id: 'step-2', title: 'Appear with counsel and documents', description: 'Carry summons + ID + 2 photocopy sets; reach early.', priority: 'high', status: 'required', evidence: 'appear before Civil Judge', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'Date of appearance', date: '2026-03-20', original_text: 'on 20/03/2026 at 10:30 AM', confidence: 0.97, urgency: 'critical' }],
        required_documents: [
          { id: 'doc-1', name: 'Summons copy with case number', verification_status: 'verified', source_url: 'https://districts.ecourts.gov.in', collected: false },
          { id: 'doc-2', name: 'Identity proof', verification_status: 'verified', source_url: 'https://districts.ecourts.gov.in', collected: false },
        ],
        sources: [{ title: 'eCourts District Courts', url: 'https://districts.ecourts.gov.in', publisher: 'eCommittee, Supreme Court of India', supports: 'Case status & cause-list verification', last_verified_at: '2026-02-01T00:00:00Z', is_official: true }],
        uncertainties: ['If CNR is missing, verify at court front office.'],
        follow_up_questions: ['What if I cannot appear?', 'How to find CNR?', 'Can I appear without a lawyer?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
      hi: {
        language: 'hi', fileName: 'Court_Summons_2026.pdf', fileSize: 132000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'न्यायालय समन — उपस्थिति नोटिस', confidence: 0.94 },
        summary: 'जिला न्यायालय दक्षिण 24 परगना का समन (केस TS/118/2026)। 20 मार्च 2026 को सुबह 10:30 बजे सिविल जज के समक्ष उपस्थित होना है।',
        why_received: 'मामले में आपको पक्षकार बनाया गया है, इसलिए उपस्थिति legally आवश्यक है।',
        what_it_means: 'उपस्थित न होने पर एकतरफा आदेश हो सकता है। ई-कोर्ट पर CNR से सत्यापित कर वकील से परामर्श लें।',
        key_facts: [
          { label: 'केस नंबर', value: 'TS/118/2026', source_page: 1, confidence: 0.98, is_sensitive: false },
          { label: 'पेशी तिथि', value: '2026-03-20', source_page: 1, confidence: 0.97, is_sensitive: false },
          { label: 'न्यायालय', value: 'Civil Judge, Alipore, Room 4', source_page: 1, confidence: 0.95, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'ई-कोर्ट पर मामला सत्यापित करें', description: 'districts.ecourts.gov.in पर CNR/केस नंबर से तारीख-समय मिलाएं।', priority: 'high', status: 'required', evidence: 'Verify on districts.ecourts.gov.in', completed: false },
          { id: 'step-2', title: 'वकील सहित दस्तावेजों के साथ उपस्थित हों', description: 'समन + ID + 2 फोटोप्रति लेकर समय पर पहुंचें।', priority: 'high', status: 'required', evidence: 'appear before Civil Judge', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'उपस्थिति की तिथि', date: '2026-03-20', original_text: 'on 20/03/2026 at 10:30 AM', confidence: 0.97, urgency: 'critical' }],
        required_documents: [
          { id: 'doc-1', name: 'केस नंबर सहित समन प्रति', verification_status: 'verified', source_url: 'https://districts.ecourts.gov.in', collected: false },
          { id: 'doc-2', name: 'पहचान पत्र', verification_status: 'verified', source_url: 'https://districts.ecourts.gov.in', collected: false },
        ],
        sources: [{ title: 'eCourts जिला न्यायालय', url: 'https://districts.ecourts.gov.in', publisher: 'eCommittee, Supreme Court of India', supports: 'केस स्थिति व वाद-सूची सत्यापन', last_verified_at: '2026-02-01T00:00:00Z', is_official: true }],
        uncertainties: ['यदि CNR न हो तो न्यायालय फ्रंट ऑफिस में सत्यापित करें।'],
        follow_up_questions: ['उपस्थित न हो पाने पर क्या होगा?', 'CNR कैसे खोजें?', 'क्या बिना वकील उपस्थित हो सकते हैं?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
    },
  },
  {
    id: 'sample-scholarship',
    name: 'Oasis Scholarship — Renewal Notice',
    fileName: 'Oasis_Scholarship_Renewal_2026.pdf',
    category: 'Education',
    language: 'en',
    extractedText: `OASIS SCHOLARSHIP (SC/ST/OBC), Backward Classes Welfare Dept.
Renewal for AY 2026-27. Applicant: P. Murmu. Last passed: 68%.
Renew on oasis.gov.in with Application ID, upload last marksheet + income + caste + bank passbook. Institute verification (HoI) mandatory before 30/04/2026. DBT to Aadhaar-seeded account. Free application.`,
    analysis: {
      bn: {
        language: 'bn', fileName: 'Oasis_Scholarship_Renewal_2026.pdf', fileSize: 121000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'ওয়েসিস স্কলারশিপ — নবায়ন নোটিশ', confidence: 0.93 },
        summary: '2026-27 শিক্ষাবর্ষে ওয়েসিস বৃত্তি নবায়নের নির্দেশ। ৩০শে এপ্রিল ২০২৬-এর মধ্যে oasis.gov.in-এ মার্কশিট + আয় + জাতি + ব্যাংক পাসবই আপলোড করে প্রতিষ্ঠান যাচাই করাতে হবে।',
        why_received: 'গত বছর বৃত্তি পেয়েছেন বলে ধারাবাহিকতার জন্য নবায়ন বাধ্যতামূলক।',
        what_it_means: 'HoI যাচাই ছাড়া DBT আসবে না। আবেদন বিনামূল্যে; ব্যাংক নাম আধারের সঙ্গে মিলতে হবে।',
        key_facts: [
          { label: 'শিক্ষাবর্ষ', value: '2026-27', source_page: 1, confidence: 0.97, is_sensitive: false },
          { label: 'শেষ নম্বর', value: '৬৮%', source_page: 1, confidence: 0.95, is_sensitive: false },
          { label: 'নবায়নের শেষ তারিখ', value: '2026-04-30', source_page: 1, confidence: 0.96, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'Oasis-এ লগইন করে নবায়ন ফর্ম পূরণ করুন', description: 'Application ID দিয়ে ঢুকে একাডেমিক + ব্যাংক তথ্য হালনাগাদ করুন।', priority: 'high', status: 'required', evidence: 'Renew on oasis.gov.in', completed: false },
          { id: 'step-2', title: 'নথি আপলোড করে HoI যাচাই করান', description: 'মার্কশিট, আয়, জাতি, পাসবই দিয়ে প্রতিষ্ঠান প্রধানের যাচাই নিন।', priority: 'high', status: 'required', evidence: 'Institute verification (HoI) mandatory', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'নবায়ন + HoI যাচাইয়ের শেষ তারিখ', date: '2026-04-30', original_text: 'before 30/04/2026', confidence: 0.96, urgency: 'upcoming' }],
        required_documents: [
          { id: 'doc-1', name: 'শেষ মার্কশিট', verification_status: 'verified', source_url: 'https://oasis.gov.in', collected: false },
          { id: 'doc-2', name: 'আয় ও জাতি শংসাপত্র', verification_status: 'verified', source_url: 'https://oasis.gov.in', collected: false },
          { id: 'doc-3', name: 'ব্যাংক পাসবই (DBT)', verification_status: 'verified', source_url: 'https://oasis.gov.in', collected: false },
        ],
        sources: [{ title: 'Oasis Scholarship Portal', url: 'https://oasis.gov.in', publisher: 'Backward Classes Welfare Dept., WB', supports: 'Apply, renew & track DBT', last_verified_at: '2026-01-25T00:00:00Z', is_official: true }],
        uncertainties: ['আয়ের সীমা ক্যাটাগরি ভেদে বদলায়; পোর্টালে যাচাই করুন।'],
        follow_up_questions: ['HoI যাচাই না হলে কী হবে?', 'ব্যাংক নাম ভুল থাকলে কী করব?', 'DBT কবে আসবে?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
      en: {
        language: 'en', fileName: 'Oasis_Scholarship_Renewal_2026.pdf', fileSize: 121000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'Oasis Scholarship — Renewal Notice', confidence: 0.93 },
        summary: 'Renewal for AY 2026-27 on oasis.gov.in. Upload marksheet + income + caste + passbook and complete HoI verification before April 30, 2026.',
        why_received: 'You are a prior beneficiary; renewal is required for continuity.',
        what_it_means: 'No DBT without HoI verification. Free; bank name must match Aadhaar.',
        key_facts: [
          { label: 'Academic Year', value: '2026-27', source_page: 1, confidence: 0.97, is_sensitive: false },
          { label: 'Last Score', value: '68%', source_page: 1, confidence: 0.95, is_sensitive: false },
          { label: 'Renewal Deadline', value: '2026-04-30', source_page: 1, confidence: 0.96, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'Login and fill renewal form', description: 'Use Application ID to update academic + bank details.', priority: 'high', status: 'required', evidence: 'Renew on oasis.gov.in', completed: false },
          { id: 'step-2', title: 'Upload docs and get HoI verification', description: 'Submit marksheet, income, caste, passbook; follow up with HoI.', priority: 'high', status: 'required', evidence: 'Institute verification (HoI) mandatory', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'Renewal + HoI verification cutoff', date: '2026-04-30', original_text: 'before 30/04/2026', confidence: 0.96, urgency: 'upcoming' }],
        required_documents: [
          { id: 'doc-1', name: 'Last marksheet', verification_status: 'verified', source_url: 'https://oasis.gov.in', collected: false },
          { id: 'doc-2', name: 'Income & caste certificates', verification_status: 'verified', source_url: 'https://oasis.gov.in', collected: false },
          { id: 'doc-3', name: 'Bank passbook (DBT)', verification_status: 'verified', source_url: 'https://oasis.gov.in', collected: false },
        ],
        sources: [{ title: 'Oasis Scholarship Portal', url: 'https://oasis.gov.in', publisher: 'Backward Classes Welfare Dept., WB', supports: 'Apply, renew & track DBT', last_verified_at: '2026-01-25T00:00:00Z', is_official: true }],
        uncertainties: ['Income ceilings vary by category; check portal.'],
        follow_up_questions: ['What if HoI does not verify?', 'Name mismatch in bank — what to do?', 'When will DBT arrive?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
      hi: {
        language: 'hi', fileName: 'Oasis_Scholarship_Renewal_2026.pdf', fileSize: 121000, fileType: 'application/pdf', uploadedAt: now(),
        document_type: { label: 'ओएसिस छात्रवृत्ति — नवीनीकरण नोटिस', confidence: 0.93 },
        summary: 'शैक्षणिक वर्ष 2026-27 हेतु oasis.gov.in पर नवीनीकरण करें। 30 अप्रैल 2026 से पहले अंकपत्र + आय + जाति + पासबुक अपलोड कर HoI सत्यापन कराएं।',
        why_received: 'आप पूर्व लाभार्थी हैं; निरंतरता हेतु नवीनीकरण अनिवार्य है।',
        what_it_means: 'HoI सत्यापन के बिना DBT नहीं आएगा। आवेदन निःशुल्क; बैंक नाम आधार से मिलना चाहिए।',
        key_facts: [
          { label: 'शैक्षणिक वर्ष', value: '2026-27', source_page: 1, confidence: 0.97, is_sensitive: false },
          { label: 'अंतिम अंक', value: '68%', source_page: 1, confidence: 0.95, is_sensitive: false },
          { label: 'नवीनीकरण अंतिम तिथि', value: '2026-04-30', source_page: 1, confidence: 0.96, is_sensitive: false },
        ],
        action_steps: [
          { id: 'step-1', title: 'ओएसिस पर लॉगिन कर नवीनीकरण फॉर्म भरें', description: 'Application ID से शैक्षणिक + बैंक विवरण अद्यतन करें।', priority: 'high', status: 'required', evidence: 'Renew on oasis.gov.in', completed: false },
          { id: 'step-2', title: 'दस्तावेज अपलोड कर HoI सत्यापन कराएं', description: 'अंकपत्र, आय, जाति, पासबुक देकर संस्थान प्रमुख से सत्यापन कराएं।', priority: 'high', status: 'required', evidence: 'Institute verification (HoI) mandatory', completed: false },
        ],
        deadlines: [{ id: 'dl-1', description: 'नवीनीकरण + HoI सत्यापन की अंतिम तिथि', date: '2026-04-30', original_text: 'before 30/04/2026', confidence: 0.96, urgency: 'upcoming' }],
        required_documents: [
          { id: 'doc-1', name: 'अंतिम अंकपत्र', verification_status: 'verified', source_url: 'https://oasis.gov.in', collected: false },
          { id: 'doc-2', name: 'आय व जाति प्रमाणपत्र', verification_status: 'verified', source_url: 'https://oasis.gov.in', collected: false },
          { id: 'doc-3', name: 'बैंक पासबुक (DBT)', verification_status: 'verified', source_url: 'https://oasis.gov.in', collected: false },
        ],
        sources: [{ title: 'ओएसिस छात्रवृत्ति पोर्टल', url: 'https://oasis.gov.in', publisher: 'पिछड़ा वर्ग कल्याण विभाग, WB', supports: 'आवेदन, नवीनीकरण व DBT ट्रैकिंग', last_verified_at: '2026-01-25T00:00:00Z', is_official: true }],
        uncertainties: ['आय सीमा श्रेणी अनुसार बदलती है; पोर्टल पर जांचें।'],
        follow_up_questions: ['HoI सत्यापन न हो तो क्या होगा?', 'बैंक नाम गलत हो तो क्या करें?', 'DBT कब आएगा?'],
        raw_extracted_text: '', unreadable_sections: [], ocr_quality: 'high',
      },
    },
  },
];
