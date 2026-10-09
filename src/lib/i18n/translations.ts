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
  
  // Core Sections
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
  
  // Voice Assistant
  voiceTitle: string;
  voiceSubtitle: string;
  voiceStart: string;
  voiceStop: string;
  voicePlayAnswer: string;
  voiceStopAudio: string;
  voicePermissionNote: string;
  
  // Procedures Guide
  procedureGuideTitle: string;
  procedureGuideSubtitle: string;
  searchProcedures: string;
  
  // History & Storage
  historyTitle: string;
  historyEmpty: string;
  clearHistory: string;
  deleteDoc: string;
  
  // Settings & Accessibility
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

  // Enhancements
  tabDraftGrievance: string;
  shareWhatsApp: string;
  printSummary: string;
  addToCalendar: string;
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
    catBills: "Electricity & Utility Demand Notices",
    catCertificates: "Caste, Income & Domicile Letters",
    catLegal: "Court, Panchayat & Municipal Orders",
    catGovtSchemes: "Ration, Ayushman & Welfare Letters",
    catBankNotices: "Bank KYC & Account Alerts",
    catEducation: "Scholarship & Admission Directives",
    aiDisclaimer: "SAHAY helps clarify administrative information. It is not a replacement for official orders or certified legal counsel.",
    
    dashboardGreeting: "Citizen Document Workspace",
    uploadAreaTitle: "Upload Official Notice or Document",
    uploadAreaSubtitle: "PDF, JPG, PNG or WebP accepted (Max 15MB). Scanned photos supported.",
    dragDropText: "Drag and drop your document here, or",
    orChooseFile: "Choose File from Device",
    cameraCapture: "Snap Photograph",
    supportedFormats: "Supports official letters, bills, court notices, applications & government forms",
    processingDocument: "Reading administrative notice...",
    extractingOcr: "Extracting official notice reference, dates, and amounts...",
    generatingExplanation: "Structuring citizen explanation and verified steps...",
    
    tabSimpleWords: "Plain Explanation",
    tabSimpleWordsDesc: "Clear summary of this document in plain language",
    whyReceivedTitle: "Why You Received This Document",
    whatItMeansTitle: "What This Means For You",
    
    tabActionSteps: "Action Checklist",
    tabActionStepsDesc: "Ordered steps required to resolve this matter",
    requiredBadge: "Mandatory Step",
    recommendedBadge: "Recommended",
    unverifiedBadge: "Verify at Office",
    stepCompleted: "Steps Completed",
    allStepsDone: "All action items have been marked as completed!",
    
    tabDeadlines: "Dates & Deadlines",
    deadlineWarning: "Strict cut-off date indicated. Late action may incur penalties or disconnection.",
    noDeadlinesFound: "No explicit hard deadline detected in this document.",
    dateContext: "Days Remaining",
    
    tabRequiredDocs: "Documents Needed",
    docsCollectedCount: "Collected",
    markCollected: "Mark as collected",
    
    tabKeyDetails: "Key Facts & Identifiers",
    maskSensitive: "Mask Sensitive IDs",
    unmaskSensitive: "Reveal Full Details",
    sensitiveProtected: "Aadhaar, Bank Account, and Personal IDs are masked for privacy compliance.",
    
    tabSources: "Official Sources",
    officialVerifiedBadge: "Verified Official Portal",
    unverifiedNotice: "Informational advisory — verify directly with the local department counter.",
    visitOfficialPortal: "Visit Official Portal",
    lastChecked: "Last Verified",
    
    tabAskQuestion: "Ask About Notice",
    askPlaceholder: "Ask any question about this document in English, Hindi, or Bengali...",
    sendBtn: "Ask",
    voiceBtn: "Voice",
    listening: "Listening... Speak your question now",
    speakTranscript: "Your Question",
    suggestedQuestions: "Suggested Questions:",
    
    voiceTitle: "Voice Assistant",
    voiceSubtitle: "Ask questions naturally using your voice. The assistant will answer and read aloud.",
    voiceStart: "Start Voice",
    voiceStop: "Stop Voice",
    voicePlayAnswer: "Listen to Answer",
    voiceStopAudio: "Mute Audio",
    voicePermissionNote: "Audio is processed locally in your browser for privacy.",
    
    procedureGuideTitle: "Official Procedure Directory",
    procedureGuideSubtitle: "Step-by-step guides for government schemes and citizen services",
    searchProcedures: "Search procedures (e.g. Electricity Bill, DigiLocker, Caste Certificate)...",
    
    historyTitle: "Saved Documents",
    historyEmpty: "No documents saved yet. Upload or try a sample document.",
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

    tabDraftGrievance: "Draft Response & RTI",
    shareWhatsApp: "Share via WhatsApp",
    printSummary: "Print / Save PDF",
    addToCalendar: "Add to Calendar (.ics)",
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
    catLegal: "আদালত, পঞ্চায়েত ও পুরসভার নির্দেশিকা",
    catGovtSchemes: "রেশন কার্ড, স্বাস্থ্যসাথী ও সরকারি স্কিম",
    catBankNotices: "ব্যাঙ্ক কেওয়াইসি ও একাউন্ট সতর্কবার্তা",
    catEducation: "স্কলারশিপ ও ভর্তি সংক্রান্ত নোটিশ",
    aiDisclaimer: "সহায় প্রশাসনিক বিষয় সহজে বুঝতে সাহায্য করে। এটি আদালতের সরাসরি রায় বা অফিসিয়াল আদেশের বিকল্প নয়।",
    
    dashboardGreeting: "নাগরিক নথি ড্যাশবোর্ড",
    uploadAreaTitle: "সরকারি নোটিশ বা চিঠি আপলোড করুন",
    uploadAreaSubtitle: "পিডিএফ বা স্পষ্ট ছবি (সর্বোচ্চ ১৫ মেগাবাইট) দিন। মোবাইলের ফটো সমর্থিত।",
    dragDropText: "ফাইলটি এখানে টেনে আনুন, অথবা",
    orChooseFile: "ডিভাইস থেকে ফাইল বেছে নিন",
    cameraCapture: "ছবি তুলুন",
    supportedFormats: "সরকারি নোটিশ, বিদ্যুৎ বিল, পুরসভার চিঠি এবং আবেদনপত্র",
    processingDocument: "নথিটি পড়া হচ্ছে...",
    extractingOcr: "নথি নম্বর, তারিখ এবং বকেয়া টাকা খোঁজা হচ্ছে...",
    generatingExplanation: "সহজ ভাষায় ব্যাখ্যা ও করণীয় তৈরি হচ্ছে...",
    
    tabSimpleWords: "সহজ ভাষায় অর্থ",
    tabSimpleWordsDesc: "এই নথির মূল বক্তব্য সহজ বাংলায়",
    whyReceivedTitle: "এই চিঠি কেন পেয়েছেন",
    whatItMeansTitle: "আপনার করণীয় ও আইনি প্রভাব",
    
    tabActionSteps: "করণীয় পদক্ষেপ (চেকলিস্ট)",
    tabActionStepsDesc: "সমস্যা মেটাতে পরপর এই কাজগুলি করুন",
    requiredBadge: "বাধ্যতামূলক ধাপ",
    recommendedBadge: "প্রয়োজনীয়",
    unverifiedBadge: "অফিসে যাচাই করুন",
    stepCompleted: "ধাপ সম্পন্ন হয়েছে",
    allStepsDone: "সবকটি কাজ সম্পন্ন হয়েছে হিসেবে চিহ্নিত করা হয়েছে!",
    
    tabDeadlines: "সময়সীমা ও জরুরি তারিখ",
    deadlineWarning: "নির্দিষ্ট সময়ের মধ্যে কাজ না করলে সংযোগ কাটা বা জরিমানার ঝুঁকি আছে।",
    noDeadlinesFound: "এই নথিতে কোনো নির্দিষ্ট সময়সীমা উল্লেখ নেই।",
    dateContext: "দিন বাকি",
    
    tabRequiredDocs: "প্রয়োজনীয় কাগজপত্র",
    docsCollectedCount: "সংগ্রহ হয়েছে",
    markCollected: "সংগ্রহ করা হয়েছে চিহ্নিত করুন",
    
    tabKeyDetails: "মূল তথ্য ও নম্বর",
    maskSensitive: "ব্যক্তিগত নম্বর গোপন রাখুন",
    unmaskSensitive: "সম্পূর্ণ নম্বর দেখুন",
    sensitiveProtected: "সুরক্ষার স্বার্থে আধার, ব্যাঙ্ক একাউন্ট এবং ব্যক্তিগত নম্বর মাস্ক করা রয়েছে।",
    
    tabSources: "অফিসিয়াল সরকারি উৎস",
    officialVerifiedBadge: "যাচাইকৃত সরকারি পোর্টাল",
    unverifiedNotice: "অফিসিয়াল তথ্য—প্রয়োজনে সরাসরি অফিসে গিয়ে যাচাই করুন।",
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

    tabDraftGrievance: "আইনি চিঠি ও RTI আবেদন",
    shareWhatsApp: "হোয়াটসঅ্যাপে শেয়ার করুন",
    printSummary: "প্রিন্ট / পিডিএফ সেভ করুন",
    addToCalendar: "ক্যালেন্ডারে যোগ করুন (.ics)",
  },

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
    aiDisclaimer: "सहाय (SAHAY) प्रशासनिक जानकारी को आसान बनाने में सहायता करता है। यह आधिकारिक सरकारी आदेश या क़ानूनी सलाह का विकल्प नहीं है।",
    
    dashboardGreeting: "नागरिक दस्तावेज़ वर्कस्पेस",
    uploadAreaTitle: "सरकारी नोटिस या दस्तावेज़ अपलोड करें",
    uploadAreaSubtitle: "पीडीएफ या साफ़ फ़ोटो (अधिकतम 15MB)। मोबाइल फ़ोटो समर्थित।",
    dragDropText: "फ़ाइल को यहाँ खींचें या",
    orChooseFile: "डिवाइस से फ़ाइल चुनें",
    cameraCapture: "फ़ोटो लें",
    supportedFormats: "सरकारी नोटिस, बिजली बिल, नगर पालिका पत्र और आवेदन प्रपत्र",
    processingDocument: "दस्तावेज़ पढ़ा जा रहा है...",
    extractingOcr: "नोटिस संख्या, तारीख़ और देय राशि की पहचान हो रही है...",
    generatingExplanation: "सरल भाषा में व्याख्या एवं कार्यवाही सूची तैयार हो रही है...",
    
    tabSimpleWords: "सरल भाषा में अर्थ",
    tabSimpleWordsDesc: "इस दस्तावेज़ का सार सरल हिंदी में",
    whyReceivedTitle: "यह दस्तावेज़ क्यों प्राप्त हुआ",
    whatItMeansTitle: "आपके लिए इसका अर्थ एवं प्रभाव",
    
    tabActionSteps: "आवश्यक कार्यवाही चेकलिस्ट",
    tabActionStepsDesc: "मामले के समाधान हेतु चरणबद्ध कदम",
    requiredBadge: "अनिवार्य कदम",
    recommendedBadge: "अनुशंसित",
    unverifiedBadge: "कार्यालय में सत्यापित करें",
    stepCompleted: "कदम पूर्ण हुए",
    allStepsDone: "सभी कार्य पूर्ण के रूप में चिह्नित किए गए हैं!",
    
    tabDeadlines: "महत्वपूर्ण तिथियां व समय-सीमा",
    deadlineWarning: "समय-सीमा का ध्यान रखें। देरी होने पर जुर्माना या सेवा विच्छेद हो सकता है।",
    noDeadlinesFound: "इस दस्तावेज़ में कोई स्पष्ट अंतिम तिथि नहीं मिली।",
    dateContext: "दिन शेष",
    
    tabRequiredDocs: "आवश्यक दस्तावेज़",
    docsCollectedCount: "एकत्रित",
    markCollected: "एकत्रित चिह्नित करें",
    
    tabKeyDetails: "प्रमुख विवरण एवं संख्या",
    maskSensitive: "संवेदनशील विवरण छुपाएं",
    unmaskSensitive: "पूरा विवरण देखें",
    sensitiveProtected: "गोपनीयता हेतु आधार, बैंक खाता एवं व्यक्तिगत विवरण सुरक्षित हैं।",
    
    tabSources: "आधिकारिक स्रोत",
    officialVerifiedBadge: "सत्यापित आधिकारिक पोर्टल",
    unverifiedNotice: "सूचनात्मक परामर्श—संबंधित कार्यालय में जाकर अवश्य पुष्टि करें।",
    visitOfficialPortal: "आधिकारिक पोर्टल खोलें",
    lastChecked: "सत्यापन तिथि",
    
    tabAskQuestion: "दस्तावेज़ से जुड़े प्रश्न पूछें",
    askPlaceholder: "इस कागज़ के संबंध में कोई भी प्रश्न हिंदी, बंगाली या अंग्रेज़ी में लिखें...",
    sendBtn: "पूछें",
    voiceBtn: "वॉइस",
    listening: "सुन रहे हैं... अपना प्रश्न बोलें",
    speakTranscript: "आपका प्रश्न",
    suggestedQuestions: "सुझाए गए प्रश्न:",
    
    voiceTitle: "वॉइस सहायक",
    voiceSubtitle: "अपनी आवाज़ में प्रश्न पूछें। एआई उत्तर तैयार कर बोलकर सुनाएगा।",
    voiceStart: "बोलना शुरू करें",
    voiceStop: "बोलना बंद करें",
    voicePlayAnswer: "उत्तर सुनें",
    voiceStopAudio: "आवाज़ बंद करें",
    voicePermissionNote: "आपकी आवाज़ आपके ब्राउज़र में ही सुरक्षित रहती है।",
    
    procedureGuideTitle: "सरकारी प्रक्रिया निर्देशिका",
    procedureGuideSubtitle: "सरकारी योजनाओं और नागरिक सेवाओं की चरण-दर-चरण जानकारी",
    searchProcedures: "प्रक्रिया खोजें (जैसे: बिजली बिल, राशन कार्ड, आय प्रमाण पत्र)...",
    
    historyTitle: "सहेजे गए दस्तावेज़",
    historyEmpty: "कोई दस्तावेज़ सहेजा नहीं गया है।",
    clearHistory: "इतिहास साफ़ करें",
    deleteDoc: "दस्तावेज़ हटाएं",
    settingsTitle: "सुलभता एवं गोपनीयता सेटिंग्स",
    fontSize: "अक्षर का आकार",
    fontSizeNormal: "सामान्य",
    fontSizeLarge: "बड़ा (स्पष्ट)",
    fontSizeExtraLarge: "अति बड़ा (उच्च दृश्यता)",
    highContrast: "उच्च कंट्रास्ट मोड",
    autoSpeak: "उत्तर स्वतः बोलकर सुनाएं",
    deleteAllData: "सारा डेटा मिटाएं व रीसेट करें",
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

    tabDraftGrievance: "पत्र एवं RTI आवेदन प्रारूप",
    shareWhatsApp: "व्हाट्सएप पर साझा करें",
    printSummary: "प्रिंट / पीडीएफ सुरक्षित करें",
    addToCalendar: "कैलेंडर में जोड़ें (.ics)",
  }
};
