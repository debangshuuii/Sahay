import { SourceCitation } from './types';

// Trusted government domain suffixes and verified specific domains in India
export const TRUSTED_GOV_DOMAINS = [
  '.gov.in',
  '.nic.in',
  'wbsedcl.in',
  'wb.gov.in',
  'food.wb.gov.in',
  'wbpds.wb.gov.in',
  'uidai.gov.in',
  'edistrict.wb.gov.in',
  'incometax.gov.in',
  'epfindia.gov.in',
  'swasthyasathi.gov.in',
  'wb.gov.in',
  'india.gov.in',
  'digitalindia.gov.in',
  'passportindia.gov.in',
  'sbi.co.in',
  'rbi.org.in',
];

export interface VerifiedOfficialProcedure {
  id: string;
  category: 'bills' | 'certificates' | 'govt_schemes' | 'banking' | 'legal';
  titleEn: string;
  titleBn: string;
  titleHi: string;
  departmentEn: string;
  departmentBn: string;
  departmentHi: string;
  officialUrl: string;
  verificationDate: string;
  summaryEn: string;
  summaryBn: string;
  summaryHi: string;
  mandatoryDocsEn: string[];
  mandatoryDocsBn: string[];
  mandatoryDocsHi: string[];
  stepsEn: string[];
  stepsBn: string[];
  stepsHi: string[];
  feesNoteEn: string;
  feesNoteBn: string;
  feesNoteHi: string;
  warningsEn: string;
  warningsBn: string;
  warningsHi: string;
}

