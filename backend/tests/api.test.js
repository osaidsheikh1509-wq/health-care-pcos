import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/server.js';
import { getFallbackAssessment } from '../src/services/fallbackEngine.js';

test('GET /api/health should return 200 with service information', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'healthy');
  assert.equal(res.body.service, 'Yajnaseni Health API');
});

test('GET /api/symptoms/categories returns all categories', async () => {
  const res = await request(app).get('/api/symptoms/categories');
  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.ok(Array.isArray(res.body.data));
  assert.equal(res.body.data.length, 8);
  assert.ok(res.body.data.some((c) => c.id === 'menstrual_health'));
  assert.ok(res.body.data.some((c) => c.id === 'irregular_periods'));
});

test('POST /api/symptoms/assess validates required fields', async () => {
  const res = await request(app)
    .post('/api/symptoms/assess')
    .send({});
  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
});

test('POST /api/symptoms/assess returns structured 6-part assessment', async () => {
  const payload = {
    language: 'en',
    category: 'irregular_periods',
    symptoms: ['delayed_cycle', 'unpredictable_timing'],
    duration: '1-3 months',
    onsetType: 'recurring',
    freeTextDescription: 'Periods have been coming every 45 to 50 days lately.'
  };

  const res = await request(app)
    .post('/api/symptoms/assess')
    .send(payload);

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  const data = res.body.data;

  // Verify all 6 mandatory sections from the requirements:
  assert.ok(data.symptomSummary, 'Missing symptomSummary (What you described)');
  assert.ok(data.whatItMeans, 'Missing whatItMeans (What this symptom can mean)');
  assert.ok(Array.isArray(data.possibleExplanations), 'Missing possibleExplanations');
  assert.ok(data.possibleExplanations.length > 0);
  assert.ok(Array.isArray(data.actionableNextSteps), 'Missing actionableNextSteps (What you can do next)');
  assert.ok(Array.isArray(data.whenToSeekCare), 'Missing whenToSeekCare (When to seek medical attention)');
  assert.ok(Array.isArray(data.doctorQuestions), 'Missing doctorQuestions (Questions you may want to ask your doctor)');
  assert.ok(Array.isArray(data.glossary), 'Missing glossary for medical terms');
});

test('Clinical fallback engine works in Hindi (hi) and Kannada (kn)', () => {
  const hiResult = getFallbackAssessment({
    category: 'acne_skin',
    language: 'hi',
    symptoms: ['cystic_acne']
  });
  assert.equal(hiResult.language, 'hi');
  assert.ok(hiResult.whatItMeans.includes('हार्मोन'));

  const knResult = getFallbackAssessment({
    category: 'fatigue',
    language: 'kn',
    symptoms: ['unrefreshing_sleep']
  });
  assert.equal(knResult.language, 'kn');
  assert.ok(knResult.whatItMeans.includes('ಹಾರ್ಮೋನ್'));
});

test('GET /api/clinics returns verified clinics and supports filtering', async () => {
  const res = await request(app).get('/api/clinics');
  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.ok(res.body.data.length > 0);

  const filtered = await request(app).get('/api/clinics?city=Bengaluru');
  assert.equal(filtered.status, 200);
  assert.ok(filtered.body.data.some((c) => c.city.includes('Bengaluru')));
});

test('Health Journal: can create and retrieve an entry', async () => {
  const newEntry = {
    guestId: 'test_guest_123',
    date: '2025-10-15',
    cycleDay: 14,
    cyclePhase: 'Ovulation',
    flow: 'None',
    painLevel: 2,
    mood: 'Energetic',
    symptoms: ['Bloating'],
    notes: 'Feeling energetic today'
  };

  const createRes = await request(app)
    .post('/api/journal')
    .send(newEntry);

  assert.equal(createRes.status, 200);
  assert.equal(createRes.body.success, true);
  assert.equal(createRes.body.data.painLevel, 2);

  const getRes = await request(app)
    .get('/api/journal?guestId=test_guest_123');

  assert.equal(getRes.status, 200);
  assert.equal(getRes.body.success, true);
  assert.ok(getRes.body.data.length >= 1);
});
