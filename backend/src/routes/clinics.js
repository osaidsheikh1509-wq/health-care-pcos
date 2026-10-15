import express from 'express';
import { db } from '../db/prisma.js';

const router = express.Router();

export const SAMPLE_CLINICS = [
  {
    id: 'cln_1',
    name: 'Sanjeevani Women’s Endocrine & PCOS Clinic',
    specialty: 'Endocrinology & Reproductive Health',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'Indiranagar 100ft Road, Stage 2, Bengaluru',
    phone: '+91 80 4123 8890',
    email: 'care@sanjeevaniwomen.org',
    website: 'https://sanjeevaniwomen.org',
    consultationType: 'In-Person & Tele-consult',
    isVerified: true,
    notes: 'Specializes in adolescent PCOS, metabolic syndrome, and fertility preservation.'
  },
  {
    id: 'cln_2',
    name: 'Aura Comprehensive Gynecological Center',
    specialty: 'Gynecology & Pelvic Health',
    city: 'New Delhi',
    state: 'Delhi',
    address: 'South Extension Part II, New Delhi',
    phone: '+91 11 2625 4410',
    email: 'help@aurawellness.in',
    website: 'https://aurawellness.in',
    consultationType: 'In-Person & Tele-consult',
    isVerified: true,
    notes: 'Multidisciplinary team with in-house ultrasound and adolescent counselor.'
  },
  {
    id: 'cln_3',
    name: 'Matrika Holistic Women’s Care',
    specialty: 'Obstetrics & Gynecology',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Linking Road, Bandra West, Mumbai',
    phone: '+91 22 2640 1992',
    email: 'appointments@matrikaclinic.com',
    website: 'https://matrikaclinic.com',
    consultationType: 'In-Person & Tele-consult',
    isVerified: true,
    notes: 'Focus on hormonal balance, cycle regulation, and lifestyle nutrition.'
  },
  {
    id: 'cln_4',
    name: 'Prakriti Reproductive & Skin Wellness',
    specialty: 'Dermatology & PCOS Aesthetics',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Road No 36, Jubilee Hills, Hyderabad',
    phone: '+91 40 2355 6011',
    email: 'contact@prakritidermal.in',
    website: 'https://prakritidermal.in',
    consultationType: 'In-Person & Video',
    isVerified: true,
    notes: 'Dedicated protocol for hormonal acne, hirsutism, and insulin resistance.'
  },
  {
    id: 'cln_5',
    name: 'Yajnaseni Tele-Health & Regional Support Network',
    specialty: 'Tele-Consultation & Care Navigation',
    city: 'National (Pan-India)',
    state: 'All States',
    address: 'Available online nationwide in English, Hindi, Kannada, Tamil, and Telugu',
    phone: '1800-200-YAJNASENI (Toll-Free)',
    email: 'support@yajnasenihealth.org',
    website: 'https://yajnasenihealth.org/telecare',
    consultationType: 'Video & Audio Tele-consult',
    isVerified: true,
    notes: 'Subsidized consultations for rural and tier-2/3 cities with regional-language doctors.'
  },
  {
    id: 'cln_6',
    name: 'Ananya Endocrine & Diabetes Centre',
    specialty: 'Endocrinology',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: 'Anna Nagar West, Chennai',
    phone: '+91 44 2615 7700',
    email: 'clinic@ananyaendocrine.com',
    website: 'https://ananyaendocrine.com',
    consultationType: 'In-Person & Tele-consult',
    isVerified: true,
    notes: 'Advanced management of insulin resistance, thyroid, and PCOS.'
  }
];

// Initialize seed into db memory store
db.seedClinics(SAMPLE_CLINICS);

// GET /api/clinics
router.get('/', async (req, res) => {
  try {
    const { city, specialty, search } = req.query;
    let clinics = await db.getClinics({ city, specialty });

    if (search) {
      const q = search.toLowerCase();
      clinics = clinics.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.specialty.toLowerCase().includes(q) ||
          (c.notes && c.notes.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: clinics.length,
      data: clinics
    });
  } catch (err) {
    console.error('Error fetching clinics:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch directory' });
  }
});

export default router;
