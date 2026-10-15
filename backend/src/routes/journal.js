import express from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate.js';
import { optionalAuth } from '../middleware/auth.js';
import { db } from '../db/prisma.js';

const router = express.Router();

const journalSchema = z.object({
  guestId: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  cycleDay: z.number().int().min(1).max(60).optional(),
  cyclePhase: z.enum(['Menstrual', 'Follicular', 'Ovulation', 'Luteal']).optional(),
  flow: z.enum(['None', 'Spotting', 'Light', 'Medium', 'Heavy']).optional(),
  painLevel: z.number().int().min(0).max(10).default(0),
  mood: z.string().optional(),
  symptoms: z.array(z.string()).default([]),
  sleepHours: z.number().min(0).max(24).optional(),
  notes: z.string().max(1000).optional().default('')
});

// POST /api/journal
router.post('/', optionalAuth, validateBody(journalSchema), async (req, res) => {
  try {
    const data = req.validatedBody;
    const userId = req.user?.id || null;
    const guestId = userId ? null : (data.guestId || 'guest_default');

    const entry = await db.createJournalEntry({
      userId,
      guestId,
      date: data.date,
      cycleDay: data.cycleDay || null,
      cyclePhase: data.cyclePhase || null,
      flow: data.flow || null,
      painLevel: data.painLevel,
      mood: data.mood || null,
      symptoms: JSON.stringify(data.symptoms),
      sleepHours: data.sleepHours || null,
      notes: data.notes || null,
    });

    res.json({
      success: true,
      data: {
        ...entry,
        symptoms: typeof entry.symptoms === 'string' ? JSON.parse(entry.symptoms) : entry.symptoms
      }
    });
  } catch (err) {
    console.error('Error saving journal entry:', err);
    res.status(500).json({ success: false, error: 'Failed to record journal entry' });
  }
});

// GET /api/journal
router.get('/', optionalAuth, async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const guestId = req.query.guestId || (userId ? null : 'guest_default');

    const entries = await db.getJournalEntries({ userId, guestId });
    const formatted = entries.map((e) => ({
      ...e,
      symptoms: typeof e.symptoms === 'string' ? JSON.parse(e.symptoms) : e.symptoms
    }));

    res.json({ success: true, data: formatted });
  } catch (err) {
    console.error('Error getting journal entries:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve journal entries' });
  }
});

// DELETE /api/journal/:id
router.delete('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || null;
    const guestId = req.query.guestId || (userId ? null : 'guest_default');

    const result = await db.deleteJournalEntry(id, { userId, guestId });
    if (result.count === 0) {
      return res.status(404).json({ success: false, error: 'Entry not found or unauthorized' });
    }

    res.json({ success: true, message: 'Journal entry removed' });
  } catch (err) {
    console.error('Error deleting journal entry:', err);
    res.status(500).json({ success: false, error: 'Failed to remove journal entry' });
  }
});

export default router;
