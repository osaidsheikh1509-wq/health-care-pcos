import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function VoiceInputButton({ onTranscript, disabled = false }) {
  const { language, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // Set recognition language matching app language
    if (language === 'hi') {
      recognition.lang = 'hi-IN';
    } else if (language === 'kn') {
      recognition.lang = 'kn-IN';
    } else {
      recognition.lang = 'en-US';
    }

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      if (speechText && onTranscript) {
        onTranscript(speechText);
      }
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [language, onTranscript]);

  const toggleListening = () => {
    if (!isSupported) {
      alert(t('voiceUnsupported'));
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Failed to start speech recognition:', err);
      }
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        title={isListening ? t('voiceStop') : t('voiceInputPrompt')}
        className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
          isListening
            ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 dark:shadow-rose-950/40 animate-pulse'
            : 'bg-lavender-100 text-lavender-800 hover:bg-lavender-200 dark:bg-lavender-950/60 dark:text-lavender-300 dark:hover:bg-lavender-900/60'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label={isListening ? t('voiceStop') : t('voiceInputPrompt')}
      >
        {isListening ? (
          <>
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <MicOff className="w-4 h-4" />
            <span>{t('voiceListening')}</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-lavender-600 dark:text-lavender-400" />
            <span>{t('voiceInputPrompt')}</span>
          </>
        )}
      </button>
      {isListening && (
        <span className="text-xs text-rose-600 dark:text-rose-400 font-medium animate-pulse">
          ● Recording
        </span>
      )}
    </div>
  );
}
