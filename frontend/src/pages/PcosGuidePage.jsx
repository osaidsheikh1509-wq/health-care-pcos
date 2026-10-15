import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  Heart,
  Sparkles,
  Apple,
  Dumbbell,
  Moon,
  ListChecks,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TextToSpeechButton from '../components/TextToSpeechButton';
import DiagnosticHierarchy from '../components/DiagnosticHierarchy';

export default function PcosGuidePage() {
  const { language, t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const faqs = [
    {
      q: language === 'hi'
        ? 'क्या PCOS होने का मतलब है कि मैं कभी मां नहीं बन सकती?'
        : language === 'kn'
        ? 'PCOS ಇದ್ದರೆ ಗರ್ಭಧರಿಸಲು ಸಾಧ್ಯವಿಲ್ಲವೇ?'
        : 'Does having PCOS mean I cannot get pregnant?',
      a: language === 'hi'
        ? 'बिल्कुल नहीं। अनियमित ओव्यूलेशन के कारण थोड़ा समय लग सकता है, लेकिन जीवनशैली में सुधार और डॉक्टर की देखरेख में साधारण दवाओं से अधिकांश महिलाएं प्राकृतिक रूप से मां बन सकती हैं।'
        : language === 'kn'
        ? 'ಇಲ್ಲ. ಜೀವನಶೈಲಿಯ ಬದಲಾವಣೆ ಮತ್ತು ವೈದ್ಯರ ಮಾರ್ಗದರ್ಶನದ ಮೂಲಕ ಹೆಚ್ಚಿನ ಮಹಿಳೆಯರು ಸುಲಭವಾಗಿ ಗರ್ಭಧರಿಸಬಹುದು.'
        : 'No. While irregular ovulation can make conceiving take longer or require planning, the vast majority of women with PCOS can become pregnant naturally through cycle-regulating lifestyle modifications, or with simple oral ovulatory medications (such as letrozole) under a gynecologist’s guidance.'
    },
    {
      q: language === 'hi'
        ? 'क्या PCOS के लिए अंडाशय में सिस्ट होना अनिवार्य है?'
        : language === 'kn'
        ? 'PCOS ಇರಲು ಅಂಡಾಶಯದಲ್ಲಿ ನೀರಿನ ಗುಳ್ಳೆಗಳು (cysts) ಇರಲೇಬೇಕೇ?'
        : 'Do I have to have cysts on my ovaries to be diagnosed with PCOS?',
      a: language === 'hi'
        ? 'नहीं। नाम में "Polycystic" होने के बावजूद, ये वास्तव में अपरिपक्व फॉलिकल्स (अंडे की छोटी थैलियां) होते हैं, कोई हानिकारक सिस्ट नहीं। रोटरडैम नियमों के अनुसार, यदि आपके पीरियड्स अनियमित हैं और एंड्रोजन अधिक है, तो बिना सिस्ट के भी PCOS हो सकता है।'
        : language === 'kn'
        ? 'ಇಲ್ಲ. ಇವು ಕೇವಲ ಸಣ್ಣ ಅಪಕ್ವ ಕೋಶಗಳಾಗಿರುತ್ತವೆ. ಕನಿಷ್ಠ 2 ಲಕ್ಷಣಗಳಿದ್ದರೆ ಸ್ಕ್ಯಾನ್ ಇಲ್ಲದೆಯೂ ರೋಗನಿರ್ಣಯ ಮಾಡಬಹುದು.'
        : 'No. Despite the name "Polycystic", the fluid-filled structures are actually immature follicles (small egg sacs), not hazardous cysts. Under the Rotterdam Criteria, if you have irregular ovulation and clinical or biochemical signs of elevated androgens, you can be diagnosed with PCOS even if your ultrasound does not show multiple follicles.'
    },
    {
      q: language === 'hi'
        ? 'क्या PCOS केवल अधिक वजन वाली महिलाओं को होता है?'
        : language === 'kn'
        ? 'PCOS ಕೇವಲ ತೂಕ ಹೆಚ್ಚಿರುವವರಿಗೆ ಮಾತ್ರ ಬರುತ್ತದೆಯೇ?'
        : 'Is PCOS only an issue for overweight women?',
      a: language === 'hi'
        ? 'नहीं। लगभग 20% से 30% महिलाओं का वजन बिल्कुल सामान्य होता है, जिसे "लीन पीसीओएस" (Lean PCOS) कहा जाता है। उनमें भी हार्मोनल और इंसुलिन असंतुलन हो सकता है।'
        : language === 'kn'
        ? 'ಇಲ್ಲ. ಸಾಮಾನ್ಯ ತೂಕವಿರುವ ಸುಮಾರು 20-30% ಮಹಿಳೆಯರಿಗೂ "ಲೀನ್ ಪಿಸಿಒಎಸ್" ಇರಬಹುದು.'
        : 'No. Up to 20% to 30% of women diagnosed with PCOS have a normal or low BMI (often described clinically as "lean PCOS"). Lean individuals frequently still experience ovulatory irregularity, elevated androgens, and subtle cellular insulin resistance.'
    },
    {
      q: language === 'hi'
        ? 'क्या गर्भनिरोधक गोलियां (Birth Control Pills) ही एकमात्र इलाज हैं?'
        : language === 'kn'
        ? 'ಮಾತ್ರೆಗಳು ಮಾತ್ರವೇ ಇದಕ್ಕೆ ಪರಿಹಾರವೇ?'
        : 'Are birth control pills the only medical treatment?',
      a: language === 'hi'
        ? 'नहीं। हालांकि गोलियां पीरियड्स को नियमित करने में मदद करती हैं, लेकिन अंतरराष्ट्रीय दिशानिर्देश आहार में सुधार, कसरत और इंसुलिन संतुलन को पहली प्राथमिकता देते हैं।'
        : language === 'kn'
        ? 'ಇಲ್ಲ. ಆರೋಗ್ಯಕರ ಆಹಾರ, ಶಕ್ತಿವರ್ಧಕ ವ್ಯಾಯಾಮ ಮತ್ತು ಒತ್ತಡ ನಿರ್ವಹಣೆಯೇ ಮೊದಲ ಹಂತದ ಪರಿಹಾರ.'
        : 'No. While combined oral contraceptive pills can help induce regular withdrawal bleeds and lower androgen levels, they are only one option. First-line clinical guidelines prioritize dietary patterns that stabilize glucose, physical resistance training, stress management, and insulin-sensitizing approaches (like metformin or inositol supplements under doctor supervision).'
    },
    {
      q: language === 'hi'
        ? 'PCOS की पुष्टि से पहले किन अन्य बीमारियों की जांच जरूरी है?'
        : language === 'kn'
        ? 'ಇತರ ಯಾವ ಪರೀಕ್ಷೆಗಳನ್ನು ಮೊದಲು ಮಾಡಬೇಕು?'
        : 'What other conditions must be ruled out before diagnosing PCOS?',
      a: language === 'hi'
        ? 'थायरॉइड (TSH), प्रोलैक्टिन और 17-OHP टेस्ट कराना अनिवार्य है ताकि यह सुनिश्चित हो सके कि लक्षण किसी अन्य ग्रंथि के कारण तो नहीं हैं।'
        : language === 'kn'
        ? 'ಥೈರಾಯ್ಡ್ ಮತ್ತು ಪ್ರೊಲ್ಯಾಕ್ಟಿನ್ ಪರೀಕ್ಷೆಗಳನ್ನು ನಡೆಸಿ ಇತರ ಸಮಸ್ಯೆಗಳನ್ನು ತಳ್ಳಿಹಾಕಬೇಕು.'
        : 'Because symptoms like missed periods, hair loss, or acne occur in several conditions, doctors must check thyroid hormones (TSH), prolactin levels (to rule out pituitary adenomas), and 17-hydroxyprogesterone (to rule out congenital adrenal hyperplasia) before confirming PCOS.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-50 dark:bg-lavender-950/60 text-xs font-semibold text-lavender-700 dark:text-lavender-300 mb-3 border border-lavender-200 dark:border-lavender-800">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t('pcosGuideHeader')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t('pcosGuideHeader')}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {t('pcosGuideHeaderSub')}
        </p>

        {/* Global TTS Read Aloud */}
        <div className="flex justify-center">
          <TextToSpeechButton
            text="Polycystic Ovary Syndrome, or PCOS, is primarily an endocrine and metabolic condition rather than merely an ovarian disorder. In this guide, you will learn about symptoms, diverse causes such as thyroid and stress, the diagnostic hierarchy, Rotterdam criteria, and evidence-based nutrition."
            label={t('listenAloud')}
          />
        </div>
      </div>

      {/* Sticky Table of Contents Quick-Jump Bar */}
      <nav
        aria-label="Table of Contents"
        className="sticky top-20 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md"
      >
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold text-slate-700 dark:text-slate-300">
          <button
            type="button"
            onClick={() => scrollToSection('what-is-pcos')}
            className="px-3 py-1.5 rounded-xl hover:bg-lavender-100 dark:hover:bg-slate-800 whitespace-nowrap transition-colors"
          >
            {t('tocWhatIs')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('diverse-causes')}
            className="px-3 py-1.5 rounded-xl hover:bg-lavender-100 dark:hover:bg-slate-800 whitespace-nowrap transition-colors"
          >
            {t('tocCauses')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('diagnostic-hierarchy')}
            className="px-3 py-1.5 rounded-xl bg-lavender-50 dark:bg-slate-800 text-lavender-700 dark:text-lavender-300 hover:bg-lavender-100 whitespace-nowrap transition-colors"
          >
            {t('tocHierarchy')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('rotterdam-criteria')}
            className="px-3 py-1.5 rounded-xl hover:bg-lavender-100 dark:hover:bg-slate-800 whitespace-nowrap transition-colors"
          >
            {t('tocRotterdam')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('doctor-visit')}
            className="px-3 py-1.5 rounded-xl hover:bg-lavender-100 dark:hover:bg-slate-800 whitespace-nowrap transition-colors"
          >
            {t('tocDoctor')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('healthy-habits')}
            className="px-3 py-1.5 rounded-xl hover:bg-lavender-100 dark:hover:bg-slate-800 whitespace-nowrap transition-colors"
          >
            {t('tocHabits')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq-references')}
            className="px-3 py-1.5 rounded-xl hover:bg-lavender-100 dark:hover:bg-slate-800 whitespace-nowrap transition-colors"
          >
            {t('tocFaq')}
          </button>
        </div>
      </nav>

      {/* CONTINUOUS SCROLLABLE CONTENT */}
      <div className="space-y-16">
        {/* SECTION 1: WHAT IS PCOS */}
        <section id="what-is-pcos" className="scroll-mt-36 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-lavender-600 dark:text-lavender-400">
                Section 1
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                What Polycystic Ovary Syndrome Actually Is
              </h2>
            </div>
            <TextToSpeechButton
              text="Polycystic Ovary Syndrome is primarily an endocrine and metabolic condition rather than merely an ovarian disorder. It affects 8 to 13 percent of women worldwide. Immature follicles remain small rather than releasing an egg regularly. Having irregular periods does not mean you have PCOS, and having PCOS does not mean you cannot live a vibrant life."
            />
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Polycystic Ovary Syndrome (PCOS) is primarily an <strong>endocrine and metabolic condition</strong> rather than merely an ovarian disorder. It affects approximately 8% to 13% of women of reproductive age worldwide.
          </p>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            In a typical cycle, a small egg sac (follicle) inside the ovary matures and releases an egg (ovulation). In women with PCOS, slightly elevated levels of insulin and androgens (such as testosterone) cause follicles to pause their development before releasing an egg. These small, dormant follicles remain in the ovary, often appearing like a string of small pearls on a pelvic scan.
          </p>

          {/* Core Signs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-lavender-50/60 dark:bg-slate-800/60 rounded-2xl border border-lavender-100 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white text-sm block mb-1">
                Menstrual Irregularity
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Infrequent periods (longer than 35 days apart), missed cycles, or prolonged spotting.
              </p>
            </div>

            <div className="p-5 bg-lavender-50/60 dark:bg-slate-800/60 rounded-2xl border border-lavender-100 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white text-sm block mb-1">
                Hyperandrogenism (Hormonal Signs)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Coarse hair growth on chin or abdomen, persistent jawline acne, or central scalp thinning.
              </p>
            </div>

            <div className="p-5 bg-lavender-50/60 dark:bg-slate-800/60 rounded-2xl border border-lavender-100 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white text-sm block mb-1">
                Metabolic & Insulin Variations
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Pronounced carbohydrate cravings, mid-afternoon energy crashes, or difficulty managing weight.
              </p>
            </div>

            <div className="p-5 bg-lavender-50/60 dark:bg-slate-800/60 rounded-2xl border border-lavender-100 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white text-sm block mb-1">
                Emotional Wellbeing
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Heightened mood swings, anxiety, brain fog, and sleep disruptions due to hormone shifts.
              </p>
            </div>
          </div>

          {/* Myth busters */}
          <div className="p-5 bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900/50">
            <h4 className="font-bold text-rose-900 dark:text-rose-200 text-sm mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              Three Harmful Myths Debunked
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-800 dark:text-rose-300">
              <li>• <strong>Myth:</strong> PCOS causes complete infertility. <em>Fact:</em> Most women with PCOS can conceive; ovulation regulation is very achievable with lifestyle and medical support.</li>
              <li>• <strong>Myth:</strong> You must be overweight to have PCOS. <em>Fact:</em> Up to 30% of women have "lean PCOS" with normal body weight.</li>
              <li>• <strong>Myth:</strong> It is caused by poor personal discipline. <em>Fact:</em> PCOS has strong genetic and developmental roots. It is never your fault.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: DIVERSE CAUSES */}
        <section id="diverse-causes" className="scroll-mt-36 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Section 2
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Why Symptoms Can Have Diverse Causes
              </h2>
            </div>
            <TextToSpeechButton
              text="A symptom is not a diagnosis. Missed periods, acne, and hair thinning can stem from multiple systems. Thyroid disorders, hypothalamic amenorrhea from stress or weight changes, hyperprolactinemia, and low iron stores frequently mimic PCOS."
            />
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            One of the most important principles in women's endocrinology is that <strong>a symptom is not a diagnosis</strong>. Missed periods, acne, and hair thinning can stem from multiple independent systems in the body.
          </p>

          <div className="space-y-4">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                1. Thyroid Dysfunction (Hypothyroidism or Hyperthyroidism)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The thyroid gland governs cellular metabolism. When thyroid hormone is low, cycle timing slows down, fatigue mounts, and diffuse hair shedding occurs—closely mimicking PCOS. A simple TSH blood test differentiates this.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                2. Hypothalamic Amenorrhea (Stress or Energy Deficit)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When the body senses extreme psychological stress, rapid weight loss, or intense athletic exertion without sufficient calories, the hypothalamus pauses ovulation to conserve energy. This results in missed periods without high androgens.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                3. Hyperprolactinemia (Elevated Prolactin)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Prolactin is the pituitary hormone responsible for breast milk production. High non-pregnancy levels suppress ovarian signals, causing periods to vanish.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                4. Nutritional Deficiencies (Iron & Vitamin D)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Low serum ferritin (iron storage) frequently triggers severe hair shedding and profound fatigue that women often assume is a reproductive hormone flaw.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SYMPTOMS & DIAGNOSTIC HIERARCHY */}
        <section id="diagnostic-hierarchy" className="scroll-mt-36">
          <DiagnosticHierarchy />
        </section>

        {/* SECTION 4: ROTTERDAM CRITERIA */}
        <section id="rotterdam-criteria" className="scroll-mt-36 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-lavender-600 dark:text-lavender-400">
                Section 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                How Doctors Evaluate PCOS: The Rotterdam Criteria
              </h2>
            </div>
            <TextToSpeechButton
              text="The Rotterdam consensus criteria requires meeting at least two of three features: irregular or absent ovulation, signs of high androgens either clinical or blood tests, and polycystic ovarian appearance on pelvic ultrasound. Thyroid and prolactin conditions must be excluded first."
            />
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            In 2003, international endocrine experts established the <strong>Rotterdam Consensus criteria</strong>, which remains the universal clinical gold standard. To be diagnosed with PCOS, an adult woman must meet <strong>at least TWO out of the following THREE criteria</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-lavender-50/70 dark:bg-slate-800 rounded-2xl border border-lavender-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-lavender-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Ovulatory Irregularity
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Cycles that occur less frequently than every 35 days (oligomenorrhea), absent periods for 3+ months (amenorrhea), or cycles with unpredictable intervals.
              </p>
            </div>

            <div className="p-6 bg-lavender-50/70 dark:bg-slate-800 rounded-2xl border border-lavender-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-lavender-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                High Androgens
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Either clinical signs (coarse chin/facial hair, resistant adult acne, male-pattern hair loss) or biochemical proof (elevated free/total testosterone or DHEA-S in morning blood work).
              </p>
            </div>

            <div className="p-6 bg-lavender-50/70 dark:bg-slate-800 rounded-2xl border border-lavender-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-lavender-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Polycystic Ovaries on Scan
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                An ultrasound showing 20+ small follicles (2–9 mm) per ovary or ovarian volume &gt; 10 mL. (Note: in adolescents within 8 years of menarche, ultrasound is often not used due to natural follicle density).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: DOCTOR VISIT GUIDE */}
        <section id="doctor-visit" className="scroll-mt-36 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Section 5
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                What to Expect at Your Doctor’s Appointment
              </h2>
            </div>
            <TextToSpeechButton
              text="When visiting a gynecologist, bring your printed Yajnaseni symptom summary and cycle logs. The visit involves a respectful physical check, blood pressure review, and morning fasting blood tests for hormones and thyroid, followed by pelvic ultrasound if indicated."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-lavender-600" />
                What the Visit Involves
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li>• Detailed cycle history (bring your My Health Journal logs).</li>
                <li>• Blood pressure and BMI check (with respectful, shame-free evaluation).</li>
                <li>• Physical inspection of skin, jawline, and hair.</li>
                <li>• Referral for morning fasting blood work (ideally on cycle days 2-4 if cycling).</li>
                <li>• Pelvic or transvaginal ultrasound referral.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-teal-600" />
                What to Bring With You
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li>• Printed summary from your Yajnaseni assessment.</li>
                <li>• Dates of your last 3-6 menstrual periods.</li>
                <li>• List of all supplements, vitamins, and medications you take.</li>
                <li>• Family medical history (diabetes, early menopause, thyroid issues).</li>
                <li>• A written list of your top 3 questions.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: HEALTHY HABITS */}
        <section id="healthy-habits" className="scroll-mt-36 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Section 6
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Evidence-Based Habits for Hormonal Harmony
              </h2>
            </div>
            <TextToSpeechButton
              text="Lifestyle and dietary habits are the first-line treatment for PCOS. Prioritize blood sugar balance by pairing carbohydrates with protein and fiber, engage in 2 to 3 strength training sessions each week to clear glucose, and get 7 to 9 hours of quality sleep to lower cortisol."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-4">
                <Apple className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Blood Glucose Balance
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                Pair carbohydrates with fiber and protein (lentils, paneer, tofu, nuts) to prevent post-meal insulin spikes that trigger androgen production.
              </p>
              <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                Focus: High fiber, low-glycemic index
              </span>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 rounded-2xl bg-lavender-100 dark:bg-lavender-950/60 text-lavender-700 dark:text-lavender-300 flex items-center justify-center mb-4">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Resistance & Muscle Strength
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                Skeletal muscles absorb glucose directly without requiring high insulin. 2-3 sessions of bodyweight or weight training per week dramatically enhances sensitivity.
              </p>
              <span className="text-[11px] font-semibold text-lavender-700 dark:text-lavender-400">
                Focus: Strength training & post-meal walks
              </span>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-4">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Sleep & Cortisol Care
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                Poor sleep directly impairs glucose metabolism within 24 hours. Aim for 7-9 hours of consistent sleep and slow diaphragmatic breathing to manage cortisol.
              </p>
              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400">
                Focus: Restorative sleep rhythm
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQS & REFERENCES */}
        <section id="faq-references" className="scroll-mt-36 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full p-5 text-left font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-lavender-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reputable Medical Sources */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Reputable Medical References & Source Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <a
                href="https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-lavender-400 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">World Health Organization (WHO)</span>
                  <span className="text-slate-500">Global PCOS factsheet and epidemiology</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href="https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-lavender-400 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">NHS UK PCOS Clinical Guide</span>
                  <span className="text-slate-500">Diagnosis, treatment, and lifestyle guidance</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href="https://www.monash.edu/medicine/mchri/pcos"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-lavender-400 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">International PCOS Guideline (Monash/ASRM)</span>
                  <span className="text-slate-500">Evidence-based assessment & management</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href="https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2018/06/polycystic-ovary-syndrome"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-lavender-400 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">ACOG Practice Bulletin No. 194</span>
                  <span className="text-slate-500">American College of Obstetricians & Gynecologists</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
