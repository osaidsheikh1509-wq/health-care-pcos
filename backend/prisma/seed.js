import { PrismaClient } from '@prisma/client';
import { SAMPLE_CLINICS } from '../src/routes/clinics.js';

const prisma = new PrismaClient();

const PCOS_TOPICS = [
  {
    slug: 'what-is-pcos',
    title: 'Understanding PCOS: What It Is and What It Isn’t',
    category: 'Overview',
    summary: 'Polycystic Ovary Syndrome (PCOS) is a common endocrine disorder affecting 8–13% of women of reproductive age worldwide. It is characterized by hormonal imbalances, irregular ovulation, and metabolic factors.',
    content: `Polycystic Ovary Syndrome (PCOS) is primarily an endocrine and metabolic condition rather than merely an ovarian disorder. Despite its name, you do not need to have multiple ovarian cysts to have PCOS, and having cysts on an ultrasound does not alone diagnose the condition.

The condition involves the ovaries producing slightly higher-than-usual amounts of hormones known as androgens (often termed male hormones, though all women naturally have and need them). This elevation can disrupt the regular monthly development and release of mature eggs (ovulation).

Common misconceptions:
1. "PCOS means you can never have children." FALSE. With lifestyle adjustments, cycle regulation, and if needed, modern medical care, the majority of women with PCOS can conceive naturally or with minor assistance.
2. "You must be overweight to have PCOS." FALSE. Up to 20-30% of women diagnosed with PCOS have a normal body mass index, sometimes referred to as 'lean PCOS'.
3. "Birth control pills are the only treatment." FALSE. Treatment is personalized and addresses nutrition, stress, sleep, insulin sensitivity, and individual health goals.`,
    sourceReferences: JSON.stringify([
      { title: 'WHO Fact Sheet: Polycystic Ovary Syndrome', url: 'https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome', organization: 'World Health Organization (WHO)' },
      { title: 'NHS Overview: Polycystic Ovary Syndrome', url: 'https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/', organization: 'National Health Service (NHS)' }
    ])
  },
  {
    slug: 'rotterdam-criteria',
    title: 'How Healthcare Professionals Evaluate PCOS (Rotterdam Criteria)',
    category: 'Diagnosis',
    summary: 'Clinicians worldwide use the Rotterdam Consensus criteria to evaluate possible PCOS. A diagnosis requires meeting at least 2 of the 3 key medical markers, with other conditions ruled out first.',
    content: `Diagnosing PCOS requires a careful clinical evaluation by a qualified doctor (typically a gynecologist or endocrinologist). No single blood test can diagnose PCOS on its own.

Under the internationally established Rotterdam Criteria, a person must meet at least TWO of the following THREE criteria:

1. Irregular or Absent Ovulation (Oligo- or Anovulation):
   Periods that arrive less frequently than every 35 days, vary widely in length, or stop entirely for months at a time.

2. Signs of High Androgen Levels (Hyperandrogenism):
   Can be clinical (visible signs such as coarse facial/body hair along the chin or chest, persistent adult cystic acne, or male-pattern scalp hair thinning) or biochemical (elevated free or total testosterone or DHEA-S in morning blood tests).

3. Polycystic Ovarian Morphology on Ultrasound:
   A pelvic or transvaginal ultrasound showing enlarged ovaries with 20 or more small, immature fluid-filled follicles (often resembling a "string of pearls").

CRITICAL EXCLUSIONS:
Before making a diagnosis, your clinician must run blood tests to rule out other conditions that present with identical symptoms, including:
- Thyroid disorders (tested via TSH)
- Hyperprolactinemia (tested via Prolactin)
- Non-Classic Congenital Adrenal Hyperplasia (tested via 17-OHP)`,
    sourceReferences: JSON.stringify([
      { title: 'International Evidence-Based Guideline for the Assessment and Management of PCOS', url: 'https://www.monash.edu/medicine/mchri/pcos', organization: 'Monash University & ASRM' },
      { title: 'ACOG Practice Bulletin No. 194: Polycystic Ovary Syndrome', url: 'https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2018/06/polycystic-ovary-syndrome', organization: 'American College of Obstetricians and Gynecologists' }
    ])
  },
  {
    slug: 'lifestyle-and-nutrition',
    title: 'Evidence-Based Nutrition and Habits for Hormonal Health',
    category: 'Lifestyle',
    summary: 'Small, sustainable daily habits have a profound effect on insulin sensitivity, androgen balance, and energy stabilization.',
    content: `Lifestyle and dietary approaches form the foundational first-line recommendation in international PCOS guidelines. The goal is not restrictive dieting, but supporting metabolic balance and reducing chronic inflammation.

1. Balancing Blood Glucose:
- Pair carbohydrates with adequate protein and healthy fats to slow glucose absorption and blunt insulin spikes.
- Emphasize low-glycemic, fiber-rich whole foods: lentils, chickpeas, oats, chia seeds, vegetables, and berries.
- Minimize sugary sweetened beverages and ultra-processed snacks.

2. Restorative & Resistance Movement:
- Resistance training (bodyweight exercises, strength training, resistance bands) enhances glucose uptake by skeletal muscle cells independently of insulin.
- Gentle movement like brisk walking after meals helps clear post-prandial glucose.

3. Sleep & Stress Hygiene:
- Chronic cortisol elevation impairs progesterone and worsens insulin resistance.
- Prioritize 7 to 9 hours of quality sleep in a dark, cool environment.
- Practice daily nervous system de-escalation: slow diaphragmatic breathing, yoga nidra, or time in nature.`,
    sourceReferences: JSON.stringify([
      { title: 'Endocrine Society Clinical Practice Guidelines on PCOS', url: 'https://www.endocrine.org/clinical-practice-guidelines/polycystic-ovary-syndrome', organization: 'The Endocrine Society' }
    ])
  }
];

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Seed clinics
    for (const clinic of SAMPLE_CLINICS) {
      await prisma.clinic.upsert({
        where: { id: clinic.id },
        update: clinic,
        create: clinic
      });
    }
    console.log(`✅ Seeded ${SAMPLE_CLINICS.length} clinics`);

    // Seed PCOS educational topics
    for (const topic of PCOS_TOPICS) {
      await prisma.pcosTopic.upsert({
        where: { slug: topic.slug },
        update: topic,
        create: topic
      });
    }
    console.log(`✅ Seeded ${PCOS_TOPICS.length} PCOS educational topics`);
  } catch (err) {
    console.warn('⚠️  Prisma database connection unavailable during seed, in-memory data will be used automatically:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
