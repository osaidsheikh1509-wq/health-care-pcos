import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Languages,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  FileDown,
  Printer,
  Calendar,
  Search,
  BookOpen,
  HelpCircle,
  Stethoscope,
  Info,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import VoiceInputButton from '../components/VoiceInputButton';
import { getFallbackAssessment } from '../services/clientAssessmentEngine';
import TextToSpeechButton from '../components/TextToSpeechButton';
import DiagnosticHierarchy from '../components/DiagnosticHierarchy';

const CATEGORIES = [
  {
    id: 'menstrual_health',
    title: { en: 'Menstrual Health & Flow', hi: 'मासिक धर्म और रक्तस्राव', kn: 'ಮುಟ್ಟಿನ ಆರೋಗ್ಯ ಮತ್ತು ರಕ್ತಸ್ರಾವ' },
    desc: {
      en: 'Flow volume, spotting between cycles, heavy bleeding, or clotting.',
      hi: 'रक्तस्राव की मात्रा, बीच में स्पॉटिंग या रक्त के थक्के।',
      kn: 'ರಕ್ತಸ್ರಾವದ ಪ್ರಮಾಣ, ಸಣ್ಣ ರಕ್ತಸ್ರಾವ ಅಥವಾ ಗಂಟುಗಳು.'
    },
    icon: '🩸',
    symptoms: [
      { id: 'heavy_bleeding', label: { en: 'Unusually heavy flow', hi: 'अत्यधिक भारी रक्तस्राव', kn: 'ಹೆಚ್ಚಿನ ರಕ್ತಸ್ರಾವ' } },
      { id: 'clots', label: { en: 'Passing noticeable blood clots', hi: 'रक्त के बड़े थक्के निकलना', kn: 'ದೊಡ್ಡ ರಕ್ತದ ಗಂಟುಗಳು' } },
      { id: 'spotting', label: { en: 'Spotting between periods', hi: 'पीरियड्स के बीच में स्पॉटिंग', kn: 'ಮುಟ್ಟಿನ ಮಧ್ಯೆ ಸಣ್ಣ ರಕ್ತಸ್ರಾವ' } },
      { id: 'prolonged_flow', label: { en: 'Period lasting over 7 days', hi: '7 दिनों से अधिक समय तक पीरियड्स चलना', kn: '7 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ' } },
      { id: 'very_light_flow', label: { en: 'Unusually light or scant flow', hi: 'बहुत कम या नाममात्र रक्तस्राव', kn: 'ಅತ್ಯಂತ ಕಡಿಮೆ ರಕ್ತಸ್ರಾವ' } }
    ]
  },
  {
    id: 'irregular_periods',
    title: { en: 'Irregular or Missed Periods', hi: 'अनियमित या छूटे हुए पीरियड्स', kn: 'ಅನಿಯಮಿತ ಅಥವಾ ತಪ್ಪಿದ ಮುಟ್ಟು' },
    desc: {
      en: 'Cycles longer than 35 days, missed cycles, or unpredictable timing.',
      hi: '35 दिनों से अधिक का चक्र, पीरियड्स मिस होना या अनिश्चित समय।',
      kn: '35 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚಿನ ಅವಧಿ ಅಥವಾ ಮುಟ್ಟು ವಿಳಂಬ.'
    },
    icon: '🗓️',
    symptoms: [
      { id: 'delayed_cycle', label: { en: 'Periods delayed by weeks or months', hi: 'हफ्तों या महीनों की देरी', kn: 'ವಾರಗಳು ಅಥವಾ ತಿಂಗಳುಗಳ ವಿಳಂಬ' } },
      { id: 'missed_period', label: { en: 'Completely missed 1 or more periods', hi: 'एक या अधिक बार पीरियड न आना', kn: 'ಮುಟ್ಟು ಸಂಪೂರ್ಣವಾಗಿ ತಪ್ಪಿಹೋಗುವುದು' } },
      { id: 'frequent_periods', label: { en: 'Periods coming too frequently (< 21 days)', hi: '21 दिनों से पहले ही पीरियड आ जाना', kn: '21 ದಿನಗಳಿಗಿಂತ ಮುಂಚಿತವಾಗಿ ಮುಟ್ಟು ಬರುವುದು' } },
      { id: 'unpredictable_timing', label: { en: 'Never knowing when the next period will start', hi: 'अगले पीरियड का समय कभी तय न होना', kn: 'ಮುಂದಿನ ಮುಟ್ಟಿನ ದಿನ ತಿಳಿಯದೇ ಇರುವುದು' } }
    ]
  },
  {
    id: 'acne_skin',
    title: { en: 'Acne & Skin Changes', hi: 'मुंहासे और त्वचा में बदलाव', kn: 'ಮೊಡವೆಗಳು ಮತ್ತು ಚರ್ಮದ ಬದಲಾವಣೆ' },
    desc: {
      en: 'Persistent breakouts along jawline/chin, oily skin, or skin darkening.',
      hi: 'ठुड्डी और जबड़े पर गहरे मुंहासे, ऑयली त्वचा या त्वचा का कालापन।',
      kn: 'ಗಲ್ಲದ ಮೇಲೆ ಮೊಡವೆಗಳು ಅಥವಾ ಚರ್ಮದ ಕಪ್ಪು ಕಲೆಗಳು.'
    },
    icon: '✨',
    symptoms: [
      { id: 'cystic_acne', label: { en: 'Deep, painful cystic bumps on chin or jawline', hi: 'ठुड्डी या जबड़े पर दर्दनाक गहरे दाने', kn: 'ಗಲ್ಲದ ಮೇಲೆ ಆಳವಾದ ನೋವಿನ ಮೊಡವೆಗಳು' } },
      { id: 'treatment_resistant', label: { en: 'Acne not responding to typical face washes', hi: 'सामान्य क्रीम या फेस वॉश से ठीक न होना', kn: 'ಸಾಮಾನ್ಯ ಕ್ರೀಮ್‌ಗಳಿಗೆ ಪ್ರತಿಕ್ರಿಯಿಸದ ಮೊಡವೆ' } },
      { id: 'dark_patches', label: { en: 'Dark, velvety patches on neck or underarms', hi: 'गर्दन या कांख की त्वचा पर गहरे काले मखमली पैच', kn: 'ಕತ್ತು ಅಥವಾ ಕಂಕುಳಲ್ಲಿ ಕಪ್ಪು ಕಲೆಗಳು' } },
      { id: 'excess_oil', label: { en: 'Excessively oily skin throughout the day', hi: 'दिन भर चेहरे पर अत्यधिक तेल आना', kn: 'ದಿನವಿಡೀ ಚರ್ಮದಲ್ಲಿ ಅತಿಯಾದ ಎಣ್ಣೆ' } }
    ]
  },
  {
    id: 'facial_body_hair',
    title: { en: 'Changes in Facial or Body Hair', hi: 'चेहरे या शरीर के बालों में बदलाव', kn: 'ಮುಖ ಅಥವಾ ದೇಹದ ಕೂದಲಿನಲ್ಲಿ ಬದಲಾವಣೆ' },
    desc: {
      en: 'Darker or coarser hair on chin, upper lip, chest, or abdomen.',
      hi: 'ठुड्डी, ऊपरी होंठ, छाती या पेट पर मोटे और काले बाल।',
      kn: 'ಗಲ್ಲ, ಮೇಲ್ತುಟಿ ಅಥವಾ ಹೊಟ್ಟೆಯ ಮೇಲೆ ದಪ್ಪ ಕೂದಲು.'
    },
    icon: '🌿',
    symptoms: [
      { id: 'chin_hair', label: { en: 'Coarse hairs on chin or jaw', hi: 'ठुड्डी या जबड़े पर मोटे बाल', kn: 'ಗಲ್ಲದ ಮೇಲೆ ದಪ್ಪ ಕೂದಲು' } },
      { id: 'upper_lip', label: { en: 'Noticeable upper lip hair growth', hi: 'ऊपरी होंठ पर स्पष्ट बाल आना', kn: 'ಮೇಲ್ತುಟಿಯ ಮೇಲೆ ಕೂದಲು' } },
      { id: 'chest_belly_hair', label: { en: 'Hair along midline of chest or abdomen', hi: 'छाती या नाभि के आसपास बाल', kn: 'ಎದೆ ಅಥವಾ ಹೊಟ್ಟೆಯ ಮೇಲೆ ಕೂದಲು' } },
      { id: 'rapid_growth', label: { en: 'Noticeable increase in hair growth recently', hi: 'हाल ही में बालों का तेजी से बढ़ना', kn: 'ಇತ್ತೀಚೆಗೆ ಕೂದಲಿನ ಬೆಳವಣಿಗೆ ಹೆಚ್ಚಾಗುವುದು' } }
    ]
  },
  {
    id: 'scalp_hair',
    title: { en: 'Scalp Hair Changes', hi: 'सिर के बालों में बदलाव', kn: 'ತಲೆಯ ಕೂದಲಿನ ಬದಲಾವಣೆ' },
    desc: {
      en: 'Thinning at the crown, widening partition, or excessive hair fall.',
      hi: 'मांग चौड़ी होना, सिर के बीच से बाल पतले होना या अत्यधिक झड़ना।',
      kn: 'ಕೂದಲು ತೆಳುವಾಗುವುದು, ಬೈತಲೆ ಅಗಲವಾಗುವುದು ಅಥವಾ ಕೂದಲು ಉದುರುವುದು.'
    },
    icon: '💇‍♀️',
    symptoms: [
      { id: 'widening_part', label: { en: 'Noticeably wider center hair part', hi: 'सिर की बीच की मांग चौड़ी होना', kn: 'ಬೈತಲೆ ಅಗಲವಾಗುವುದು' } },
      { id: 'crown_thinning', label: { en: 'Diffuse thinning at the top of the scalp', hi: 'सिर के ऊपरी हिस्से में बाल विरल होना', kn: 'ತಲೆಯ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಕೂದಲು ತೆಳುವಾಗುವುದು' } },
      { id: 'excess_shedding', label: { en: 'Losing large clumps during washing or brushing', hi: 'कंघी या बाल धोते समय गुच्छों में बाल गिरना', kn: 'ಕೂದಲು ತೊಳೆಯುವಾಗ ಹೆಚ್ಚು ಉದುರುವುದು' } }
    ]
  },
  {
    id: 'pelvic_discomfort',
    title: { en: 'Pelvic or Abdominal Discomfort', hi: 'पेल्विक या पेट के निचले हिस्से में असुविधा', kn: 'ಕಿಬ್ಬೊಟ್ಟೆ ಅಥವಾ ಕೆಳಹೊಟ್ಟೆಯ ನೋವು' },
    desc: {
      en: 'Persistent cramping, dull ache, heaviness, or bloating.',
      hi: 'लगातार ऐंठन, हल्का दर्द, भारीपन या पेट फूलना।',
      kn: 'ಸತತ ಸೆಳೆತ, ಕೆಳಹೊಟ್ಟೆಯಲ್ಲಿ ಭಾರ ಅಥವಾ ಊತ.'
    },
    icon: '🌸',
    symptoms: [
      { id: 'severe_cramps', label: { en: 'Debilitating cramps before or during periods', hi: 'पीरियड्स के दौरान असहनीय ऐंठन', kn: 'ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ತೀವ್ರ ಸೆಳೆತ' } },
      { id: 'one_sided_pain', label: { en: 'Dull ache or pinching on one side of lower pelvis', hi: 'पेल्विस के एक तरफ हल्का या चुभन वाला दर्द', kn: 'ಕಿಬ್ಬೊಟ್ಟೆಯ ಒಂದು ಬದಿಯಲ್ಲಿ ನೋವು' } },
      { id: 'pelvic_heaviness', label: { en: 'Sensation of weight or pressure in lower pelvis', hi: 'पेल्विस में भारीपन या दबाव महसूस होना', kn: 'ಕೆಳಹೊಟ್ಟೆಯಲ್ಲಿ ಭಾರವಾದ ಅನುಭವ' } },
      { id: 'bloating_distension', label: { en: 'Pronounced lower belly distension', hi: 'पेट के निचले हिस्से में अत्यधिक सूजन या भारीपन', kn: 'ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗ ಊದಿಕೊಳ್ಳುವುದು' } }
    ]
  },
  {
    id: 'fatigue',
    title: { en: 'Fatigue & Low Energy', hi: 'थकान और ऊर्जा में कमी', kn: 'ಆಯಾಸ ಮತ್ತು ಕಡಿಮೆ ಶಕ್ತಿ' },
    desc: {
      en: 'Persistent low stamina, sluggishness, or afternoon energy crashes.',
      hi: 'दिन भर सुस्ती, कम सहनशक्ति या भोजन के बाद भारी थकान।',
      kn: 'ನಿರಂತರ ನಿಶ್ಯಕ್ತಿ, ಕಡಿಮೆ ಚೈತನ್ಯ ಅಥವಾ ಊಟದ ನಂತರ ಸುಸ್ತು.'
    },
    icon: '🔋',
    symptoms: [
      { id: 'post_meal_crash', label: { en: 'Severe energy crash or brain fog after meals', hi: 'खाना खाने के बाद बहुत ज्यादा नींद और भारीपन', kn: 'ಊಟದ ನಂತರ ಅತಿಯಾದ ನಿದ್ರಾವಸ್ಥೆ ಮತ್ತು ಆಯಾಸ' } },
      { id: 'unrefreshing_sleep', label: { en: 'Waking up exhausted after 8+ hours of sleep', hi: '8 घंटे सोने के बाद भी थकावट महसूस होना', kn: '8 ಗಂಟೆ ನಿದ್ರಿಸಿದರೂ ಸುಸ್ತು' } },
      { id: 'muscle_weakness', label: { en: 'Low physical stamina for routine chores', hi: 'सामान्य दिनचर्या में भी जल्दी हांफ जाना', kn: 'ದೈನಂದಿನ ಕೆಲಸಗಳಿಗೆ ಶಕ್ತಿ ಇಲ್ಲದಿರುವುದು' } }
    ]
  },
  {
    id: 'other_concerns',
    title: { en: 'Other Women\'s Health Concerns', hi: 'अन्य महिला स्वास्थ्य चिंताएं', kn: 'ಮಹಿಳೆಯರ ಇತರ ಆರೋಗ್ಯ ಕಾಳಜಿಗಳು' },
    desc: {
      en: 'Mood swings, temperature sensitivity, sleep disruptions, or weight shifts.',
      hi: 'मूड में तेजी से बदलाव, नींद की परेशानी या वजन का असामान्य बढ़ना।',
      kn: 'ಮನಸ್ಥಿತಿಯ ಬದಲಾವಣೆ, ನಿದ್ರೆಯ ಸಮಸ್ಯೆ ಅಥವಾ ತೂಕದ ಏರಿಕೆ.'
    },
    icon: '🤝',
    symptoms: [
      { id: 'mood_changes', label: { en: 'Severe emotional irritability or sadness before periods', hi: 'पीरियड्स से पहले तेज चिड़चिड़ापन या उदासी', kn: 'ಮುಟ್ಟಿಗೆ ಮುನ್ನ ತೀವ್ರ ಕೋಪ ಅಥವಾ ದುಃಖ' } },
      { id: 'sugar_cravings', label: { en: 'Intense cravings for sweets and refined carbs', hi: 'मीठी चीजों या कार्ब्स की तीव्र लालसा', kn: 'ಸಿಹಿ ಪದಾರ್ಥಗಳ ಅತಿಯಾದ ಬಯಕೆ' } },
      { id: 'weight_difficulty', label: { en: 'Difficulty managing weight despite regular habits', hi: 'नियमित आदतों के बावजूद वजन नियंत्रित करने में कठिनाई', kn: 'ತೂಕ ನಿಯಂತ್ರಣಕ್ಕೆ ಕಷ್ಟವಾಗುವುದು' } },
      { id: 'sleep_issues', label: { en: 'Difficulty falling or staying asleep', hi: 'नींद आने या गहरी नींद में रुकावट', kn: 'ನಿದ್ರಾಹೀನತೆ' } }
    ]
  }
];

