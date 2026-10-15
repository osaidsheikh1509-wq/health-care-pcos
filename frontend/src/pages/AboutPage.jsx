import React from 'react';
import {
  Heart,
  ShieldCheck,
  Languages,
  Sparkles,
  Users,
  AlertCircle,
  FileCheck2,
  Lock,
  Stethoscope
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const ABOUT_TEXT = {
  en: {
    badge: 'Our Story & Mission',
    title: 'Dignified, Jargon-Free Healthcare for Every Woman',
    subtitle: 'Yajnaseni was built to solve a pervasive problem: millions of women endure confusing, distressing physical symptoms in silence because of shame, medical terminology barriers, and regional language gaps.',
    whyTitle: 'Why "Yajnaseni"?',
    whyP1: 'In Indian heritage and epic tradition, "Yajnaseni" (याज्ञसेनी) represents female resilience, fire-born dignity, courage, and unapologetic self-advocacy. A true symbol of inner strength, Yajnaseni stands for speaking up without hesitation, fear, or shame.',
    whyP2: 'When women encounter skipped periods, sudden facial hair, or cystic jawline acne, standard search engines often return terrifying, contradictory, or alarming results. Many women visit clinics feeling intimidated by high-speed medical jargon, unable to formulate their questions or describe what they feel in clinical terms.',
    whyP3: 'Yajnaseni bridges this divide: converting everyday symptom descriptions into structured, plain-language insights and preparing women for confident, informed conversations with their doctors.',
    ethicsBadge: 'Ethics & Safety',
    principlesTitle: 'Our Responsible AI Principles',
    principlesSubtitle: 'How we engineer AI to protect user dignity, prevent medical hallucination, and safeguard wellbeing:',
    p1Title: '1. Non-Diagnostic Guardrails',
    p1Desc: 'Our AI is strictly instructed to never output a definitive medical diagnosis. It frames physiological phenomena as possibilities to discuss with a clinician.',
    p2Title: '2. Clinical Fallback Matrix',
    p2Desc: 'If an AI service is unreachable, a peer-reviewed rule-based decision matrix immediately delivers verified guidance. Users are never left stranded with errors.',
    p3Title: '3. Regional Language Equity',
    p3Desc: 'We treat English, Hindi, and Kannada as first-class citizens, ensuring culturally respectful, accurate phrasing in both written and voice modes.',
    p4Title: '4. Anonymous-by-Design Privacy',
    p4Desc: 'We do not require account registration or collect identifying tracking pixels. Data minimization is strictly enforced.',
    noticeTitle: 'Important Healthcare Notice:',
    noticeDesc: 'Yajnaseni is an educational guidance system. It is not a medical device and cannot diagnose illnesses, prescribe medication, or formulate treatment protocols. If you are experiencing severe pain, heavy hemorrhaging, or an acute health crisis, please consult emergency services (112 / 911 / 181) or visit an urgent care facility immediately.'
  },
  hi: {
    badge: 'हमारी कहानी और मिशन',
    title: 'हर महिला के लिए सम्मानजनक और सरल स्वास्थ्य मार्गदर्शन',
    subtitle: 'याज्ञसेनी का निर्माण एक बड़ी समस्या के समाधान के लिए किया गया: लाखों महिलाएं संकोच, जटिल मेडिकल भाषा और भाषाई सीमाओं के कारण चुपचाप शारीरिक कष्ट सहती हैं।',
    whyTitle: '"याज्ञसेनी" नाम क्यों?',
    whyP1: 'भारतीय परंपरा और इतिहास में "याज्ञसेनी" (याज्ञसेनी) नारी शक्ति, आत्मसम्मान, दृढ़ता और साहस का प्रतीक हैं। यह नाम महिलाओं को बिना किसी डर, संकोच या शर्म के अपने स्वास्थ्य के लिए आवाज उठाने की प्रेरणा देता है।',
    whyP2: 'जब महिलाओं को अनियमित पीरियड्स, चेहरे पर अनचाहे बाल या मुंहासे जैसी समस्याएं होती हैं, तो इंटरनेट पर डरावनी या भ्रामक जानकारियां मिलती हैं। डॉक्टर के पास जाने पर भी कई बार महिलाएं मेडिकल शब्दों को समझ नहीं पातीं।',
    whyP3: 'याज्ञसेनी इस दूरी को पाटता है: आपके दैनिक लक्षणों को सरल भाषा में समझाता है और डॉक्टर से आत्मविश्वास से बात करने में मदद करता है।',
    ethicsBadge: 'नैतिकता और सुरक्षा',
    principlesTitle: 'हमारे जिम्मेदार AI सिद्धांत',
    principlesSubtitle: 'हम AI को कैसे तैयार करते हैं ताकि गरिमा की रक्षा हो और गलत मेडिकल जानकारी न फैले:',
    p1Title: '1. गैर-नैदानिक सुरक्षा (Non-Diagnostic)',
    p1Desc: 'हमारा AI कभी भी पक्का रोगनिदान नहीं देता। यह केवल संभावित कारणों को डॉक्टर से चर्चा के लिए प्रस्तुत करता है।',
    p2Title: '2. क्लिनिकल फॉलबैक मैट्रिक्स',
    p2Desc: 'यदि AI सर्वर अनुपलब्ध हो, तो हमारा सत्यापित क्लिनिकल निर्णय मैट्रिक्स तुरंत सुरक्षित मार्गदर्शन प्रदान करता है।',
    p3Title: '3. क्षेत्रीय भाषा समानता',
    p3Desc: 'हिंदी, कन्नड़ और अंग्रेजी को समान दर्जा दिया गया है, ताकि हर महिला अपनी मातृभाषा में स्वास्थ्य समझ सके।',
    p4Title: '4. पूर्णतः अनाम गोपनीयता',
    p4Desc: 'बिना अकाउंट या ईमेल के उपयोग संभव है। आपका कोई भी व्यक्तिगत डेटा विज्ञापनों के लिए नहीं लिया जाता।',
    noticeTitle: 'महत्वपूर्ण स्वास्थ्य सूचना:',
    noticeDesc: 'याज्ञसेनी केवल एक शैक्षिक मार्गदर्शन प्रणाली है। यह किसी बीमारी का निदान या दवा की सिफारिश नहीं करता है। गंभीर दर्द या आपात स्थिति में तुरंत नजदीकी अस्पताल या आपातकालीन सेवा (112 / 181) से संपर्क करें।'
  },
  kn: {
    badge: 'ನಮ್ಮ ಕಥೆ ಮತ್ತು ಧ್ಯೇಯ',
    title: 'ಪ್ರತಿಯೊಬ್ಬ ಮಹಿಳೆಗೂ ಗೌರವಯುತ, ಸರಳ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ',
    subtitle: 'ಯಜ್ಞಸೇನಿ ಮಹಿಳೆಯರ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳನ್ನು ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಅರ್ಥೈಸಲು ಮತ್ತು ವೈದ್ಯರ ಬಳಿಗೆ ಹೋಗಲು ಧೈರ್ಯ ತುಂಬಲು ನಿರ್ಮಿಸಲಾಗಿದೆ.',
    whyTitle: '"ಯಜ್ಞಸೇನಿ" ಏಕೆ?',
    whyP1: 'ಭಾರತೀಯ ಇತಿಹಾಸ ಮತ್ತು ಪರಂಪರೆಯಲ್ಲಿ "ಯಜ್ಞಸೇನಿ" ಮಹಿಳೆಯರ ಆತ್ಮಸ್ಥೈರ್ಯ, ಸ್ವಾಭಿಮಾನ, ಮತ್ತು ಧೈರ್ಯದ ಸಂಕೇತ. ಯಾವುದೇ ಸಂಕೋಚವಿಲ್ಲದೆ ತಮ್ಮ ಆರೋಗ್ಯದ ಹಕ್ಕುಗಳಿಗಾಗಿ ಧೈರ್ಯದಿಂದ ಮಾತನಾಡಲು ಇದು ಸ್ಫೂರ್ತಿ ನೀಡುತ್ತದೆ.',
    whyP2: 'ಮುಟ್ಟಿನ ಏರುಪೇರು, ಅತಿಯಾದ ಮೊಡವೆ ಅಥವಾ ಮುಖದ ಮೇಲಿನ ಕೂದಲಿನ ಬಗ್ಗೆ ಗೂಗಲ್ ಮಾಡಿದಾಗ ಭಯಾನಕ ತಪ್ಪು ಮಾಹಿತಿ ಸಿಗುತ್ತದೆ. ವೈದ್ಯರ ಭೇಟಿಗೆ ಮುನ್ನ ಸರಿಯಾದ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಲು ಮಹಿಳೆಯರಿಗೆ ಕಷ್ಟವಾಗುತ್ತದೆ.',
    whyP3: 'ಯಜ್ಞಸೇನಿ ಇದನ್ನು ಸರಳಗೊಳಿಸುತ್ತದೆ: ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಿ, ವೈದ್ಯರೊಂದಿಗೆ ಧೈರ್ಯವಾಗಿ ಮಾತನಾಡಲು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.',
    ethicsBadge: 'ನೈತಿಕತೆ ಮತ್ತು ಸುರಕ್ಷತೆ',
    principlesTitle: 'ನಮ್ಮ ಜವಾಬ್ದಾರಿಯುತ AI ತತ್ವಗಳು',
    principlesSubtitle: 'ಮಹಿಳೆಯರ ಗೌರವ ಮತ್ತು ಸುರಕ್ಷತೆಯನ್ನು ಕಾಪಾಡುವ ನಮ್ಮ ಎಐ ನಿಯಮಗಳು:',
    p1Title: '1. ರೋಗನಿರ್ಣಯವಿಲ್ಲದ ಸುರಕ್ಷತೆ',
    p1Desc: 'ನಮ್ಮ AI ನೇರ ರೋಗನಿರ್ಣಯ ಮಾಡುವುದಿಲ್ಲ. ಕೇವಲ ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸಬಹುದಾದ ಸಾಧ್ಯತೆಗಳನ್ನು ತಿಳಿಸುತ್ತದೆ.',
    p2Title: '2. ಕ್ಲಿನಿಕಲ್ ಫಾಲ್‌ಬ್ಯಾಕ್ ವ್ಯವಸ್ಥೆ',
    p2Desc: 'ಇಂಟರ್ನೆಟ್ ಅಥವಾ ಎಐ ನಿಧಾನವಾದರೂ ಪ್ರಮಾಣೀಕೃತ ನಿಯಮಾವಳಿಗಳ ಮೂಲಕ ತಕ್ಷಣ ನಿಖರ ಮಾಹಿತಿ ನೀಡಲಾಗುತ್ತದೆ.',
    p3Title: '3. ಪ್ರಾದೇಶಿಕ ಭಾಷಾ ಸಮಾನತೆ',
    p3Desc: 'ಕನ್ನಡ, ಹಿಂದಿ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಭಾಷೆಗಳಿಗೆ ಸಮಾನ ಆದ್ಯತೆ ನೀಡಿ ತಾಯ್ನುಡಿಯಲ್ಲೇ ಮಾಹಿತಿ ನೀಡಲಾಗುತ್ತದೆ.',
    p4Title: '4. ಅನಾಮಧೇಯ ಗೌಪ್ಯತೆ',
    p4Desc: 'ಖಾತೆ ತೆರೆಯುವ ಅಥವಾ ಮೊಬೈಲ್ ನಂಬರ್ ನೀಡುವ ಅಗತ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ಮಾಹಿತಿ ಸಂಪೂರ್ಣ ರಕ್ಷಿತ.',
    noticeTitle: 'ಮುಖ್ಯ ಆರೋಗ್ಯ ಸೂಚನೆ:',
    noticeDesc: 'ಯಜ್ಞಸೇನಿ ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ. ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ ಅಥವಾ ಚಿಕಿತ್ಸೆಯಲ್ಲ. ತುರ್ತು ಸಂದರ್ಭಗಳಲ್ಲಿ ತಕ್ಷಣ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಅಥವಾ ತುರ್ತು ಸಂಖ್ಯೆ (112 / 181) ಯನ್ನು ಸಂಪರ್ಕಿಸಿ.'
  }
};

export default function AboutPage() {
  const { language } = useLanguage();
  const c = ABOUT_TEXT[language] || ABOUT_TEXT.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-50 dark:bg-lavender-950/60 text-xs font-semibold text-lavender-700 dark:text-lavender-300 mb-3 border border-lavender-200 dark:border-lavender-800">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>{c.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {c.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {c.subtitle}
        </p>
      </div>

      {/* The Problem We Address */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {c.whyTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {c.whyP1}
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {c.whyP2}
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {c.whyP3}
        </p>
      </div>

      {/* Responsible AI Framework */}
      <div id="responsible-ai" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-lavender-600 dark:text-lavender-400 uppercase tracking-widest block mb-1">
            {c.ethicsBadge}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {c.principlesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {c.principlesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {c.p1Title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {c.p1Desc}
            </p>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-teal-500" />
              {c.p2Title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {c.p2Desc}
            </p>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
              <Languages className="w-4 h-4 text-indigo-500" />
              {c.p3Title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {c.p3Desc}
            </p>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-500" />
              {c.p4Title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {c.p4Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Prominent Medical Notice */}
      <div className="p-6 bg-amber-50/90 dark:bg-amber-950/40 rounded-3xl border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-1">{c.noticeTitle}</strong>
          {c.noticeDesc}
        </div>
      </div>
    </div>
  );
}
