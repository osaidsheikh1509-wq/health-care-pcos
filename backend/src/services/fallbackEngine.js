// Clinical rule-based decision matrix for Sakhi Health
// Provides comprehensive, safe, multilingual symptom guidance when AI API is unavailable or unconfigured.
// Stays strictly non-diagnostic and aligns with clinical health guidance (WHO/NHS/ACOG).

export const CLINICAL_FALLBACK_DATA = {
  menstrual_health: {
    en: {
      symptomSummary: "You shared observations regarding your menstrual health and bleeding characteristics.",
      whatItMeans: "The menstrual cycle is a key indicator of overall endocrine and reproductive health. Flow, cycle regularity, and associated discomfort reflect the balanced interplay of estrogen, progesterone, and other metabolic regulators. Temporary changes can occur due to routine life factors, while consistent shifts deserve professional review.",
      possibleExplanations: [
        {
          title: "Hormonal & Ovulatory Fluctuations",
          description: "Minor hormonal imbalances or irregular ovulation can alter bleeding patterns, clot formation, or cycle length.",
          requiresClarification: false
        },
        {
          title: "Elevated Physical or Emotional Stress",
          description: "Cortisol (the stress hormone) directly influences the hypothalamic-pituitary-ovarian axis, potentially delaying or altering menstrual flow.",
          requiresClarification: false
        },
        {
          title: "Thyroid Variations (Hypothyroidism / Hyperthyroidism)",
          description: "An underactive or overactive thyroid gland frequently impacts cycle timing, flow volume, and energy levels.",
          requiresClarification: false
        },
        {
          title: "Polycystic Ovary Syndrome (PCOS)",
          description: "PCOS is one possible underlying condition where hormonal imbalances lead to infrequent ovulation and cycle changes, but requires medical evaluation to diagnose.",
          requiresClarification: true
        }
      ],
      actionableNextSteps: [
        "Track your menstrual start dates, duration, flow intensity, and pain levels for at least 2 to 3 consecutive cycles using the My Health Journal module.",
        "Maintain consistent sleep schedules (7-8 hours) to support natural melatonin and cortisol balance.",
        "Prioritize balanced nutrition rich in whole foods, iron, complex carbohydrates, and leafy greens.",
        "Schedule an evaluation with a certified gynecologist if variations persist beyond 2 consecutive cycles."
      ],
      whenToSeekCare: [
        "Bleeding so heavy that you soak through two or more standard pads or tampons every hour for two consecutive hours.",
        "Passing blood clots larger than a quarter (approx. 2.5 cm).",
        "Severe, debilitating pelvic or lower abdominal pain that does not respond to standard over-the-counter pain relievers.",
        "Bleeding lasting longer than 7 to 8 consecutive days.",
        "Sudden high fever, chills, dizziness, or lightheadedness during your period."
      ],
      doctorQuestions: [
        "Could my symptoms be linked to a hormonal fluctuation, thyroid concern, or PCOS?",
        "Do you recommend checking a complete blood count (for iron deficiency) or a hormone panel?",
        "Should we consider a pelvic ultrasound to examine my uterine lining and ovaries?",
        "What specific cycle changes should prompt an immediate follow-up visit?"
      ],
      glossary: [
        { term: "Endometrium", explanation: "The tissue lining the inside of the uterus that thickens and sheds during each menstrual cycle." },
        { term: "Anovulatory Cycle", explanation: "A menstrual cycle where the ovary does not release an egg, often leading to irregular or delayed bleeding." },
        { term: "Progesterone", explanation: "A natural hormone produced after ovulation that stabilizes the uterine lining and promotes cycle regularity." }
      ]
    },
    hi: {
      symptomSummary: "आपने अपने मासिक धर्म (पीरियड्स) और रक्तस्राव से संबंधित लक्षणों का विवरण दिया है।",
      whatItMeans: "मासिक धर्म चक्र आपके समग्र हार्मोनल और प्रजनन स्वास्थ्य का एक महत्वपूर्ण आईना है। चक्र की अवधि और रक्तस्राव में बदलाव एस्ट्रोजन और प्रोजेस्टेरोन हार्मोन के संतुलन पर निर्भर करता है। तनाव, आहार या दिनचर्या में बदलाव से अल्पकालिक परिवर्तन सामान्य हैं, लेकिन लगातार बदलाव की डॉक्टर से जांच आवश्यक है।",
      possibleExplanations: [
        {
          title: "हार्मोनल असंतुलन और ओव्यूलेशन में बदलाव",
          description: "हार्मोन के स्तर में मामूली उतार-चढ़ाव या अंडोत्सर्जन (ovulation) में देरी से रक्तस्राव में बदलाव आ सकता है।",
          requiresClarification: false
        },
        {
          title: "शारीरिक या मानसिक तनाव",
          description: "तनाव का सीधा असर मस्तिष्क के उन केंद्रों पर पड़ता है जो मासिक धर्म को नियंत्रित करते हैं।",
          requiresClarification: false
        },
        {
          title: "थायरॉइड ग्रंथि में बदलाव",
          description: "थायरॉइड हार्मोन की कमी या अधिकता से पीरियड्स के समय और रक्तस्राव में अंतर आ सकता है।",
          requiresClarification: false
        },
        {
          title: "पॉलीसिस्टिक ओवरी सिंड्रोम (PCOS)",
          description: "PCOS एक ऐसी स्थिति हो सकती है जिसमें हार्मोनल असंतुलन के कारण पीरियड्स अनियमित होते हैं, लेकिन इसका निदान केवल डॉक्टर ही कर सकते हैं।",
          requiresClarification: true
        }
      ],
      actionableNextSteps: [
        "माय हेल्थ जर्नल में अगले 2-3 महीनों के लिए अपने पीरियड्स की तारीखें और लक्षण नियमित रूप से दर्ज करें।",
        "हार्मोनल संतुलन के लिए 7-8 घंटे की गहरी नींद लें और तनाव कम करने के उपाय करें।",
        "आयरन और हरी पत्तेदार सब्जियों से भरपूर संतुलित भोजन लें।",
        "यदि लक्षण 2 महीने से अधिक समय तक बने रहें तो स्त्री रोग विशेषज्ञ (Gynecologist) से परामर्श लें।"
      ],
      whenToSeekCare: [
        "लगातार 2 घंटे तक हर घंटे दो या अधिक पैड पूरी तरह भीग जाना।",
        "सिक्के से बड़े आकार के रक्त के थक्के (blood clots) निकलना।",
        "असहनीय पेट या पेल्विक दर्द जो सामान्य दवा से ठीक न हो।",
        "पीरियड्स 7-8 दिनों से अधिक समय तक लगातार चलना।",
        "चक्कर आना, कमजोरी या अचानक तेज बुखार होना।"
      ],
      doctorQuestions: [
        "क्या मेरे लक्षण हार्मोनल असंतुलन, थायरॉइड या PCOS से संबंधित हो सकते हैं?",
        "क्या मुझे हीमोग्लोबिन या हार्मोन टेस्ट करवाने की आवश्यकता है?",
        "क्या गर्भाशय और अंडाशय की स्थिति जानने के लिए पेल्विक अल्ट्रासाउंड की आवश्यकता है?",
        "मुझे अपने खान-पान या जीवनशैली में क्या सुधार करना चाहिए?"
      ],
      glossary: [
        { term: "ओव्यूलेशन (Ovulation)", explanation: "अंडाशय से हर महीने एक परिपक्व अंडा निकलने की प्राकृतिक प्रक्रिया।" },
        { term: "प्रोजेस्टेरोन (Progesterone)", explanation: "एक महत्वपूर्ण महिला हार्मोन जो पीरियड्स को नियमित रखने में मदद करता है।" }
      ]
    },
    kn: {
      symptomSummary: "ನಿಮ್ಮ ಮುಟ್ಟಿನ ಆರೋಗ್ಯ ಮತ್ತು ರಕ್ತಸ್ರಾವದ ಲಕ್ಷಣಗಳ ವಿವರಗಳನ್ನು ನೀವು ಹಂಚಿಕೊಂಡಿದ್ದೀರಿ.",
      whatItMeans: "ಋತುಚಕ್ರವು ಮಹಿಳೆಯರ ಒಟ್ಟಾರೆ ಹಾರ್ಮೋನ್ ಮತ್ತು ಸಂತಾನೋತ್ಪತ್ತಿ ಆರೋಗ್ಯದ ಪ್ರಮುಖ ಸೂಚಕವಾಗಿದೆ. ಹರಿವಿನಲ್ಲಿ ಮತ್ತು ದಿನಗಳಲ್ಲಿ ಬದಲಾವಣೆಗಳು ಈಸ್ಟ್ರೊಜೆನ್ ಮತ್ತು ಪ್ರೊಜೆಸ್ಟರಾನ್ ಹಾರ್ಮೋನ್‌ಗಳ ಸಮತೋಲನವನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ. ಸಣ್ಣಪುಟ್ಟ ಬದಲಾವಣೆಗಳು ಸಾಮಾನ್ಯ, ಆದರೆ ದೀರ್ಘಕಾಲದ ಬದಲಾವಣೆಗಳಿಗೆ ವೈದ್ಯಕೀಯ ತಪಾಸಣೆ ಅಗತ್ಯ.",
      possibleExplanations: [
        {
          title: "ಹಾರ್ಮೋನ್ ಏರಿಳಿತಗಳು",
          description: "ಹಾರ್ಮೋನ್ ವ್ಯತ್ಯಾಸಗಳಿಂದಾಗಿ ಅಂಡೋತ್ಪತ್ತಿ ವಿಳಂಬವಾಗಬಹುದು ಮತ್ತು ಮುಟ್ಟಿನ ದಿನಗಳು ಬದಲಾಗಬಹುದು.",
          requiresClarification: false
        },
        {
          title: "ಮಾನಸಿಕ ಅಥವಾ ದೈಹಿಕ ಒತ್ತಡ",
          description: "ಹೆಚ್ಚಿನ ಒತ್ತಡವು ಮುಟ್ಟನ್ನು ನಿಯಂತ್ರಿಸುವ ಹಾರ್ಮೋನ್ ಕೇಂದ್ರಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ.",
          requiresClarification: false
        },
        {
          title: "ಥೈರಾಯ್ಡ್ ಸಮಸ್ಯೆಗಳು",
          description: "ಥೈರಾಯ್ಡ್ ಹಾರ್ಮೋನ್ ಹೆಚ್ಚು ಅಥವಾ ಕಡಿಮೆಯಾದಾಗ ಮುಟ್ಟು ಅನಿಯಮಿತವಾಗಬಹುದು.",
          requiresClarification: false
        },
        {
          title: "ಪಾಲಿಸಿಸ್ಟಿಕ್ ಓವರಿ ಸಿಂಡ್ರೋಮ್ (PCOS)",
          description: "PCOS ಹಾರ್ಮೋನ್ ಅಸಮತೋಲನದಿಂದ ಉಂಟಾಗುವ ಒಂದು ಸಾಧ್ಯತೆಯಾಗಿದೆ, ಇದನ್ನು ವೈದ್ಯರು ಮಾತ್ರ ಪರೀಕ್ಷಿಸಿ ದೃಢೀಕರಿಸಬಹುದು.",
          requiresClarification: true
        }
      ],
      actionableNextSteps: [
        "ನಿಮ್ಮ ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳು ಮತ್ತು ರಕ್ತಸ್ರಾವದ ವಿವರಗಳನ್ನು ಹೆಲ್ತ್ ಜರ್ನಲ್‌ನಲ್ಲಿ ಕನಿಷ್ಠ 2-3 ತಿಂಗಳು ದಾಖಲಿಸಿ.",
        "ದಿನಕ್ಕೆ 7-8 ಗಂಟೆಗಳ ಕಾಲ ಉತ್ತಮ ನಿದ್ರೆ ಮಾಡಿ ಮತ್ತು ಒತ್ತಡವನ್ನು ಕಡಿಮೆ ಮಾಡಿಕೊಳ್ಳಿ.",
        "ಕಬ್ಬಿಣಾಂಶ ಮತ್ತು ಪೌಷ್ಟಿಕಾಂಶವಿರುವ ಸಮತೋಲಿತ ಆಹಾರವನ್ನು ಸೇವಿಸಿ.",
        "ಸಮಸ್ಯೆಗಳು ಮುಂದುವರಿದರೆ ಸ್ತ್ರೀರೋಗ ತಜ್ಞರನ್ನು (Gynecologist) ಭೇಟಿ ಮಾಡಿ."
      ],
      whenToSeekCare: [
        "ಪ್ರತಿ ಗಂಟೆಗೆ ಎರಡು ಅಥವಾ ಹೆಚ್ಚಿನ ಪ್ಯಾಡ್‌ಗಳು ಪೂರ್ತಿಯಾಗಿ ಒದ್ದೆಯಾಗುವುದು.",
        "ದೊಡ್ಡ ರಕ್ತದ ಗಂಟುಗಳು (blood clots) ಕಾಣಿಸಿಕೊಳ್ಳುವುದು.",
        "ಅಸಹನೀಯ ಹೊಟ್ಟೆ ನೋವು ಅಥವಾ ತಲೆತಿರುಗುವಿಕೆ.",
        "ಮುಟ್ಟು 7-8 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ಮುಂದುವರಿಯುವುದು."
      ],
      doctorQuestions: [
        "ನನ್ನ ಲಕ್ಷಣಗಳು ಹಾರ್ಮೋನ್ ಬದಲಾವಣೆ ಅಥವಾ PCOS ಗೆ ಸಂಬಂಧಿಸಿರಬಹುದೇ?",
        "ನನಗೆ ಥೈರಾಯ್ಡ್ ಅಥವಾ ರಕ್ತ ಪರೀಕ್ಷೆಗಳ ಅಗತ್ಯವಿದೆಯೇ?",
        "ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿಸಬೇಕೇ?"
      ],
      glossary: [
        { term: "ಅಂಡೋತ್ಪತ್ತಿ (Ovulation)", explanation: "ಅಂಡಾಶಯದಿಂದ ಅಂಡಾಣು ಬಿಡುಗಡೆಯಾಗುವ ನೈಸರ್ಗಿಕ ಪ್ರಕ್ರಿಯೆ." }
      ]
    }
  },

  irregular_periods: {
    en: {
      symptomSummary: "You reported irregular cycles, missed periods, or unpredictable timing between periods.",
      whatItMeans: "A typical menstrual cycle ranges from 21 to 35 days. When cycles occur less frequently (longer than 35 days apart) or vary widely in timing, it indicates that ovulation is not happening on a predictable schedule. Irregularity can be temporary or part of an ongoing endocrine pattern.",
      possibleExplanations: [
        {
          title: "Polycystic Ovary Syndrome (PCOS)",
          description: "PCOS is one of the most common reasons for irregular or infrequent periods in women of reproductive age, characterized by elevated androgens and anovulation.",
          requiresClarification: true
        },
        {
          title: "Lifestyle, Diet, or Significant Weight Changes",
          description: "Sudden weight loss, rapid weight gain, intense athletic training, or strict caloric restriction can disrupt leptin and GnRH pulsatility.",
          requiresClarification: false
        },
        {
          title: "Thyroid Gland Dysfunction",
          description: "Thyroid hormones interact closely with ovarian function; abnormal thyroid levels can cause missed or irregular periods.",
          requiresClarification: false
        },
        {
          title: "Hyperprolactinemia or Pituitary Variation",
          description: "Elevated prolactin (a hormone produced by the pituitary gland) can suppress normal ovarian stimulation.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "Record the exact start dates and cycle lengths for the last 3 to 6 months to share with your physician.",
        "Focus on steady, nourishing meals with moderate low-glycemic carbohydrates to help stabilize blood glucose.",
        "Incorporate moderate, restorative movement like walking, yoga, or light resistance training.",
        "Consult a gynecologist or endocrinologist for standard evaluation (hormone blood panel and pelvic ultrasound)."
      ],
      whenToSeekCare: [
        "You have not had a period for 3 or more consecutive months (without pregnancy).",
        "Your periods were previously regular and have suddenly become very irregular for over 3 cycles.",
        "Severe pelvic pain, unusual vaginal discharge, or abnormal bleeding between periods occurs.",
        "You experience sudden, unexplained hair loss or excessive facial hair growth alongside missed periods."
      ],
      doctorQuestions: [
        "Based on my cycle history, should we evaluate for PCOS according to the Rotterdam criteria?",
        "Which specific hormone tests (e.g., FSH, LH, Free Testosterone, AMH, TSH, Prolactin) do you advise?",
        "Will an ultrasound help clarify whether multiple immature follicles are present on my ovaries?",
        "What lifestyle or medical interventions can help re-establish a regular menstrual rhythm?"
      ],
      glossary: [
        { term: "Oligomenorrhea", explanation: "Infrequent or unusually light menstrual periods with cycles longer than 35 days." },
        { term: "Rotterdam Criteria", explanation: "The international clinical guideline used by doctors to assess PCOS, requiring at least 2 of 3 features: irregular ovulation, signs of high androgens, and polycystic ovaries on ultrasound." },
        { term: "LH/FSH Ratio", explanation: "Hormones produced by the brain to signal the ovaries. An altered ratio is frequently observed in ovulatory variations." }
      ]
    },
    hi: {
      symptomSummary: "आपने अनियमित मासिक धर्म, छूटे हुए पीरियड्स या पीरियड्स के बीच अत्यधिक अंतर का उल्लेख किया है।",
      whatItMeans: "सामान्य मासिक धर्म चक्र 21 से 35 दिनों का होता है। यदि चक्र 35 दिनों से अधिक लंबा हो या समय अप्रत्याशित हो, तो इसका अर्थ है कि ओव्यूलेशन (अंडा बनना और छूटना) नियमित रूप से नहीं हो रहा है।",
      possibleExplanations: [
        {
          title: "पॉलीसिस्टिक ओवरी सिंड्रोम (PCOS)",
          description: "PCOS अनियमित पीरियड्स का एक प्रमुख कारण हो सकता है, लेकिन इसके लिए चिकित्सकीय परीक्षण आवश्यक है।",
          requiresClarification: true
        },
        {
          title: "अचानक वजन में बदलाव या तनाव",
          description: "तेजी से वजन बढ़ना या घटना, अत्यधिक कसरत या भारी मानसिक तनाव पीरियड्स को रोक या बदल सकता है।",
          requiresClarification: false
        },
        {
          title: "थायरॉइड हार्मोन में असंतुलन",
          description: "थायरॉइड ग्रंथि के असंतुलन से पीरियड्स में देरी या अनियमितता हो सकती है।",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "पिछले 3 से 6 महीनों के पीरियड्स की तारीखें लिख लें ताकि डॉक्टर को दिखा सकें।",
        "संतुलित खान-पान रखें और अत्यधिक मीठा या रिफाइंड आटा कम करें।",
        "हल्का व्यायाम या योग अपनी दिनचर्या में शामिल करें।",
        "स्त्री रोग विशेषज्ञ से मिलकर हार्मोनल टेस्ट और अल्ट्रासाउंड पर चर्चा करें।"
      ],
      whenToSeekCare: [
        "यदि लगातार 3 महीने या उससे अधिक समय से पीरियड्स नहीं आए हों (गर्भावस्था न होने पर)।",
        "अचानक तेज पेट दर्द या असामान्य ब्लीडिंग होना।",
        "पीरियड्स में देरी के साथ चेहरे पर बाल आना या सिर के बाल तेजी से झड़ना।"
      ],
      doctorQuestions: [
        "क्या मेरे लक्षण PCOS की ओर इशारा करते हैं?",
        "मुझे कौन-कौन से हार्मोनल टेस्ट (जैसे TSH, LH, FSH, Testosterone) कराने चाहिए?",
        "क्या पेल्विक अल्ट्रासाउंड की आवश्यकता है?"
      ],
      glossary: [
        { term: "रोटरडैम मानदंड (Rotterdam Criteria)", explanation: "डॉक्टरों द्वारा PCOS के मूल्यांकन के लिए उपयोग किए जाने वाले अंतरराष्ट्रीय चिकित्सा नियम।" }
      ]
    },
    kn: {
      symptomSummary: "ಅನಿಯಮಿತ ಮುಟ್ಟು, ಮುಟ್ಟು ತಪ್ಪಿಹೋಗುವುದು ಅಥವಾ ದೀರ್ಘಕಾಲದ ವಿಳಂಬದ ಬಗ್ಗೆ ನೀವು ತಿಳಿಸಿದ್ದೀರಿ.",
      whatItMeans: "ಸಾಮಾನ್ಯವಾಗಿ ಮುಟ್ಟಿನ ಚಕ್ರವು 21 ರಿಂದ 35 ದಿನಗಳದ್ದಾಗಿರುತ್ತದೆ. 35 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಸಮಯ ತೆಗೆದುಕೊಂಡರೆ, ಅಂಡೋತ್ಪತ್ತಿ ಸರಿಯಾಗಿ ನಡೆಯುತ್ತಿಲ್ಲ ಎಂದರ್ಥ.",
      possibleExplanations: [
        {
          title: "ಪಾಲಿಸಿಸ್ಟಿಕ್ ಓವರಿ ಸಿಂಡ್ರೋಮ್ (PCOS)",
          description: "PCOS ಅನಿಯಮಿತ ಮುಟ್ಟಿಗೆ ಸಾಮಾನ್ಯ ಕಾರಣಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ, ಆದರೆ ಇದನ್ನು ವೈದ್ಯರು ಮಾತ್ರ ಖಚಿತಪಡಿಸಬೇಕು.",
          requiresClarification: true
        },
        {
          title: "ಒತ್ತಡ ಅಥವಾ ತೂಕದ ಬದಲಾವಣೆ",
          description: "ತೂಕದಲ್ಲಿ ಹಠಾತ್ ಏರಿಕೆ/ಇಳಿಕೆ ಅಥವಾ ಹೆಚ್ಚಿನ ಮಾನಸಿಕ ಒತ್ತಡವು ಮುಟ್ಟನ್ನು ತಡೆಹಿಡಿಯಬಹುದು.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "ಕಳೆದ 3-6 ತಿಂಗಳ ಮುಟ್ಟಿನ ವಿವರಗಳನ್ನು ದಾಖಲಿಸಿಕೊಳ್ಳಿ.",
        "ಸಕ್ಕರೆ ಮತ್ತು ಸಂಸ್ಕರಿಸಿದ ಆಹಾರವನ್ನು ಕಡಿಮೆ ಮಾಡಿ, ಪೌಷ್ಟಿಕ ಆಹಾರ ಸೇವಿಸಿ.",
        "ಸ್ತ್ರೀರೋಗ ತಜ್ಞರನ್ನು ಭೇಟಿ ಮಾಡಿ ಸೂಕ್ತ ಪರೀಕ್ಷೆಗಳನ್ನು ಮಾಡಿಸಿಕೊಳ್ಳಿ."
      ],
      whenToSeekCare: [
        "3 ತಿಂಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ಮುಟ್ಟು ಬಾರದೇ ಇರುವುದು.",
        "ತೀವ್ರ ಹೊಟ್ಟೆ ನೋವು ಅಥವಾ ಅಸಾಮಾನ್ಯ ರಕ್ತಸ್ರಾವ."
      ],
      doctorQuestions: [
        "ನನ್ನ ಅನಿಯಮಿತ ಮುಟ್ಟಿಗೆ PCOS ಕಾರಣವಾಗಿರಬಹುದೇ?",
        "ಯಾವ ರಕ್ತ ಪರೀಕ್ಷೆಗಳು ಅಥವಾ ಸ್ಕ್ಯಾನ್ ಅಗತ್ಯವಿದೆ?"
      ],
      glossary: [
        { term: "ಆಲಿಗೋಮೆನೋರಿಯಾ", explanation: "35 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಅವಧಿಯ ದೀರ್ಘ ಅಥವಾ ವಿಳಂಬವಾದ ಮುಟ್ಟಿನ ಚಕ್ರ." }
      ]
    }
  },

  acne_skin: {
    en: {
      symptomSummary: "You noted persistent acne, deep breakout flare-ups along the jawline or chin, or other skin changes.",
      whatItMeans: "Adult acne, particularly when centered along the lower face, jawline, and chin, is frequently hormonally driven. Sebaceous (oil) glands in the skin are sensitive to androgen hormones. Excess oil combined with skin cell buildup creates inflammation.",
      possibleExplanations: [
        {
          title: "Hormonal Sensitivity to Androgens",
          description: "Higher levels of androgen hormones or heightened receptor sensitivity in skin tissue stimulate excess sebum production.",
          requiresClarification: false
        },
        {
          title: "Polycystic Ovary Syndrome (PCOS)",
          description: "Stubborn, treatment-resistant hormonal acne is one of the classic signs of hyperandrogenism seen in many individuals with PCOS.",
          requiresClarification: true
        },
        {
          title: "Insulin Resistance",
          description: "High circulating insulin triggers the ovaries to produce more androgens and raises IGF-1, which directly exacerbates skin breakouts.",
          requiresClarification: false
        },
        {
          title: "Cosmetic, Barrier, or Environmental Factors",
          description: "Comedogenic skincare products, impaired moisture barrier, or chronic stress can cause localized breakouts.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "Adopt a gentle, non-stripping skincare routine using fragrance-free, non-comedogenic cleansers and lightweight moisturizers.",
        "Consider gentle over-the-counter actives like salicylic acid (BHA) or azelaic acid under dermatological guidance.",
        "Reduce consumption of high-glycemic index foods and ultra-processed sugars that spike insulin.",
        "Consult both a dermatologist and gynecologist if acne is accompanied by irregular periods or facial hair."
      ],
      whenToSeekCare: [
        "Deep, painful, cystic acne nodules that risk scarring.",
        "Acne unresponsive to conventional topical treatments for more than 3 to 6 months.",
        "Acne accompanied by dark, velvety patches of skin on the neck, armpits, or groin (Acanthosis Nigricans)."
      ],
      doctorQuestions: [
        "Could my acne be a manifestation of internal hormonal or androgen elevation?",
        "Would it be helpful to assess fasting insulin and glucose alongside a hormone screen?",
        "Are there hormonal treatments (like spironolactone or specific combined oral contraceptives) suitable for me?"
      ],
      glossary: [
        { term: "Androgens", explanation: "Hormones present in all genders (including testosterone) that influence oil glands, hair follicles, and reproductive tissue." },
        { term: "Acanthosis Nigricans", explanation: "Velvety, hyperpigmented skin patches in folds, often indicating insulin resistance." }
      ]
    },
    hi: {
      symptomSummary: "आपने चेहरे, जबड़े (jawline) पर मुंहासे (acne) या त्वचा में बदलाव का विवरण दिया है।",
      whatItMeans: "वयस्क महिलाओं में जबड़े और ठुड्डी के आसपास होने वाले मुंहासे आमतौर पर हार्मोनल उतार-चढ़ाव से जुड़े होते हैं। त्वचा की तेल ग्रंथियां एंड्रोजन हार्मोन के प्रति संवेदनशील होती हैं, जिससे अत्यधिक सीबम (तेल) बनता है।",
      possibleExplanations: [
        {
          title: "हार्मोनल असंतुलन (एंड्रोजन की अधिकता)",
          description: "पुरुष हार्मोन (जैसे टेस्टोस्टेरोन) के स्तर में वृद्धि से त्वचा में अधिक तेल बनता है, जिससे मुंहासे होते हैं।",
          requiresClarification: false
        },
        {
          title: "PCOS (पॉलीसिस्टिक ओवरी सिंड्रोम)",
          description: "हार्मोनल मुंहासे PCOS का एक सामान्य लक्षण हो सकते हैं, विशेष रूप से यदि पीरियड्स भी अनियमित हों।",
          requiresClarification: true
        },
        {
          title: "इंसुलिन प्रतिरोध (Insulin Resistance)",
          description: "रक्त में इंसुलिन का अधिक स्तर हार्मोनल असंतुलन को बढ़ाता है और मुंहासों को जन्म दे सकता है।",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "चेहरे को दिन में दो बार सौम्य (gentle) क्लीन्ज़र से धोएं और नॉन-कॉमेडोजेनिक उत्पादों का उपयोग करें।",
        "मीठी चीजें, पैकेज्ड फूड और अत्यधिक तली-भुनी चीजें कम करें।",
        "मुंहासों को फोड़ें या दबाएं नहीं, इससे दाग पड़ सकते हैं।",
        "त्वचा विशेषज्ञ (Dermatologist) और स्त्री रोग विशेषज्ञ से सलाह लें।"
      ],
      whenToSeekCare: [
        "दर्दनाक सिस्टिक मुंहासे (गहरे दाने) जो ठीक न हो रहे हों।",
        "गर्दन या कांख (armpits) की त्वचा का काला और मखमली होना (Acanthosis Nigricans)।"
      ],
      doctorQuestions: [
        "क्या मेरे मुंहासे हार्मोनल असंतुलन या PCOS से जुड़े हैं?",
        "क्या मुझे इंसुलिन और हार्मोन टेस्ट कराने चाहिए?"
      ],
      glossary: [
        { term: "सीबम (Sebum)", explanation: "त्वचा की ग्रंथियों द्वारा उत्पादित प्राकृतिक तेल।" }
      ]
    },
    kn: {
      symptomSummary: "ಮುಖ ಮತ್ತು ಗಲ್ಲದ ಮೇಲೆ ನಿರಂತರ ಮೊಡವೆಗಳು ಅಥವಾ ಚರ್ಮದ ಬದಲಾವಣೆಗಳ ವಿವರ ಹಂಚಿಕೊಂಡಿದ್ದೀರಿ.",
      whatItMeans: "ಗಲ್ಲ ಮತ್ತು ಕತ್ತಿನ ಸುತ್ತಲಿನ ಮೊಡವೆಗಳು ಸಾಮಾನ್ಯವಾಗಿ ಹಾರ್ಮೋನ್ ಏರಿಳಿತಗಳಿಂದ ಉಂಟಾಗುತ್ತವೆ. ಎಣ್ಣೆ ಗ್ರಂಥಿಗಳು ಹಾರ್ಮೋನ್‌ಗಳಿಗೆ ಪ್ರತಿಕ್ರಿಯಿಸಿದಾಗ ಉರಿಯೂತ ಉಂಟಾಗುತ್ತದೆ.",
      possibleExplanations: [
        {
          title: "ಹಾರ್ಮೋನ್ ಅಸಮತೋಲನ",
          description: "ಆಂಡ್ರೋಜನ್ ಹಾರ್ಮೋನುಗಳ ಹೆಚ್ಚಳದಿಂದ ಚರ್ಮದಲ್ಲಿ ಹೆಚ್ಚು ಎಣ್ಣೆ ಉತ್ಪತ್ತಿಯಾಗುತ್ತದೆ.",
          requiresClarification: false
        },
        {
          title: "PCOS ಸಾಧ್ಯತೆ",
          description: "ಅನಿಯಮಿತ ಮುಟ್ಟಿನೊಂದಿಗೆ ನಿರಂತರ ಮೊಡವೆಗಳಿದ್ದರೆ, PCOS ಬಗ್ಗೆ ಪರೀಕ್ಷಿಸುವುದು ಸೂಕ್ತ.",
          requiresClarification: true
        }
      ],
      actionableNextSteps: [
        "ಸೌಮ್ಯವಾದ ಮುಖ ತೊಳೆಯುವ ಫೇಸ್ ವಾಶ್ ಬಳಸಿ.",
        "ಸಿಹಿ ಮತ್ತು ಜಂಕ್ ಫುಡ್ ಸೇವನೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ.",
        "ಚರ್ಮ ರೋಗ ತಜ್ಞರನ್ನು (Dermatologist) ಸಂಪರ್ಕಿಸಿ."
      ],
      whenToSeekCare: [
        "ತೀವ್ರ ನೋವಿನ ಆಳವಾದ ಮೊಡವೆಗಳು ಅಥವಾ ಚರ್ಮದಲ್ಲಿ ಕಪ್ಪು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡರೆ."
      ],
      doctorQuestions: [
        "ಈ ಮೊಡವೆಗಳಿಗೆ ಹಾರ್ಮೋನ್ ವ್ಯತ್ಯಾಸವೇ ಕಾರಣವೇ?",
        "ನನಗೆ ಯಾವ ಚಿಕಿತ್ಸೆ ಸೂಕ್ತ?"
      ],
      glossary: [
        { term: "ಆಂಡ್ರೋಜನ್", explanation: "ದೇಹದಲ್ಲಿ ಎಣ್ಣೆ ಗ್ರಂಥಿಗಳು ಮತ್ತು ಕೂದಲಿನ ಬೆಳವಣಿಗೆಯನ್ನು ನಿಯಂತ್ರಿಸುವ ಹಾರ್ಮೋನ್." }
      ]
    }
  },

  facial_body_hair: {
    en: {
      symptomSummary: "You shared experiences with coarse or dark hair growth on the chin, upper lip, chest, abdomen, or inner thighs.",
      whatItMeans: "The growth of coarse, dark hair in patterns typically influenced by male hormones is medically termed 'hirsutism'. It is a visible sign of either elevated circulating androgens or heightened hair follicle sensitivity to normal hormone levels.",
      possibleExplanations: [
        {
          title: "Polycystic Ovary Syndrome (PCOS)",
          description: "PCOS is the leading cause of hirsutism, accounting for up to 70-80% of cases due to ovarian and adrenal androgen production.",
          requiresClarification: true
        },
        {
          title: "Familial or Genetic Predisposition",
          description: "Hair follicle density and sensitivity vary naturally by ethnicity and family lineage without underlying endocrine disease.",
          requiresClarification: false
        },
        {
          title: "Adrenal Gland Conditions",
          description: "Non-classic congenital adrenal hyperplasia (NCCAH) or other adrenal variations can produce excess androgens.",
          requiresClarification: false
        },
        {
          title: "Medication Side Effects",
          description: "Certain medications, steroids, or supplements can stimulate hair follicles.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "Note the locations, texture (fine peach fuzz vs coarse terminal hair), and timeline of the hair growth.",
        "Avoid self-blame—hirsutism is a common, manageable biological symptom, not a personal failing.",
        "Consider temporary aesthetic removal (threading, shaving) while seeking an underlying medical assessment.",
        "Consult an endocrinologist or gynecologist for a Ferriman-Gallwey clinical score and morning hormone panel."
      ],
      whenToSeekCare: [
        "Sudden, rapid progression of coarse hair growth within a few months.",
        "Accompanied by deepening of the voice, noticeable clitoral enlargement, or rapid loss of muscle mass (signs of virilization requiring prompt medical workup).",
        "Severe menstrual disruption alongside hair changes."
      ],
      doctorQuestions: [
        "Can we test total and free testosterone, DHEA-S, and 17-OH progesterone?",
        "What medical management options (such as anti-androgens or combined oral therapy) could help slow follicle progression?",
        "Could laser hair reduction or electrolysis complement internal medical treatment?"
      ],
      glossary: [
        { term: "Hirsutism", explanation: "Excessive growth of dark, coarse terminal hair in women in areas where hair growth is androgen-dependent." },
        { term: "Ferriman-Gallwey Score", explanation: "A clinical scoring method used by doctors to assess and quantify hirsutism across 9 body areas." },
        { term: "DHEA-S", explanation: "An androgen hormone produced predominantly by the adrenal glands." }
      ]
    },
    hi: {
      symptomSummary: "आपने ठुड्डी, ऊपरी होंठ, छाती या पेट पर मोटे और काले बालों के आने का विवरण दिया है।",
      whatItMeans: "महिलाओं में चेहरे या शरीर पर अनचाहे मोटे बाल आने को चिकित्सकीय भाषा में 'हर्सूटिज़्म' (Hirsutism) कहा जाता है। यह आमतौर पर शरीर में एंड्रोजन (पुरुष हार्मोन) के स्तर में वृद्धि या बालों की जड़ों की संवेदनशीलता के कारण होता है।",
      possibleExplanations: [
        {
          title: "पॉलीसिस्टिक ओवरी सिंड्रोम (PCOS)",
          description: "PCOS अनचाहे बालों का सबसे आम कारण है। लगभग 70-80% मामलों में इसका संबंध PCOS से होता है।",
          requiresClarification: true
        },
        {
          title: "पारिवारिक या आनुवंशिक प्रभाव",
          description: "कुछ परिवारों या जातियों में बालों की प्रकृति स्वाभाविक रूप से घनी होती है।",
          requiresClarification: false
        },
        {
          title: "एड्रीनल ग्रंथि से संबंधित असंतुलन",
          description: "एड्रीनल ग्रंथियों द्वारा अधिक हार्मोन बनने से भी यह लक्षण हो सकता है।",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "यह ध्यान रखें कि बाल कब से आ रहे हैं और कितने मोटे हैं।",
        "स्वयं को दोष न दें — यह एक सामान्य हार्मोनल स्थिति है जिसका इलाज संभव है।",
        "हार्मोनल जांच के लिए स्त्री रोग विशेषज्ञ या एंडोक्रिनोलॉजिस्ट से मिलें।"
      ],
      whenToSeekCare: [
        "यदि बहुत कम समय में (कुछ ही महीनों में) तेजी से घने बाल आ रहे हों।",
        "यदि आवाज भारी हो रही हो या मांसपेशियों में अप्रत्याशित बदलाव आ रहा हो।"
      ],
      doctorQuestions: [
        "क्या मुझे टेस्टोस्टेरोन और DHEA-S टेस्ट कराने चाहिए?",
        "बालों की वृद्धि को नियंत्रित करने के लिए कौन सी दवाएं उपयुक्त हैं?"
      ],
      glossary: [
        { term: "हर्सूटिज़्म (Hirsutism)", explanation: "महिलाओं में चेहरे या शरीर पर अत्यधिक और मोटे बालों का उगना।" }
      ]
    },
    kn: {
      symptomSummary: "ಗಲ್ಲ, ಮೇಲ್ತುಟಿ ಅಥವಾ ದೇಹದ ಮೇಲೆ ದಪ್ಪನೆಯ ಅನಗತ್ಯ ಕೂದಲಿನ ಬೆಳವಣಿಗೆಯ ಬಗ್ಗೆ ತಿಳಿಸಿದ್ದೀರಿ.",
      whatItMeans: "ಮಹಿಳೆಯರಲ್ಲಿ ಈ ರೀತಿ ದಪ್ಪ ಕೂದಲು ಬೆಳೆಯುವುದನ್ನು 'ಹಿರ್ಸುಟಿಸಂ' (Hirsutism) ಎನ್ನಲಾಗುತ್ತದೆ. ಇದು ಹಾರ್ಮೋನ್ ಅಸಮತೋಲನದಿಂದ ಉಂಟಾಗುತ್ತದೆ.",
      possibleExplanations: [
        {
          title: "PCOS (ಪಾಲಿಸಿಸ್ಟಿಕ್ ಓವರಿ ಸಿಂಡ್ರೋಮ್)",
          description: "ಇದು ಅಂಡಾಶಯದಲ್ಲಿ ಆಂಡ್ರೋಜನ್ ಹಾರ್ಮೋನ್ ಹೆಚ್ಚಾಗುವುದರಿಂದ ಉಂಟಾಗುವ ಸಾಮಾನ್ಯ ಲಕ್ಷಣ.",
          requiresClarification: true
        },
        {
          title: "ವಂಶಪಾರಂಪರ್ಯ ಕಾರಣಗಳು",
          description: "ಕುಟುಂಬದ ಇತಿಹಾಸದಿಂದಲೂ ಕೂದಲು ಹೆಚ್ಚಾಗಿ ಬೆಳೆಯಬಹುದು.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "ಕೂದಲಿನ ಬೆಳವಣಿಗೆಯ ವಿವರಗಳನ್ನು ಗಮನಿಸಿ ವೈದ್ಯರಿಗೆ ತಿಳಿಸಿ.",
        "ಎಂಡೋಕ್ರೈನಾಲಜಿಸ್ಟ್ ಅಥವಾ ಸ್ತ್ರೀರೋಗ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ ಹಾರ್ಮೋನ್ ಪರೀಕ್ಷೆ ಮಾಡಿಸಿಕೊಳ್ಳಿ."
      ],
      whenToSeekCare: [
        "ಕೂದಲು ಹಠಾತ್ತನೆ ತೀರಾ ವೇಗವಾಗಿ ಬೆಳೆಯುತ್ತಿದ್ದರೆ ಅಥವಾ ಧ್ವನಿ ಗಂಭೀರವಾಗುತ್ತಿದ್ದರೆ ವೈದ್ಯರನ್ನು ತಕ್ಷಣ ಭೇಟಿ ಮಾಡಿ."
      ],
      doctorQuestions: [
        "ನನಗೆ ಯಾವ ಹಾರ್ಮೋನ್ ಪರೀಕ್ಷೆಗಳ ಅಗತ್ಯವಿದೆ?",
        "ಇದನ್ನು ನಿಯಂತ್ರಿಸಲು ಯಾವ ಚಿಕಿತ್ಸೆಗಳು ಲಭ್ಯವಿವೆ?"
      ],
      glossary: [
        { term: "ಹಿರ್ಸುಟಿಸಂ", explanation: "ಮಹಿಳೆಯರಲ್ಲಿ ಅನಗತ್ಯ ದಪ್ಪ ಕೂದಲಿನ ಬೆಳವಣಿಗೆಯ ವೈದ್ಯಕೀಯ ಹೆಸರು." }
      ]
    }
  },

  scalp_hair: {
    en: {
      symptomSummary: "You observed hair thinning across the crown, widening of your hair parting, or excessive shedding.",
      whatItMeans: "Hair shedding and thinning can arise from hormonal, nutritional, and physical stress factors. Female pattern hair loss (androgenetic alopecia) typically presents as gradual thinning around the central part line while preserving the frontal hairline.",
      possibleExplanations: [
        {
          title: "Androgenic Alopecia (Hormonal Thinning)",
          description: "Dihydrotestosterone (DHT) acts on genetically susceptible hair follicles, causing them to miniaturize over time.",
          requiresClarification: true
        },
        {
          title: "Iron Deficiency / Low Ferritin",
          description: "Hair follicles require adequate iron stores (ferritin) to sustain the active growth (anagen) phase.",
          requiresClarification: false
        },
        {
          title: "Thyroid Gland Dysfunction",
          description: "Both hypothyroidism and hyperthyroidism can cause diffuse hair shedding.",
          requiresClarification: false
        },
        {
          title: "Telogen Effluvium (Post-Illness or Stress Shedding)",
          description: "High fever, infection, surgery, or intense emotional distress can trigger widespread temporary hair shedding 2-3 months after the event.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "Request a laboratory panel including serum ferritin, complete blood count, TSH, and vitamin D.",
        "Treat hair gently: avoid tight hairstyles that pull on the scalp, harsh chemical treatments, and excessive heat.",
        "Ensure adequate dietary protein (0.8 - 1.0g per kg body weight) and nutrient-dense foods.",
        "Consult a dermatologist specializing in hair disorders (trichology)."
      ],
      whenToSeekCare: [
        "Sudden patch-like circular bald spots (which may indicate Alopecia Areata).",
        "Redness, burning, pain, or flaking on the scalp accompanied by hair loss.",
        "Hair loss accompanied by severe fatigue, rapid weight gain, and cold intolerance."
      ],
      doctorQuestions: [
        "Can we test my ferritin, zinc, vitamin D, and thyroid profile?",
        "Does the pattern of my hair thinning suggest androgenetic alopecia or telogen effluvium?",
        "Are topical treatments like minoxidil or anti-androgen therapies appropriate in my case?"
      ],
      glossary: [
        { term: "Miniaturization", explanation: "The process where hair follicles progressively produce thinner, shorter, and more fragile hair shafts." },
        { term: "Ferritin", explanation: "The major iron storage protein in the body, essential for healthy hair growth cycles." }
      ]
    },
    hi: {
      symptomSummary: "आपने सिर के बालों के पतले होने, मांग चौड़ी होने या अत्यधिक बाल झड़ने की समस्या बताई है।",
      whatItMeans: "बालों का झड़ना और पतला होना हार्मोनल असंतुलन, पोषण की कमी या तनाव से जुड़ा हो सकता है। महिलाओं में हार्मोनल हेयर लॉस आमतौर पर सिर के बीच की मांग के चौड़े होने के रूप में दिखता है।",
      possibleExplanations: [
        {
          title: "हार्मोनल प्रभाव (एंड्रोजेनिक एलोपेसिया)",
          description: "DHT हार्मोन बालों की जड़ों को सिकोड़ देता है, जिससे बाल पतले होने लगते हैं।",
          requiresClarification: true
        },
        {
          title: "आयरन या फेरिटिन की कमी",
          description: "शरीर में आयरन के कम भंडार से बालों की जड़ें कमजोर हो जाती हैं।",
          requiresClarification: false
        },
        {
          title: "थायरॉइड असंतुलन",
          description: "थायरॉइड हार्मोन में बदलाव भी बाल झड़ने का एक सामान्य कारण है।",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "सीरम फेरिटिन, हीमोग्लोबिन, थायरॉइड (TSH) और विटामिन D की जांच कराएं।",
        "बालों को कसकर न बांधें और गर्म पानी व कठोर रसायनों से बचाएं।",
        "आहार में पर्याप्त प्रोटीन और हरी सब्जियां शामिल करें।",
        "त्वचा व बाल विशेषज्ञ (Dermatologist/Trichologist) से परामर्श लें।"
      ],
      whenToSeekCare: [
        "सिर पर गोल-गोल पैच (गंजेपन के गोल धब्बे) बनना।",
        "स्कैल्प पर तेज जलन, खुजली या लालिमा होना।"
      ],
      doctorQuestions: [
        "क्या मेरा हेयर फॉल हार्मोनल है या पोषण की कमी से संबंधित है?",
        "क्या मुझे फेरिटिन या थायरॉइड टेस्ट कराने चाहिए?"
      ],
      glossary: [
        { term: "फेरिटिन (Ferritin)", explanation: "शरीर में आयरन को जमा रखने वाला प्रोटीन, जो बालों के विकास के लिए अत्यंत महत्वपूर्ण है।" }
      ]
    },
    kn: {
      symptomSummary: "ತಲೆಯ ಕೂದಲು ಉದುರುವುದು, ಕೂದಲು ತೆಳುವಾಗುವುದು ಅಥವಾ ಬೈತಲೆ ಅಗಲವಾಗುತ್ತಿರುವ ಬಗ್ಗೆ ತಿಳಿಸಿದ್ದೀರಿ.",
      whatItMeans: "ಕೂದಲು ಉದುರುವುದು ಹಾರ್ಮೋನ್ ಬದಲಾವಣೆಗಳು, ಪೌಷ್ಟಿಕಾಂಶದ ಕೊರತೆ ಅಥವಾ ಒತ್ತಡದಿಂದ ಉಂಟಾಗಬಹುದು.",
      possibleExplanations: [
        {
          title: "ಹಾರ್ಮೋನ್ ಪ್ರಭಾವ",
          description: "ಆಂಡ್ರೋಜನ್ ಹಾರ್ಮೋನುಗಳ ಪ್ರಭಾವದಿಂದ ಕೂದಲು ತೆಳುವಾಗಬಹುದು.",
          requiresClarification: true
        },
        {
          title: "ಕಬ್ಬಿಣಾಂಶದ (ಐರನ್) ಕೊರತೆ",
          description: "ದೇಹದಲ್ಲಿ ಕಬ್ಬಿಣಾಂಶ ಕಡಿಮೆಯಾದಾಗ ಕೂದಲು ಉದುರುವುದು ಹೆಚ್ಚಾಗುತ್ತದೆ.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "ಐರನ್ ಮತ್ತು ಥೈರಾಯ್ಡ್ ಪರೀಕ್ಷೆಗಳನ್ನು ಮಾಡಿಸಿಕೊಳ್ಳಿ.",
        "ಪ್ರೋಟೀನ್ ಭರಿತ ಸಮತೋಲಿತ ಆಹಾರವನ್ನು ಸೇವಿಸಿ.",
        "ಕೂದಲನ್ನು ತೀರಾ ಬಿಗಿಯಾಗಿ ಕಟ್ಟಬೇಡಿ."
      ],
      whenToSeekCare: [
        "ತಲೆಯ ಮೇಲೆ ದುಂಡನೆಯ ಬಕ್ಕ ತಲೆಯ ಕಲೆಗಳು ಉಂಟಾದರೆ ವೈದ್ಯರನ್ನು ತಕ್ಷಣ ಕಾಣಿ."
      ],
      doctorQuestions: [
        "ನನ್ನ ಕೂದಲು ಉದುರುವಿಕೆಗೆ ರಕ್ತ ಹೀನತೆ ಅಥವಾ ಹಾರ್ಮೋನ್ ಕೊರತೆ ಕಾರಣವೇ?"
      ],
      glossary: [
        { term: "ಫೆರಿಟಿನ್", explanation: "ದೇಹದಲ್ಲಿ ಕಬ್ಬಿಣಾಂಶ ಸಂಗ್ರಹಿಸುವ ಪ್ರೋಟೀನ್." }
      ]
    }
  },

  pelvic_discomfort: {
    en: {
      symptomSummary: "You shared reports of pelvic pain, dull heaviness, cramping, or lower abdominal discomfort.",
      whatItMeans: "The pelvic region houses reproductive organs, the urinary bladder, and intestines. Discomfort can stem from cyclic uterine contractions (cramps), ovarian changes, inflammatory processes, or digestive dynamics.",
      possibleExplanations: [
        {
          title: "Primary Dysmenorrhea (Menstrual Cramping)",
          description: "Elevated prostaglandins trigger normal uterine contractions during menstruation.",
          requiresClarification: false
        },
        {
          title: "Ovarian Cysts or Follicular Distension",
          description: "Functional fluid-filled sacs that develop during ovulation can sometimes cause localized dull pressure or ache.",
          requiresClarification: true
        },
        {
          title: "Endometriosis or Adenomyosis",
          description: "Tissue resembling the uterine lining growing outside the uterus, causing chronic, sharp, or progressive pain.",
          requiresClarification: false
        },
        {
          title: "Urinary Tract or Gastrointestinal Concerns",
          description: "Irritable bowel syndrome, constipation, or urinary infections can mimic gynecological pelvic pain.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "Map your pain: note whether it occurs predictably before, during, or between periods, and whether heat or gentle rest relieves it.",
        "Apply a warm heating pad across your lower abdomen for 15-20 minutes to relax uterine smooth muscle.",
        "Stay well hydrated and include anti-inflammatory foods (ginger, turmeric, omega-3 fatty acids).",
        "Book an appointment with a gynecologist for a physical exam and ultrasound."
      ],
      whenToSeekCare: [
        "Sudden, excruciating, sharp one-sided pelvic pain that does not subside (may indicate ovarian torsion or ruptured cyst).",
        "Pelvic pain accompanied by high fever, chills, vomiting, or fainting.",
        "Pain during urination or blood in your urine.",
        "Severe pain during intercourse or bowel movements."
      ],
      doctorQuestions: [
        "Would a transvaginal or pelvic ultrasound help identify the source of my pelvic discomfort?",
        "Could my pain be related to endometriosis, adenomyosis, or ovarian cysts?",
        "What safe pain relief strategies do you recommend for chronic management?"
      ],
      glossary: [
        { term: "Prostaglandins", explanation: "Lipid compounds released during your period that make the uterine muscles contract to shed the lining." },
        { term: "Ovarian Torsion", explanation: "A medical emergency where an ovary twists around its blood supply, requiring immediate emergency surgery." }
      ]
    },
    hi: {
      symptomSummary: "आपने पेल्विक (पेड़ू) में दर्द, भारीपन या पेट के निचले हिस्से में ऐंठन की सूचना दी है।",
      whatItMeans: "पेल्विक क्षेत्र में गर्भाशय, अंडाशय, मूत्राशय और आंतें होती हैं। दर्द पीरियड्स की सामान्य ऐंठन, सिस्ट (पानी की थैली) या अन्य कारणों से हो सकता है।",
      possibleExplanations: [
        {
          title: "मासिक धर्म की ऐंठन (Dysmenorrhea)",
          description: "पीरियड्स के दौरान गर्भाशय की मांसपेशियों में सिकुड़न से दर्द होना।",
          requiresClarification: false
        },
        {
          title: "अंडाशय में सिस्ट (Ovarian Cysts)",
          description: "अंडाशय में तरल से भरी थैलियां भारीपन या दर्द पैदा कर सकती हैं।",
          requiresClarification: true
        },
        {
          title: "एंडोमेट्रियोसिस (Endometriosis)",
          description: "गर्भाशय की आंतरिक परत का बाहर फैलना, जिससे गंभीर दर्द हो सकता है।",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "दर्द के समय को नोट करें — क्या यह पीरियड्स से पहले, दौरान या बीच में होता है।",
        "गर्म पानी की सिकाई (heating pad) से मांसपेशियों को आराम दें।",
        "स्त्री रोग विशेषज्ञ से मिलकर जांच और अल्ट्रासाउंड कराएं।"
      ],
      whenToSeekCare: [
        "अचानक एक तरफ असहनीय तेज दर्द होना (यह मेडिकल इमरजेंसी हो सकती है)।",
        "दर्द के साथ तेज बुखार, उल्टी या बेहोशी होना।",
        "पेशाब में खून आना या असहनीय जलन होना।"
      ],
      doctorQuestions: [
        "क्या मेरे दर्द का कारण जानने के लिए पेल्विक अल्ट्रासाउंड की आवश्यकता है?",
        "क्या यह दर्द एंडोमेट्रियोसिस या ओवेरियन सिस्ट से संबंधित हो सकता है?"
      ],
      glossary: [
        { term: "पेल्विस (Pelvis)", explanation: "नाभि के नीचे का शारीरिक क्षेत्र जिसमें गर्भाशय और अंडाशय स्थित होते हैं।" }
      ]
    },
    kn: {
      symptomSummary: "ಕಿಬ್ಬೊಟ್ಟೆ ನೋವು, ಸೆಳೆತ ಅಥವಾ ಭಾರವಾದ ಅನುಭವದ ಬಗ್ಗೆ ತಿಳಿಸಿದ್ದೀರಿ.",
      whatItMeans: "ಕಿಬ್ಬೊಟ್ಟೆ ನೋವು ಮುಟ್ಟಿನ ಸೆಳೆತ, ಅಂಡಾಶಯದ ಬದಲಾವಣೆಗಳು ಅಥವಾ ಜೀರ್ಣಾಂಗ ಕ್ರಿಯೆಯ ಕಾರಣಗಳಿಂದ ಬರಬಹುದು.",
      possibleExplanations: [
        {
          title: "ಮುಟ್ಟಿನ ಸಾಮಾನ್ಯ ನೋವು",
          description: "ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ಗರ್ಭಾಶಯದ ಸ್ನಾಯುಗಳು ಸಂಕುಚಿತಗೊಳ್ಳುವುದರಿಂದ ಬರುವ ನೋವು.",
          requiresClarification: false
        },
        {
          title: "ಅಂಡಾಶಯದಲ್ಲಿ ಚೀಲಗಳು (Ovarian Cysts)",
          description: "ಅಂಡಾಶಯದಲ್ಲಿ ನೀರಿನ ಗುಳ್ಳೆಗಳು ಉಂಟಾದಾಗ ಒಂದು ಬದಿಯ ನೋವು ಕಾಣಿಸಿಕೊಳ್ಳಬಹುದು.",
          requiresClarification: true
        }
      ],
      actionableNextSteps: [
        "ಬಿಸಿ ನೀರಿನ ಶಾಖವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",
        "ನೋವು ಯಾವಾಗ ಬರುತ್ತದೆ ಎಂಬುದನ್ನು ಜರ್ನಲ್‌ನಲ್ಲಿ ಬರೆದಿಡಿ.",
        "ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿಸಿಕೊಳ್ಳಿ."
      ],
      whenToSeekCare: [
        "ಹಠಾತ್ತನೆ ತೀವ್ರವಾದ असहನೀಯ ನೋವು, ವಾಂತಿ ಅಥವಾ ಜ್ವರ ಬಂದರೆ ತಕ್ಷಣ ತುರ್ತು ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ."
      ],
      doctorQuestions: [
        "ಈ ನೋವಿಗೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿಸಬೇಕೇ?",
        "ಇದು ಸಿಸ್ಟ್ ಅಥವಾ ಎಂಡೊಮೆಟ್ರಿಯೋಸಿಸ್ ಲಕ್ಷಣವೇ?"
      ],
      glossary: [
        { term: "ಪೆಲ್ವಿಕ್ ಪ್ರದೇಶ", explanation: "ಕಿಬ್ಬೊಟ್ಟೆ ಮತ್ತು ಗರ್ಭಾಶಯ ಇರುವ ಕೆಳಹೊಟ್ಟೆಯ ಭಾಗ." }
      ]
    }
  },

  fatigue: {
    en: {
      symptomSummary: "You reported constant tiredness, low stamina, brain fog, or feeling unrefreshed despite resting.",
      whatItMeans: "Persistent fatigue in women is multifaceted. Hormonal shifts, metabolic challenges (like insulin resistance), micronutrient deficiencies, and sleep quality play interconnected roles in cellular energy creation.",
      possibleExplanations: [
        {
          title: "Insulin Resistance & Blood Sugar Swings",
          description: "When cells do not respond effectively to insulin, glucose remains in the blood rather than fueling cells, causing post-meal energy crashes.",
          requiresClarification: true
        },
        {
          title: "Anemia or Low Ferritin Stores",
          description: "Insufficient iron reduces oxygen delivery to tissues, resulting in pervasive physical tiredness and breathlessness.",
          requiresClarification: false
        },
        {
          title: "Thyroid Underactivity (Hypothyroidism)",
          description: "A sluggish thyroid lowers basal metabolic rate, causing profound lethargy, weight gain, and cold sensitivity.",
          requiresClarification: false
        },
        {
          title: "Disordered Sleep or Sleep Apnea",
          description: "Hormonal and metabolic issues can interfere with deep restorative sleep cycles.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "Pair carbohydrates with proteins and healthy fats at every meal to avoid insulin spikes and mid-day energy dips.",
        "Request comprehensive blood work: CBC, Ferritin, TSH, Fasting Insulin, and Vitamin B12 & D3.",
        "Aim for 20-30 minutes of natural morning sunlight to reset your circadian rhythm.",
        "Limit caffeine after 2:00 PM to protect deep REM and slow-wave sleep."
      ],
      whenToSeekCare: [
        "Fatigue so severe you cannot carry out daily activities, accompanied by shortness of breath.",
        "Unexplained rapid weight loss, chest palpitations, or swelling in your legs.",
        "Persistent feelings of severe depression, despair, or anxiety."
      ],
      doctorQuestions: [
        "Could my fatigue be tied to an underlying metabolic issue such as insulin resistance or PCOS?",
        "Can we test my fasting glucose, HbA1c, and fasting insulin levels together?",
        "Which nutritional deficiencies should we screen for first?"
      ],
      glossary: [
        { term: "Insulin Resistance", explanation: "A state where the body's cells do not respond well to insulin and cannot easily absorb glucose from the blood, requiring the pancreas to produce extra insulin." },
        { term: "Basal Metabolic Rate", explanation: "The number of calories your body needs to accomplish its most basic life-sustaining functions." }
      ]
    },
    hi: {
      symptomSummary: "आपने लगातार थकान, कमजोरी, सुस्ती या पर्याप्त आराम के बाद भी तरोताजा महसूस न होने का विवरण दिया है।",
      whatItMeans: "लगातार थकान रहना केवल काम की अधिकता नहीं, बल्कि आंतरिक हार्मोनल या पोषण संबंधी असंतुलन का संकेत हो सकता है। इंसुलिन प्रतिरोध, खून की कमी और थायरॉइड इसके प्रमुख कारण हो सकते हैं।",
      possibleExplanations: [
        {
          title: "इंसुलिन प्रतिरोध (Insulin Resistance)",
          description: "कोशिकाओं द्वारा ऊर्जा का सही उपयोग न कर पाने से भोजन के बाद भारी थकान महसूस होती है। यह PCOS में बहुत आम है।",
          requiresClarification: true
        },
        {
          title: "एनीमिया (खून और आयरन की कमी)",
          description: "शरीर में हीमोग्लोबिन या फेरिटिन कम होने से अंगों को पूरी ऑक्सीजन नहीं मिल पाती।",
          requiresClarification: false
        },
        {
          title: "थायरॉइड की सुस्ती (Hypothyroidism)",
          description: "थायरॉइड हार्मोन कम होने से शरीर की कार्यप्रणाली धीमी पड़ जाती है।",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "खून की जांच कराएं: हीमोग्लोबिन, फेरिटिन, थायरॉइड (TSH) और विटामिन D/B12।",
        "भोजन में मीठी चीजें कम करें और दालें, नट्स तथा हरी सब्जियां अधिक लें।",
        "सुबह 15-20 मिनट धूप में टहलें ताकि ऊर्जा का स्तर सुधरे।",
        "डॉक्टर से मिलकर आंतरिक कारणों का पता लगाएं।"
      ],
      whenToSeekCare: [
        "थकान के साथ सांस फूलना, छाती में दर्द या अत्यधिक चक्कर आना।",
        "अचानक बिना कारण वजन बहुत कम होना।"
      ],
      doctorQuestions: [
        "क्या मेरी थकान इंसुलिन प्रतिरोध, एनीमिया या थायरॉइड से जुड़ी है?",
        "मुझे कौन-कौन से आवश्यक रक्त परीक्षण कराने चाहिए?"
      ],
      glossary: [
        { term: "इंसुलिन प्रतिरोध (Insulin Resistance)", explanation: "एक ऐसी स्थिति जिसमें शरीर इंसुलिन का ठीक से उपयोग नहीं कर पाता, जिससे थकान और वजन बढ़ता है।" }
      ]
    },
    kn: {
      symptomSummary: "ನಿರಂತರ ಆಯಾಸ, ನಿಶ್ಯಕ್ತಿ ಮತ್ತು ಸುಸ್ತಾಗುವ ಲಕ್ಷಣಗಳನ್ನು ನೀವು ಹಂಚಿಕೊಂಡಿದ್ದೀರಿ.",
      whatItMeans: "ದೀರ್ಘಕಾಲದ ಸುಸ್ತು ಹಾರ್ಮೋನ್ ವ್ಯತ್ಯಾಸಗಳು, ರಕ್ತಹೀನತೆ ಅಥವಾ ಮೆಟಾಬಾಲಿಕ್ ಸಮಸ್ಯೆಗಳಿಂದ ಉಂಟಾಗಬಹುದು.",
      possibleExplanations: [
        {
          title: "ಇನ್ಸುಲಿನ್ ರೆಸಿಸ್ಟೆನ್ಸ್ (Insulin Resistance)",
          description: "ದೇಹವು ಗ್ಲೂಕೋಸ್ ಅನ್ನು ಸರಿಯಾಗಿ ಬಳಸದಿದ್ದಾಗ ತೀವ್ರ ಆಯಾಸ ಉಂಟಾಗುತ್ತದೆ, ಇದು PCOS ನಲ್ಲಿ ಸಾಮಾನ್ಯ.",
          requiresClarification: true
        },
        {
          title: "ರಕ್ತಹೀನತೆ (ಅನೀಮಿಯಾ)",
          description: "ಕಬ್ಬಿಣಾಂಶ ಅಥವಾ ಹಿಮೋಗ್ಲೋಬಿನ್ ಕೊರತೆಯಿಂದ ದೇಹಕ್ಕೆ ಸುಸ್ತು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "ರಕ್ತ ಪರೀಕ್ಷೆ (ಹಿಮೋಗ್ಲೋಬಿನ್, ಥೈರಾಯ್ಡ್, ವಿಟಮಿನ್ ಡಿ) ಮಾಡಿಸಿಕೊಳ್ಳಿ.",
        "ಪೌಷ್ಟಿಕ ಆಹಾರವನ್ನು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಸೇವಿಸಿ.",
        "ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ದಿನಕ್ಕೆ 7-8 ಗಂಟೆ ನಿದ್ರೆ ಮಾಡಿ."
      ],
      whenToSeekCare: [
        "ಆಯಾಸದೊಂದಿಗೆ ಉಸಿರಾಟದ ತೊಂದರೆ ಅಥವಾ ಎದೆ ನೋವು ಇದ್ದರೆ ತಕ್ಷಣ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ."
      ],
      doctorQuestions: [
        "ನನ್ನ ಆಯಾಸಕ್ಕೆ ರಕ್ತಹೀನತೆ ಅಥವಾ ಇನ್ಸುಲಿನ್ ಸಮಸ್ಯೆ ಕಾರಣವೇ?"
      ],
      glossary: [
        { term: "ಇನ್ಸುಲಿನ್ ರೆಸಿಸ್ಟೆನ್ಸ್", explanation: "ದೇಹದ ಜೀವಕೋಶಗಳು ಇನ್ಸುಲಿನ್‌ಗೆ ಸರಿಯಾಗಿ ಸ್ಪಂದಿಸದ ಸ್ಥಿತಿ." }
      ]
    }
  },

  other_concerns: {
    en: {
      symptomSummary: "You shared information regarding other women's health observations, mood fluctuations, or metabolic concerns.",
      whatItMeans: "Women's wellness involves dynamic physiological connections among the ovaries, brain, gut, and adrenals. Symptoms in one system often reflect holistic endocrine rhythms.",
      possibleExplanations: [
        {
          title: "Neuro-Endocrine Rhythms & Premenstrual Changes",
          description: "Progesterone withdrawal in the late luteal phase influences brain neurotransmitters like serotonin and GABA.",
          requiresClarification: false
        },
        {
          title: "Metabolic or Hormonal Imbalance",
          description: "Subtle shifts in androgens, estrogens, or cortisol can influence weight, sleep, and emotional wellbeing.",
          requiresClarification: true
        },
        {
          title: "Nutritional or Micronutrient Insufficiency",
          description: "Sub-optimal levels of magnesium, zinc, or B-vitamins often impact mood and metabolic vitality.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "Keep a daily log of symptoms in My Health Journal to recognize cyclical patterns.",
        "Engage in nervous system regulation such as diaphragmatic breathing, nature walks, and restorative sleep.",
        "Discuss any lingering questions with a compassionate healthcare provider."
      ],
      whenToSeekCare: [
        "Severe feelings of despair, anxiety, or depression that interfere with safety or daily functioning.",
        "Unexplained rapid physical changes or severe acute pain."
      ],
      doctorQuestions: [
        "How can we evaluate my symptoms holistically?",
        "Are there lifestyle or dietary modifications tailored to my metabolic profile?"
      ],
      glossary: [
        { term: "Endocrine System", explanation: "The network of glands that produce and release hormones directly into the bloodstream." }
      ]
    },
    hi: {
      symptomSummary: "आपने अन्य स्वास्थ्य चिंताओं, मनोदशा (mood) में बदलाव या मेटाबॉलिक लक्षणों का विवरण दिया है।",
      whatItMeans: "महिलाओं का स्वास्थ्य शरीर के विभिन्न अंगों और हार्मोनों के आपसी तालमेल पर निर्भर करता है। तनाव, आहार या हार्मोन के स्तर में बदलाव कई तरह के लक्षण पैदा कर सकते हैं।",
      possibleExplanations: [
        {
          title: "हार्मोनल और न्यूरोलॉजिकल बदलाव",
          description: "पीरियड्स से पहले हार्मोनल बदलाव मूड और ऊर्जा पर असर डाल सकते हैं।",
          requiresClarification: false
        },
        {
          title: "मेटाबॉलिक या पोषण संबंधी असंतुलन",
          description: "विटामिन और खनिजों की कमी से भी थकान या बेचैनी हो सकती है।",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "माय हेल्थ जर्नल में अपने दैनिक लक्षणों को ट्रैक करें।",
        "संतुलित आहार लें और ध्यान या प्राणायाम से तनाव कम करें।",
        "चिकित्सक से परामर्श लेकर समग्र जांच कराएं।"
      ],
      whenToSeekCare: [
        "अत्यधिक मानसिक तनाव, घबराहट या अवसाद महसूस होना।",
        "कोई भी अचानक और गंभीर शारीरिक दर्द होना।"
      ],
      doctorQuestions: [
        "क्या मेरे लक्षण किसी हार्मोनल या पोषण संबंधी असंतुलन से जुड़े हैं?",
        "मुझे अपने स्वास्थ्य में सुधार के लिए क्या कदम उठाने चाहिए?"
      ],
      glossary: [
        { term: "एंडोक्राइन सिस्टम", explanation: "शरीर की वो ग्रंथियां जो रक्त में हार्मोन छोड़ती हैं।" }
      ]
    },
    kn: {
      symptomSummary: "ಮಹಿಳೆಯರ ಇತರ ಆರೋಗ್ಯ ಲಕ್ಷಣಗಳು ಅಥವಾ ಮನಸ್ಥಿತಿಯ ಬದಲಾವಣೆಗಳ ವಿವರಗಳನ್ನು ನೀವು ನೀಡಿದ್ದೀರಿ.",
      whatItMeans: "ಮಹಿಳೆಯರ ಆರೋಗ್ಯವು ಹಾರ್ಮೋನ್‌ಗಳು, ಆಹಾರ ಮತ್ತು ಮಾನಸಿಕ ಶಾಂತಿಯ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿದೆ.",
      possibleExplanations: [
        {
          title: "ಹಾರ್ಮೋನ್ ಮತ್ತು ಮೆಟಾಬಾಲಿಕ್ ಏರಿಳಿತಗಳು",
          description: "ಹಾರ್ಮೋನ್ ಬದಲಾವಣೆಗಳು ಶಕ್ತಿ ಮತ್ತು ಮನಸ್ಥಿತಿಯ ಮೇಲೆ ಪ್ರಭಾವ ಬೀರಬಹುದು.",
          requiresClarification: false
        }
      ],
      actionableNextSteps: [
        "ದೈನಂದಿನ ಲಕ್ಷಣಗಳನ್ನು ಜರ್ನಲ್‌ನಲ್ಲಿ ದಾಖಲಿಸಿ.",
        "ಒತ್ತಡ ಕಡಿಮೆ ಮಾಡಲು ಯೋಗ ಮತ್ತು ಧ್ಯಾನ ಮಾಡಿ.",
        "ವೈದ್ಯರಿಂದ ಸಲಹೆ ಪಡೆಯಿರಿ."
      ],
      whenToSeekCare: [
        "ತೀವ್ರ ಖಿನ್ನತೆ, ಅತಿಯಾದ ಆತಂಕ ಅಥವಾ ತೀವ್ರ ನೋವು ಉಂಟಾದರೆ ತಕ್ಷಣ ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ."
      ],
      doctorQuestions: [
        "ನನ್ನ ಲಕ್ಷಣಗಳಿಗೆ ಯಾವ ರೀತಿಯ ಪರೀಕ್ಷೆಗಳು ಸೂಕ್ತ?"
      ],
      glossary: [
        { term: "ಮೆಟಾಬಾಲಿಸಂ", explanation: "ದೇಹವು ಆಹಾರವನ್ನು ಶಕ್ತಿಯನ್ನಾಗಿ ಪರಿವರ್ತಿಸುವ ನೈಸರ್ಗಿಕ ಕ್ರಿಯೆ." }
      ]
    }
  }
};

export function getFallbackAssessment({ category, language = 'en', symptoms = [], duration = '', onsetType = '', freeTextDescription = '' }) {
  const lang = ['en', 'hi', 'kn'].includes(language) ? language : 'en';
  const categoryKey = CLINICAL_FALLBACK_DATA[category] ? category : 'other_concerns';
  const categoryData = CLINICAL_FALLBACK_DATA[categoryKey][lang] || CLINICAL_FALLBACK_DATA[categoryKey]['en'];

  // Tailor symptomSummary dynamically if symptoms or description are present
  let symptomSummary = categoryData.symptomSummary;
  if (symptoms && symptoms.length > 0) {
    const symptomList = symptoms.join(', ');
    if (lang === 'hi') {
      symptomSummary = `आपने निम्नलिखित लक्षणों का चयन किया: ${symptomList}। अवधि: ${duration || 'अस्पष्ट'}, प्रकार: ${onsetType || 'सामान्य'}। ${freeTextDescription ? `अतिरिक्त टिप्पणी: "${freeTextDescription}"।` : ''}`;
    } else if (lang === 'kn') {
      symptomSummary = `ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಲಕ್ಷಣಗಳು: ${symptomList}. ಅವಧಿ: ${duration || 'ತಿಳಿದಿಲ್ಲ'}. ${freeTextDescription ? `ವಿವರಣೆ: "${freeTextDescription}".` : ''}`;
    } else {
      symptomSummary = `You reported experiencing: ${symptomList}. Duration: ${duration || 'unspecified'}, Pattern: ${onsetType || 'typical'}. ${freeTextDescription ? `Additional description: "${freeTextDescription}".` : ''}`;
    }
  }

  return {
    source: 'clinical_fallback',
    language: lang,
    primaryCategory: category,
    symptomSummary,
    whatItMeans: categoryData.whatItMeans,
    possibleExplanations: categoryData.possibleExplanations,
    actionableNextSteps: categoryData.actionableNextSteps,
    whenToSeekCare: categoryData.whenToSeekCare,
    doctorQuestions: categoryData.doctorQuestions,
    glossary: categoryData.glossary
  };
}
