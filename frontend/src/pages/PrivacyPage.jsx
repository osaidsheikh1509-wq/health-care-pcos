import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Trash2,
  CheckCircle2,
  UserCheck,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const PRIVACY_TEXT = {
  en: {
    badge: 'Privacy & Confidentiality First',
    title: 'Your Intimate Health Data Stays Yours',
    subtitle: 'We believe women should explore their health without being tracked, profiled, or subjected to targeted behavioral advertisements.',
    c1Title: 'No Account Required',
    c1Desc: 'All symptom assessment tools and cycle tracking work in complete guest mode without requiring your name, phone number, or email address.',
    c2Title: 'Zero Advertising Pixels',
    c2Desc: 'We do not embed third-party advertising trackers, social media pixels, or commercial surveillance scripts on our platform.',
    c3Title: 'Secure Backend Processing',
    c3Desc: 'When AI or database lookups run, they occur exclusively through our secure, rate-limited backend. AI keys and private credentials are never exposed to the client browser.',
    principlesTitle: 'Data Handling Principles',
    p1Title: '1. Information You Provide Voluntarily',
    p1Desc: 'When you use our symptom assessment tool, the descriptions and categories you select are processed solely to return plain-language medical explanations and doctor preparation questions. In guest mode, this is associated with a random anonymous identifier and is never tied to your identity.',
    p2Title: '2. Optional User Accounts',
    p2Desc: 'If you choose to create an account to sync your journal across devices, your password is encrypted using high-security one-way hashing (bcrypt), and authenticated sessions are handled via secure, HTTP-only cookies.',
    p3Title: '3. Voice Recording Privacy',
    p3Desc: 'When using the voice-input microphone button, audio transcription is processed locally by your browser’s native Web Speech API. We do not store or transmit raw audio recordings to our servers.',
    controlsTitle: 'Your Data Controls',
    controlsSub: 'You can permanently purge all data stored in this browser with a single click:',
    clearBtn: 'Clear All Local Health Data from This Browser',
    confirmPrompt: 'Are you sure you want to delete all locally saved journal entries and assessment history from this browser?',
    clearedNotice: 'All local journal records and cached session identifiers have been cleared.'
  },
  hi: {
    badge: 'गोपनीयता और सुरक्षा सबसे पहले',
    title: 'आपका स्वास्थ्य डेटा पूरी तरह से आपका है',
    subtitle: 'हमारा मानना है कि महिलाओं को बिना किसी ट्रैकिंग, प्रोफाइलिंग या अवांछित विज्ञापनों के अपने स्वास्थ्य को समझने का अधिकार है।',
    c1Title: 'किसी खाते की आवश्यकता नहीं',
    c1Desc: 'सभी लक्षण जांच और पीरियड ट्रैकिंग टूल्स बिना नाम, फोन नंबर या ईमेल के पूर्ण गेस्ट मोड में काम करते हैं।',
    c2Title: 'कोई विज्ञापन ट्रैकर नहीं',
    c2Desc: 'हम अपनी वेबसाइट पर कोई भी तीसरे पक्ष का विज्ञापन ट्रैकर, सोशल मीडिया पिक्सल या व्यावसायिक ट्रैकिंग कोड नहीं लगाते।',
    c3Title: 'सुरक्षित बैकएंड प्रोसेसिंग',
    c3Desc: 'सभी AI व डेटा अनुरोध सुरक्षित बैकएंड सर्वर के माध्यम से होते हैं। API कीज कभी भी ब्राउज़र में उजागर नहीं होती हैं।',
    principlesTitle: 'डेटा प्रबंधन के सिद्धांत',
    p1Title: '1. आपकी स्वेच्छा से दी गई जानकारी',
    p1Desc: 'जब आप लक्षण जांच करती हैं, तो आपके द्वारा चुने गए विवरण केवल सरल चिकित्सीय जानकारी और डॉक्टर के प्रश्नों को तैयार करने के लिए उपयोग किए जाते हैं। यह किसी पहचान से नहीं जुड़ता।',
    p2Title: '2. वैकल्पिक उपयोगकर्ता खाता',
    p2Desc: 'यदि आप विभिन्न डिवाइसों में डेटा सिंक करने के लिए खाता बनाती हैं, तो पासवर्ड सुरक्षित एन्क्रिप्शन (bcrypt) से सुरक्षित रहता है और सत्र सुरक्षित कुकीज़ द्वारा प्रबंधित होते हैं।',
    p3Title: '3. वॉइस रिकॉर्डिंग गोपनीयता',
    p3Desc: 'माइक इनपुट का उपयोग करते समय, ट्रांसक्रिप्शन सीधे आपके ब्राउज़र में होता है। हम कोई भी ऑडियो रिकॉर्डिंग अपने सर्वर पर स्टोर नहीं करते।',
    controlsTitle: 'आपका डेटा नियंत्रण',
    controlsSub: 'आप एक क्लिक से इस ब्राउज़र में सहेजे गए सभी डेटा को स्थायी रूप से हटा सकती हैं:',
    clearBtn: 'इस ब्राउज़र से सभी स्थानीय स्वास्थ्य डेटा हटाएं',
    confirmPrompt: 'क्या आप इस ब्राउज़र से सभी सहेजे गए जर्नल रिकॉर्ड और इतिहास को स्थायी रूप से हटाना चाहती हैं?',
    clearedNotice: 'सभी स्थानीय जर्नल रिकॉर्ड और कैश्ड डेटा सफलतापूर्वक हटा दिए गए हैं।'
  },
  kn: {
    badge: 'ಗೌಪ್ಯತೆ ಮತ್ತು ರಕ್ಷಣೆ ಮೊದಲು',
    title: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿ ಸಂಪೂರ್ಣವಾಗಿ ನಿಮ್ಮದೇ',
    subtitle: 'ಯಾವುದೇ ಟ್ರ್ಯಾಕಿಂಗ್ ಅಥವಾ ಜಾಹೀರಾತುಗಳಿಲ್ಲದೆ ಮಹಿಳೆಯರು ತಮ್ಮ ಆರೋಗ್ಯವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಾವು ಶ್ರಮಿಸುತ್ತೇವೆ.',
    c1Title: 'ಖಾತೆ ತೆರೆಯುವ ಅಗತ್ಯವಿಲ್ಲ',
    c1Desc: 'ಎಲ್ಲಾ ಲಕ್ಷಣ ತಪಾಸಣೆ ಮತ್ತು ಮುಟ್ಟಿನ ಟ್ರ್ಯಾಕಿಂಗ್ ಪರಿಕರಗಳು ಹೆಸರು, ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಥವಾ ಇಮೇಲ್ ಇಲ್ಲದೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ.',
    c2Title: 'ಯಾವುದೇ ಜಾಹೀರಾತು ಟ್ರ್ಯಾಕರ್‌ಗಳಿಲ್ಲ',
    c2Desc: 'ನಾವು ಯಾವುದೇ ಮೂರನೇ ವ್ಯಕ್ತಿಯ ಜಾಹೀರಾತು ಟ್ರ್ಯಾಕರ್‌ಗಳು ಅಥವಾ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಪಿಕ್ಸೆಲ್‌ಗಳನ್ನು ಬಳಸುವುದಿಲ್ಲ.',
    c3Title: 'ಸುರಕ್ಷಿತ ಬ್ಯಾಕೆಂಡ್ ಪ್ರಕ್ರಿಯೆ',
    c3Desc: 'ಎಲ್ಲಾ AI ವಿಶ್ಲೇಷಣೆಗಳು ಸುರಕ್ಷಿತ ಸರ್ವರ್ ಮೂಲಕ ನಡೆಯುತ್ತವೆ. ರಹಸ್ಯ ಕೀಗಳು ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಬಹಿರಂಗವಾಗುವುದಿಲ್ಲ.',
    principlesTitle: 'ಡೇಟಾ ನಿರ್ವಹಣೆಯ ತತ್ವಗಳು',
    p1Title: '1. ನೀವು ಸ್ವಯಂಪ್ರೇರಿತರಾಗಿ ನೀಡುವ ಮಾಹಿತಿ',
    p1Desc: 'ನೀವು ನೀಡುವ ವಿವರಗಳನ್ನು ಕೇವಲ ಸುಲಭ ವಿವರಣೆ ಮತ್ತು ವೈದ್ಯರಿಗೆ ಕೇಳಬೇಕಾದ ಪ್ರಶ್ನೆಗಳನ್ನು ತಯಾರಿಸಲು ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ. ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಗುರುತಿಗೆ ಜೋಡಿಸಲಾಗುವುದಿಲ್ಲ.',
    p2Title: '2. ಐಚ್ಛಿಕ ಬಳಕೆದಾರ ಖಾತೆ',
    p2Desc: 'ನೀವು ಖಾತೆ ರಚಿಸಲು ಬಯಸಿದರೆ, ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಅತ್ಯುನ್ನತ bcrypt ಎನ್‌ಕ್ರಿಪ್ಶನ್ ಮೂಲಕ ಸುರಕ್ಷಿತವಾಗಿಡಲಾಗುತ್ತದೆ.',
    p3Title: '3. ಧ್ವನಿ ರೆಕಾರ್ಡಿಂಗ್ ಗೌಪ್ಯತೆ',
    p3Desc: 'ಮೈಕ್ ಬಳಸುವಾಗ ಧ್ವನಿಯು ಬ್ರೌಸರ್‌ನಲ್ಲೇ ಅಕ್ಷರ ರೂಪಕ್ಕೆ ಪರಿವರ್ತನೆಯಾಗುತ್ತದೆ. ಯಾವುದೇ ಆಡಿಯೋವನ್ನು ನಮ್ಮ ಸರ್ವರ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.',
    controlsTitle: 'ನಿಮ್ಮ ಡೇಟಾ ನಿಯಂತ್ರಣಗಳು',
    controlsSub: 'ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿರುವ ಎಲ್ಲಾ ಡೇಟಾವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಅಳಿಸಿಹಾಕಬಹುದು:',
    clearBtn: 'ಈ ಬ್ರೌಸರ್‌ನಿಂದ ಎಲ್ಲಾ ಸ್ಥಳೀಯ ಡೇಟಾವನ್ನು ಅಳಿಸಿ',
    confirmPrompt: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿರುವ ಎಲ್ಲಾ ದಾಖಲೆಗಳನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?',
    clearedNotice: 'ಎಲ್ಲಾ ಸ್ಥಳೀಯ ದಾಖಲೆಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ.'
  }
};

