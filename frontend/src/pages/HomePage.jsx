import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Stethoscope,
  BookOpen,
  Calendar,
  Compass,
  ShieldCheck,
  Languages,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Clock,
  UserCheck,
  FileText,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { language, t } = useLanguage();

  const coreTopics = [
    {
      title: {
        en: 'Menstrual Rhythm & Variations',
        hi: 'मासिक धर्म चक्र और रक्तस्राव',
        kn: 'ಮುಟ್ಟಿನ ಕ್ರಮ ಮತ್ತು ಬದಲಾವಣೆಗಳು'
      },
      desc: {
        en: 'Understand what cycle length, flow intensity, and spotting mean without anxiety.',
        hi: 'चक्र की लंबाई, रक्तस्राव और बीच में धब्बे (spotting) का बिना घबराहट सही अर्थ जानें।',
        kn: 'ಮುಟ್ಟಿನ ದಿನಗಳು, ರಕ್ತಸ್ರಾವದ ಪ್ರಮಾಣ ಮತ್ತು ಬದಲಾವಣೆಗಳ ಅರ್ಥವನ್ನು ಅರಿಯಿರಿ.'
      },
      icon: '🩸',
      link: '/assess?category=menstrual_health',
      badge: { en: 'Menstrual Health', hi: 'मासिक धर्म स्वास्थ्य', kn: 'ಮುಟ್ಟಿನ ಆರೋಗ್ಯ' }
    },
    {
      title: {
        en: 'Irregular or Missed Cycles',
        hi: 'अनियमित या छूटे हुए पीरियड्स',
        kn: 'ಅನಿಯಮಿತ ಅಥವಾ ತಪ್ಪಿದ ಮುಟ್ಟು'
      },
      desc: {
        en: 'Learn about ovulatory cycles, hormonal communication, and reasons behind delays.',
        hi: 'ओव्यूलेशन, हार्मोनल संतुलन और पीरियड्स में देरी के विभिन्न कारणों को समझें।',
        kn: 'ಅಂಡೋತ್ಪತ್ತಿ ಚಕ್ರ ಮತ್ತು ಮುಟ್ಟು ವಿಳಂಬವಾಗಲು ಕಾರಣಗಳನ್ನು ತಿಳಿಯಿರಿ.'
      },
      icon: '🗓️',
      link: '/assess?category=irregular_periods',
      badge: { en: 'Ovulation & Timing', hi: 'ओव्यूलेशन व समय', kn: 'ಅಂಡೋತ್ಪತ್ತಿ ಸಮಯ' }
    },
    {
      title: {
        en: 'Hormonal Skin & Acne',
        hi: 'हार्मोनल त्वचा व मुंहासे',
        kn: 'ಹಾರ್ಮೋನ್ ಮೊಡವೆಗಳು ಮತ್ತು ಚರ್ಮ'
      },
      desc: {
        en: 'How androgen sensitivity and insulin levels influence chin breakouts and sebum.',
        hi: 'एंड्रोजन और इंसुलिन का जबड़े और ठुड्डी पर होने वाले मुंहासों से क्या संबंध है।',
        kn: 'ಆಂಡ್ರೋಜನ್ ಮತ್ತು ಇನ್ಸುಲಿನ್ ಮೊಡವೆಗಳಿಗೆ ಹೇಗೆ ಕಾರಣವಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.'
      },
      icon: '✨',
      link: '/assess?category=acne_skin',
      badge: { en: 'Dermatological', hi: 'त्वचा स्वास्थ्य', kn: 'ಚರ್ಮದ ಆರೋಗ್ಯ' }
    },
    {
      title: {
        en: 'Facial & Body Hair Changes',
        hi: 'चेहरे और शरीर के बालों में बदलाव',
        kn: 'ಮುಖ ಮತ್ತು ದೇಹದ ಕೂದಲಿನ ಬದಲಾವಣೆ'
      },
      desc: {
        en: 'Understanding hirsutism, follicle sensitivity, and evidence-based ways to address it.',
        hi: 'हर्सूटिज़्म (अनचाहे बाल), जड़ों की संवेदनशीलता और नियंत्रित करने के प्रमाणिक तरीके।',
        kn: 'ಹಿರ್ಸುಟಿಸಂ (ಅನಗತ್ಯ ಕೂದಲು) ಮತ್ತು ಅದನ್ನು ನಿಯಂತ್ರಿಸುವ ವೈಜ್ಞಾನಿಕ ಕ್ರಮಗಳು.'
      },
      icon: '🌿',
      link: '/assess?category=facial_body_hair',
      badge: { en: 'Endocrine Care', hi: 'एंडोक्राइन केयर', kn: 'ಹಾರ್ಮೋನ್ ಆರೈಕೆ' }
    },
    {
      title: {
        en: 'Scalp Hair Thinning',
        hi: 'सिर के बालों का पतला होना',
        kn: 'ತಲೆಯ ಕೂದಲು ಉದುರುವುದು'
      },
      desc: {
        en: 'Differentiating between iron deficiency, stress shedding, and hormonal hair shifts.',
        hi: 'आयरन की कमी, तनाव और हार्मोनल हेयर फॉल के बीच का फर्क समझें।',
        kn: 'ಕಬ್ಬಿಣಾಂಶ ಕೊರತೆ, ಒತ್ತಡ ಮತ್ತು ಹಾರ್ಮೋನ್ ಕೂದಲು ಉದುರುವಿಕೆಯ ವ್ಯತ್ಯಾಸ ತಿಳಿಯಿರಿ.'
      },
      icon: '💇‍♀️',
      link: '/assess?category=scalp_hair',
      badge: { en: 'Hair Health', hi: 'बालों का स्वास्थ्य', kn: 'ಕೂದಲ ಆರೋಗ್ಯ' }
    },
    {
      title: {
        en: 'Pelvic Discomfort & Heaviness',
        hi: 'पेल्विक दर्द और भारीपन',
        kn: 'ಕಿಬ್ಬೊಟ್ಟೆ ನೋವು ಮತ್ತು ಭಾರ'
      },
      desc: {
        en: 'Recognizing natural cycle cramping versus signs that warrant a gynecologist visit.',
        hi: 'मासिक धर्म की सामान्य ऐंठन और डॉक्टर को दिखाने योग्य लक्षणों में अंतर पहचानें।',
        kn: 'ಸಾಮಾನ್ಯ ಮುಟ್ಟಿನ ಸೆಳೆತ ಮತ್ತು ವೈದ್ಯರನ್ನು ಕಾಣಬೇಕಾದ ಲಕ್ಷಣಗಳನ್ನು ತಿಳಿಯಿರಿ.'
      },
      icon: '🌸',
      link: '/assess?category=pelvic_discomfort',
      badge: { en: 'Pelvic Wellness', hi: 'पेल्विक वेलनेस', kn: 'ಕಿಬ್ಬೊಟ್ಟೆ ಆರೋಗ್ಯ' }
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Figma Make Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-8">
        {/* Subtle warm ambient blush aura */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-rose-100/40 via-plum-100/20 to-transparent dark:from-plum-950/20 dark:via-plum-900/10 dark:to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Eyebrow, Editorial Serif Headline, Subtitle, CTA */}
            <div className="lg:col-span-7 text-left">
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEEF1] dark:bg-plum-950/80 border border-[#F9DFE6] dark:border-plum-800 text-[11px] sm:text-xs font-semibold text-[#9B4368] dark:text-blush-300 tracking-[0.14em] uppercase mb-6 shadow-xs">
                <Heart className="w-3.5 h-3.5 stroke-[2.2] fill-none" />
                <span>{t('heroEyebrow')}</span>
              </div>

              {/* Editorial Serif Two-Tone Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.12] mb-6">
                <span className="block font-serif font-bold text-[#2E132A] dark:text-white">
                  {t('heroTitleLine1')}{' '}
                  {t('heroTitleLine2')}
                </span>
                <span className="block font-serif italic font-normal text-[#9B4368] dark:text-blush-400 mt-1 sm:mt-2">
                  {t('heroTitleAccent')}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#645D63] dark:text-slate-300 max-w-xl mb-8 leading-relaxed font-normal">
                {t('heroSubtitleFigma')}
              </p>

              {/* Action CTA & Trust Badge */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
                <Link
                  to="/assess"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#4A1E48] hover:bg-[#381634] dark:bg-plum-800 dark:hover:bg-plum-700 text-white font-medium rounded-full shadow-lg shadow-purple-950/15 hover:shadow-xl hover:shadow-purple-950/20 transition-all text-base group"
                >
                  <span>{t('checkSymptomsCta')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#706870] dark:text-slate-400 font-medium">
                  <ShieldCheck className="w-5 h-5 text-[#9B4368] shrink-0" />
                  <div className="leading-tight">
                    <span>{t('noAccountNeeded')}</span>
                  </div>
                </div>
              </div>

              {/* Subtle Medical Notice */}
              <div className="p-3.5 bg-[#FAF4F7] dark:bg-plum-950/40 border border-[#F3E8EE] dark:border-plum-900/60 rounded-2xl text-xs text-[#706870] dark:text-slate-300 max-w-xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#9B4368] shrink-0 mt-0.5" />
                <span>
                  <strong>Medical Notice:</strong> {t('homeDisclaimerText')}
                </span>
              </div>
            </div>

            {/* Right Column: Layered Graphic with Arched Card & Floating Badges */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-6 sm:py-10">
              {/* Concentric rings & sparkle accents */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-rose-200/50 dark:border-plum-800/40 bg-gradient-to-tr from-rose-100/30 via-plum-100/20 to-pink-50/10 dark:from-plum-950/30 dark:via-plum-900/10 dark:to-transparent" />
                <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full border border-rose-200/40 dark:border-plum-800/30" />
                <div className="absolute top-4 right-6 text-[#9B4368]/70 text-lg select-none">✦</div>
                <div className="absolute bottom-6 left-4 text-[#9B4368]/50 text-base select-none">✦</div>
              </div>

              {/* Floating Badge 1: Top-Left "Safe space" */}
              <div className="absolute top-2 -left-2 sm:left-2 z-20 bg-white/95 dark:bg-[#1C151D]/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-md shadow-purple-950/5 border border-[#F3E8EE] dark:border-plum-800/60 flex items-center gap-3 max-w-[210px] animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-[#FCEEF1] dark:bg-plum-900/60 text-[#9B4368] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="font-semibold text-xs text-[#2E132A] dark:text-white">{t('safeSpaceTitle')}</div>
                  <div className="text-[11px] text-[#706870] dark:text-slate-400 mt-0.5">{t('safeSpaceDesc')}</div>
                </div>
              </div>

              {/* Center Main Arch Card */}
              <div className="relative z-10 w-[240px] sm:w-[270px] rounded-t-[90px] rounded-b-3xl bg-white/95 dark:bg-[#1C151D]/95 backdrop-blur-md border border-[#F3E8EE] dark:border-plum-800/60 shadow-xl shadow-purple-950/8 p-8 pt-10 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#FCEEF1] dark:bg-plum-900/60 text-[#9B4368] dark:text-blush-400 flex items-center justify-center mb-6 shadow-xs">
                  <Heart className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2E132A] dark:text-white leading-snug mb-2">
                  {t('bodyTellsStory')}
                </h3>
                <p className="text-xs text-[#706870] dark:text-slate-400 leading-relaxed mb-6 max-w-[180px]">
                  {t('piecesTogether')}
                </p>
                <div className="flex items-center gap-1.5 pt-2">
                  <div className="w-4 h-1.5 rounded-full bg-[#F3E8EE] dark:bg-plum-900" />
                  <div className="w-8 h-1.5 rounded-full bg-[#9B4368] dark:bg-blush-500" />
                  <div className="w-4 h-1.5 rounded-full bg-[#F3E8EE] dark:bg-plum-900" />
                </div>
              </div>

              {/* Floating Badge 2: Bottom-Right "About 3 minutes" */}
              <div className="absolute -bottom-2 right-0 sm:right-2 z-20 bg-white/95 dark:bg-[#1C151D]/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-md shadow-purple-950/5 border border-[#F3E8EE] dark:border-plum-800/60 flex items-center gap-3 max-w-[210px] animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-[#FCEEF1] dark:bg-plum-900/60 text-[#9B4368] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="font-semibold text-xs text-[#2E132A] dark:text-white">{t('about3Minutes')}</div>
                  <div className="text-[11px] text-[#706870] dark:text-slate-400 mt-0.5">{t('simpleQuestions')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Figma Make Three-Pillar Feature Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#1C151D] rounded-[28px] border border-[#F3E8EE] dark:border-plum-900 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#F3E8EE] dark:divide-plum-900">
            {/* Pillar 1 */}
            <div className="flex items-center gap-4 pt-4 md:pt-0 first:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#FDF2F4] dark:bg-plum-900/60 text-[#9B4368] dark:text-blush-400 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#2E132A] dark:text-white">
                  {t('pillar1Title')}
                </h4>
                <p className="text-xs sm:text-sm text-[#706870] dark:text-slate-400 mt-0.5">
                  {t('pillar1Desc')}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:pl-8">
              <div className="w-12 h-12 rounded-full bg-[#FDF2F4] dark:bg-plum-900/60 text-[#9B4368] dark:text-blush-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#2E132A] dark:text-white">
                  {t('pillar2Title')}
                </h4>
                <p className="text-xs sm:text-sm text-[#706870] dark:text-slate-400 mt-0.5">
                  {t('pillar2Desc')}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:pl-8">
              <div className="w-12 h-12 rounded-full bg-[#FDF2F4] dark:bg-plum-900/60 text-[#9B4368] dark:text-blush-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#2E132A] dark:text-white">
                  {t('pillar3Title')}
                </h4>
                <p className="text-xs sm:text-sm text-[#706870] dark:text-slate-400 mt-0.5">
                  {t('pillar3Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Figma Make "How Yajnaseni Works" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#9B4368] dark:text-blush-400 block mb-2">
            {t('howWorksEyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#2E132A] dark:text-white tracking-tight">
            {t('clarityStepsTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 1 Card */}
          <div className="relative bg-white dark:bg-[#1C151D] rounded-[28px] p-7 sm:p-8 border border-[#F3E8EE] dark:border-plum-900 shadow-xs flex flex-col justify-between overflow-hidden">
            <span className="absolute top-5 right-6 text-4xl sm:text-5xl font-serif font-bold text-rose-200/70 dark:text-plum-900 select-none">
              01
            </span>
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FDF2F4] dark:bg-plum-900/60 flex items-center justify-center text-[#9B4368] dark:text-blush-400 mb-6">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#2E132A] dark:text-white mb-2">
                {t('step1TitleFigma')}
              </h3>
              <p className="text-sm text-[#645D63] dark:text-slate-400 leading-relaxed">
                {t('step1DescFigma')}
              </p>
            </div>
          </div>

          {/* Step 2 Card */}
          <div className="relative bg-white dark:bg-[#1C151D] rounded-[28px] p-7 sm:p-8 border border-[#F3E8EE] dark:border-plum-900 shadow-xs flex flex-col justify-between overflow-hidden">
            <span className="absolute top-5 right-6 text-4xl sm:text-5xl font-serif font-bold text-rose-200/70 dark:text-plum-900 select-none">
              02
            </span>
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FDF2F4] dark:bg-plum-900/60 flex items-center justify-center text-[#9B4368] dark:text-blush-400 mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#2E132A] dark:text-white mb-2">
                {t('step2TitleFigma')}
              </h3>
              <p className="text-sm text-[#645D63] dark:text-slate-400 leading-relaxed">
                {t('step2DescFigma')}
              </p>
            </div>
          </div>

          {/* Step 3 Card */}
          <div className="relative bg-white dark:bg-[#1C151D] rounded-[28px] p-7 sm:p-8 border border-[#F3E8EE] dark:border-plum-900 shadow-xs flex flex-col justify-between overflow-hidden">
            <span className="absolute top-5 right-6 text-4xl sm:text-5xl font-serif font-bold text-rose-200/70 dark:text-plum-900 select-none">
              03
            </span>
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FDF2F4] dark:bg-plum-900/60 flex items-center justify-center text-[#9B4368] dark:text-blush-400 mb-6">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#2E132A] dark:text-white mb-2">
                {t('step3TitleFigma')}
              </h3>
              <p className="text-sm text-[#645D63] dark:text-slate-400 leading-relaxed">
                {t('step3DescFigma')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Women's Health Topics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#9B4368] dark:text-blush-400 block mb-2">
            Common Themes
          </span>
          <p className="text-3xl sm:text-4xl font-serif font-bold text-[#2E132A] dark:text-white">
            {t('exploreCategoriesTitle')}
          </p>
          <p className="text-[#645D63] dark:text-slate-400 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
            {t('exploreCategoriesSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreTopics.map((topic, idx) => (
            <Link
              key={idx}
              to={topic.link}
              className="group bg-white dark:bg-[#1C151D] rounded-[28px] p-6 sm:p-7 border border-[#F3E8EE] dark:border-plum-900 shadow-xs hover:shadow-md hover:border-plum-300 dark:hover:border-plum-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{topic.icon}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FDF2F4] dark:bg-plum-950/80 text-[#9B4368] dark:text-blush-300">
                    {topic.badge[language] || topic.badge.en}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#2E132A] dark:text-white group-hover:text-[#4A1E48] dark:group-hover:text-blush-300 transition-colors mb-2">
                  {topic.title[language] || topic.title.en}
                </h3>
                <p className="text-sm text-[#645D63] dark:text-slate-400 leading-relaxed">
                  {topic.desc[language] || topic.desc.en}
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-[#9B4368] dark:text-blush-400 group-hover:translate-x-1 transition-transform gap-1">
                <span>{t('startAssessment')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Understanding PCOS Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#381634] via-[#4A1E48] to-[#230B20] text-white rounded-[32px] p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-rose-200 inline-block mb-4">
              PCOS Demystified
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 leading-tight">
              {t('pcosBannerTitle')}
            </h2>
            <p className="text-rose-100/90 text-base sm:text-lg mb-8 leading-relaxed">
              {t('pcosBannerDesc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-300" />
                  {t('rotterdamHighlightTitle')}
                </h4>
                <p className="text-xs text-rose-100/80">
                  {t('rotterdamHighlightDesc')}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-300" />
                  {t('multisystemTitle')}
                </h4>
                <p className="text-xs text-rose-100/80">
                  {t('multisystemDesc')}
                </p>
              </div>
            </div>

            <Link
              to="/pcos-guide"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#4A1E48] hover:bg-rose-50 font-semibold rounded-full text-sm transition-all shadow-md"
            >
              <span>{t('readFullPcosGuide')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Language Accessibility & Privacy Featurettes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#1C151D] p-8 rounded-[28px] border border-[#F3E8EE] dark:border-plum-900 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FDF2F4] dark:bg-plum-900/60 text-[#9B4368] dark:text-blush-400 flex items-center justify-center mb-6">
                <Languages className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2E132A] dark:text-white mb-3">
                {t('langBarrierTitle')}
              </h3>
              <p className="text-sm text-[#645D63] dark:text-slate-400 leading-relaxed mb-4">
                {t('langBarrierDesc')}
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1 bg-[#FDF2F4] dark:bg-plum-950 text-[#9B4368] dark:text-blush-300 rounded-full">English</span>
                <span className="px-3 py-1 bg-[#FDF2F4] dark:bg-plum-950 text-[#9B4368] dark:text-blush-300 rounded-full">हिन्दी</span>
                <span className="px-3 py-1 bg-[#FDF2F4] dark:bg-plum-950 text-[#9B4368] dark:text-blush-300 rounded-full">ಕನ್ನಡ</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1C151D] p-8 rounded-[28px] border border-[#F3E8EE] dark:border-plum-900 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FDF2F4] dark:bg-plum-900/60 text-[#9B4368] dark:text-blush-400 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2E132A] dark:text-white mb-3">
                {t('privacyGuaranteeTitle')}
              </h3>
              <p className="text-sm text-[#645D63] dark:text-slate-400 leading-relaxed mb-4">
                {t('privacyGuaranteeDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-12 rounded-[32px] bg-[#FAF4F7] dark:bg-[#1C151D] border border-[#F3E8EE] dark:border-plum-900">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E132A] dark:text-white mb-3">
            {t('readyToUnderstand')}
          </h3>
          <p className="text-sm sm:text-base text-[#645D63] dark:text-slate-400 max-w-xl mx-auto mb-6">
            {t('readyToUnderstandSub')}
          </p>
          <Link
            to="/assess"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#4A1E48] hover:bg-[#381634] dark:bg-plum-800 dark:hover:bg-plum-700 text-white font-medium rounded-full shadow-md transition-all text-sm"
          >
            <span>{t('checkSymptomsCta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
