export type Language = 'bn' | 'hi' | 'en';

export interface TranslationStrings {
  appName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  explainDocumentBtn: string;
  trySampleBtn: string;
  privacyBadge: string;
  privacyGuarantee: string;
  howItWorksTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  categoriesTitle: string;
  catBills: string;
  catCertificates: string;
  catLegal: string;
  catGovtSchemes: string;
  catBankNotices: string;
  catEducation: string;
  aiDisclaimer: string;
  
  // Workspace & Tabs
  dashboardGreeting: string;
  uploadAreaTitle: string;
  uploadAreaSubtitle: string;
  dragDropText: string;
  orChooseFile: string;
  cameraCapture: string;
  supportedFormats: string;
  processingDocument: string;
  extractingOcr: string;
  generatingExplanation: string;
  
  // 7 Core Sections
  tabSimpleWords: string;
  tabSimpleWordsDesc: string;
  whyReceivedTitle: string;
  whatItMeansTitle: string;
  
  tabActionSteps: string;
  tabActionStepsDesc: string;
  requiredBadge: string;
  recommendedBadge: string;
  unverifiedBadge: string;
  stepCompleted: string;
  allStepsDone: string;
  
  tabDeadlines: string;
  deadlineWarning: string;
  noDeadlinesFound: string;
  dateContext: string;
  
  tabRequiredDocs: string;
  docsCollectedCount: string;
  markCollected: string;
  
  tabKeyDetails: string;
  maskSensitive: string;
  unmaskSensitive: string;
  sensitiveProtected: string;
  
  tabSources: string;
  officialVerifiedBadge: string;
  unverifiedNotice: string;
  visitOfficialPortal: string;
  lastChecked: string;
  
  tabAskQuestion: string;
  askPlaceholder: string;
  sendBtn: string;
  voiceBtn: string;
  listening: string;
  speakTranscript: string;
  suggestedQuestions: string;
  
  // Voice Modal / Assistant
  voiceTitle: string;
  voiceSubtitle: string;
  voiceStart: string;
  voiceStop: string;
  voicePlayAnswer: string;
  voiceStopAudio: string;
  voicePermissionNote: string;
  
  // Procedure Guide
  procedureGuideTitle: string;
  procedureGuideSubtitle: string;
  searchProcedures: string;
  
  // History & Settings
  historyTitle: string;
  historyEmpty: string;
  clearHistory: string;
  deleteDoc: string;
  settingsTitle: string;
  fontSize: string;
  fontSizeNormal: string;
  fontSizeLarge: string;
  fontSizeExtraLarge: string;
  highContrast: string;
  autoSpeak: string;
  deleteAllData: string;
  dataDeletedSuccess: string;
  
  // Common
  loading: string;
  backToHome: string;
  reUpload: string;
  changeLanguage: string;
  sampleDocLabel: string;
  confidenceHigh: string;
  confidenceMedium: string;
  confidenceLow: string;
  uncertaintiesTitle: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appName: "SAHAY",
    tagline: "Understand the paperwork. Know your next step.",
    heroHeadline: "Official paperwork, explained in your language.",
    heroSubheadline: "Upload a document. Understand what it means. Find out what to do next without confusion or intermediaries.",
    explainDocumentBtn: "Explain a Document",
    trySampleBtn: "Try a Sample Document",
    privacyBadge: "Private & Safe",
    privacyGuarantee: "Client-controlled analysis. Your documents are never sold, retained for training, or silently saved to any cloud storage.",
    howItWorksTitle: "How SAHAY Works",
    step1Title: "1. Upload or Snap",
    step1Desc: "Upload any official letter, bill, certificate notice, or photograph. Bengali, Hindi, and English are natively supported.",
    step2Title: "2. Clear Explanation",
    step2Desc: "Our AI breaks down difficult bureaucratic jargon into simple, dignified everyday language you can easily understand.",
    step3Title: "3. Actionable Checklist",
    step3Desc: "Get an ordered checklist of exact steps, verified deadlines, required paperwork, and official portal links.",
    categoriesTitle: "Common Documents Handled",
    catBills: "Electricity & Utility Bills",
    catCertificates: "Caste, Income & Domicile Certificates",
    catLegal: "Court, Panchayat & Municipality Notices",
    catGovtSchemes: "Ration Cards, Swasthya Sathi & DBT",
    catBankNotices: "Bank KYC & Account Freeze Warnings",
    catEducation: "Scholarships & Exam Admittance",
    aiDisclaimer: "SAHAY provides administrative explanations and verified official procedural guidance. It does not replace official government decisions or professional legal advice.",
    
