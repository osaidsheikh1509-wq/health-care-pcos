import express from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate.js';
import { optionalAuth } from '../middleware/auth.js';
import { analyzeSymptomsWithGemini } from '../services/geminiService.js';
import { db } from '../db/prisma.js';

const router = express.Router();

export const CATEGORIES_DATA = [
  {
    id: 'menstrual_health',
    title: {
      en: 'Menstrual Health & Flow',
      hi: 'मासिक धर्म और रक्तस्राव',
      kn: 'ಮುಟ್ಟಿನ ಆರೋಗ್ಯ ಮತ್ತು ರಕ್ತಸ್ರಾವ'
    },
    description: {
      en: 'Flow volume, spotting between cycles, heavy bleeding, or clotting.',
      hi: 'रक्तस्राव की मात्रा, बीच में स्पॉटिंग या रक्त के थक्के।',
      kn: 'ರಕ್ತಸ್ರಾವದ ಪ್ರಮಾಣ, ಸಣ್ಣ ರಕ್ತಸ್ರಾವ ಅಥವಾ ಗಂಟುಗಳು.'
    },
    icon: 'Droplet',
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
    title: {
      en: 'Irregular or Missed Periods',
      hi: 'अनियमित या छूटे हुए पीरियड्स',
      kn: 'ಅನಿಯಮಿತ ಅಥವಾ ತಪ್ಪಿದ ಮುಟ್ಟು'
    },
    description: {
      en: 'Cycles longer than 35 days, missed cycles, or unpredictable timing.',
      hi: '35 दिनों से अधिक का चक्र, पीरियड्स मिस होना या अनिश्चित समय।',
      kn: '35 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚಿನ ಅವಧಿ ಅಥವಾ ಮುಟ್ಟು ವಿಳಂಬ.'
    },
    icon: 'Calendar',
    symptoms: [
      { id: 'delayed_cycle', label: { en: 'Periods delayed by weeks or months', hi: 'हफ्तों या महीनों की देरी', kn: 'ವಾರಗಳು ಅಥವಾ ತಿಂಗಳುಗಳ ವಿಳಂಬ' } },
      { id: 'missed_period', label: { en: 'Completely missed 1 or more periods', hi: 'एक या अधिक बार पीरियड न आना', kn: 'ಮುಟ್ಟು ಸಂಪೂರ್ಣವಾಗಿ ತಪ್ಪಿಹೋಗುವುದು' } },
      { id: 'frequent_periods', label: { en: 'Periods coming too frequently (< 21 days)', hi: '21 दिनों से पहले ही पीरियड आ जाना', kn: '21 ದಿನಗಳಿಗಿಂತ ಮುಂಚಿತವಾಗಿ ಮುಟ್ಟು ಬರುವುದು' } },
      { id: 'unpredictable_timing', label: { en: 'Never knowing when the next period will start', hi: 'अगले पीरियड का समय कभी तय न होना', kn: 'ಮುಂದಿನ ಮುಟ್ಟಿನ ದಿನ ತಿಳಿಯದೇ ಇರುವುದು' } }
    ]
  },
  {
    id: 'acne_skin',
    title: {
      en: 'Acne & Skin Changes',
      hi: 'मुंहासे और त्वचा में बदलाव',
      kn: 'ಮೊಡವೆಗಳು ಮತ್ತು ಚರ್ಮದ ಬದಲಾವಣೆ'
    },
    description: {
      en: 'Persistent breakouts along jawline/chin, oily skin, or skin darkening.',
      hi: 'ठुड्डी और जबड़े पर गहरे मुंहासे, ऑयली त्वचा या त्वचा का कालापन।',
      kn: 'ಗಲ್ಲದ ಮೇಲೆ ಮೊಡವೆಗಳು ಅಥವಾ ಚರ್ಮದ ಕಪ್ಪು ಕಲೆಗಳು.'
    },
    icon: 'Sparkles',
    symptoms: [
      { id: 'cystic_acne', label: { en: 'Deep, painful cystic bumps on chin or jawline', hi: 'ठुड्डी या जबड़े पर दर्दनाक गहरे दाने', kn: 'ಗಲ್ಲದ ಮೇಲೆ ಆಳವಾದ ನೋವಿನ ಮೊಡವೆಗಳು' } },
      { id: 'treatment_resistant', label: { en: 'Acne not responding to typical face washes', hi: 'सामान्य क्रीम या फेस वॉश से ठीक न होना', kn: 'ಸಾಮಾನ್ಯ ಕ್ರೀಮ್‌ಗಳಿಗೆ ಪ್ರತಿಕ್ರಿಯಿಸದ ಮೊಡವೆ' } },
      { id: 'dark_patches', label: { en: 'Dark, velvety patches on neck or underarms', hi: 'गर्दन या कांख की त्वचा पर गहरे काले मखमली पैच', kn: 'ಕತ್ತು ಅಥವಾ ಕಂಕುಳಲ್ಲಿ ಕಪ್ಪು ಕಲೆಗಳು' } },
      { id: 'excess_oil', label: { en: 'Excessively oily skin throughout the day', hi: 'दिन भर चेहरे पर अत्यधिक तेल आना', kn: 'ದಿನವಿಡೀ ಚರ್ಮದಲ್ಲಿ ಅತಿಯಾದ ಎಣ್ಣೆ' } }
    ]
  },
  {
    id: 'facial_body_hair',
    title: {
      en: 'Changes in Facial or Body Hair',
      hi: 'चेहरे या शरीर के बालों में बदलाव',
      kn: 'ಮುಖ ಅಥವಾ ದೇಹದ ಕೂದಲಿನಲ್ಲಿ ಬದಲಾವಣೆ'
    },
    description: {
      en: 'Darker or coarser hair on chin, upper lip, chest, or abdomen.',
      hi: 'ठुड्डी, ऊपरी होंठ, छाती या पेट पर मोटे और काले बाल।',
      kn: 'ಗಲ್ಲ, ಮೇಲ್ತುಟಿ ಅಥವಾ ಹೊಟ್ಟೆಯ ಮೇಲೆ ದಪ್ಪ ಕೂದಲು.'
    },
    icon: 'Feather',
    symptoms: [
      { id: 'chin_hair', label: { en: 'Coarse hairs on chin or jaw', hi: 'ठुड्डी या जबड़े पर मोटे बाल', kn: 'ಗಲ್ಲದ ಮೇಲೆ ದಪ್ಪ ಕೂದಲು' } },
      { id: 'upper_lip', label: { en: 'Noticeable upper lip hair growth', hi: 'ऊपरी होंठ पर स्पष्ट बाल आना', kn: 'ಮೇಲ್ತುಟಿಯ ಮೇಲೆ ಕೂದಲು' } },
      { id: 'chest_belly_hair', label: { en: 'Hair along midline of chest or abdomen', hi: 'छाती या नाभि के आसपास बाल', kn: 'ಎದೆ ಅಥವಾ ಹೊಟ್ಟೆಯ ಮೇಲೆ ಕೂದಲು' } },
      { id: 'rapid_growth', label: { en: 'Noticeable increase in hair growth recently', hi: 'हाल ही में बालों का तेजी से बढ़ना', kn: 'ಇತ್ತೀಚೆಗೆ ಕೂದಲಿನ ಬೆಳವಣಿಗೆ ಹೆಚ್ಚಾಗುವುದು' } }
    ]
  },
  {
    id: 'scalp_hair',
    title: {
      en: 'Scalp Hair Changes',
      hi: 'सिर के बालों में बदलाव',
      kn: 'ತಲೆಯ ಕೂದಲಿನ ಬದಲಾವಣೆ'
    },
    description: {
      en: 'Thinning at the crown, widening partition, or excessive hair fall.',
      hi: 'मांग चौड़ी होना, सिर के बीच से बाल पतले होना या अत्यधिक झड़ना।',
      kn: 'ಕೂದಲು ತೆಳುವಾಗುವುದು, ಬೈತಲೆ ಅಗಲವಾಗುವುದು ಅಥವಾ ಕೂದಲು ಉದುರುವುದು.'
    },
    icon: 'Scissors',
    symptoms: [
      { id: 'widening_part', label: { en: 'Noticeably wider center hair part', hi: 'सिर की बीच की मांग चौड़ी होना', kn: 'ಬೈತಲೆ ಅಗಲವಾಗುವುದು' } },
      { id: 'crown_thinning', label: { en: 'Diffuse thinning at the top of the scalp', hi: 'सिर के ऊपरी हिस्से में बाल विरल होना', kn: 'ತಲೆಯ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಕೂದಲು ತೆಳುವಾಗುವುದು' } },
      { id: 'excess_shedding', label: { en: 'Losing large clumps during washing or brushing', hi: 'कंघी या बाल धोते समय गुच्छों में बाल गिरना', kn: 'ಕೂದಲು ತೊಳೆಯುವಾಗ ಹೆಚ್ಚು ಉದುರುವುದು' } }
    ]
  },
  {
    id: 'pelvic_discomfort',
    title: {
      en: 'Pelvic or Abdominal Discomfort',
      hi: 'पेल्विक या पेट के निचले हिस्से में असुविधा',
      kn: 'ಕಿಬ್ಬೊಟ್ಟೆ ಅಥವಾ ಕೆಳಹೊಟ್ಟೆಯ ನೋವು'
    },
    description: {
      en: 'Persistent cramping, dull ache, heaviness, or bloating.',
      hi: 'लगातार ऐंठन, हल्का दर्द, भारीपन या पेट फूलना।',
      kn: 'ಸತತ ಸೆಳೆತ, ಕೆಳಹೊಟ್ಟೆಯಲ್ಲಿ ಭಾರ ಅಥವಾ ಊತ.'
    },
    icon: 'Activity',
    symptoms: [
      { id: 'severe_cramps', label: { en: 'Debilitating cramps before or during periods', hi: 'पीरियड्स के दौरान असहनीय ऐंठन', kn: 'ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ತೀವ್ರ ಸೆಳೆತ' } },
      { id: 'one_sided_pain', label: { en: 'Dull ache or pinching on one side of lower pelvis', hi: 'पेल्विस के एक तरफ हल्का या चुभन वाला दर्द', kn: 'ಕಿಬ್ಬೊಟ್ಟೆಯ ಒಂದು ಬದಿಯಲ್ಲಿ ನೋವು' } },
      { id: 'pelvic_heaviness', label: { en: 'Sensation of weight or pressure in lower pelvis', hi: 'पेल्विस में भारीपन या दबाव महसूस होना', kn: 'ಕೆಳಹೊಟ್ಟೆಯಲ್ಲಿ ಭಾರವಾದ ಅನುಭವ' } },
      { id: 'bloating_distension', label: { en: 'Pronounced lower belly distension', hi: 'पेट के निचले हिस्से में अत्यधिक सूजन या भारीपन', kn: 'ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗ ಊದಿಕೊಳ್ಳುವುದು' } }
    ]
  },
  {
    id: 'fatigue',
    title: {
      en: 'Fatigue & Low Energy',
      hi: 'थकान और ऊर्जा में कमी',
      kn: 'ಆಯಾಸ ಮತ್ತು ಕಡಿಮೆ ಶಕ್ತಿ'
    },
    description: {
      en: 'Persistent low stamina, sluggishness, or afternoon energy crashes.',
      hi: 'दिन भर सुस्ती, कम सहनशक्ति या भोजन के बाद भारी थकान।',
      kn: 'ನಿರಂತರ ನಿಶ್ಯಕ್ತಿ, ಕಡಿಮೆ ಚೈತನ್ಯ ಅಥವಾ ಊಟದ ನಂತರ ಸುಸ್ತು.'
    },
    icon: 'BatteryLow',
    symptoms: [
      { id: 'post_meal_crash', label: { en: 'Severe energy crash or brain fog after meals', hi: 'खाना खाने के बाद बहुत ज्यादा नींद और भारीपन', kn: 'ಊಟದ ನಂತರ ಅತಿಯಾದ ನಿದ್ರಾವಸ್ಥೆ ಮತ್ತು ಆಯಾಸ' } },
      { id: 'unrefreshing_sleep', label: { en: 'Waking up exhausted after 8+ hours of sleep', hi: '8 घंटे सोने के बाद भी थकावट महसूस होना', kn: '8 ಗಂಟೆ ನಿದ್ರಿಸಿದರೂ ಸುಸ್ತು' } },
      { id: 'muscle_weakness', label: { en: 'Low physical stamina for routine chores', hi: 'सामान्य दिनचर्या में भी जल्दी हांफ जाना', kn: 'ದೈನಂದಿನ ಕೆಲಸಗಳಿಗೆ ಶಕ್ತಿ ಇಲ್ಲದಿರುವುದು' } }
    ]
  },
  {
    id: 'other_concerns',
    title: {
      en: 'Other Women\'s Health Concerns',
      hi: 'अन्य महिला स्वास्थ्य चिंताएं',
      kn: 'ಮಹಿಳೆಯರ ಇತರ ಆರೋಗ್ಯ ಕಾಳಜಿಗಳು'
    },
    description: {
      en: 'Mood swings, temperature sensitivity, sleep disruptions, or weight shifts.',
      hi: 'मूड में तेजी से बदलाव, नींद की परेशानी या वजन का असामान्य बढ़ना।',
      kn: 'ಮನಸ್ಥಿತಿಯ ಬದಲಾವಣೆ, ನಿದ್ರೆಯ ಸಮಸ್ಯೆ ಅಥವಾ ತೂಕದ ಏರಿಕೆ.'
    },
    icon: 'HeartHandshake',
    symptoms: [
      { id: 'mood_changes', label: { en: 'Severe emotional irritability or sadness before periods', hi: 'पीरियड्स से पहले तेज चिड़चिड़ापन या उदासी', kn: 'ಮುಟ್ಟಿಗೆ ಮುನ್ನ ತೀವ್ರ ಕೋಪ ಅಥವಾ ದುಃಖ' } },
      { id: 'sugar_cravings', label: { en: 'Intense cravings for sweets and refined carbs', hi: 'मीठी चीजों या कार्ब्स की तीव्र लालसा', kn: 'ಸಿಹಿ ಪದಾರ್ಥಗಳ ಅತಿಯಾದ ಬಯಕೆ' } },
      { id: 'weight_difficulty', label: { en: 'Difficulty managing weight despite regular habits', hi: 'नियमित आदतों के बावजूद वजन नियंत्रित करने में कठिनाई', kn: 'ತೂಕ ನಿಯಂತ್ರಣಕ್ಕೆ ಕಷ್ಟವಾಗುವುದು' } },
      { id: 'sleep_issues', label: { en: 'Difficulty falling or staying asleep', hi: 'नींद आने या गहरी नींद में रुकावट', kn: 'ನಿದ್ರಾಹೀನತೆ' } }
    ]
  }
];

