import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  ListChecks,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  Heart,
  Loader2,
  Navigation,
  Map
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_CLINICS } from '../data/sampleClinics';

export default function FindCarePage() {
  const { language, t } = useLanguage();
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  // Geolocation state
  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locMessage, setLocMessage] = useState('');

  // Selected clinic for embedded Google Maps preview
  const [previewMapClinic, setPreviewMapClinic] = useState(null);

  const fetchClinics = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCity) params.append('city', selectedCity);
      if (selectedSpecialty) params.append('specialty', selectedSpecialty);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`/api/clinics?${params.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setClinics(data.data);
      } else {
        setClinics(filterClientClinics());
      }
    } catch (err) {
      console.warn('Network fetch error, using local clinics dataset:', err);
      setClinics(filterClientClinics());
    } finally {
      setLoading(false);
    }
  };

  const filterClientClinics = () => {
    let list = SAMPLE_CLINICS;
    if (selectedCity) list = list.filter((c) => c.city.toLowerCase().includes(selectedCity.toLowerCase()));
    if (selectedSpecialty) list = list.filter((c) => c.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q));
    }
    return list;
  };

  useEffect(() => {
    fetchClinics();
  }, [selectedCity, selectedSpecialty, searchTerm]);

  // Geolocation handler
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocMessage('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    setLocMessage('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocating(false);
        setLocMessage(`Location identified: (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);

        // Check if closer to Bengaluru, Delhi, or Mumbai
        // (Rough proximity matcher for Indian metropolitan coordinates)
        if (latitude > 25) {
          setSelectedCity('Delhi');
        } else if (latitude < 15) {
          setSelectedCity('Bengaluru');
        } else {
          setSelectedCity('Mumbai');
        }
      },
      (error) => {
        setLocating(false);
        setLocMessage('Unable to retrieve location. Please select city manually below.');
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sakhiTeal-50 dark:bg-sakhiTeal-950/60 text-xs font-semibold text-sakhiTeal-700 dark:text-sakhiTeal-300 mb-3 border border-sakhiTeal-200 dark:border-sakhiTeal-800">
          <Compass className="w-3.5 h-3.5" />
          <span>Care Directory & Doctor Preparation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t('findCareHeader')}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {t('findCareHeaderSub')}
        </p>

        {/* Location Detection Button */}
        <div className="inline-flex flex-col items-center">
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={locating}
            className="px-5 py-2.5 bg-sakhiTeal-600 hover:bg-sakhiTeal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
          >
            {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
            <span>{t('detectLocationBtn')}</span>
          </button>
          {locMessage && (
            <span className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-2">
              {locMessage}
            </span>
          )}
        </div>
      </div>

      {/* Specialist Guide Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {t('whichSpecialist')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Depending on your predominant symptoms, different specialists offer focused clinical expertise:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-lavender-50/60 dark:bg-slate-800 rounded-2xl border border-lavender-100 dark:border-slate-700">
            <div className="w-8 h-8 rounded-xl bg-lavender-600 text-white flex items-center justify-center font-bold text-xs mb-3">
              GYN
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Gynecologist (OB/GYN)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Best for: Irregular cycles, pelvic cramps, abnormal bleeding, and pelvic ultrasound imaging.
            </p>
            <span className="text-[11px] font-semibold text-lavender-700 dark:text-lavender-400">
              Key test: Pelvic scan & cycle regulation
            </span>
          </div>

          <div className="p-5 bg-sakhiTeal-50/60 dark:bg-slate-800 rounded-2xl border border-sakhiTeal-100 dark:border-slate-700">
            <div className="w-8 h-8 rounded-xl bg-sakhiTeal-600 text-white flex items-center justify-center font-bold text-xs mb-3">
              ENDO
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Endocrinologist
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Best for: Complex hormone fluctuations, thyroid variations, and insulin resistance management.
            </p>
            <span className="text-[11px] font-semibold text-sakhiTeal-700 dark:text-sakhiTeal-400">
              Key test: Fasting insulin, TSH, Free Testosterone
            </span>
          </div>

          <div className="p-5 bg-rose-50/60 dark:bg-slate-800 rounded-2xl border border-rose-100 dark:border-slate-700">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-xs mb-3">
              DERM
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Dermatologist / Trichologist
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Best for: Stubborn cystic acne on chin/jawline, hirsutism (coarse facial hair), and crown hair loss.
            </p>
            <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400">
              Key focus: Targeted topical & anti-androgen therapy
            </span>
          </div>
        </div>
      </div>

      {/* Embedded Google Map Preview Modal */}
      {previewMapClinic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in no-print">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {previewMapClinic.name}
                </h3>
                <p className="text-xs text-slate-500">{previewMapClinic.address}, {previewMapClinic.city}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewMapClinic(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Google Maps Embed iframe */}
            <div className="w-full h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              <iframe
                title="Clinic Map Location"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(previewMapClinic.name + ' ' + previewMapClinic.address + ' ' + previewMapClinic.city)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                style={{ border: 0 }}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(previewMapClinic.name + ' ' + previewMapClinic.address + ' ' + previewMapClinic.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-lavender-600 hover:bg-lavender-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Clinic Directory Search & Filters */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Verified Clinics & Tele-Consult Providers
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Clinics with multidisciplinary women’s health teams, pelvic imaging, and regional language support.
            </p>
          </div>

          <span className="text-xs font-semibold text-lavender-700 dark:text-lavender-400">
            {clinics.length} Providers Found
          </span>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={t('searchClinicsPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300"
          >
            <option value="">{t('allCities')}</option>
            <option value="Bengaluru">Bengaluru, Karnataka</option>
            <option value="Delhi">New Delhi, NCR</option>
            <option value="Mumbai">Mumbai, Maharashtra</option>
            <option value="Hyderabad">Hyderabad, Telangana</option>
            <option value="Chennai">Chennai, Tamil Nadu</option>
            <option value="National">Pan-India Tele-Health</option>
          </select>

          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300"
          >
            <option value="">{t('allSpecialties')}</option>
            <option value="Gynecology">Gynecology & Pelvic Health</option>
            <option value="Endocrinology">Endocrinology & Hormones</option>
            <option value="Dermatology">Dermatology & Skin</option>
            <option value="Tele-Consultation">Tele-Consultation</option>
          </select>
        </div>

        {/* Clinic Cards Grid with Google Maps Directions */}
        {loading ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-lavender-600 mb-2" />
            <p className="text-xs text-slate-500">Searching care providers...</p>
          </div>
        ) : clinics.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              No matching clinics found for your filter.
            </p>
            <button
              type="button"
              onClick={() => { setSelectedCity(''); setSelectedSpecialty(''); setSearchTerm(''); }}
              className="mt-3 text-xs text-lavender-600 dark:text-lavender-400 font-semibold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clinics.map((clinic) => {
              const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                clinic.name + ' ' + clinic.address + ' ' + clinic.city
              )}`;

              return (
                <div
                  key={clinic.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-lavender-50 dark:bg-lavender-950/80 text-lavender-700 dark:text-lavender-300">
                        {clinic.specialty}
                      </span>
                      {clinic.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {clinic.name}
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{clinic.address}, {clinic.city}</span>
                      </div>

                      {clinic.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{clinic.phone}</span>
                        </div>
                      )}

                      {clinic.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{clinic.email}</span>
                        </div>
                      )}
                    </div>

                    {clinic.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
                        {clinic.notes}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setPreviewMapClinic(clinic)}
                      className="inline-flex items-center gap-1 text-lavender-600 dark:text-lavender-400 hover:underline"
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>Preview Map</span>
                    </button>

                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
