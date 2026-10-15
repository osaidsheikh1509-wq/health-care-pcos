# 🌸 Sakhi Health — Women's Health Symptom Understanding & PCOS Guidance

> **Understand Your Body. Take Charge of Your Health.**
> *A full-stack, responsive, multilingual women's health platform designed to translate everyday symptoms into clear, medically responsible understanding and empower women with informed next steps.*

---

## 🌟 Overview & Problem Solved

Millions of women worldwide experience perplexing symptoms—ranging from irregular cycles and heavy bleeding to persistent cystic jawline acne, unusual facial hair, and deep fatigue. Because of cultural taboos, medical jargon, and regional language barriers, women often delay seeking care or feel overwhelmed during clinical visits.

**Sakhi Health** bridges this divide with:
- **Strictly Non-Chat, Structured Architecture**: Multi-step symptom assessment forms with searchable symptom tags, duration, and onset selection.
- **Multilingual Inclusivity**: Instant switching between **English**, **हिन्दी (Hindi)**, and **ಕನ್ನಡ (Kannada)**, with native-accent Web Speech API voice input.
- **Responsible AI Engine**: Powered by Google Gemini API with a robust, clinically vetted non-AI fallback decision matrix that never leaves users stranded.
- **Non-Diagnostic Mandate**: Never claims to diagnose disease or pronounce that a user has PCOS. Frames physiological processes into 6 structured sections with red flags and questions for a doctor.
- **Confidential Health Journal**: Anonymous-first calendar and cycle tracker with pain scales, flow logs, and clinical summary export.
- **PCOS Education Center**: Comprehensive guides on the Rotterdam Criteria, ultrasound expectations, lifestyle habits, and citations from WHO, NHS, and ACOG.
- **Care Directory**: Specialist guidance (Gynecologist vs. Endocrinologist vs. Dermatologist) and verified clinic directory.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with **Vite**
- **JavaScript (ES Modules)**
- **Tailwind CSS** (Soft lavender `#8B5CF6`, teal `#0D9488`, rose `#FB7185` palette with dark mode)
- **React Router DOM v6**
- **Lucide React** icons
- **Web Speech API** for voice-input transcription

### Backend
- **Node.js** & **Express.js** (REST API architecture)
- **Zod** for request validation
- **Helmet** for HTTP security headers & custom CSP
- **CORS** with explicit allowed origins & credentials
- **express-rate-limit** on sensitive assessment and authentication routes
- **bcryptjs** password hashing & HTTP-only JWT sessions
- **Google Gen AI SDK (`@google/genai`)** with offline clinical fallback

### Database
- **PostgreSQL** configured with **Prisma ORM** (`backend/prisma/schema.prisma`)
- Dual-engine resilience: Seamless automatic in-memory fallback during zero-config local runs and development

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended; tested on v20.18.0)
- npm (v9 or higher)

### 1. Installation

Clone the repository and install all dependencies:
```bash
# Install root orchestrator dependencies
npm install

# Install backend dependencies
npm --prefix backend install

# Install frontend dependencies
npm --prefix frontend install
```

### 2. Environment Configuration

Copy the sample environment file in `backend/`:
```bash
cp backend/.env.example backend/.env
```

Key environment variables in `backend/.env`:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sakhi_health?schema=public"
JWT_SECRET="sakhi-health-dev-secret-key-replace-in-production"

# Optional: Google Gemini API Key
# If omitted or offline, Sakhi Health automatically engages the clinical rule-based engine
GEMINI_API_KEY=""
GEMINI_MODEL="gemini-2.5-flash"
```

### 3. Running the Application

You can start the full stack concurrently from the root directory:
```bash
npm run dev
```

Or run each service individually:
```bash
# Start backend server (http://localhost:5000)
npm run dev:backend

# Start Vite frontend (http://localhost:5173)
npm run dev:frontend
```

Open your browser to:
- Frontend: [http://localhost:5173](http://localhost:5173)
- API Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 4. Running the Test Suite

Run the automated backend test suite:
```bash
npm test
```

### 5. Production Build

Build both backend and frontend:
```bash
npm run build
```
In production, the Express backend serves the optimized Vite frontend bundle directly from `http://localhost:5000`.

---

## 🧭 Navigation & Core Modules

1. **Home (`/`)**: Hero section, common health themes, PCOS overview, how the non-chat assessment works, regional language spotlight, and privacy guarantees.
2. **Understand Symptoms (`/assess`)**: 5-step non-chat flow:
   - *Step 1*: Language selection (EN, HI, KN)
   - *Step 2*: Category selection (Menstrual health, Irregular periods, Acne, Facial/body hair, Scalp hair, Pelvic pain, Fatigue, Other)
   - *Step 3*: Searchable symptom cards, duration, onset pattern, voice input, optional context
   - *Step 4*: Review summary card before submission
   - *Step 5*: Structured 6-part results dashboard:
     1. *What you described*
     2. *What this symptom can mean*
     3. *Possible explanations to discuss with a clinician*
     4. *What you can do next*
     5. *When to seek medical attention (Urgent Red Flags)*
     6. *Questions to ask your doctor*
     + Demystified medical terms glossary and printable summary export.
3. **PCOS Guide (`/pcos-guide`)**: Rotterdam Criteria breakdown (2 of 3 rule), myth busters, appointment expectations, evidence-based nutrition and lifestyle habits, expandable FAQs, and WHO/NHS citations.
4. **My Health Journal (`/journal`)**: Daily cycle logging (flow, pain level 0–10 slider, mood, symptoms, notes), interactive monthly calendar with color-coded flow and symptom dots, anonymous guest persistence, and print functionality.
5. **Find Care (`/find-care`)**: Specialist selection guide (Gynecologist vs. Endocrinologist vs. Dermatologist), pre-visit checklist, emergency helplines, and filterable verified clinic directory.
6. **About (`/about`)**: Cultural mission, linguistic equity, and responsible AI principles.
7. **Privacy & Safety (`/privacy`)**: Anonymous-by-design policy, zero ad tracking, and one-click local health data purge button.

---

## ⚕️ Responsible AI & Clinical Safety Mandate

- **Strictly Non-Diagnostic**: Sakhi Health explicitly clarifies across all views that it does not provide diagnoses or prescribe treatments.
- **Multi-Factor Explanations**: Symptoms are presented with diverse potential causes (lifestyle, stress, thyroid variations, nutritional gaps, and PCOS as one possibility).
- **Graceful Clinical Fallback**: Seamless rule-based clinical decision matrix in English, Hindi, and Kannada guarantees uninterrupted availability even without an external AI API key.
- **Urgent Red Flags**: Immediate warnings for acute conditions (severe one-sided pain, heavy hemorrhaging soaking 2+ pads/hour, high fever).

---

## 📄 License & Medical Notice

Built with care for women's health literacy and dignity.

*Disclaimer: Sakhi Health is an educational guidance tool and does not constitute formal medical diagnosis or advice. For medical concerns, always consult a licensed healthcare practitioner. In emergencies, call national emergency services (112 / 181 / 911).*