export const VERIFIED_OFFICIAL_PROCEDURES: VerifiedOfficialProcedure[] = [
  {
    id: 'wbsedcl-bill-payment-disconnection',
    category: 'bills',
    titleEn: 'WBSEDCL Electricity Bill Payment & Disconnection Avoidance',
    titleBn: 'ডব্লিউবিএসইডিসিএল বিদ্যুৎ বিল পরিশোধ ও লাইন বিচ্ছিন্নকরণ রোধ',
    titleHi: 'WBSEDCL बिजली बिल भुगतान और कनेक्शन विच्छेदन से बचाव',
    departmentEn: 'West Bengal State Electricity Distribution Company Limited',
    departmentBn: 'পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বণ্টন সংস্থা (WBSEDCL)',
    departmentHi: 'पश्चिम बंगाल राज्य विद्युत वितरण कंपनी लिमिटेड',
    officialUrl: 'https://www.wbsedcl.in',
    verificationDate: '2026-03-01',
    summaryEn: 'Official process for settling unpaid utility bills, clearing dues before notice expiry, and downloading payment receipts.',
    summaryBn: 'নোটিশের মেয়াদের মধ্যে বকেয়া বিদ্যুৎ বিল পরিশোধ, লাইন কাটা বন্ধ করা এবং অফিসিয়াল রসিদ সংগ্রহের নিয়মাবলী।',
    summaryHi: 'अंतिम तारीख से पहले बकाया बिजली बिल का भुगतान, कनेक्शन कटने से बचाना और आधिकारिक रसीद डाउनलोड करने की प्रक्रिया।',
    mandatoryDocsEn: ['Consumer ID (9 digits)', 'Installation Number', 'Bill Reference Copy'],
    mandatoryDocsBn: ['গ্রাহক নম্বর বা কনজিউমার আইডি (৯ সংখ্যার)', 'ইনস্টলেশন নম্বর', 'বিলের আসল বা জেরক্স কপি'],
    mandatoryDocsHi: ['उपभोक्ता आईडी (9 अंक)', 'इंस्टॉलेशन नंबर', 'बिजली बिल की प्रति'],
    stepsEn: [
      'Locate your 9-digit Consumer ID from the top-left section of the bill notice.',
      'Visit the official WBSEDCL web portal (wbsedcl.in) or mobile app (Vidyut Sahayogi).',
      'Select "Online Payment" -> "Quick Pay" and enter Consumer ID.',
      'Verify outstanding principal versus late payment surcharge before paying.',
      'Pay via UPI/Netbanking/Debit card and immediately download the signed e-Receipt with Transaction ID.',
      'If a disconnection notice has already been served, show the e-receipt to your local Customer Care Center (CCC) within 72 hours.'
    ],
    stepsBn: [
      'নোটিশের ওপরের বাঁ-দিকে থাকা ৯ সংখ্যার গ্রাহক নম্বর (Consumer ID) বের করুন।',
      'অফিসিয়াল পোর্টাল (wbsedcl.in) অথবা সরকারি "বিদ্যুৎ সহযোগী" অ্যাপ খুলুন।',
      ' "অনলাইন পেমেন্ট" -> "কুইক পে" বেছে নিয়ে গ্রাহক নম্বর লিখুন।',
      'পেমেন্ট করার আগে মূল বকেয়া ও বিলম্ব ফি যাচাই করুন।',
      'ইউপিআই বা কার্ড দিয়ে পেমেন্ট করে সঙ্গে সঙ্গে ডিজিটাল রসিদ ডাউনলোড করুন।',
      'লাইন কাটার নোটিশ পেয়ে থাকলে স্থানীয় বিদ্যুৎ অফিসে (CCC) ৭২ ঘণ্টার মধ্যে রসিদের কপি জমা দিন।'
    ],
    stepsHi: [
      'बिल के ऊपर बाईं ओर दर्ज 9 अंकों की उपभोक्ता आईडी (Consumer ID) देखें।',
      'आधिकारिक पोर्टल (wbsedcl.in) अथवा मोबाइल ऐप पर जाएं।',
      '"Online Payment" -> "Quick Pay" चुनकर अपनी उपभोक्ता आईडी दर्ज करें।',
      'भुगतान करने से पहले मूल बकाया राशि और विलंब शुल्क की जांच करें।',
      'यूपीआई या कार्ड से भुगतान कर ई-रसीद तुरंत डाउनलोड करें।',
      'यदि विच्छेदन नोटिस जारी हो चुका है, तो 72 घंटे में स्थानीय कार्यालय को रसीद दिखाएं।'
    ],
    feesNoteEn: 'Late Payment Surcharge (LPSC) of 1.25% per month applies on overdue payments after due date.',
    feesNoteBn: 'নির্দিষ্ট মেয়াদের পরে বিল জমা দিলে প্রতি মাসে ১.২৫% হারে বিলম্ব সারচার্জ যুক্ত হয়।',
    feesNoteHi: 'नियत तिथि के बाद बिल जमा करने पर 1.25% प्रति माह की दर से विलंब अधिभार देय होता है।',
    warningsEn: 'Never pay cash to any unauthorized person visiting your home without an official stamped field receipt.',
    warningsBn: 'অফিসিয়াল সিলমোহর ও রসিদ ছাড়া কোনো ব্যক্তিকে নগদ টাকা দেবেন না।',
    warningsHi: 'आधिकारिक मोहर लगी रसीद के बिना घर आए किसी भी व्यक्ति को नकद भुगतान न करें।'
  },
  {
    id: 'ration-aadhaar-link-wb',
    category: 'govt_schemes',
    titleEn: 'Digital Ration Card Aadhaar Seeding (e-KYC)',
    titleBn: 'ডিজিটাল রেশন কার্ডের সঙ্গে আধার সংযুক্তি (ই-কেওয়াইসি)',
    titleHi: 'डिजिटल राशन कार्ड आधार लिंकिंग (ई-केवाईसी)',
    departmentEn: 'Department of Food & Supplies, Govt. of West Bengal',
    departmentBn: 'খাদ্য ও সরবরাহ দপ্তর, পশ্চিমবঙ্গ সরকার',
    departmentHi: 'खाद्य एवं आपूर्ति विभाग, पश्चिम बंगाल सरकार',
    officialUrl: 'https://food.wb.gov.in',
    verificationDate: '2026-02-15',
    summaryEn: 'Mandatory Aadhaar linking to maintain subsidized food grain quota and prevent ration card deactivation.',
    summaryBn: 'রেশন কার্ড চালু রাখতে ও মাসিক বরাদ্দ খাদ্যশস্য নিরবচ্ছিন্ন পেতে বাধ্যতামূলক আধার ই-কেওয়াইসি।',
    summaryHi: 'मुफ्त या रियायती राशन जारी रखने और कार्ड निष्क्रिय होने से बचाने हेतु अनिवार्य आधार ई-केवाईसी।',
    mandatoryDocsEn: ['Digital Ration Card number & Category (AAY/PHH/SPHH/RKSY)', 'Aadhaar Card of all family members', 'Mobile number linked with Aadhaar'],
    mandatoryDocsBn: ['ডিজিটাল রেশন কার্ড নম্বর ও ক্যাটাগরি', 'পরিবারের সকল সদস্যের আধার কার্ড', 'আধারের সাথে যুক্ত মোবাইল নম্বর (ওটিপির জন্য)'],
    mandatoryDocsHi: ['डिजिटल राशन कार्ड संख्या व श्रेणी', 'परिवार के सभी सदस्यों का आधार कार्ड', 'आधार से लिंक मोबाइल नंबर (ओटीपी हेतु)'],
    stepsEn: [
      'Visit food.wb.gov.in -> "Link Aadhaar with Ration Card (e-KYC)".',
      'Enter Ration Card Category and Number.',
      'Enter head of family or individual member Aadhaar number.',
      'Authenticate with the 6-digit OTP sent to your Aadhaar-registered mobile phone.',
      'Alternatively, visit your designated Fair Price Shop (ration dealer) and complete biometric fingerprint verification on the e-POS machine.',
      'Check status after 48 hours to confirm "Aadhaar Linked: YES".'
    ],
    stepsBn: [
      'food.wb.gov.in ওয়েবসাইটে যান -> "Link Aadhaar with Ration Card" বিকল্প বেছে নিন।',
      'রেশন কার্ডের ক্যাটাগরি ও নম্বর লিখুন।',
      'সদস্যের ১২ সংখ্যার আধার নম্বর লিখুন।',
      'আধার রেজিস্টার্ড মোবাইলে আসা ৬ সংখ্যার ওটিপি দিয়ে যাচাই করুন।',
      'অনলাইনে না পারলে নিজের রেশন ডিলারের দোকানে গিয়ে ই-পস (e-POS) মেশিনে আঙুলের ছাপ দিয়ে বিনামূল্যে লিঙ্ক করান।',
      '৪৮ ঘণ্টা পর পোর্টাল থেকে স্ট্যাটাস চেক করে নিশ্চিত হন।'
    ],
    stepsHi: [
      'food.wb.gov.in पोर्टल पर जाएं -> "Link Aadhaar with Ration Card" चुनें।',
      'राशन कार्ड की श्रेणी और नंबर दर्ज करें।',
      'सदस्य का आधार नंबर दर्ज करें।',
      'आधार से जुड़े मोबाइल पर आए ओटीपी से सत्यापन पूरा करें।',
      'यदि ऑनलाइन संभव न हो, तो अपने डीलर के पास जाकर बायोमेट्रिक ई-पॉस मशीन से निःशुल्क लिंक कराएं।',
      '48 घंटे बाद पोर्टल पर स्थिति जांचें।'
    ],
    feesNoteEn: 'Free of cost. No official fee is charged at ration shops or online.',
    feesNoteBn: 'সম্পূর্ণ বিনামূল্যে। কোনো সরকারি ফি বা দালাল খরচের প্রয়োজন নেই।',
    feesNoteHi: 'पूर्णतः निःशुल्क। किसी भी राशन दुकान या ऑनलाइन पोर्टल पर कोई शुल्क नहीं लगता।',
    warningsEn: 'Do not share your Aadhaar OTP with any caller claiming to be from the food department.',
    warningsBn: 'খাদ্য দপ্তরের নাম করে কোনো ফোন এলে আধার ওটিপি জানাবেন না।',
    warningsHi: 'खाद्य विभाग के नाम से आने वाले किसी भी फोन कॉल पर आधार ओटीपी साझा न करें।'
  },
  {
    id: 'wb-income-certificate-edistrict',
    category: 'certificates',
    titleEn: 'Income Certificate Application via e-District West Bengal',
    titleBn: 'ই-ডিস্ট্রিক্ট পোর্টালে পারিবারিক আয় বা ইনকাম সার্টিফিকেট আবেদন',
    titleHi: 'ई-डिस्ट्रिक्ट पोर्टल के माध्यम से आय प्रमाण-पत्र आवेदन',
    departmentEn: 'Department of Personnel & Administrative Reforms, Govt. of West Bengal',
    departmentBn: 'কর্মীবর্গ ও প্রশাসনিক সংস্কার দপ্তর, পশ্চিমবঙ্গ সরকার',
    departmentHi: 'कार्मिक एवं प्रशासनिक सुधार विभाग, पश्चिम बंगाल सरकार',
    officialUrl: 'https://edistrict.wb.gov.in',
    verificationDate: '2026-01-20',
    summaryEn: 'Step-by-step process to obtain an officially signed Sub-Divisional Officer (SDO) or BDO Income Certificate for scholarships and welfare schemes.',
    summaryBn: 'স্কলারশিপ, ভর্তি বা সরকারি সহায়তার জন্য বিডিও বা এসডিও অনুমোদিত ইনকাম সার্টিফিকেট পাওয়ার সরকারি নিয়ম।',
    summaryHi: 'छात्रवृत्ति व कल्याणकारी योजनाओं हेतु एसडीओ/बीडीओ द्वारा हस्ताक्षरित आय प्रमाण-पत्र प्राप्त करने की प्रक्रिया।',
    mandatoryDocsEn: [
      'Residential Proof (Voter ID / Aadhaar / Passport)',
      'Income Proof (Salary Slip / Form 16 / Pradhan or Councillor Certificate)',
      'Passport size photograph (JPG, under 100KB)',
      'Age proof / Birth Certificate or Admit card'
    ],
    mandatoryDocsBn: [
      'স্থায়ী ঠিকানার প্রমাণ (ভোটার কার্ড / আধার কার্ড)',
      'আয়ের প্রমাণ (পঞ্চায়েত প্রধান / কাউন্সিলরের সুপারিশপত্র / বেতন রসিদ)',
      'পাসপোর্ট সাইজ ছবি',
      'বয়সের প্রমাণপত্র'
    ],
    mandatoryDocsHi: [
      'निवास प्रमाण-पत्र (वोटर आईडी / आधार)',
      'आय का प्रमाण (ग्राम प्रधान/पार्षद का प्रमाण-पत्र या वेतन पर्ची)',
      'पासपोर्ट साइज़ फोटो',
      'आयु प्रमाण-पत्र'
    ],
    stepsEn: [
      'Obtain an initial local income verification from your Gram Panchayat Pradhan or Municipal Councillor.',
      'Log into edistrict.wb.gov.in with your citizen credentials.',
      'Navigate to "Certificates" -> "Issuance of Income Certificate".',
      'Fill in applicant details, annual household income, and upload scanned supporting documents.',
      'Submit the application to generate an Application Identification Number (AIN).',
      'Track the AIN. Once approved by the BDO/SDO (usually within 7-15 working days), download the digitally signed certificate with QR code.'
    ],
    stepsBn: [
      'প্রথমে পঞ্চায়েত প্রধান বা মিউনিসিপ্যাল কাউন্সিলরের থেকে আয়ের শংসাপত্র সংগ্রহ করুন।',
      'edistrict.wb.gov.in পোর্টালে সিটিজেন লগইন করুন।',
      ' "Certificates" -> "Issuance of Income Certificate" বিকল্পে যান।',
      'আবেদনকারীর তথ্য, বাৎসরিক আয় লিখে প্রয়োজনীয় নথি আপলোড করুন।',
      'আবেদন জমা দিয়ে এআইএন (AIN) নম্বর সংগ্রহ করুন।',
      'বিডিও বা এসডিও অফিস থেকে মঞ্জুর হলে (সাধারণত ৭ থেকে ১৫ দিন) কিউআর কোডযুক্ত ডিজিটাল সার্টিফিকেট ডাউনলোড করুন।'
    ],
    stepsHi: [
      'पहले ग्राम प्रधान या पार्षद से आय सत्यापन पत्र प्राप्त करें।',
      'edistrict.wb.gov.in पर नागरिक लॉगिन करें।',
      '"Certificates" -> "Issuance of Income Certificate" पर जाएं।',
      'विवरण भरकर आवश्यक दस्तावेज अपलोड करें।',
      'आवेदन सबमिट कर एआईएन (AIN) नंबर सुरक्षित रखें।',
      'स्वीकृति मिलने पर (7-15 दिन) क्यूआर कोड वाला डिजिटल प्रमाण-पत्र डाउनलोड करें।'
    ],
    feesNoteEn: 'Nil (Free of cost on WB e-District Portal).',
    feesNoteBn: 'কোনো সরকারি ফি নেই। পোর্টালে আবেদন সম্পূর্ণ বিনামূল্যে।',
    feesNoteHi: 'शून्य (पोर्टल पर पूरी तरह निःशुल्क)।',
    warningsEn: 'The downloaded digital certificate does not require manual counter-signature; the QR code can be verified online.',
    warningsBn: 'ডিজিটাল সই ও কিউআর কোডযুক্ত সার্টিফিকেটে নতুন করে কারও দস্তখত লাগে না।',
    warningsHi: 'डिजिटल हस्ताक्षरित प्रमाण-पत्र पर किसी अतिरिक्त हस्ताक्षर की आवश्यकता नहीं होती।'
  },
  {
    id: 'bank-kyc-account-freeze-prevention',
    category: 'banking',
    titleEn: 'Periodic Bank KYC Updation to Prevent Account Freeze',
    titleBn: 'ব্যাঙ্ক অ্যাকাউন্ট বন্ধ হওয়া আটকাতে কেওয়াইসি (KYC) আপডেট পদ্ধতি',
    titleHi: 'बैंक खाता फ्रीज होने से बचाने हेतु समयबद्ध केवाईसी (KYC) अपडेट',
    departmentEn: 'Reserve Bank of India (RBI) Regulatory Framework',
    departmentBn: 'রিজার্ভ ব্যাঙ্ক অফ ইন্ডিয়া (RBI) নির্দেশিকা',
    departmentHi: 'भारतीय रिज़र्व बैंक (RBI) दिशा-निर्देश',
    officialUrl: 'https://www.rbi.org.in',
    verificationDate: '2026-01-10',
    summaryEn: 'Official compliance steps to update Officially Valid Documents (OVD) when a bank issues a re-KYC notice.',
    summaryBn: 'ব্যাঙ্ক থেকে কেওয়াইসি নোটিশ এলে অ্যাকাউন্ট সচল রাখতে সরকারি নিয়ম অনুযায়ী প্রয়োজনীয় নথি জমা দেওয়ার উপায়।',
    summaryHi: 'बैंक द्वारा जारी नोटिस के बाद खाता सक्रिय रखने के लिए आवश्यक दस्तावेज जमा करने की प्रक्रिया।',
    mandatoryDocsEn: ['PAN Card or Form 60', 'Officially Valid Document (Aadhaar / Voter ID / Passport)', 'Recent passport photograph', 'Passbook copy'],
    mandatoryDocsBn: ['প্যান কার্ড বা ফর্ম ৬০', 'স্বীকৃত পরিচয়পত্র (আধার / ভোটার কার্ড / পাসপোর্ট)', 'সাম্প্রতিক পাসপোর্ট ছবি', 'ব্যাঙ্ক পাসবইয়ের প্রথম পাতার জেরক্স'],
    mandatoryDocsHi: ['पैन कार्ड या फॉर्म 60', 'वैध पहचान पत्र (आधार / वोटर आईडी / पासपोर्ट)', 'हालिया पासपोर्ट फोटो', 'बैंक पासबुक की प्रति'],
    stepsEn: [
      'Check if there is any change in your registered address or legal status.',
      'If NO change in address: Many banks (SBI, PNB, etc.) permit a simple self-declaration via Netbanking, ATM, or email from registered address.',
      'If address or name has changed: Visit your home branch with original Aadhaar/Voter ID and PAN card.',
      'Submit the signed re-KYC form and collect an official stamped acknowledgement receipt.',
      'Wait 24 to 48 hours for confirmation SMS of KYC completion.'
    ],
    stepsBn: [
      'আপনার ঠিকানায় কোনো বদল হয়েছে কি না তা নিশ্চিত করুন।',
      'যদি কোনো বদল না থাকে: নেটব্যাঙ্কিং বা এটিএম-এ গিয়ে সাধারণ স্ব-ঘোষণা (Self-declaration) দিয়ে আপডেট করা সম্ভব।',
      'যদি নাম বা ঠিকানার পরিবর্তন হয়ে থাকে: মূল আধার, প্যান ও পাসপোর্ট ছবি নিয়ে নিজের ব্যাঙ্ক শাখায় যান।',
      'কেওয়াইসি ফর্ম পূরণ করে সই করুন এবং সিলমোহরযুক্ত প্রাপ্তিস্বীকার রসিদ নিন।',
      '২৪ থেকে ৪৮ ঘণ্টার মধ্যে মোবাইলে সফল আপডেটের এসএমএস নিশ্চিত করুন।'
    ],
    stepsHi: [
      'जांचें कि क्या आपके पते में कोई बदलाव हुआ है।',
      'यदि कोई बदलाव नहीं है: कई बैंक नेटबैंकिंग या एटीएम के जरिए स्व-घोषणा की सुविधा देते हैं।',
      'यदि पता बदला है: मूल आधार, पैन और फोटो लेकर अपनी बैंक शाखा में जाएं।',
      'हस्ताक्षरित फॉर्म जमा कर पावती रसीद अवश्य लें।',
      '24-48 घंटों में सफल सत्यापन का एसएमएस प्राप्त होगा।'
    ],
    feesNoteEn: 'Free of cost. Banks are prohibited by RBI from charging any fee for re-KYC.',
    feesNoteBn: 'সম্পূর্ণ বিনামূল্যে। কেওয়াইসির জন্য ব্যাঙ্ক কোনো চার্জ কাটতে পারে না।',
    feesNoteHi: 'पूर्णतः निःशुल्क। आरबीआई के अनुसार बैंक इसके लिए कोई शुल्क नहीं ले सकते।',
    warningsEn: 'Banks NEVER ask for your debit card PIN, CVV, or Netbanking password over phone calls, SMS links, or WhatsApp.',
    warningsBn: 'ব্যাঙ্ক কোনোদিন ফোনে পিন, ওটিপি বা পাসওয়ার্ড জানতে চায় না। কোনো লিঙ্কে ক্লিক করবেন না।',
    warningsHi: 'बैंक कभी भी फोन या व्हाट्सएप पर पिन, पासवर्ड या ओटीपी नहीं मांगते।'
  }
];

export function sanitizeAndValidateUrl(url: string): { isValid: boolean; sanitizedUrl: string; isOfficialGov: boolean } {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return { isValid: false, sanitizedUrl: '', isOfficialGov: false };
    }
    
    // Check if domain is trusted official
    const hostname = parsed.hostname.toLowerCase();
    const isOfficialGov = TRUSTED_GOV_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith(domain.startsWith('.') ? domain : '.' + domain)
    );

    return {
      isValid: true,
      sanitizedUrl: parsed.href,
      isOfficialGov
    };
  } catch {
    return { isValid: false, sanitizedUrl: '', isOfficialGov: false };
  }
}

export function filterSafeOfficialSources(sources: SourceCitation[]): SourceCitation[] {
  return sources.map(source => {
    const check = sanitizeAndValidateUrl(source.url);
    return {
      ...source,
      url: check.isValid ? check.sanitizedUrl : '#',
      is_official: check.isOfficialGov
    };
  });
}
