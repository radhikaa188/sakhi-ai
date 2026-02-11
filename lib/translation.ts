import { Language, TranslationStrings, LanguageOption } from "@/types";

// ============================================
// LANGUAGE OPTIONS
// ============================================

export const LANGUAGES: LanguageOption[] = [
  {
    code: "hindi",
    name: "Hindi",
    nativeName: "हिंदी",
    flag: "🇮🇳",
    speechCode: "hi-IN",
  },
  {
    code: "english",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    speechCode: "en-US",
  },
  {
    code: "tamil",
    name: "Tamil",
    nativeName: "தமிழ்",
    flag: "🇮🇳",
    speechCode: "ta-IN",
  },
];

// ============================================
// TRANSLATIONS
// ============================================

export const translations: Record<Language, TranslationStrings> = {
  hindi: {
    // Onboarding
    welcome: "स्वागत है",
    selectLanguage: "आप कौन सी भाषा बोलती हैं?",
    next: "आगे बढ़ें",
    back: "पीछे जाएं",
    submit: "भेजें",

    // Profile
    yourName: "आपका नाम",
    phoneNumber: "फोन नंबर",
    village: "गाँव / शहर",
    canYouRead: "क्या आप पढ़ सकती हैं?",
    yes: "हाँ",
    no: "नहीं",

    // Work preferences
    howManyHours: "आप दिन में कितने घंटे काम कर सकती हैं?",
    workType: "आप कैसा काम करना चाहती हैं?",
    fromHome: "घर से",
    goToWorkplace: "काम की जगह जाकर",
    both: "दोनों ठीक हैं",

    // Skills
    learnSkills: "नया हुनर सीखें",
    earnPerMonth: "महीने में कमाएं",
    startLearning: "सीखना शुरू करें",
    continue: "जारी रखें",
    completed: "पूरा हो गया",

    // Lessons
    step: "कदम",
    of: "में से",
    markComplete: "पूरा करें",
    nextStep: "अगला कदम",
    congratulations: "बधाई हो!",
    courseComplete: "आपने कोर्स पूरा कर लिया!",
    downloadCertificate: "सर्टिफिकेट डाउनलोड करें",

    // Jobs
    jobsNearYou: "आपके पास की नौकरियां",
    newJobs: "नई नौकरियां",
    perMonth: "प्रति महीना",
    hoursPerDay: "घंटे प्रतिदिन",
    viewDetails: "विवरण देखें",
    apply: "आवेदन करें",
    applied: "आवेदन भेज दिया",

    // Applications
    myApplications: "मेरे आवेदन",
    waiting: "प्रतीक्षा में",
    contacted: "संपर्क किया गया",
    hired: "नौकरी मिल गई",
    rejected: "अस्वीकार",

    // Common
    home: "होम",
    profile: "प्रोफाइल",
    notifications: "सूचनाएं",
    loading: "लोड हो रहा है...",
    error: "कुछ गलत हो गया",
    tryAgain: "फिर से कोशिश करें",
  },

  english: {
    // Onboarding
    welcome: "Welcome",
    selectLanguage: "Which language do you speak?",
    next: "Next",
    back: "Back",
    submit: "Submit",

    // Profile
    yourName: "Your Name",
    phoneNumber: "Phone Number",
    village: "Village / City",
    canYouRead: "Can you read text?",
    yes: "Yes",
    no: "No",

    // Work preferences
    howManyHours: "How many hours per day can you work?",
    workType: "What type of work do you want?",
    fromHome: "From Home",
    goToWorkplace: "Go to Workplace",
    both: "Both are OK",

    // Skills
    learnSkills: "Learn New Skills",
    earnPerMonth: "Earn per month",
    startLearning: "Start Learning",
    continue: "Continue",
    completed: "Completed",

    // Lessons
    step: "Step",
    of: "of",
    markComplete: "Mark Complete",
    nextStep: "Next Step",
    congratulations: "Congratulations!",
    courseComplete: "You completed the course!",
    downloadCertificate: "Download Certificate",

    // Jobs
    jobsNearYou: "Jobs Near You",
    newJobs: "New Jobs",
    perMonth: "per month",
    hoursPerDay: "hours per day",
    viewDetails: "View Details",
    apply: "Apply",
    applied: "Applied",

    // Applications
    myApplications: "My Applications",
    waiting: "Waiting",
    contacted: "Contacted",
    hired: "Hired",
    rejected: "Rejected",

    // Common
    home: "Home",
    profile: "Profile",
    notifications: "Notifications",
    loading: "Loading...",
    error: "Something went wrong",
    tryAgain: "Try Again",
  },

  tamil: {
    // Onboarding
    welcome: "வரவேற்கிறோம்",
    selectLanguage: "நீங்கள் எந்த மொழி பேசுகிறீர்கள்?",
    next: "அடுத்தது",
    back: "பின்னால்",
    submit: "சமர்ப்பிக்கவும்",

    // Profile
    yourName: "உங்கள் பெயர்",
    phoneNumber: "தொலைபேசி எண்",
    village: "கிராமம் / நகரம்",
    canYouRead: "நீங்கள் படிக்க முடியுமா?",
    yes: "ஆம்",
    no: "இல்லை",

    // Work preferences
    howManyHours: "நீங்கள் ஒரு நாளைக்கு எத்தனை மணி நேரம் வேலை செய்ய முடியும்?",
    workType: "நீங்கள் என்ன வகையான வேலை செய்ய விரும்புகிறீர்கள்?",
    fromHome: "வீட்டில் இருந்து",
    goToWorkplace: "பணியிடத்திற்கு செல்லவும்",
    both: "இரண்டும் சரி",

    // Skills
    learnSkills: "புதிய திறன்களைக் கற்றுக்கொள்ளுங்கள்",
    earnPerMonth: "மாதத்திற்கு சம்பாதிக்கவும்",
    startLearning: "கற்றலைத் தொடங்குங்கள்",
    continue: "தொடரவும்",
    completed: "முடிந்தது",

    // Lessons
    step: "படி",
    of: "இல்",
    markComplete: "முடித்ததாகக் குறிக்கவும்",
    nextStep: "அடுத்த படி",
    congratulations: "வாழ்த்துக்கள்!",
    courseComplete: "நீங்கள் பாடத்தை முடித்துவிட்டீர்கள்!",
    downloadCertificate: "சான்றிதழைப் பதிவிறக்கவும்",

    // Jobs
    jobsNearYou: "உங்களுக்கு அருகில் உள்ள வேலைகள்",
    newJobs: "புதிய வேலைகள்",
    perMonth: "மாதத்திற்கு",
    hoursPerDay: "ஒரு நாளைக்கு மணிநேரம்",
    viewDetails: "விவரங்களைக் காண்க",
    apply: "விண்ணப்பிக்கவும்",
    applied: "விண்ணப்பித்தது",

    // Applications
    myApplications: "எனது விண்ணப்பங்கள்",
    waiting: "காத்திருக்கிறது",
    contacted: "தொடர்பு கொண்டது",
    hired: "பணியமர்த்தப்பட்டது",
    rejected: "நிராகரிக்கப்பட்டது",

    // Common
    home: "முகப்பு",
    profile: "சுயவிவரம்",
    notifications: "அறிவிப்புகள்",
    loading: "ஏற்றுகிறது...",
    error: "ஏதோ தவறு நடந்தது",
    tryAgain: "மீண்டும் முயற்சிக்கவும்",
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTranslation(language: Language): TranslationStrings {
  return translations[language];
}

export function getLanguageOption(language: Language): LanguageOption {
  return LANGUAGES.find((lang) => lang.code === language) || LANGUAGES[0];
}

export function getSpeechCode(language: Language): string {
  return getLanguageOption(language).speechCode;
}