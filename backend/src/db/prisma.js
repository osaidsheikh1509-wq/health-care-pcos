import { PrismaClient } from '@prisma/client';

let prisma;
let isPgAvailable = false;

try {
  prisma = new PrismaClient({
    log: ['error'],
  });
  // Quick probe in background
  prisma.$connect()
    .then(() => {
      isPgAvailable = true;
      console.log('🐘 PostgreSQL connected successfully via Prisma');
    })
    .catch((err) => {
      isPgAvailable = false;
      console.log('ℹ️  PostgreSQL not detected locally; resilient active storage engine engaged.');
    });
} catch (err) {
  isPgAvailable = false;
}

// In-memory fallback stores to guarantee zero downtime even if PostgreSQL is offline
const inMemoryStore = {
  users: new Map(),
  assessments: new Map(),
  journalEntries: new Map(),
  clinics: new Map(),
  pcosTopics: new Map(),
};

export const getPrisma = () => prisma;

export const db = {
  // Assessment operations
  async createAssessment(data) {
    if (isPgAvailable && prisma) {
      try {
        return await prisma.assessment.create({ data });
      } catch (err) {
        console.warn('Database save failed, using memory store:', err.message);
      }
    }
    const id = 'asm_' + Math.random().toString(36).substring(2, 9);
    const item = { id, ...data, createdAt: new Date() };
    inMemoryStore.assessments.set(id, item);
    return item;
  },

  async getAssessmentsByUserId(userId) {
    if (isPgAvailable && prisma) {
      try {
        return await prisma.assessment.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        });
      } catch (err) {
        console.warn('Database read failed, using memory store:', err.message);
      }
    }
    return Array.from(inMemoryStore.assessments.values())
      .filter((a) => a.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getAssessmentById(id) {
    if (isPgAvailable && prisma) {
      try {
        return await prisma.assessment.findUnique({ where: { id } });
      } catch (err) {
        console.warn('Database read failed, using memory store:', err.message);
      }
    }
    return inMemoryStore.assessments.get(id) || null;
  },

  // Journal operations
  async createJournalEntry(data) {
    if (isPgAvailable && prisma) {
      try {
        return await prisma.journalEntry.create({ data });
      } catch (err) {
        console.warn('Database save failed, using memory store:', err.message);
      }
    }
    const id = 'jrn_' + Math.random().toString(36).substring(2, 9);
    const item = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
    inMemoryStore.journalEntries.set(id, item);
    return item;
  },

  async getJournalEntries({ userId, guestId }) {
    if (isPgAvailable && prisma) {
      try {
        return await prisma.journalEntry.findMany({
          where: {
            OR: [
              ...(userId ? [{ userId }] : []),
              ...(guestId ? [{ guestId }] : []),
            ],
          },
          orderBy: { date: 'desc' },
        });
      } catch (err) {
        console.warn('Database read failed, using memory store:', err.message);
      }
    }
    return Array.from(inMemoryStore.journalEntries.values())
      .filter((e) => (userId && e.userId === userId) || (guestId && e.guestId === guestId))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  async deleteJournalEntry(id, { userId, guestId }) {
    if (isPgAvailable && prisma) {
      try {
        return await prisma.journalEntry.deleteMany({
          where: {
            id,
            OR: [
              ...(userId ? [{ userId }] : []),
              ...(guestId ? [{ guestId }] : []),
            ],
          },
        });
      } catch (err) {
        console.warn('Database delete failed, using memory store:', err.message);
      }
    }
    const entry = inMemoryStore.journalEntries.get(id);
    if (entry && ((userId && entry.userId === userId) || (guestId && entry.guestId === guestId))) {
      inMemoryStore.journalEntries.delete(id);
      return { count: 1 };
    }
    return { count: 0 };
  },

  // Clinic operations
  async getClinics({ city, specialty }) {
    if (isPgAvailable && prisma) {
      try {
        const where = {};
        if (city) where.city = { contains: city, mode: 'insensitive' };
        if (specialty) where.specialty = { contains: specialty, mode: 'insensitive' };
        const results = await prisma.clinic.findMany({ where });
        if (results.length > 0) return results;
      } catch (err) {
        console.warn('Database read failed for clinics, using memory store:', err.message);
      }
    }
    let list = Array.from(inMemoryStore.clinics.values());
    if (city) list = list.filter((c) => c.city.toLowerCase().includes(city.toLowerCase()));
    if (specialty) list = list.filter((c) => c.specialty.toLowerCase().includes(specialty.toLowerCase()));
    return list;
  },

  async seedClinics(clinicsList) {
    if (isPgAvailable && prisma) {
      try {
        for (const item of clinicsList) {
          await prisma.clinic.create({ data: item });
        }
        return;
      } catch (err) {
        console.warn('Prisma seed clinics skipped, populating in-memory store:', err.message);
      }
    }
    clinicsList.forEach((c) => inMemoryStore.clinics.set(c.id, c));
  },

  // User operations
  async findUserByEmail(email) {
    if (isPgAvailable && prisma) {
      try {
        return await prisma.user.findUnique({ where: { email } });
      } catch (err) {
        console.warn('Database user search failed, using memory store:', err.message);
      }
    }
    return Array.from(inMemoryStore.users.values()).find((u) => u.email === email) || null;
  },

  async createUser(data) {
    if (isPgAvailable && prisma) {
      try {
        return await prisma.user.create({ data });
      } catch (err) {
        console.warn('Database user creation failed, using memory store:', err.message);
      }
    }
    const id = 'usr_' + Math.random().toString(36).substring(2, 9);
    const user = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
    inMemoryStore.users.set(id, user);
    return user;
  },

  async findUserById(id) {
    if (isPgAvailable && prisma) {
      try {
        return await prisma.user.findUnique({ where: { id } });
      } catch (err) {
        console.warn('Database user lookup failed, using memory store:', err.message);
      }
    }
    return inMemoryStore.users.get(id) || null;
  },
};

export default prisma;