export default function SymptomAssessmentPage() {
  const { language, setLanguage, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Multi-step state: 1: Language, 2: Category, 3: Details, 4: Review, 5: Results
  const [currentStep, setCurrentStep] = useState(2);

  // Assessment inputs
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'irregular_periods');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [duration, setDuration] = useState('1-3 months');
  const [onsetType, setOnsetType] = useState('recurring');
  const [freeTextDescription, setFreeTextDescription] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [symptomSearch, setSymptomSearch] = useState('');

  // Submission & Results
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [results, setResults] = useState(null);
  const [copiedQuestions, setCopiedQuestions] = useState(false);
  const [showHierarchy, setShowHierarchy] = useState(false);

  // Initialize from search parameter if present
  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat && CATEGORIES.some((c) => c.id === paramCat)) {
      setSelectedCategory(paramCat);
      setCurrentStep(3);
    }
  }, [searchParams]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const handleSymptomToggle = (symptomLabel) => {
    if (selectedSymptoms.includes(symptomLabel)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptomLabel));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomLabel]);
    }
  };

  const handleVoiceTranscript = (text) => {
    setFreeTextDescription((prev) => (prev ? `${prev} ${text}` : text));
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      language,
      category: selectedCategory,
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : ['Unspecified symptom'],
      duration,
      onsetType,
      freeTextDescription,
      additionalContext
    };

    try {
      const response = await fetch('/api/symptoms/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        const json = await response.json();
        if (json.success && json.data) {
          setResults(json.data);
          setCurrentStep(5);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // If backend returned non-JSON, 404 HTML, or error, seamlessly engage client clinical engine
      console.warn('API returned non-JSON or status error, using resilient client assessment engine');
      const fallbackData = getFallbackAssessment(payload);
      setResults(fallbackData);
      setCurrentStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.warn('Network or API issue, engaging resilient client assessment engine:', err);
      try {
        const fallbackData = getFallbackAssessment(payload);
        setResults(fallbackData);
        setCurrentStep(5);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (fallbackErr) {
        setSubmitError(fallbackErr.message || 'An error occurred while analyzing symptoms. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyQuestions = () => {
    if (!results?.doctorQuestions) return;
    const text = results.doctorQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setFreeTextDescription('');
    setAdditionalContext('');
    setResults(null);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredSymptoms = activeCategoryObj.symptoms.filter((sym) => {
    const label = sym.label[language] || sym.label.en;
    return label.toLowerCase().includes(symptomSearch.toLowerCase());
  });

  // Construct audio synthesis script for TTS button
  const resultsAudioText = results
    ? `${results.symptomSummary}. ${results.whatItMeans}. Possible explanations to discuss include: ${
        results.possibleExplanations?.map((e) => e.title).join(', ')
      }. Questions for your doctor: ${results.doctorQuestions?.join('. ')}`
    : '';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Progress Bar (Visible for Steps 1 through 4) */}
      {currentStep < 5 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span>
              {t('step')} {currentStep} {t('of')} 4
            </span>
            <span className="text-lavender-700 dark:text-lavender-300 font-bold">
              {currentStep === 1 && t('chooseLanguageTitle')}
              {currentStep === 2 && t('selectCategoryTitle')}
              {currentStep === 3 && t('assessStep3Title')}
              {currentStep === 4 && t('reviewTitle')}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-lavender-500 to-sakhiTeal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: CHOOSE LANGUAGE */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="w-12 h-12 bg-lavender-100 dark:bg-lavender-950/60 text-lavender-600 dark:text-lavender-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Languages className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {t('chooseLanguageTitle')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('chooseLanguageSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { code: 'en', name: 'English', desc: 'Standard clinical guidance' },
              { code: 'hi', name: 'हिन्दी (Hindi)', desc: 'सरल और स्पष्ट हिंदी भाषा' },
              { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', desc: 'ಸರಳ ಕನ್ನಡ ಭಾಷೆ' },
            ].map((langItem) => {
              const isSelected = language === langItem.code;
              return (
                <button
                  key={langItem.code}
                  type="button"
                  onClick={() => setLanguage(langItem.code)}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-lavender-500 bg-lavender-50/70 dark:bg-lavender-950/40 shadow-sm ring-2 ring-lavender-500'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {langItem.name}
                    </span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-lavender-600 dark:text-lavender-400" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {langItem.desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 bg-lavender-600 hover:bg-lavender-700 text-white font-semibold rounded-xl text-sm flex items-center gap-2"
            >
              <span>{t('next')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT SYMPTOM CATEGORY */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender-50 dark:bg-lavender-950/50 text-xs font-semibold text-lavender-700 dark:text-lavender-300 mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Step 2 of 4</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {t('selectCategoryTitle')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('selectCategorySub')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const title = cat.title[language] || cat.title.en;
              const desc = cat.desc[language] || cat.desc.en;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSymptoms([]);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-lavender-500 bg-lavender-50/70 dark:bg-lavender-950/40 ring-2 ring-lavender-500 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-2xl p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xs">
                      {cat.icon}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-lavender-600 dark:text-lavender-400 shrink-0" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Change Language</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 bg-lavender-600 hover:bg-lavender-700 text-white font-semibold rounded-xl text-sm flex items-center gap-2 shadow-sm"
            >
              <span>{t('next')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PROVIDE SYMPTOM DETAILS */}
      {currentStep === 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender-50 dark:bg-lavender-950/50 text-xs font-semibold text-lavender-700 dark:text-lavender-300 mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Step 3 of 4: Symptom Specifics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
              {activeCategoryObj.title[language] || activeCategoryObj.title.en}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t('assessStep3Sub')}
            </p>
          </div>

          {/* Searchable symptom cards/tags */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {t('selectObserved')}
              </label>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={t('filterSymptoms')}
                  value={symptomSearch}
                  onChange={(e) => setSymptomSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:border-lavender-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSymptoms.map((sym) => {
                const label = sym.label[language] || sym.label.en;
                const isChecked = selectedSymptoms.includes(label);

                return (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => handleSymptomToggle(label)}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      isChecked
                        ? 'border-lavender-500 bg-lavender-50 dark:bg-lavender-950/60 text-lavender-900 dark:text-lavender-200 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{label}</span>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        isChecked
                          ? 'bg-lavender-600 border-lavender-600 text-white'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration & Onset Pattern */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {t('howLongOccurring')}
              </label>
              <div className="space-y-2">
                {[
                  { value: 'Less than 2 weeks', label: 'Less than 2 weeks' },
                  { value: '1-3 months', label: '1 to 3 months' },
                  { value: '3-6 months', label: '3 to 6 months' },
                  { value: 'Over 6 months', label: 'More than 6 months' },
                ].map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs sm:text-sm transition-all ${
                      duration === item.value
                        ? 'border-lavender-500 bg-lavender-50/50 dark:bg-lavender-950/30 font-semibold text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={item.value}
                      checked={duration === item.value}
                      onChange={(e) => setDuration(e.target.value)}
                      className="text-lavender-600 focus:ring-lavender-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {t('whatPattern')}
              </label>
              <div className="space-y-2">
                {[
                  { value: 'new', label: 'New / First time experiencing this' },
                  { value: 'recurring', label: 'Recurring / Comes and goes with cycles' },
                  { value: 'ongoing', label: 'Ongoing / Persistent and steady' },
                ].map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs sm:text-sm transition-all ${
                      onsetType === item.value
                        ? 'border-lavender-500 bg-lavender-50/50 dark:bg-lavender-950/30 font-semibold text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="onsetType"
                      value={item.value}
                      checked={onsetType === item.value}
                      onChange={(e) => setOnsetType(e.target.value)}
                      className="text-lavender-600 focus:ring-lavender-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Free-text Description with Voice Input */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {t('describeOwnWords')}
              </label>
              <VoiceInputButton onTranscript={handleVoiceTranscript} />
            </div>
            <textarea
              rows={3}
              value={freeTextDescription}
              onChange={(e) => setFreeTextDescription(e.target.value)}
              placeholder="e.g. My periods were normal until 4 months ago, now they skip every other month..."
              className="w-full p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white focus:border-lavender-500"
            />
          </div>

          {/* Optional Context (Can be skipped) */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {t('optionalContext')}
              </label>
              <span className="text-xs text-slate-400">Optional</span>
            </div>
            <input
              type="text"
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder={t('optionalContextPlaceholder')}
              className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Categories</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3 bg-lavender-600 hover:bg-lavender-700 text-white font-semibold rounded-xl text-sm flex items-center gap-2 shadow-sm"
            >
              <span>{t('next')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW BEFORE SUBMIT */}
      {currentStep === 4 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender-50 dark:bg-lavender-950/50 text-xs font-semibold text-lavender-700 dark:text-lavender-300 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 4 of 4: Review Your Details</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
              {t('reviewTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t('reviewSub')}
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {t('primaryFocus')}:
                </span>
                <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeCategoryObj.title[language] || activeCategoryObj.title.en}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="text-xs text-lavender-600 dark:text-lavender-400 hover:underline font-semibold"
              >
                Change
              </button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-start justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {t('selectedSymptomsLabel')}:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedSymptoms.length > 0 ? (
                    selectedSymptoms.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-lavender-100 dark:bg-lavender-950/80 text-lavender-800 dark:text-lavender-200 rounded-lg text-xs font-medium">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">None selected specifically</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="text-xs text-lavender-600 dark:text-lavender-400 hover:underline font-semibold"
              >
                Edit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {t('durationLabel')}:
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">{duration}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {t('onsetPatternLabel')}:
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1 capitalize">{onsetType}</p>
              </div>
            </div>

            {freeTextDescription && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {t('yourNotesLabel')}:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-1 italic">
                  "{freeTextDescription}"
                </p>
              </div>
            )}
          </div>

          {submitError && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl text-xs sm:text-sm text-rose-700 dark:text-rose-300 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t('back')}</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmitAssessment}
              className="px-8 py-3.5 bg-gradient-to-r from-lavender-600 to-sakhiTeal-600 hover:from-lavender-700 hover:to-sakhiTeal-700 text-white font-semibold rounded-2xl text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('analyzingText')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('generateReportBtn')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: RESULTS DASHBOARD WITH TTS AND DIAGNOSTIC HIERARCHY */}
      {currentStep === 5 && results && (
        <div className="space-y-8 animate-fade-in">
          {/* Header & Actions Toolbar with TTS Read Aloud */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t('reportReady')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {t('resultsTitle')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t('resultsSubtitle')}
              </p>
            </div>

            {/* Print & TTS Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 no-print">
              <TextToSpeechButton text={resultsAudioText} label={t('listenAloud')} />

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 text-xs sm:text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>{t('printSummary')}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('assessAnother')}</span>
              </button>
            </div>
          </div>

          {/* Section 1: What You Described */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2.5 mb-3 text-lavender-700 dark:text-lavender-300 font-bold text-lg">
              <FileDown className="w-5 h-5" />
              <h3>1. {t('whatYouDescribed')}</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {results.symptomSummary}
            </p>
          </div>

          {/* Section 2: What This Symptom Can Mean */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2.5 mb-3 text-teal-700 dark:text-teal-300 font-bold text-lg">
              <Info className="w-5 h-5" />
              <h3>2. {t('whatItMeans')}</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {results.whatItMeans}
            </p>
          </div>

          {/* Section 3: Possible Explanations */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4 text-slate-900 dark:text-white font-bold text-lg">
              <Sparkles className="w-5 h-5 text-lavender-600" />
              <h3>3. {t('possibleExplanations')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.possibleExplanations?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-lavender-50/50 dark:bg-slate-800/60 rounded-2xl border border-lavender-100 dark:border-slate-700/60"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Toggle Symptoms Diagnostic Hierarchy in Results */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowHierarchy(!showHierarchy)}
                className="px-4 py-2 bg-lavender-50 dark:bg-slate-800 hover:bg-lavender-100 text-lavender-700 dark:text-lavender-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Layers className="w-4 h-4" />
                <span>{showHierarchy ? 'Hide Diagnostic Hierarchy' : t('viewDiagnosticHierarchy')}</span>
              </button>
            </div>
          </div>

          {/* Embedded Diagnostic Hierarchy if toggled */}
          {showHierarchy && (
            <div className="animate-fade-in">
              <DiagnosticHierarchy />
            </div>
          )}

          {/* Section 4: What You Can Do Next */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4 text-slate-900 dark:text-white font-bold text-lg">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <h3>4. {t('whatToDoNext')}</h3>
            </div>
            <div className="space-y-3">
              {results.actionableNextSteps?.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800"
                >
                  <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/journal')}
                className="px-5 py-2.5 bg-sakhiTeal-600 hover:bg-sakhiTeal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('saveToJournal')}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/find-care')}
                className="px-5 py-2.5 bg-lavender-50 dark:bg-slate-800 hover:bg-lavender-100 text-lavender-800 dark:text-lavender-200 border border-lavender-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Stethoscope className="w-4 h-4" />
                <span>{t('navFindCare')}</span>
              </button>
            </div>
          </div>

          {/* Section 5: When to Seek Medical Attention (Red Flags) */}
          <div className="bg-rose-50/80 dark:bg-rose-950/30 rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-rose-900/50 shadow-sm">
            <div className="flex items-center gap-2.5 mb-3 text-rose-800 dark:text-rose-300 font-bold text-lg">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <h3>5. {t('whenToSeekCare')}</h3>
            </div>
            <ul className="space-y-2.5">
              {results.whenToSeekCare?.map((alertItem, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-900 dark:text-rose-200"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span>{alertItem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: Questions You May Want to Ask Your Doctor */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-lg">
                <HelpCircle className="w-5 h-5 text-lavender-600" />
                <h3>6. {t('doctorQuestions')}</h3>
              </div>

              <button
                type="button"
                onClick={handleCopyQuestions}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-300 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
              >
                {copiedQuestions ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t('copiedQuestions')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t('copyQuestions')}</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2.5">
              {results.doctorQuestions?.map((question, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-start gap-3"
                >
                  <span className="font-bold text-lavender-600 dark:text-lavender-400">Q{idx + 1}.</span>
                  <span>{question}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Terms Glossary */}
          {results.glossary && results.glossary.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-bold text-base">
                <BookOpen className="w-4 h-4 text-sakhiTeal-600" />
                <h3>{t('medicalGlossary')}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.glossary.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <span className="text-xs font-bold text-lavender-700 dark:text-lavender-300 block mb-1">
                      {g.term}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {g.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Medical Disclaimer & Print Button */}
          <div className="p-6 bg-slate-100 dark:bg-slate-800/80 rounded-3xl text-center text-xs text-slate-600 dark:text-slate-400">
            <p className="max-w-xl mx-auto mb-4">
              <strong>Non-Diagnostic Commitment:</strong> Yajnaseni guidance is strictly educational. Only a qualified medical doctor after physical examination and relevant lab tests can diagnose PCOS or other conditions.
            </p>
            <button
              type="button"
              onClick={handlePrint}
              className="px-6 py-2.5 bg-lavender-600 hover:bg-lavender-700 text-white font-semibold rounded-xl text-xs transition-colors inline-flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>{t('printDoctorHandout')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
