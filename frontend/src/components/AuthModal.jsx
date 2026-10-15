import React, { useState } from 'react';
import { X, Lock, Mail, User, Heart, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const AUTH_TEXT = {
  en: {
    createTitle: 'Create Your Account',
    welcomeTitle: 'Welcome to Yajnaseni',
    guestHint: 'Account creation is completely optional. You can use all symptom guidance anonymously.',
    signInTab: 'Sign In',
    signUpTab: 'Create Account',
    nameLabel: 'Full Name or Nickname',
    namePlaceholder: 'e.g. Ananya',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your-name@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'At least 6 characters',
    submitCreate: 'Create My Account',
    submitLogin: 'Sign In',
    continueGuest: 'Continue as Guest without signing in',
    failedError: 'Authentication failed'
  },
  hi: {
    createTitle: 'अपना खाता बनाएं',
    welcomeTitle: 'याज्ञसेनी में आपका स्वागत है',
    guestHint: 'खाता बनाना पूरी तरह से वैकल्पिक है। आप बिना किसी खाते के सभी सुविधाओं का उपयोग कर सकती हैं।',
    signInTab: 'लॉग इन',
    signUpTab: 'खाता बनाएं',
    nameLabel: 'पूरा नाम या उपनाम',
    namePlaceholder: 'उदा. अनन्या',
    emailLabel: 'ईमेल पता',
    emailPlaceholder: 'your-name@example.com',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: 'कम से कम 6 अक्षर',
    submitCreate: 'मेरा खाता बनाएं',
    submitLogin: 'लॉग इन करें',
    continueGuest: 'बिना लॉग इन किए गेस्ट मोड में जारी रखें',
    failedError: 'प्रमाणीकरण विफल रहा'
  },
  kn: {
    createTitle: 'ಖಾತೆ ತೆರೆಯಿರಿ',
    welcomeTitle: 'ಯಜ್ಞಸೇನಿ ಗೆ ಸುಸ್ವಾಗತ',
    guestHint: 'ಖಾತೆ ತೆರೆಯುವುದು ಸಂಪೂರ್ಣ ಐಚ್ಛಿಕ. ನೀವು ಅನಾಮಧೇಯವಾಗಿ ಎಲ್ಲಾ ಮಾಹಿತಿ ಪಡೆಯಬಹುದು.',
    signInTab: 'ಲಾಗಿನ್',
    signUpTab: 'ಖಾತೆ ರಚಿಸಿ',
    nameLabel: 'ಪೂರ್ಣ ಹೆಸರು ಅಥವಾ ಅಡ್ಡಹೆಸರು',
    namePlaceholder: 'ಉದಾ: ಅನನ್ಯಾ',
    emailLabel: 'ಇಮೇಲ್ ವಿಳಾಸ',
    emailPlaceholder: 'your-name@example.com',
    passwordLabel: 'ಪಾಸ್‌ವರ್ಡ್',
    passwordPlaceholder: 'ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳು',
    submitCreate: 'ಖಾತೆ ರಚಿಸಿ',
    submitLogin: 'ಲಾಗಿನ್ ಮಾಡಿ',
    continueGuest: 'ಲಾಗಿನ್ ಮಾಡದೆ ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯಿರಿ',
    failedError: 'ದೃಢೀಕರಣ ವಿಫಲವಾಗಿದೆ'
  }
};

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const a = AUTH_TEXT[language] || AUTH_TEXT.en;

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await register(name, email, password, language);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message || a.failedError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-lavender-100 dark:bg-lavender-950/60 text-lavender-600 dark:text-lavender-400 rounded-2xl mb-3">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isSignUp ? a.createTitle : a.welcomeTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {a.guestHint}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setError(''); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              !isSignUp
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            {a.signInTab}
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setError(''); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              isSignUp
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            {a.signUpTab}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {a.nameLabel}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={a.namePlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-lavender-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {a.emailLabel}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={a.emailPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-lavender-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {a.passwordLabel}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={a.passwordPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-lavender-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-lavender-600 to-sakhiTeal-600 hover:from-lavender-700 hover:to-sakhiTeal-700 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isSignUp ? a.submitCreate : a.submitLogin}</span>
          </button>
        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={closeAuthModal}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:underline"
          >
            {a.continueGuest}
          </button>
        </div>
      </div>
    </div>
  );
}
