import React, { useState } from 'react';
import {
  Layers,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Stethoscope,
  Info,
  Activity,
  ArrowDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DiagnosticHierarchy() {
  const { language } = useLanguage();
  const [selectedTier, setSelectedTier] = useState(0);

  const HIERARCHY_DATA = {
    en: [
      {
        tier: 'Tier 1: Primary Ovulatory & Menstrual Signals',
        subtitle: 'The primary presenting reason women seek clinical insight',
        badge: 'Initial Presentation',
        color: 'border-lavender-500 bg-lavender-50/60 dark:bg-lavender-950/40 text-lavender-900 dark:text-lavender-200',
        points: [
          'Oligomenorrhea: Menstrual cycles longer than 35 days apart',
          'Amenorrhea: Complete absence of periods for 3 or more consecutive cycles',
          'Anovulatory Cycles: Bleeding without true egg release, causing unpredictable flow volume'
        ],
        clinicalMeaning:
          'When ovulation pauses or becomes erratic, progesterone is deficient, leaving the uterine lining exposed to unopposed estrogen. This causes delayed, irregular, or prolonged bleeding patterns.'
      },
      {
        tier: 'Tier 2: Hyperandrogenism (Hormonal Phenotypes)',
        subtitle: 'Visible clinical signs and biochemical laboratory markers',
        badge: 'Hormonal Manifestation',
        color: 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200',
        points: [
          'Hirsutism: Coarse, dark terminal hair along chin, upper lip, chest, or belly',
          'Adult Hormonal Acne: Deep, cystic breakout clusters concentrated along jawline and chin',
          'Androgenetic Alopecia: Diffuse thinning around the central hair part with preserved hairline',
          'Biochemical Markers: Elevated serum Free Testosterone, Total Testosterone, or DHEA-S'
        ],
        clinicalMeaning:
          'The ovaries and adrenal glands produce slightly elevated levels of androgens. Receptors in hair follicles and sebaceous glands react, triggering excess sebum (acne) and terminal hair growth.'
      },
      {
        tier: 'Tier 3: Metabolic & Endocrine Amplifiers',
        subtitle: 'Underlying metabolic physiology that exacerbates symptoms',
        badge: 'Metabolic Drivers',
        color: 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200',
        points: [
          'Insulin Resistance: Cells respond sluggishly to insulin, causing pancreas to over-secrete',
          'Hyperinsulinemia: High circulating insulin stimulates the ovaries to manufacture excess androgens',
          'Acanthosis Nigricans: Dark, velvety skin patches in neck or underarm folds',
          'Metabolic Fatigue: Severe post-meal sluggishness and intense sugar cravings'
        ],
        clinicalMeaning:
          'Insulin is not just a blood sugar regulator; it acts as a co-gonadotropin in the ovaries. High insulin directly worsens both ovulatory irregularity and androgenic acne/hair symptoms.'
      },
      {
        tier: 'Tier 4: Mandatory Medical Rule-Outs (Differential Diagnosis)',
        subtitle: 'Conditions that mimic PCOS and must be excluded first by tests',
        badge: 'Crucial Exclusions',
        color: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200',
        points: [
          'Thyroid Disorders (Hypothyroidism/Hyperthyroidism): Tested via serum TSH and Free T4',
          'Hyperprolactinemia (Pituitary elevation): Tested via fasting morning Prolactin',
          'Non-Classic Congenital Adrenal Hyperplasia (NCCAH): Tested via early-morning 17-OHP',
          'Premature Ovarian Insufficiency (POI) or Hypothalamic Amenorrhea (Stress/Diet deficit)'
        ],
        clinicalMeaning:
          'A responsible physician will NEVER diagnose PCOS without ordering blood tests to rule out thyroid, pituitary, and adrenal causes, which share identical symptoms but require completely different treatments.'
      },
      {
        tier: 'Tier 5: Rotterdam Criteria Consensus (Official Diagnosis)',
        subtitle: 'International criteria requiring at least 2 out of 3 features',
        badge: 'Diagnostic Standard',
        color: 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200',
        points: [
          'Feature 1: Irregular or absent ovulation (Oligo- or anovulation)',
          'Feature 2: Clinical and/or biochemical signs of hyperandrogenism',
          'Feature 3: Polycystic ovarian morphology on pelvic ultrasound (≥20 follicles per ovary or volume >10 mL)',
          'Requirement: Must meet AT LEAST TWO of the above three criteria AFTER Tier 4 conditions are ruled out'
        ],
        clinicalMeaning:
          'Established in 2003 and validated by international guidelines (Monash, ASRM, ESHRE), this framework ensures diagnosis is grounded in clinical evidence rather than speculation.'
      }
    ],
    hi: [
      {
        tier: 'स्तर 1: प्राथमिक मासिक धर्म और ओव्यूलेशन के संकेत',
        subtitle: 'महिलाएं सबसे पहले इसी परेशानी के लिए डॉक्टर से संपर्क करती हैं',
        badge: 'प्रारंभिक लक्षण',
        color: 'border-lavender-500 bg-lavender-50/60 dark:bg-lavender-950/40 text-lavender-900 dark:text-lavender-200',
        points: [
          'ओलिगोमेनोरिया: 35 दिनों से अधिक लंबे चक्र',
          'एमेनोरिया: लगातार 3 महीने या उससे अधिक समय तक पीरियड न आना',
          'अनियमित रक्तस्राव: अंडा न बनने (anovulation) के कारण अप्रत्याशित ब्लीडिंग'
        ],
        clinicalMeaning:
          'जब ओव्यूलेशन रुकता है या अनियमित होता है, तो प्रोजेस्टेरोन हार्मोन की कमी हो जाती है, जिससे पीरियड्स में देरी या भारीपन होता है।'
      },
      {
        tier: 'स्तर 2: हाइपरएंड्रोजेनिज्म (हार्मोनल शारीरिक लक्षण)',
        subtitle: 'चेहरे व त्वचा पर दिखने वाले लक्षण और खून में बढ़े हुए हार्मोन',
        badge: 'हार्मोनल अभिव्यक्ति',
        color: 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200',
        points: [
          'हर्सूटिज़्म: ठुड्डी, ऊपरी होंठ, छाती या पेट पर मोटे काले बाल',
          'गंभीर सिस्टिक मुंहासे: जबड़े और ठुड्डी के आसपास दर्दनाक दाने',
          'मांग का चौड़ा होना: सिर के बीच से बाल पतले होना',
          'हार्मोन टेस्ट: फ्री टेस्टोस्टेरोन या DHEA-S का ऊंचा स्तर'
        ],
        clinicalMeaning:
          'अंडाशय और एड्रीनल ग्रंथियां सामान्य से अधिक एंड्रोजन (पुरुष हार्मोन) बनाती हैं, जिससे त्वचा पर तेल और अनचाहे बाल बढ़ते हैं।'
      },
      {
        tier: 'स्तर 3: मेटाबॉलिक व इंसुलिन असंतुलन',
        subtitle: 'आंतरिक मेटाबॉलिज्म जो लक्षणों को और अधिक बढ़ाता है',
        badge: 'मेटाबॉलिक कारक',
        color: 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200',
        points: [
          'इंसुलिन प्रतिरोध (Insulin Resistance): कोशिकाओं द्वारा इंसुलिन का सही उपयोग न होना',
          'इंसुलिन की अधिकता: खून में अधिक इंसुलिन अंडाशय से और अधिक एंड्रोजन बनवाता है',
          'त्वचा का काला पड़ना: गर्दन या कांख पर मखमली काले धब्बे (Acanthosis Nigricans)',
          'थकान व सुस्ती: भोजन के बाद बहुत ज्यादा नींद और मीठा खाने की तीव्र लालसा'
        ],
        clinicalMeaning:
          'इंसुलिन केवल शुगर को ही नियंत्रित नहीं करता, बल्कि यह अंडाशय में जाकर हार्मोनल असंतुलन को सीधा बढ़ावा देता है।'
      },
      {
        tier: 'स्तर 4: अन्य बीमारियों को बाहर करना (जरूरी जांचें)',
        subtitle: 'वे स्थितियां जिनके लक्षण PCOS जैसे होते हैं और जिन्हें पहले टेस्ट से जांचना जरूरी है',
        badge: 'महत्वपूर्ण नियम',
        color: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200',
        points: [
          'थायरॉइड विकार: TSH और फ्री T4 ब्लड टेस्ट',
          'हाइपरप्रोलैक्टिनेमिया: सुबह का प्रोलैक्टिन टेस्ट',
          'एड्रीनल ग्रंथि विकार (NCCAH): 17-OHP ब्लड टेस्ट',
          'अत्यधिक तनाव या भुखमरी (Hypothalamic Amenorrhea)'
        ],
        clinicalMeaning:
          'एक जिम्मेदार डॉक्टर थायरॉइड और अन्य हार्मोनों की जांच किए बिना कभी PCOS का निदान नहीं करते।'
      },
      {
        tier: 'स्तर 5: रोटरडैम मानदंड (आधिकारिक PCOS निदान)',
        subtitle: 'अंतरराष्ट्रीय नियम: 3 में से कम से कम 2 लक्षणों का होना अनिवार्य',
        badge: 'आधिकारिक निदान',
        color: 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200',
        points: [
          'लक्षण 1: अनियमित या छूटे हुए पीरियड्स (ओव्यूलेशन में रुकावट)',
          'लक्षण 2: एंड्रोजन की अधिकता (चेहरे पर बाल, मुंहासे या ब्लड टेस्ट में पुष्टि)',
          'लक्षण 3: अल्ट्रासाउंड में अंडाशय में 20 या अधिक छोटे फॉलिकल्स दिखना',
          'नियम: स्तर 4 की अन्य बीमारियों के खारिज होने के बाद उपरोक्त 3 में से कम से कम 2 होने चाहिए'
        ],
        clinicalMeaning:
          'रोटरडैम मानदंड विश्व स्वास्थ्य संगठन (WHO) द्वारा समर्थित वह नियम है जो सही डॉक्टरी निदान की पुष्टि करता है।'
      }
    ],
    kn: [
      {
        tier: 'ಹಂತ 1: ಮುಟ್ಟಿನ ಮತ್ತು ಅಂಡೋತ್ಪತ್ತಿಯ ಪ್ರಾಥಮಿಕ ಲಕ್ಷಣಗಳು',
        subtitle: 'ಮಹಿಳೆಯರು ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಲು ಮುಖ್ಯ ಕಾರಣ',
        badge: 'ಆರಂಭಿಕ ಲಕ್ಷಣಗಳು',
        color: 'border-lavender-500 bg-lavender-50/60 dark:bg-lavender-950/40 text-lavender-900 dark:text-lavender-200',
        points: [
          'ಅನಿಯಮಿತ ಮುಟ್ಟು: 35 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚಿನ ಅವಧಿ',
          'ಮುಟ್ಟು ಸಂಪೂರ್ಣ ನಿಲ್ಲುವುದು (ಅಮೆನೋರಿಯಾ)',
          'ಅಂಡೋತ್ಪತ್ತಿ ಸರಿಯಾಗಿ ಆಗದಿರುವುದು'
        ],
        clinicalMeaning: 'ಅಂಡೋತ್ಪತ್ತಿ ವಿಳಂಬವಾದಾಗ ಪ್ರೊಜೆಸ್ಟರಾನ್ ಕಡಿಮೆಯಾಗಿ ರಕ್ತಸ್ರಾವದಲ್ಲಿ ಬದಲಾವಣೆಗಳು ಉಂಟಾಗುತ್ತವೆ.'
      },
      {
        tier: 'ಹಂತ 2: ಆಂಡ್ರೋಜನ್ ಹಾರ್ಮೋನ್‌ಗಳ ಏರಿಕೆ',
        subtitle: 'ಚರ್ಮ ಮತ್ತು ಕೂದಲಿನಲ್ಲಿ ಕಾಣಿಸುವ ಬದಲಾವಣೆಗಳು',
        badge: 'ಹಾರ್ಮೋನ್ ಪ್ರಭಾವ',
        color: 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200',
        points: [
          'ಹಿರ್ಸುಟಿಸಂ: ಗಲ್ಲದ ಮೇಲೆ ದಪ್ಪ ಕೂದಲು ಬೆಳೆಯುವುದು',
          'ಮೊಡವೆಗಳು: ಗಲ್ಲದ ಸುತ್ತ ನೋವಿನ ಮೊಡವೆಗಳು',
          'ಕೂದಲು ತೆಳುವಾಗುವುದು: ಬೈತಲೆ ಅಗಲವಾಗುವುದು',
          'ರಕ್ತ ಪರೀಕ್ಷೆ: ಟೆಸ್ಟೋಸ್ಟೆರಾನ್ ಹೆಚ್ಚಳ'
        ],
        clinicalMeaning: 'ಆಂಡ್ರೋಜನ್ ಹಾರ್ಮೋನುಗಳು ಹೆಚ್ಚಾದಾಗ ಚರ್ಮದಲ್ಲಿ ಎಣ್ಣೆ ಮತ್ತು ಅನಗತ್ಯ ಕೂದಲು ಬೆಳೆಯುತ್ತದೆ.'
      },
      {
        tier: 'ಹಂತ 3: ಮೆಟಾಬಾಲಿಕ್ ಮತ್ತು ಇನ್ಸುಲಿನ್ ಸಮಸ್ಯೆಗಳು',
        subtitle: 'ಲಕ್ಷಣಗಳನ್ನು ಉಲ್ಬಣಗೊಳಿಸುವ ಆಂತರಿಕ ಕಾರಣಗಳು',
        badge: 'ಮೆಟಾಬಾಲಿಕ್ ಕಾರಣಗಳು',
        color: 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200',
        points: [
          'ಇನ್ಸುಲಿನ್ ರೆಸಿಸ್ಟೆನ್ಸ್: ಗ್ಲೂಕೋಸ್ ಸರಿಯಾಗಿ ಬಳಕೆಯಾಗದಿರುವುದು',
          'ಹೆಚ್ಚಿನ ಇನ್ಸುಲಿನ್ ಹಾರ್ಮೋನ್ ವ್ಯತ್ಯಾಸವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ',
          'ಕತ್ತಿನ ಸುತ್ತ ಕಪ್ಪು ಕಲೆಗಳು',
          'ಊಟದ ನಂತರ ತೀವ್ರ ಆಯಾಸ'
        ],
        clinicalMeaning: 'ಇನ್ಸುಲಿನ್ ಹೆಚ್ಚಾದಾಗ ಅಂಡಾಶಯದಲ್ಲಿ ಹೆಚ್ಚು ಹಾರ್ಮೋನುಗಳು ಉತ್ಪತ್ತಿಯಾಗಿ ಸಮಸ್ಯೆ ಬಿಗಡಾಯಿಸುತ್ತದೆ.'
      },
      {
        tier: 'ಹಂತ 4: ಇತರ ಕಾಯಿಲೆಗಳನ್ನು ಹೊರಗಿಡುವ ಪರೀಕ್ಷೆಗಳು',
        subtitle: 'PCOS ಲಕ್ಷಣಗಳನ್ನೇ ಹೋಲುವ ಇತರ ಸಮಸ್ಯೆಗಳ ಪರೀಕ್ಷೆ',
        badge: 'ಮುಖ್ಯ ಪರೀಕ್ಷೆಗಳು',
        color: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200',
        points: [
          'ಥೈರಾಯ್ಡ್ ಪರೀಕ್ಷೆ (TSH)',
          'ಪ್ರೊಲ್ಯಾಕ್ಟಿನ್ ಹಾರ್ಮೋನ್ ಪರೀಕ್ಷೆ',
          'ಅಡ್ರಿನಲ್ ಗ್ರಂಥಿಯ ಪರೀಕ್ಷೆ (17-OHP)'
        ],
        clinicalMeaning: 'ಥೈರಾಯ್ಡ್ ಮುಂತಾದ ಇತರ ಸಮಸ್ಯೆಗಳನ್ನು ರಕ್ತ ಪರೀಕ್ಷೆಯ ಮೂಲಕ ತಳ್ಳಿಹಾಕಿದ ನಂತರವೇ PCOS ಪರಿಗಣಿಸಬೇಕು.'
      },
      {
        tier: 'ಹಂತ 5: ರೋಟೆರ್‌ಡ್ಯಾಮ್ ಮಾನದಂಡಗಳು (PCOS ರೋಗನಿರ್ಣಯ)',
        subtitle: '3 ರಲ್ಲಿ ಕನಿಷ್ಠ 2 ಲಕ್ಷಣಗಳು ಇರಬೇಕು',
        badge: 'ಅಧಿಕೃತ ತೀರ್ಮಾನ',
        color: 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200',
        points: [
          'ಅನಿಯಮಿತ ಅಥವಾ ತಪ್ಪಿದ ಮುಟ್ಟು',
          'ಆಂಡ್ರೋಜನ್ ಹಾರ್ಮೋನ್ ಹೆಚ್ಚಳದ ಲಕ್ಷಣಗಳು',
          'ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನ್‌ನಲ್ಲಿ ಅಂಡಾಶಯದಲ್ಲಿ ಚೀಲಗಳು ಕಾಣಿಸುವುದು',
          'ನಿಯಮ: ಇತರ ಸಮಸ್ಯೆಗಳನ್ನು ಹೊರಗಿಟ್ಟ ನಂತರ ಕನಿಷ್ಠ 2 ಲಕ್ಷಣಗಳು ಇರಬೇಕು'
        ],
        clinicalMeaning: 'ಇದು ಜಾಗತಿಕವಾಗಿ ವೈದ್ಯರು PCOS ದೃಢೀಕರಿಸಲು ಬಳಸುವ ಅಧಿಕೃತ ನಿಯಮವಾಗಿದೆ.'
      }
    ]
  };

  const activeTiers = HIERARCHY_DATA[language] || HIERARCHY_DATA.en;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender-50 dark:bg-lavender-950/60 text-xs font-semibold text-lavender-700 dark:text-lavender-300 mb-2 border border-lavender-200 dark:border-lavender-800">
          <Layers className="w-3.5 h-3.5" />
          <span>Clinical Decision Framework</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Symptoms & Diagnostic Hierarchy for PCOS
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          How symptoms connect from initial bodily signals down to clinical differential testing and final Rotterdam diagnostic consensus. Click each tier to inspect medical rationale.
        </p>
      </div>

      {/* Stepper / Flow Visual */}
      <div className="space-y-4">
        {activeTiers.map((tierItem, index) => {
          const isSelected = selectedTier === index;

          return (
            <div key={index} className="space-y-2">
              <div
                onClick={() => setSelectedTier(isSelected ? -1 : index)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? `${tierItem.color} ring-2 ring-lavender-500/50 shadow-sm`
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 font-bold text-xs flex items-center justify-center shadow-xs text-slate-800 dark:text-slate-200 shrink-0">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          {tierItem.tier}
                        </h3>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 shadow-xs">
                          {tierItem.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {tierItem.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-slate-400">
                    {isSelected ? <ChevronDown className="w-5 h-5 text-lavender-600" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-700/80 space-y-3 animate-fade-in text-xs sm:text-sm">
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1.5">
                        Key Clinical Markers & Presentations:
                      </span>
                      <ul className="space-y-1.5 pl-2">
                        {tierItem.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-lavender-500 shrink-0 mt-1.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-slate-200/60 dark:border-slate-800">
                      <strong className="text-slate-900 dark:text-white block mb-0.5">
                        Physiological Mechanism:
                      </strong>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                        {tierItem.clinicalMeaning}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {index < activeTiers.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ArrowDown className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <span>
          <strong>Hierarchy Rule in Clinical Practice:</strong> Notice that Tier 4 (Rule-Outs) must be performed before Tier 5 (Consensus Diagnosis). If a patient has an underactive thyroid (high TSH), treating the thyroid frequently resolves all menstrual and hair symptoms without PCOS being present.
        </span>
      </div>
    </div>
  );
}