export default function PrivacyPage() {
  const { guestId, isAuthenticated, logout } = useAuth();
  const { language } = useLanguage();
  const [clearedMessage, setClearedMessage] = useState(false);
  const c = PRIVACY_TEXT[language] || PRIVACY_TEXT.en;

  const handleClearLocalData = () => {
    if (window.confirm(c.confirmPrompt)) {
      localStorage.removeItem('sakhi_journal');
      localStorage.removeItem('sakhi_guest_id');
      setClearedMessage(true);
      setTimeout(() => setClearedMessage(false), 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sakhiTeal-50 dark:bg-sakhiTeal-950/60 text-xs font-semibold text-sakhiTeal-700 dark:text-sakhiTeal-300 mb-3 border border-sakhiTeal-200 dark:border-sakhiTeal-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{c.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {c.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {c.subtitle}
        </p>
      </div>

      {/* Core Privacy Commitments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-lavender-100 dark:bg-lavender-950/60 text-lavender-600 dark:text-lavender-400 flex items-center justify-center mb-4">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
            {c.c1Title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {c.c1Desc}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-sakhiTeal-100 dark:bg-sakhiTeal-950/60 text-sakhiTeal-600 dark:text-sakhiTeal-400 flex items-center justify-center mb-4">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
            {c.c2Title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {c.c2Desc}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
            {c.c3Title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {c.c3Desc}
          </p>
        </div>
      </div>

      {/* Detailed Policy Sections */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {c.principlesTitle}
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">
              {c.p1Title}
            </h4>
            <p>
              {c.p1Desc}
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">
              {c.p2Title}
            </h4>
            <p>
              {c.p2Desc}
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">
              {c.p3Title}
            </h4>
            <p>
              {c.p3Desc}
            </p>
          </div>
        </div>

        {/* User Data Controls */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
            {c.controlsTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {c.controlsSub}
          </p>

          <button
            type="button"
            onClick={handleClearLocalData}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-semibold rounded-xl text-xs sm:text-sm border border-rose-200 dark:border-rose-900 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>{c.clearBtn}</span>
          </button>

          {clearedMessage && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{c.clearedNotice}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
