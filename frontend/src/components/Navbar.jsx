import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Heart,
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  User,
  LogOut,
  Stethoscope,
  BookOpen,
  Calendar,
  Compass,
  Info,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('navHome'), icon: Heart },
    { to: '/assess', label: t('navSymptoms'), icon: Stethoscope },
    { to: '/pcos-guide', label: t('navPcosGuide'), icon: BookOpen },
    { to: '/journal', label: t('navJournal'), icon: Calendar },
    { to: '/find-care', label: t('navFindCare'), icon: Compass },
    { to: '/about', label: t('navAbout'), icon: Info },
    { to: '/privacy', label: t('navPrivacy'), icon: ShieldCheck },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#161118]/95 backdrop-blur-md border-b border-[#F3E8EE] dark:border-plum-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand (Matching Figma Make) */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#4A1E48] dark:bg-plum-800 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-[#2E132A] dark:text-white tracking-tight">
                {t('brandName')}
              </span>
              <span className="hidden sm:block text-[10px] text-[#706870] dark:text-slate-400 font-normal tracking-tight -mt-0.5">
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-plum-100/70 text-[#4A1E48] dark:bg-plum-950/80 dark:text-plum-200 font-semibold shadow-xs'
                      : 'text-[#645D63] dark:text-slate-300 hover:text-[#4A1E48] dark:hover:text-plum-200 hover:bg-plum-50/60 dark:hover:bg-plum-950/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#9B4368] dark:text-blush-400' : 'text-[#8A828A]'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action buttons: Private Badge, Language, Theme, Auth, Mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Figma-style "Private & educational" Trust Badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-[#9B4368] dark:text-blush-300 px-2.5 py-1">
              <ShieldCheck className="w-4 h-4 text-[#9B4368] dark:text-blush-400" />
              <span>{t('privateEducational')}</span>
            </div>

            {/* Figma-style Language Selector Dropdown */}
            <LanguageSelector />

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[#645D63] dark:text-slate-300 hover:bg-plum-50 dark:hover:bg-plum-950/60 rounded-xl transition-colors"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#4A1E48]" />}
            </button>

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-medium text-[#4A1E48] dark:text-slate-300 px-2.5 py-1 bg-plum-50 dark:bg-plum-950/60 rounded-full border border-[#F3E8EE] dark:border-plum-900">
                  {user.name || user.email}
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#4A1E48] dark:text-plum-200 bg-plum-50 hover:bg-plum-100 dark:bg-plum-950/50 dark:hover:bg-plum-900/60 rounded-full border border-[#F3E8EE] dark:border-plum-800/60 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('signIn')}</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#4A1E48] dark:text-slate-300 hover:bg-plum-50 dark:hover:bg-plum-950/60 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#F3E8EE] dark:border-plum-900 bg-white/95 dark:bg-[#161118]/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-1 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium transition-all ${
                  active
                    ? 'bg-plum-100/70 text-[#4A1E48] dark:bg-plum-950/80 dark:text-plum-200 font-semibold'
                    : 'text-[#645D63] dark:text-slate-300 hover:bg-plum-50 dark:hover:bg-plum-950/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-[#9B4368] dark:text-blush-400' : 'text-[#8A828A]'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Mobile Language Selector */}
          <div className="py-2">
            <span className="text-[11px] font-bold text-[#8A828A] dark:text-slate-500 uppercase tracking-wider block mb-1.5 px-1">
              {language === 'hi' ? 'भाषा' : language === 'kn' ? 'ಭಾಷೆ' : 'Language'}
            </span>
            <LanguageSelector variant="segmented" />
          </div>

          <div className="pt-3 border-t border-[#F3E8EE] dark:border-plum-900 flex items-center justify-between">
            {isAuthenticated ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-[#4A1E48] dark:text-slate-300">
                  {user.name || user.email}
                </span>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-1.5 text-sm text-rose-600 dark:text-rose-400 py-1.5 px-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('signOut')}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => { openAuthModal(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center text-sm font-semibold bg-lavender-600 text-white rounded-xl shadow-sm"
              >
                {t('signIn')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
