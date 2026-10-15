import { GoogleGenAI } from '@google/genai';
import { config } from '../config/env.js';
import { getFallbackAssessment } from './fallbackEngine.js';

let aiClient = null;

if (config.geminiApiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey: config.geminiApiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err.message);
  }
}

export async function analyzeSymptomsWithGemini({
  language = 'en',
  category,
  symptoms = [],
  duration,
  onsetType,
  freeTextDescription = '',
  additionalContext = ''
}) {
  // If API key is not configured or client failed, use clinical fallback immediately
  if (!aiClient || !config.geminiApiKey) {
    return getFallbackAssessment({
      category,
      language,
      symptoms,
      duration,
      onsetType,
      freeTextDescription
    });
  }

  const prompt = `You are a compassionate, medically-informed AI assistant for Yajnaseni, a women's health symptom guidance platform.
Your task is to provide plain-language, empathetic, and responsible symptom understanding.

CRITICAL RESPONSIBLE AI & SAFETY RULES:
1. STRICT NON-DIAGNOSTIC MANDATE: Never state or imply that the user has PCOS, endometriosis, or any specific disease. Always present possibilities as topics to discuss with a licensed physician.
2. EMPATHETIC, NON-ALARMING TONE: Avoid inducing panic. Frame physiological processes in reassuring, educational terms.
3. EXPLAIN JARGON: Demystify all medical words (e.g., androgens, hirsutism, anovulation, oligomenorrhea, luteal phase).
4. MULTIPLE PERSPECTIVES: Emphasize that symptoms have multiple diverse causes (stress, thyroid, lifestyle, nutrition, metabolic factors).
5. MULTILINGUAL OUTPUT: Respond COMPLETELY in the requested language code: "${language}" (en = English, hi = Hindi (Devanagari script), kn = Kannada (Kannada script)).
6. STRICT JSON FORMAT: Output MUST be valid JSON adhering exactly to the structure below. Do NOT output markdown ticks around the JSON.

INPUT SYMPTOM PROFILE:
- Primary Category: ${category}
- Selected Symptoms: ${symptoms.join(', ') || 'None selected'}
- Duration: ${duration || 'Not specified'}
- Onset / Pattern: ${onsetType || 'Not specified'}
- User Free-text Description: ${freeTextDescription || 'None provided'}
- Optional Context: ${additionalContext || 'None provided'}

REQUIRED JSON SCHEMA:
{
  "symptomSummary": "Summary of what the user described in warm, validating words in the requested language.",
  "whatItMeans": "Clear explanation of what these symptoms generally mean physiologically, avoiding jargon.",
  "possibleExplanations": [
    {
      "title": "Name of potential explanation (e.g. Hormonal Fluctuations, Stress, Thyroid, or PCOS as a possibility to investigate)",
      "description": "Educational details explaining why this can happen and what factors are involved.",
      "requiresClarification": true or false
    }
  ],
  "actionableNextSteps": [
    "Practical self-care, lifestyle adjustments, symptom logging steps, or dietary awareness."
  ],
  "whenToSeekCare": [
    "Specific red flags and warning signs that require urgent or prompt medical evaluation."
  ],
  "doctorQuestions": [
    "Empowering, concrete questions the user can take to their doctor."
  ],
  "glossary": [
    {
      "term": "Medical term",
      "explanation": "Simple one-sentence explanation in user language."
    }
  ]
}`;

  try {
    const response = await aiClient.models.generateContent({
      model: config.geminiModel,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      }
    });

    const responseText = response.text?.trim() || '';
    if (!responseText) {
      throw new Error('Empty response from Gemini API');
    }

    const cleanedJson = responseText
      .replace(/^```json\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);

    return {
      source: 'gemini',
      language,
      primaryCategory: category,
      symptomSummary: parsed.symptomSummary || '',
      whatItMeans: parsed.whatItMeans || '',
      possibleExplanations: Array.isArray(parsed.possibleExplanations) ? parsed.possibleExplanations : [],
      actionableNextSteps: Array.isArray(parsed.actionableNextSteps) ? parsed.actionableNextSteps : [],
      whenToSeekCare: Array.isArray(parsed.whenToSeekCare) ? parsed.whenToSeekCare : [],
      doctorQuestions: Array.isArray(parsed.doctorQuestions) ? parsed.doctorQuestions : [],
      glossary: Array.isArray(parsed.glossary) ? parsed.glossary : []
    };
  } catch (err) {
    console.warn('Gemini API call failed, falling back to clinical rule-based engine:', err.message);
    return getFallbackAssessment({
      category,
      language,
      symptoms,
      duration,
      onsetType,
      freeTextDescription
    });
  }
}
