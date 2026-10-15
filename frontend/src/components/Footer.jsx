import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, PhoneCall, ShieldAlert, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FOOTER_TEXT = {
  en: {
    helplinesTitle: "Emergency & 24/7 Women's Helplines:",
    helplineNational: "National Women Helpline: 181 (India)",
    helplineMedical: "Emergency Medical: 112 (India / EU) / 911 (US)",
    helplineMental: "Mental Health Kiran: 1800-599-0019",
    brandDesc: "Empowering women to understand their symptoms in simple language, debunk PCOS myths, and prepare for confident, informed healthcare visits.",
    disclaimer: "Yajnaseni does not diagnose medical diseases or prescribe treatments. Always consult a qualified medical professional for personal clinical advice.",
    explore: "Explore",
    navHome: "Home",
    navAssess: "Understand Symptoms",
    navGuide: "PCOS Education Guide",
    navJournal: "My Health Journal",
    navFindCare: "Find Care & Clinics",
    trust: "Integrity & Safety",
    navAbout: "About Our Mission",
    navPrivacy: "Privacy Policy & Guest Mode",
    navResponsibleAi: "Responsible AI Principles",
    navFaq: "PCOS Frequently Asked Questions",
    sources: "Medical Sources",
    accessibilityNote: "Language accessibility: English, हिन्दी (Hindi), ಕನ್ನಡ (Kannada)."
  },
  hi: {
    helplinesTitle: "आपातकालीन और 24/7 महिला हेल्पलाइन:",
    helplineNational: "राष्ट्रीय महिला हेल्पलाइन: 181 (भारत)",
    helplineMedical: "आपातकालीन चिकित्सा: 112 (भारत) / 911 (यूएस)",
    helplineMental: "मानसिक स्वास्थ्य किरण: 1800-599-0019",
    brandDesc: "महिलाओं को अपने लक्षणों को सरल भाषा में समझने, पीसीओएस के मिथकों को दूर करने और आत्मविश्वास से डॉक्टर से मिलने के लिए सशक्त बनाना।",
    disclaimer: "याज्ञसेनी बीमारियों का निदान या उपचार नहीं करता है। व्यक्तिगत चिकित्सा सलाह के लिए हमेशा योग्य डॉक्टर से संपर्क करें।",
    explore: "मुख्य पृष्ठ",
    navHome: "होम",
    navAssess: "लक्षण समझें",
    navGuide: "PCOS संपूर्ण गाइड",
    navJournal: "माई हेल्थ जर्नल",
    navFindCare: "डॉक्टर व क्लीनिक खोजें",
    trust: "सुरक्षा एवं गोपनीयता",
    navAbout: "हमारे मिशन के बारे में",
    navPrivacy: "गोपनीयता नीति व गेस्ट मोड",
    navResponsibleAi: "जिम्मेदार AI सिद्धांत",
    navFaq: "PCOS सामान्य प्रश्नोत्तरी (FAQ)",
    sources: "प्रमाणित चिकित्सा स्रोत",
    accessibilityNote: "भाषा उपलब्धता: अंग्रेजी, हिन्दी, ಕನ್ನಡ (कन्नड़)।"
  },
  kn: {
    helplinesTitle: "ತುರ್ತು ಮತ್ತು 24/7 ಮಹಿಳಾ ಸಹಾಯವಾಣಿಗಳು:",
    helplineNational: "ರಾಷ್ಟ್ರೀಯ ಮಹಿಳಾ ಸಹಾಯವಾಣಿ: 181 (ಭಾರತ)",
    helplineMedical: "ತುರ್ತು ವೈದ್ಯಕೀಯ: 112 (ಭಾರತ) / 911",
    helplineMental: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಕಿರಣ್: 1800-599-0019",
    brandDesc: "ಮಹಿಳೆಯರು ತಮ್ಮ ಆರೋಗ್ಯ ಲಕ್ಷಣಗಳನ್ನು ಸರಳವಾಗಿ ತಿಳಿಯಲು ಮತ್ತು ಧೈರ್ಯದಿಂದ ವೈದ್ಯರನ್ನು ಕಾಣಲು ನೆರವಾಗುವುದು.",
    disclaimer: "ಯಜ್ಞಸೇನಿ ರೋಗನಿರ್ಣಯ ಅಥವಾ ಔಷಧಿ ಸೂಚಿಸುವುದಿಲ್ಲ. ವೈಯಕ್ತಿಕ ಸಲಹೆಗಾಗಿ ಯಾವಾಗಲೂ ಅರ್ಹ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    explore: "ಮುಖ್ಯ ವಿಭಾಗಗಳು",
    navHome: "ಮುಖಪುಟ",
    navAssess: "ಲಕ್ಷಣಗಳನ್ನು ತಿಳಿಯಿರಿ",
    navGuide: "PCOS ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶಿ",
    navJournal: "ಆರೋಗ್ಯ ಜರ್ನಲ್",
    navFindCare: "ವೈದ್ಯರು & ಕ್ಲಿನಿಕ್‌ಗಳು",
    trust: "ಸುರಕ್ಷತೆ ಮತ್ತು ಗೌಪ್ಯತೆ",
    navAbout: "ನಮ್ಮ ಧ್ಯೇಯದ ಬಗ್ಗೆ",
    navPrivacy: "ಗೌಪ್ಯತೆ ನೀತಿ ಮತ್ತು ಅನಾಮಧೇಯ ಮೋಡ್",
    navResponsibleAi: "ಜವಾಬ್ದಾರಿಯುತ AI ತತ್ವಗಳು",
    navFaq: "PCOS ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು (FAQ)",
    sources: "ವೈದ್ಯಕೀಯ ಆಕರಗಳು",
    accessibilityNote: "ಲಭ್ಯವಿರುವ ಭಾಷೆಗಳು: ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ಕನ್ನಡ."
  }
};