    dashboardGreeting: "Namaste & Welcome. How can we assist your paperwork today?",
    uploadAreaTitle: "Upload an Official Document",
    uploadAreaSubtitle: "Drag & drop your PDF or photo, or take a picture with your phone camera",
    dragDropText: "Drop your file here, or browse from device",
    orChooseFile: "Browse File",
    cameraCapture: "Use Camera",
    supportedFormats: "Supports PDF, JPG, PNG (Max 15MB). Multilingual OCR enabled.",
    processingDocument: "Reading document text and detecting language...",
    extractingOcr: "Extracting key dates, reference numbers, and instructions...",
    generatingExplanation: "Translating bureaucratic jargon into plain, actionable guidance...",
    
    tabSimpleWords: "In Simple Words",
    tabSimpleWordsDesc: "A clear breakdown of what this document is and why it matters to you.",
    whyReceivedTitle: "Why did you receive this?",
    whatItMeansTitle: "What does this mean for you?",
    
    tabActionSteps: "What You Need To Do",
    tabActionStepsDesc: "Step-by-step checklist prioritized by importance.",
    requiredBadge: "Mandatory",
    recommendedBadge: "Recommended",
    unverifiedBadge: "Unconfirmed",
    stepCompleted: "Done",
    allStepsDone: "All steps completed! Keep your receipts safely.",
    
    tabDeadlines: "Important Dates",
    deadlineWarning: "Deadline approaching! Verify timely submission.",
    noDeadlinesFound: "No explicit cut-off deadline detected in this document.",
    dateContext: "Original reference in text",
    
    tabRequiredDocs: "Documents You May Need",
    docsCollectedCount: "collected",
    markCollected: "Mark as ready",
    
    tabKeyDetails: "Important Details",
    maskSensitive: "Hide Sensitive Info",
    unmaskSensitive: "Show Full Info",
    sensitiveProtected: "Sensitive numbers (Aadhaar/Account/Mobile) are masked for your privacy.",
    
    tabSources: "Official Sources",
    officialVerifiedBadge: "Verified Official Portal",
    unverifiedNotice: "Third-party or unofficial source—verify at local government office.",
    visitOfficialPortal: "Open Official Portal",
    lastChecked: "Verified on",
    
    tabAskQuestion: "Ask About This Document",
    askPlaceholder: "Ask anything about this document in English, Bengali, or Hindi...",
    sendBtn: "Ask",
    voiceBtn: "Voice",
    listening: "Listening... speak now in Bengali, Hindi, or English",
    speakTranscript: "Your spoken question",
    suggestedQuestions: "Helpful questions you can ask:",
    
    voiceTitle: "Voice Assistant",
    voiceSubtitle: "Speak naturally in your mother tongue. We'll transcribe, answer, and read it back to you.",
    voiceStart: "Tap to Speak",
    voiceStop: "Stop Recording",
    voicePlayAnswer: "Listen to Answer",
    voiceStopAudio: "Stop Voice",
    voicePermissionNote: "Your voice is processed locally in browser. No microphone data is stored.",
    
    procedureGuideTitle: "Official Procedure Guide",
    procedureGuideSubtitle: "Search trusted government schemes, certificates, and application steps.",
    searchProcedures: "Search official procedures (e.g. WBSEDCL payment, Aadhaar Ration link, Income Certificate)...",
    
    historyTitle: "Saved Documents",
    historyEmpty: "No documents saved. Uploaded documents are kept only in your local session unless you choose to bookmark them.",
    clearHistory: "Clear All History",
    deleteDoc: "Delete Document",
    settingsTitle: "Accessibility & Privacy Settings",
    fontSize: "Text Display Size",
    fontSizeNormal: "Standard",
    fontSizeLarge: "Large (Readable)",
    fontSizeExtraLarge: "Extra Large (High Visibility)",
    highContrast: "High Contrast Display",
    autoSpeak: "Read responses aloud automatically",
    deleteAllData: "Erase All Local Data & Reset",
    dataDeletedSuccess: "All session and local document data has been permanently deleted.",
    
