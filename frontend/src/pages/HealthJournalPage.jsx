import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  TrendingUp,
  Smile,
  AlertCircle,
  Clock,
  Printer,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Droplet,
  Heart,
  CheckCircle2,
  Loader2,
  X,
  Edit2,
  CalendarCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function HealthJournalPage() {
  const { guestId, isAuthenticated } = useAuth();
  const { language, t } = useLanguage();

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogForm, setShowLogForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // Selected Day Inspection Modal
  const [inspectedDay, setInspectedDay] = useState(null);

  // Form state
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [cycleDay, setCycleDay] = useState(1);
  const [cyclePhase, setCyclePhase] = useState('Menstrual');
  const [flow, setFlow] = useState('Medium');
  const [painLevel, setPainLevel] = useState(3);
  const [mood, setMood] = useState('Calm');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [notes, setNotes] = useState('');

  // Calendar month view state
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const symptomOptions = [
    { en: 'Lower Abdominal Cramps', hi: 'पेट के निचले हिस्से में ऐंठन', kn: 'ಕಿಬ್ಬೊಟ್ಟೆ ಸೆಳೆತ' },
    { en: 'Bloating', hi: 'पेट फूलना (Bloating)', kn: 'ಹೊಟ್ಟೆ ಉಬ್ಬರ' },
    { en: 'Acne Flare-up', hi: 'मुंहासों का बढ़ना', kn: 'ಮೊಡವೆಗಳು' },
    { en: 'Headache / Migraine', hi: 'सिरदर्द / माइग्रेन', kn: 'ತಲೆನೋವು' },
    { en: 'Fatigue / Brain Fog', hi: 'थकान / भारीपन', kn: 'ಆಯಾಸ / ಸುಸ್ತು' },
    { en: 'Breast Tenderness', hi: 'स्तनों में भारीपन या दर्द', kn: 'ಸ್ತನಗಳ ಸೂಕ್ಷ್ಮತೆ' },
    { en: 'Mood Swings', hi: 'मूड में तेजी से बदलाव', kn: 'ಮನಸ್ಥಿತಿಯ ಬದಲಾವಣೆ' },
    { en: 'Sugar Cravings', hi: 'मीठा खाने की तीव्र इच्छा', kn: 'ಸಿಹಿ ತಿನ್ನುವ ಬಯಕೆ' },
    { en: 'Backache', hi: 'कमर या पीठ दर्द', kn: 'ಬೆನ್ನು ನೋವು' },
    { en: 'Hot Flashes', hi: 'अचानक पसीना व गर्मी लगना', kn: 'ಬಿಸಿ ಶಾಖ' }
  ];

  const moodOptions = ['Calm', 'Energetic', 'Anxious', 'Irritable', 'Low / Sad', 'Tired'];

  // Fetch journal entries from backend or localStorage fallback
  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/journal?guestId=${guestId}`, { credentials: 'include' });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setEntries(data.data);
      } else {
        const local = JSON.parse(localStorage.getItem('sakhi_journal') || '[]');
        setEntries(local);
      }
    } catch (err) {
      console.warn('Network fetch failed, reading localStorage:', err);
      const local = JSON.parse(localStorage.getItem('sakhi_journal') || '[]');
      setEntries(local);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [guestId]);

  const handleSymptomToggle = (s) => {
    if (selectedSymptoms.includes(s)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== s));
    } else {
      setSelectedSymptoms([...selectedSymptoms, s]);
    }
  };

  const handleSaveEntry = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      guestId,
      date,
      cycleDay: parseInt(cycleDay, 10),
      cyclePhase,
      flow,
      painLevel: parseInt(painLevel, 10),
      mood,
      symptoms: selectedSymptoms,
      sleepHours: parseFloat(sleepHours),
      notes
    };

    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        const updated = [data.data, ...entries.filter((en) => en.date !== date)];
        setEntries(updated);
        localStorage.setItem('sakhi_journal', JSON.stringify(updated));
      } else {
        const fallbackItem = { id: 'local_' + Date.now(), ...payload };
        const updated = [fallbackItem, ...entries.filter((en) => en.date !== date)];
        setEntries(updated);
        localStorage.setItem('sakhi_journal', JSON.stringify(updated));
      }

      setShowLogForm(false);
      setInspectedDay(null);
      setNotes('');
      setSelectedSymptoms([]);
    } catch (err) {
      console.warn('Network save failed, saving to localStorage:', err);
      const fallbackItem = { id: 'local_' + Date.now(), ...payload };
      const updated = [fallbackItem, ...entries.filter((en) => en.date !== date)];
      setEntries(updated);
      localStorage.setItem('sakhi_journal', JSON.stringify(updated));
      setShowLogForm(false);
      setInspectedDay(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await fetch(`/api/journal/${id}?guestId=${guestId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
    } catch (e) {}

    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem('sakhi_journal', JSON.stringify(updated));
    setInspectedDay(null);
  };

  // Calendar calculations
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Map entries by date for instant lookup
  const entriesByDate = entries.reduce((acc, curr) => {
    acc[curr.date] = curr;
    return acc;
  }, {});

  // Cycle Prediction Logic:
  // Find period start dates (where flow is Medium or Heavy, or cyclePhase is Menstrual)
  const periodStarts = entries
    .filter((e) => e.cyclePhase === 'Menstrual' && e.flow && e.flow !== 'None')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  let predictedNextPeriod = null;
  if (periodStarts.length >= 1) {
    const lastPeriodDate = new Date(periodStarts[periodStarts.length - 1].date);
    // Typical cycle length estimate: 28 days
    const nextEstimatedDate = new Date(lastPeriodDate);
    nextEstimatedDate.setDate(nextEstimatedDate.getDate() + 28);
    predictedNextPeriod = nextEstimatedDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Summary Metrics
  const avgPain = entries.length > 0
    ? (entries.reduce((sum, e) => sum + (e.painLevel || 0), 0) / entries.length).toFixed(1)
    : '0';

  const handleOpenEditForDate = (entry) => {
    setDate(entry.date);
    setCycleDay(entry.cycleDay || 1);
    setCyclePhase(entry.cyclePhase || 'Menstrual');
    setFlow(entry.flow || 'None');
    setPainLevel(entry.painLevel || 0);
    setMood(entry.mood || 'Calm');
    setSelectedSymptoms(entry.symptoms || []);
    setSleepHours(entry.sleepHours || 7.5);
    setNotes(entry.notes || '');
    setInspectedDay(null);
    setShowLogForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sakhiTeal-50 dark:bg-sakhiTeal-950/60 text-xs font-semibold text-sakhiTeal-700 dark:text-sakhiTeal-300 mb-2 border border-sakhiTeal-200 dark:border-sakhiTeal-800">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{t('journalHeader')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t('journalHeader')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t('journalHeaderSub')}
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 text-xs sm:text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>{t('printJournalBtn')}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setDate(todayStr);
              setShowLogForm(!showLogForm);
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-lavender-600 to-sakhiTeal-600 hover:from-lavender-700 hover:to-sakhiTeal-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{showLogForm ? t('closeFormBtn') : t('logDailyBtn')}</span>
          </button>
        </div>
      </div>

      {/* Cycle Forecast & Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Next Cycle Forecast Card */}
        <div className="p-5 bg-gradient-to-br from-lavender-50 to-sakhiTeal-50/50 dark:from-slate-900 dark:to-slate-900 rounded-2xl border border-lavender-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lavender-600 text-white flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              {t('nextPeriodForecast')}
            </span>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {predictedNextPeriod ? `Approx. ${predictedNextPeriod}` : 'Log periods to forecast'}
            </p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lavender-100 dark:bg-lavender-950/60 text-lavender-600 dark:text-lavender-400 flex items-center justify-center shrink-0">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              {t('totalDaysTracked')}
            </span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{entries.length}</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              {t('averagePainLevel')}
            </span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {avgPain} <span className="text-xs font-normal text-slate-500">/ 10</span>
            </p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sakhiTeal-100 dark:bg-sakhiTeal-950/60 text-sakhiTeal-600 dark:text-sakhiTeal-400 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              {t('privacyStatus')}
            </span>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
              {isAuthenticated ? 'Cloud Synced' : 'Private Guest Mode'}
            </p>
          </div>
        </div>
      </div>

      {/* Day Inspection Modal */}
      {inspectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in no-print">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <button
              onClick={() => setInspectedDay(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-lavender-100 dark:bg-lavender-950 text-lavender-600 dark:text-lavender-300 flex items-center justify-center font-bold">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {inspectedDay.date}
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  {inspectedDay.entry ? 'Recorded Daily Log' : 'No entry logged for this day'}
                </span>
              </div>
            </div>

            {inspectedDay.entry ? (
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2">
                  {inspectedDay.entry.cyclePhase && (
                    <span className="px-2.5 py-1 rounded-lg bg-lavender-100 dark:bg-lavender-950/80 text-lavender-800 dark:text-lavender-200 text-xs font-semibold">
                      Phase: {inspectedDay.entry.cyclePhase}
                    </span>
                  )}
                  {inspectedDay.entry.flow && inspectedDay.entry.flow !== 'None' && (
                    <span className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 text-xs font-semibold flex items-center gap-1">
                      <Droplet className="w-3 h-3" />
                      Flow: {inspectedDay.entry.flow}
                    </span>
                  )}
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <div>Pain Level: <strong>{inspectedDay.entry.painLevel}/10</strong></div>
                  {inspectedDay.entry.mood && <div>Mood: <strong>{inspectedDay.entry.mood}</strong></div>}
                  {inspectedDay.entry.sleepHours && <div>Sleep: <strong>{inspectedDay.entry.sleepHours} hrs</strong></div>}
                </div>

                {inspectedDay.entry.symptoms && inspectedDay.entry.symptoms.length > 0 && (
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block mb-1">Symptoms:</span>
                    <div className="flex flex-wrap gap-1">
                      {inspectedDay.entry.symptoms.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-[11px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {inspectedDay.entry.notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                    "{inspectedDay.entry.notes}"
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditForDate(inspectedDay.entry)}
                    className="flex-1 py-2 px-3 bg-lavender-600 hover:bg-lavender-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Day</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(inspectedDay.entry.id)}
                    className="py-2 px-3 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl text-xs font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center">
                <p className="text-xs text-slate-500 mb-4">
                  No symptom records for this date. You can add an entry now.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDate(inspectedDay.date);
                    setInspectedDay(null);
                    setShowLogForm(true);
                  }}
                  className="px-4 py-2 bg-lavender-600 hover:bg-lavender-700 text-white rounded-xl text-xs font-semibold"
                >
                  Log Symptoms for {inspectedDay.date}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Daily Logging Form Drawer */}
      {showLogForm && (
        <form
          onSubmit={handleSaveEntry}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-lavender-200 dark:border-slate-800 shadow-md space-y-6 animate-fade-in no-print"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-lavender-600" />
              <span>{t('logDailyBtn')}</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">{date}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('cyclePhaseLabel')}
              </label>
              <select
                value={cyclePhase}
                onChange={(e) => setCyclePhase(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
              >
                <option value="Menstrual">Menstrual Phase (Period)</option>
                <option value="Follicular">Follicular Phase</option>
                <option value="Ovulation">Ovulation Window</option>
                <option value="Luteal">Luteal Phase (Pre-period)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('flowIntensityLabel')}
              </label>
              <select
                value={flow}
                onChange={(e) => setFlow(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
              >
                <option value="None">None (No bleeding)</option>
                <option value="Spotting">Spotting / Light brown</option>
                <option value="Light">Light Flow</option>
                <option value="Medium">Medium Flow</option>
                <option value="Heavy">Heavy Flow</option>
              </select>
            </div>
          </div>

          {/* Pain Slider & Mood */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t('painScaleLabel')}
                </label>
                <span className="text-sm font-bold text-lavender-600 dark:text-lavender-400">
                  {painLevel} / 10
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(e.target.value)}
                className="w-full accent-lavender-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0 (None)</span>
                <span>5 (Moderate)</span>
                <span>10 (Severe)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('generalMoodLabel')}
              </label>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMood(m)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      mood === m
                        ? 'bg-lavender-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Physical & Emotional Symptoms */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {t('physicalSymptomsLabel')}
            </label>
            <div className="flex flex-wrap gap-2">
              {symptomOptions.map((symObj) => {
                const label = symObj[language] || symObj.en;
                const checked = selectedSymptoms.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleSymptomToggle(label)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      checked
                        ? 'bg-sakhiTeal-600 text-white font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>{label}</span>
                    {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('notesLabel')}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Took warm bath, 30 min yoga, rested well..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowLogForm(false)}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              {t('cancelBtn')}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-lavender-600 hover:bg-lavender-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{t('saveEntryBtn')}</span>
            </button>
          </div>
        </form>
      )}

      {/* Main Journal Grid: Interactive Calendar & Entries Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Month Calendar (1 col on large) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {monthNames[month]} {year}
            </h3>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Calendar Day Grid with Day Numbers and Flow Badges */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const hasEntry = entriesByDate[dStr];
              const isToday = dStr === todayStr;

              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => setInspectedDay({ date: dStr, entry: hasEntry || null })}
                  className={`h-12 rounded-xl flex flex-col items-center justify-center relative transition-all ${
                    isToday ? 'border-2 border-lavender-500 font-bold' : ''
                  } ${
                    hasEntry
                      ? 'bg-lavender-100 dark:bg-lavender-950/70 text-lavender-900 dark:text-lavender-200 font-semibold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                  title={hasEntry ? `Day ${dayNum}: ${hasEntry.flow || 'No flow'}` : `Day ${dayNum}`}
                >
                  <span className="text-xs">{dayNum}</span>
                  {hasEntry && (
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {hasEntry.flow && hasEntry.flow !== 'None' ? (
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
              Period Flow
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
              Symptom Logged
            </span>
          </div>
        </div>

        {/* Entries Timeline (2 cols on large) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Recorded Days History
            </h3>
            <span className="text-xs text-slate-500">{entries.length} days logged</span>
          </div>

          {loading ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-lavender-600 mb-2" />
              <p className="text-xs text-slate-500">Loading your journal history...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <CalendarIcon className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">
                No Journal Entries Yet
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
                Click any day on the calendar or "Log Daily Symptoms" above to begin tracking.
              </p>
              <button
                type="button"
                onClick={() => {
                  setDate(todayStr);
                  setShowLogForm(true);
                }}
                className="px-4 py-2 bg-lavender-600 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Log Today
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry) => (
                <div
                  key={entry.id || entry.date}
                  className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {entry.date}
                      </span>
                      {entry.cyclePhase && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-lavender-100 dark:bg-lavender-950/80 text-lavender-700 dark:text-lavender-300">
                          {entry.cyclePhase}
                        </span>
                      )}
                      {entry.flow && entry.flow !== 'None' && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center gap-1">
                          <Droplet className="w-3 h-3" />
                          {entry.flow}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                      <span>Pain: <strong>{entry.painLevel}/10</strong></span>
                      {entry.mood && <span>Mood: <strong>{entry.mood}</strong></span>}
                      {entry.sleepHours && <span>Sleep: <strong>{entry.sleepHours} hrs</strong></span>}
                    </div>

                    {entry.symptoms && entry.symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {entry.symptoms.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {entry.notes && (
                      <p className="text-xs text-slate-500 italic pt-1">
                        "{entry.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 self-end sm:self-center no-print">
                    <button
                      type="button"
                      onClick={() => handleOpenEditForDate(entry)}
                      className="text-slate-400 hover:text-lavender-600 p-2 rounded-lg transition-colors"
                      title="Edit entry"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-slate-400 hover:text-rose-600 p-2 rounded-lg transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