export default function Footer() {
  const { language, t } = useLanguage();
  const f = FOOTER_TEXT[language] || FOOTER_TEXT.en;

  return (
    <footer className="bg-[#18111A] text-slate-300 border-t border-plum-950/70 transition-colors">
      {/* Top Banner: Helplines */}
      <div className="bg-[#110B13] border-b border-plum-950/80 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-rose-300 font-semibold">
            <PhoneCall className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{f.helplinesTitle}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-300">
            <span><strong>{f.helplineNational}</strong></span>
            <span><strong>{f.helplineMedical}</strong></span>
            <span><strong>{f.helplineMental}</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#4A1E48] flex items-center justify-center text-white shadow-sm">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                {t('brandName')}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-4 max-w-sm leading-relaxed">
              {f.brandDesc}
            </p>
            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-xs text-rose-200/90 flex gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                {f.disclaimer}
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              {f.explore}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-lavender-400 transition-colors">
                  {f.navHome}
                </Link>
              </li>
              <li>
                <Link to="/assess" className="text-slate-400 hover:text-lavender-400 transition-colors">
                  {f.navAssess}
                </Link>
              </li>
              <li>
                <Link to="/pcos-guide" className="text-slate-400 hover:text-lavender-400 transition-colors">
                  {f.navGuide}
                </Link>
              </li>
              <li>
                <Link to="/journal" className="text-slate-400 hover:text-lavender-400 transition-colors">
                  {f.navJournal}
                </Link>
              </li>
              <li>
                <Link to="/find-care" className="text-slate-400 hover:text-lavender-400 transition-colors">
                  {f.navFindCare}
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & About */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              {f.trust}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-lavender-400 transition-colors">
                  {f.navAbout}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-lavender-400 transition-colors">
                  {f.navPrivacy}
                </Link>
              </li>
              <li>
                <Link to="/about#responsible-ai" className="text-slate-400 hover:text-lavender-400 transition-colors">
                  {f.navResponsibleAi}
                </Link>
              </li>
              <li>
                <Link to="/pcos-guide#faq" className="text-slate-400 hover:text-lavender-400 transition-colors">
                  {f.navFaq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Reputable Medical Sources */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              {f.sources}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lavender-400 transition-colors flex items-center gap-1.5"
                >
                  <span>World Health Organization (WHO)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lavender-400 transition-colors flex items-center gap-1.5"
                >
                  <span>NHS UK PCOS Guidelines</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2018/06/polycystic-ovary-syndrome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lavender-400 transition-colors flex items-center gap-1.5"
                >
                  <span>ACOG Practice Bulletin No. 194</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.monash.edu/medicine/mchri/pcos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lavender-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Monash International PCOS Guidelines</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t('footerCopyright')}</p>
          <p>{f.accessibilityNote}</p>
        </div>
      </div>
    </footer>
  );
}