    loading: "Please wait...",
    backToHome: "Back to Home",
    reUpload: "Analyze Another Document",
    changeLanguage: "Language",
    sampleDocLabel: "Sample Demo Document",
    confidenceHigh: "High Confidence",
    confidenceMedium: "Moderate Confidence",
    confidenceLow: "Low Confidence - Review Carefully",
    uncertaintiesTitle: "Points Requiring Clarification",
  },
  bn: {
    appName: "সহায় (SAHAY)",
    tagline: "সরকারি কাগজপত্র সহজে বুঝুন। পরবর্তী পদক্ষেপ জানুন।",
    heroHeadline: "অফিসিয়াল কাগজপত্র, আপনার নিজের ভাষায় সহজ ব্যাখ্যা।",
    heroSubheadline: "যেকোনো নোটিশ, বিল বা সার্টিফিকেটের ছবি আপলোড করুন। জানুন কী করতে হবে, কোন দালাল বা মধ্যস্থতাকারী ছাড়াই।",
    explainDocumentBtn: "নথির ব্যাখ্যা জানুন",
    trySampleBtn: "নমুনা নথি দিয়ে পরখ করুন",
    privacyBadge: "সম্পূর্ণ নিরাপদ ও গোপনীয়",
    privacyGuarantee: "আপনার সম্মতি ছাড়া কোনো নথি কোনো ক্লাউডে স্থায়ীভাবে জমা রাখা হয় না।",
    howItWorksTitle: "সহায় কীভাবে কাজ করে",
    step1Title: "১. ছবি বা ফাইল দিন",
    step1Desc: "যেকোনো সরকারি চিঠি, বিদ্যুৎ বিল, বা নোটিশের ছবি তুলুন বা পিডিএফ দিন। বাংলা, হিন্দি এবং ইংরেজি সমর্থিত।",
    step2Title: "২. সহজ ভাষায় ব্যাখ্যা",
    step2Desc: "জটিল প্রশাসনিক ভাষা ও শর্ত ভেঙে সহজ ঘরোয়া ভাষায় অর্থ বুঝিয়ে দেওয়া হয়।",
    step3Title: "৩. স্পষ্ট চেকলিস্ট",
    step3Desc: "কবে জমা দিতে হবে, কী কী কাগজপত্র লাগবে এবং কোন সরকারি পোর্টালে যেতে হবে তার তালিকা পান।",
    categoriesTitle: "যেসব কাগজপত্র সহজে বুঝতে সাহায্য করে",
    catBills: "বিদ্যুৎ ও জল বিলের নোটিশ",
    catCertificates: "জাতিগত, আয় ও স্থায়ী বাসিন্দার সার্টিফিকেট",
    catLegal: "কোর্ট, পঞ্চায়েত বা পুরসভার নোটিশ",
    catGovtSchemes: "রেশন কার্ড, স্বাস্থ্যসাথী ও সরকারি অনুদান",
    catBankNotices: "ব্যাঙ্ক কেওয়াইসি ও অ্যাকাউন্ট সংক্রান্ত চিঠি",
    catEducation: "স্কলারশিপ ও ভর্তি সংক্রান্ত কাগজপত্র",
    aiDisclaimer: "সহায় (SAHAY) আপনাকে সহায়তার উদ্দেশ্যে প্রশাসনিক নিয়ম ব্যাখ্যা করে। এটি সরকারের চূড়ান্ত আদেশ বা আইনি বিকল্প নয়।",
    
    dashboardGreeting: "নমস্কার! আজ কোন সরকারি কাগজপত্র বুঝতে সাহায্য করতে পারি?",
    uploadAreaTitle: "অফিসিয়াল নথি আপলোড করুন",
    uploadAreaSubtitle: "পিডিএফ বা ছবি ড্রপ করুন, অথবা আপনার মোবাইলের ক্যামেরা দিয়ে সরাসরি ছবি তুলুন",
    dragDropText: "ফাইলটি এখানে টেনে আনুন, অথবা ডিভাইস থেকে বেছে নিন",
    orChooseFile: "ফাইল বাছুন",
    cameraCapture: "ক্যামেরা চালু করুন",
    supportedFormats: "পিডিএফ, জেপিজি, পিএনজি (সর্বোচ্চ ১৫ মেগাবাইট)। বাংলা ও হিন্দি ওসিআর সক্রিয়।",
    processingDocument: "নথির লেখা পড়া হচ্ছে এবং ভাষা চিহ্নিত করা হচ্ছে...",
    extractingOcr: "জরুরি তারিখ, রেফারেন্স নম্বর এবং নির্দেশাবলী বিশ্লেষণ করা হচ্ছে...",
    generatingExplanation: "সহজ ভাষায় সম্পূর্ণ ব্যাখ্যা ও করণীয় তালিকা প্রস্তুত হচ্ছে...",
    
    tabSimpleWords: "সহজ ভাষায় অর্থ",
    tabSimpleWordsDesc: "এই নথিটি আসলে কী এবং আপনার জন্য কেন এটি জরুরি।",
    whyReceivedTitle: "আপনি এটি কেন পেয়েছেন?",
    whatItMeansTitle: "এর ফলে আপনাকে কী বুঝতে হবে?",
    
    tabActionSteps: "আপনাকে যা করতে হবে",
    tabActionStepsDesc: "গুরুত্ব অনুযায়ী সাজানো করণীয় কাজের তালিকা।",
    requiredBadge: "বাধ্যতামূলক",
    recommendedBadge: "পরামর্শযোগ্য",
    unverifiedBadge: "অযাচাইকৃত",
    stepCompleted: "সম্পন্ন হয়েছে",
  hi: {
    appName: "सहाय (SAHAY)",
    tagline: "सरकारी कागज़ात आसानी से समझें। जानिए अगला कदम।",
    heroHeadline: "सरकारी दस्तावेज़, आपकी अपनी भाषा में आसान समझ।",
    heroSubheadline: "कोई भी नोटिस, बिल या प्रमाण-पत्र अपलोड करें। बिना किसी बिचौलिए के जानें कि आपको क्या करना है।",
    explainDocumentBtn: "दस्तावेज़ का अर्थ समझें",
    trySampleBtn: "नमूना दस्तावेज़ आज़माएं",
    privacyBadge: "सुरक्षित और निजी",
    privacyGuarantee: "आपकी सहमति के बिना आपका दस्तावेज़ किसी भी बाहरी क्लाउड पर स्थायी रूप से सुरक्षित नहीं रखा जाता।",
    howItWorksTitle: "सहाय कैसे काम करता है",
    step1Title: "१. फ़ाइल या फ़ोटो दें",
    step1Desc: "कोई भी सरकारी चिट्ठी, बिजली बिल या नोटिस की फ़ोटो लें या पीडीएफ अपलोड करें। हिंदी, बंगाली और अंग्रेज़ी समर्थিত।",
    step2Title: "२. सरल शब्दों में अर्थ",
    step2Desc: "कठिन सरकारी नियमों और शब्दों को सरल रोज़मर्रा की भाषा में समझें।",
    step3Title: "३. स्पष्ट चेकलिस्ट",
    step3Desc: "अंतिम तारीख़, ज़रूरी दस्तावेज़ और आधिकारिक पोर्टल के सीधे लिंक के साथ चरण-दर-चरण सूची प्राप्त करें।",
    categoriesTitle: "अक्सर समझे जाने वाले दस्तावेज़",
    catBills: "बिजली और पानी बिल नोटिस",
    catCertificates: "जाति, आय और निवास प्रमाण-पत्र",
    catLegal: "कोर्ट, पंचायत और नगरपालिका नोटिस",
    catGovtSchemes: "राशन कार्ड, आयुष्मान व सरकारी योजनाएं",
    catBankNotices: "बैंक केवाईसी व खाता संबंधी नोटिस",
    catEducation: "छात्रवृत्ति व दाखिला पत्र",
    aiDisclaimer: "सहाय (SAHAY) प्रशासनिक जानकारी को आसान बनाने में सहायता करता है। यह आधिकारिक सरकारी आदेश या क़ानूनी सलाह का विकल्प नहीं है।",��ক্ষের তথ্য—অফিসে গিয়ে যাচাই করুন।",
    visitOfficialPortal: "সরকারি ওয়েবসাইট খুলুন",
    lastChecked: "যাচাইয়ের তারিখ",
    
    tabAskQuestion: "এই নথি নিয়ে প্রশ্ন করুন",
    askPlaceholder: "এই কাগজ সম্পর্কে যেকোনো প্রশ্ন বাংলায় বা ইংরেজিতে লিখুন...",
    sendBtn: "জানতে চাই",
    voiceBtn: "ভয়েস",
    listening: "শুনছি... বাংলায় বা হিন্দিতে বলুন",
    speakTranscript: "আপনার বলা প্রশ্ন",
    suggestedQuestions: "যে প্রশ্নগুলি আপনি করতে পারেন:",
    
    voiceTitle: "ভয়েস সহকারী",
    voiceSubtitle: "নিজের ভাষায় মুখে কথা বলুন। এআই উত্তর তৈরি করে আপনাকে পড়ে শোনাবে।",
    voiceStart: "কথা বলতে চাপুন",
    voiceStop: "কথা শেষ করুন",
    voicePlayAnswer: "উত্তর শুনুন",
    voiceStopAudio: "শব্দ বন্ধ করুন",
    voicePermissionNote: "ভয়েস আপনার ব্রাউজারে সুরক্ষিত থাকে। কোনো রেকর্ডিং বাইরে পাঠানো হয় না।",
    
    procedureGuideTitle: "সরকারি পদ্ধতি নির্দেশিকা",
    procedureGuideSubtitle: "সরকারি স্কিম, সার্টিফিকেট আবেদন এবং সঠিক ধাপগুলি জানুন।",
    searchProcedures: "পদ্ধতি খুঁজুন (যেমন: বিদ্যুৎ বিল জমা, রেশন কার্ড লিঙ্ক, ইনকাম সার্টিফিকেট)...",
    
    historyTitle: "সংরক্ষিত নথিপত্র",
    historyEmpty: "কোনো নথি সংরক্ষিত নেই। আপনার নথি কেবল আপনার বর্তমান ব্রাউজারে থাকে।",
    clearHistory: "সব ইতিহাস মুছুন",
    deleteDoc: "নথি মুছুন",
    settingsTitle: "অ্যাক্সেসিবিলিটি ও গোপনীয়তা সেটিংস",
    fontSize: "অক্ষরের আকার",
    fontSizeNormal: "সাধারণ",
    fontSizeLarge: "বড় (সহজে পড়ার জন্য)",
    fontSizeExtraLarge: "খুব বড় (উচ্চ দৃষ্টিগোচর)",
    highContrast: "উচ্চ বৈসাদৃশ্য মোড",
    autoSpeak: "উত্তর স্বয়ংক্রিয়ভাবে পড়ে শোনান",
    deleteAllData: "সব ডেটা মুছে রিসেট করুন",
    dataDeletedSuccess: "আপনার সমস্ত তথ্য ও নথি ব্রাউজার থেকে মুছে ফেলা হয়েছে।",
    
    loading: "অনুগ্রহ করে অপেক্ষা করুন...",
    backToHome: "মূল পৃষ্ঠায় ফিরুন",
    reUpload: "অন্য নথি যাচাই করুন",
    changeLanguage: "ভাষা",
    sampleDocLabel: "নমুনা নথি দিয়ে দেখুন",
    confidenceHigh: "উচ্চ নির্ভুলতা",
    confidenceMedium: "মাঝারি নির্ভুলতা",
    confidenceLow: "সতর্কতা প্রয়োজন - সরাসরি মিলিয়ে নিন",
    uncertaintiesTitle: "যেসব বিষয় স্পষ্ট নয় বা যাচাই প্রয়োজন",
  },
  hi: {
    appName: "जीवनसाथी एआई",
    tagline: "सरकारी कागज़ात आसानी से समझें। जानिए अगला कदम।",
    heroHeadline: "सरकारी दस्तावेज़, आपकी अपनी भाषा में आसान समझ।",
    heroSubheadline: "कोई भी नोटिस, बिल या प्रमाण-पत्र अपलोड करें। बिना किसी बिचौलिए के जानें कि आपको क्या करना है।",
    explainDocumentBtn: "दस्तावेज़ का अर्थ समझें",
    trySampleBtn: "नमूना दस्तावेज़ आज़माएं",
    privacyBadge: "सुरक्षित और निजी",
    privacyGuarantee: "आपकी सहमति के बिना आपका दस्तावेज़ किसी भी बाहरी क्लाउड पर स्थायी रूप से सुरक्षित नहीं रखा जाता।",
    howItWorksTitle: "जीवनसाथी कैसे काम करता है",
    step1Title: "१. फ़ाइल या फ़ोटो दें",
    step1Desc: "कोई भी सरकारी चिट्ठी, बिजली बिल या नोटिस की फ़ोटो लें या पीडीएफ अपलोड करें। हिंदी, बंगाली और अंग्रेज़ी समर्थित।",
    step2Title: "२. सरल शब्दों में अर्थ",
    step2Desc: "कठिन सरकारी नियमों और शब्दों को सरल रोज़मर्रा की भाषा में समझें।",
    step3Title: "३. स्पष्ट चेकलिस्ट",
    step3Desc: "अंतिम तारीख़, ज़रूरी दस्तावेज़ और आधिकारिक पोर्टल के सीधे लिंक के साथ चरण-दर-चरण सूची प्राप्त करें।",
    categoriesTitle: "अक्सर समझे जाने वाले दस्तावेज़",
    catBills: "बिजली और पानी बिल नोटिस",
    catCertificates: "जाति, आय और निवास प्रमाण-पत्र",
    catLegal: "कोर्ट, पंचायत और नगरपालिका नोटिस",
    catGovtSchemes: "राशन कार्ड, आयुष्मान व सरकारी योजनाएं",
    catBankNotices: "बैंक केवाईसी व खाता संबंधी नोटिस",
    catEducation: "छात्रवृत्ति व दाखिला पत्र",
    aiDisclaimer: "जीवनसाथी एआई प्रशासनिक जानकारी को आसान बनाने में सहायता करता है। यह आधिकारिक सरकारी आदेश या क़ानूनी सलाह का विकल्प नहीं है।",
    
    dashboardGreeting: "नमस्ते! आज हम आपके किस कागज़ात को समझने में मदद कर सकते हैं?",
    uploadAreaTitle: "सरकारी दस्तावेज़ अपलोड करें",
    uploadAreaSubtitle: "पीडीएफ या फ़ोटो खींचकर डालें, या अपने फ़ोन कैमरे से तुरंत फ़ोटो लें",
    dragDropText: "फ़ाइल यहाँ खींचें, या डिवाइस से चुनें",
    orChooseFile: "फ़ाइल चुनें",
    cameraCapture: "कैमरा खोलें",
    supportedFormats: "पीडीएफ, जेपीजी, पीएनजी (अधिकतम 15MB)। हिंदी व बंगाली ओसीआर सक्रिय।",
    processingDocument: "दस्तावेज़ पढ़ा जा रहा है और भाषा पहचानी जा रही है...",
    extractingOcr: "ज़रूरी तारीख़ें, संदर्भ संख्या और नियम निकाले जा रहे हैं...",
    generatingExplanation: "सरल भाषा में व्याख्या और कार्य सूची तैयार की जा रही है...",
    
    tabSimpleWords: "सरल शब्दों में",
    tabSimpleWordsDesc: "यह दस्तावेज़ वास्तव में क्या है और आपके लिए इसका क्या अर्थ है।",
    whyReceivedTitle: "यह आपको क्यों मिला?",
    whatItMeansTitle: "इसका आपके लिए क्या अर्थ है?",
    
    tabActionSteps: "आपको क्या करना होगा",
    tabActionStepsDesc: "प्राथमिकता के अनुसार व्यवस्थित कार्य सूची।",
    requiredBadge: "अनिवार्य",
    recommendedBadge: "सलाह",
    unverifiedBadge: "अपुष्ट",
    stepCompleted: "पूर्ण",
    allStepsDone: "सभी काम पूरे हो गए! पावती रसीद को सुरक्षित रखें।",
    
    tabDeadlines: "महत्वपूर्ण तारीख़ें",
    deadlineWarning: "अंतिम तारीख़ नज़दीक है! समय पर कार्रवाई करें।",
    noDeadlinesFound: "इस दस्तावेज़ में कोई स्पष्ट अंतिम समय-सीमा नहीं मिली।",
    dateContext: "मूल दस्तावेज़ में उल्लेख",
    
    tabRequiredDocs: "आवश्यक दस्तावेज़",
    docsCollectedCount: "तैयार हैं",
    markCollected: "तैयार चिह्नित करें",
    
    tabKeyDetails: "ज़रूरी विवरण",
    maskSensitive: "संवेदनशील जानकारी छिपाएं",
    unmaskSensitive: "पूरी जानकारी देखें",
    sensitiveProtected: "आपकी सुरक्षा के लिए आधार या खाता संख्या सुरक्षित रूप से आंशिक छिपाई गई है।",
    
    tabSources: "आधिकारिक स्रोत",
    officialVerifiedBadge: "सत्यापित सरकारी पोर्टल",
    unverifiedNotice: "गैर-सरकारी स्रोत—संबंधित कार्यालय में पुष्टि करें।",
    visitOfficialPortal: "सरकारी वेबसाइट खोलें",
    lastChecked: "सत्यापन तिथि",
    
    tabAskQuestion: "इस दस्तावेज़ पर प्रश्न पूछें",
    askPlaceholder: "इस कागज़ के बारे में हिंदी या अंग्रेज़ी में कुछ भी पूछें...",
    sendBtn: "पूछें",
    voiceBtn: "बोलें",
    listening: "सुन रहे हैं... कृपया हिंदी या अंग्रेज़ी में बोलें",
    speakTranscript: "आपका बोला हुआ प्रश्न",
    suggestedQuestions: "सुझाए गए प्रश्न:",
    
    voiceTitle: "आवाज़ सहायक",
    voiceSubtitle: "अपनी मातृभाषा में बोलें। एआई उत्तर तैयार करेगा और पढ़कर सुनाएगा।",
    voiceStart: "बोलने के लिए दबाएं",
    voiceStop: "बोलना समाप्त करें",
    voicePlayAnswer: "उत्तर सुनें",
    voiceStopAudio: "आवाज़ रोकें",
    voicePermissionNote: "आपकी आवाज़ आपके ब्राउज़र में ही सुरक्षित रहती है।",
    
    procedureGuideTitle: "सरकारी प्रक्रिया मार्गदर्शिका",
    procedureGuideSubtitle: "विश्वसनीय सरकारी योजनाओं और आवेदन चरणों की जानकारी।",
    searchProcedures: "प्रक्रिया खोजें (जैसे: बिजली बिल भुगतान, राशन आधार लिंक, आय प्रमाण-पत्र)...",
    
    historyTitle: "सहेजे गए दस्तावेज़",
    historyEmpty: "कोई दस्तावेज़ सहेजा नहीं गया। आपके दस्तावेज़ केवल आपके ब्राउज़र में रहते हैं।",
    clearHistory: "इतिहास साफ़ करें",
    deleteDoc: "दस्तावेज़ हटाएं",
    settingsTitle: "सुलभता एवं गोपनीयता सेटिंग्स",
    fontSize: "अक्षर का आकार",
    fontSizeNormal: "सामान्य",
    fontSizeLarge: "बड़ा (स्पष्ट)",
    fontSizeExtraLarge: "बहुत बड़ा (अधिक सुलभ)",
    highContrast: "उच्च कंट्रास्ट मोड",
    autoSpeak: "उत्तर स्वचालित रूप से पढ़कर सुनाएं",
    deleteAllData: "सारा डेटा हटाएं और रीसेट करें",
    dataDeletedSuccess: "आपका सारा डेटा ब्राउज़र से स्थायी रूप से हटा दिया गया है।",
    
    loading: "कृपया प्रतीक्षा करें...",
    backToHome: "मुखपृष्ठ पर लौटें",
    reUpload: "दूसरा दस्तावेज़ जांचें",
    changeLanguage: "भाषा",
    sampleDocLabel: "नमूना दस्तावेज़",
    confidenceHigh: "उच्च सटीकता",
    confidenceMedium: "मध्यम सटीकता",
    confidenceLow: "सावधानी अपेक्षित - स्वयं जांचें",
    uncertaintiesTitle: "जिन बिंदुओं पर स्पष्टीकरण आवश्यक है",
  }
};