// Zod schema for symptom assessment request
const assessSchema = z.object({
  language: z.enum(['en', 'hi', 'kn']).default('en'),
  category: z.string().min(1, 'Category is required'),
  symptoms: z.array(z.string()).default([]),
  duration: z.string().min(1, 'Duration is required'),
  onsetType: z.string().min(1, 'Onset pattern is required'),
  freeTextDescription: z.string().optional().default(''),
  additionalContext: z.string().optional().default('')
});

// GET /api/symptoms/categories
router.get('/categories', (req, res) => {
  res.json({
    success: true,
    data: CATEGORIES_DATA
  });
});

// POST /api/symptoms/assess
router.post('/assess', optionalAuth, validateBody(assessSchema), async (req, res) => {
  try {
    const { language, category, symptoms, duration, onsetType, freeTextDescription, additionalContext } = req.validatedBody;

    const analysis = await analyzeSymptomsWithGemini({
      language,
      category,
      symptoms,
      duration,
      onsetType,
      freeTextDescription,
      additionalContext
    });

    // Save assessment to database or in-memory fallback
    const saved = await db.createAssessment({
      userId: req.user?.id || null,
      language,
      primaryCategory: category,
      symptoms: JSON.stringify(symptoms),
      duration,
      onsetType,
      additionalContext: additionalContext || null,
      freeTextDescription: freeTextDescription || null,
      source: analysis.source,
      symptomSummary: analysis.symptomSummary,
      whatItMeans: analysis.whatItMeans,
      possibleExplanations: JSON.stringify(analysis.possibleExplanations),
      actionableNextSteps: JSON.stringify(analysis.actionableNextSteps),
      whenToSeekCare: JSON.stringify(analysis.whenToSeekCare),
      doctorQuestions: JSON.stringify(analysis.doctorQuestions),
      glossary: JSON.stringify(analysis.glossary || [])
    });

    res.json({
      success: true,
      data: {
        id: saved.id,
        ...analysis,
        createdAt: saved.createdAt
      }
    });
  } catch (err) {
    console.error('Error during symptom assessment:', err);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your symptoms. Please try again.'
    });
  }
});

// GET /api/symptoms/history
router.get('/history', optionalAuth, async (req, res) => {
  if (!req.user) {
    return res.json({ success: true, data: [] });
  }

  try {
    const records = await db.getAssessmentsByUserId(req.user.id);
    const parsed = records.map((r) => ({
      ...r,
      symptoms: typeof r.symptoms === 'string' ? JSON.parse(r.symptoms) : r.symptoms,
      possibleExplanations: typeof r.possibleExplanations === 'string' ? JSON.parse(r.possibleExplanations) : r.possibleExplanations,
      actionableNextSteps: typeof r.actionableNextSteps === 'string' ? JSON.parse(r.actionableNextSteps) : r.actionableNextSteps,
      whenToSeekCare: typeof r.whenToSeekCare === 'string' ? JSON.parse(r.whenToSeekCare) : r.whenToSeekCare,
      doctorQuestions: typeof r.doctorQuestions === 'string' ? JSON.parse(r.doctorQuestions) : r.doctorQuestions,
      glossary: typeof r.glossary === 'string' ? JSON.parse(r.glossary) : r.glossary
    }));

    res.json({ success: true, data: parsed });
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch assessment history' });
  }
});

export default router;
