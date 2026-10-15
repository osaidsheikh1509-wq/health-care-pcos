import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  {
    code: 'en',
    label: 'English',
    native: 'English',
    badge: 'EN',
    subtext: 'English (Default)'
  },
  {
    code: 'hi',
    label: 'Hindi',
    native: 'हिन्दी',
    badge: 'हि',
    subtext: 'सरल हिंदी मार्गदर्शन'
  },
  {
    code: 'kn',
    label: 'Kannada',
    native: 'ಕನ್ನಡ',
    badge: 'ಕ',
    subtext: 'ಸರಳ ಕನ್ನಡ ಮಾರ್ಗದರ್ಶನ'
  }
];

export default function LanguageSelector({ variant = 'navbar' }) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const activeLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'segmented') {
    return (
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FAF4F7] dark:bg-[#161118] rounded-2xl border border-[#F3E8EE] dark:border-plum-900">
        {LANGUAGES.map((item) => {
          const isSelected = item.code === language;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-0.5 ${
                isSelected
                  ? 'bg-white dark:bg-plum-900/80 text-[#4A1E48] dark:text-plum-100 shadow-xs border border-[#F3E8EE] dark:border-plum-800'
                  : 'text-[#706870] dark:text-slate-400 hover:text-[#4A1E48] dark:hover:text-white'
              }`}
            >
              <span className="font-bold">{item.native}</span>
              <span className="text-[10px] opacity-75 font-normal">{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Pill Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select Language"
        className={`group inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all border shadow-xs ${
          isOpen
            ? 'bg-plum-50 dark:bg-plum-950/70 border-plum-600 text-[#4A1E48] dark:text-plum-200 ring-2 ring-plum-600/20'
            : 'bg-white dark:bg-[#1C151D] hover:bg-plum-50/80 dark:hover:bg-plum-950/60 border-[#F3E8EE] dark:border-plum-900 text-[#4A1E48] dark:text-slate-200 hover:border-plum-300'
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-plum-100/70 dark:bg-plum-900/60 text-[#4A1E48] dark:text-plum-200 flex items-center justify-center shrink-0">
          <Globe className="w-3.5 h-3.5" />
        </div>
        <span className="font-medium tracking-tight">
          {activeLang.native}
        </span>
        <span className="hidden md:inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-plum-100/80 dark:bg-plum-900/80 text-[#4A1E48] dark:text-plum-200">
          {activeLang.badge}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#8A828A] group-hover:text-[#4A1E48] dark:group-hover:text-plum-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#4A1E48] dark:text-plum-300' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Card */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-56 sm:w-64 origin-top-right rounded-2xl bg-white/95 dark:bg-[#1C151D]/95 backdrop-blur-md shadow-xl border border-[#F3E8EE] dark:border-plum-900 p-2 z-50 focus:outline-hidden animate-fade-in"
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-[#F3E8EE] dark:border-plum-900/80 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A828A] dark:text-slate-500">
              {language === 'hi'
                ? 'भाषा चुनें'
                : language === 'kn'
                ? 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ'
                : 'Select Language'}
            </span>
            <span className="text-[10px] text-[#9B4368] dark:text-blush-400 font-semibold">
              3 Languages
            </span>
          </div>

          {/* Options */}
          <div className="space-y-1">
            {LANGUAGES.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelect(item.code)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-plum-50 dark:bg-plum-950/70 text-[#4A1E48] dark:text-plum-100 font-semibold border border-[#F3E8EE] dark:border-plum-800 shadow-xs'
                      : 'text-[#645D63] dark:text-slate-300 hover:bg-plum-50/60 dark:hover:bg-plum-950/50 hover:text-[#4A1E48] dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#4A1E48] text-white shadow-xs'
                          : 'bg-[#FAF4F7] dark:bg-plum-950 text-[#4A1E48] dark:text-slate-400 group-hover:bg-plum-100 dark:group-hover:bg-plum-900/80 group-hover:text-[#4A1E48]'
                      }`}
                    >
                      {item.badge}
                    </span>
                    <div>
                      <div className="font-bold text-[#2E132A] dark:text-white text-sm leading-tight flex items-center gap-1.5">
                        <span>{item.native}</span>
                        {item.code !== 'en' && (
                          <span className="text-[11px] font-normal text-[#8A828A]">
                            ({item.label})
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#706870] dark:text-slate-400 font-normal">
                        {item.subtext}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#4A1E48] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="mt-2 pt-2 border-t border-[#F3E8EE] dark:border-plum-900/80 px-3 py-1 text-[10px] text-[#8A828A] dark:text-slate-500 text-center">
            {language === 'hi'
              ? 'पूरा एप्लिकेशन चुनी गई भाषा में बदल जाएगा'
              : language === 'kn'
              ? 'ಆಯ್ಕೆಮಾಡಿದ ಭಾಷೆಯಲ್ಲಿ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ಬದಲಾಗುತ್ತದೆ'
              : 'Full site translates instantly into selected language'}
          </div>
        </div>
      )}
    </div>
  );
}
