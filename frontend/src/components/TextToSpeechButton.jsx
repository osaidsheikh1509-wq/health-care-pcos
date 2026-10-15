import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play, Square, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TextToSpeechButton({ text, label = 'Listen Aloud' }) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // When language changes, stop any running speech
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [language]);

  if (!isSupported || !text) return null;

  const handlePlay = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text of markdown/symbols
    const cleanText = text
      .replace(/[#*_`~-]/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Set voice language
    if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (language === 'kn') {
      utterance.lang = 'kn-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    // Try finding matching voice
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) => v.lang.startsWith(utterance.lang.slice(0, 2)));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.rate = 0.95; // Clear, comfortable pacing for healthcare explanations
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5 p-1 bg-lavender-50 dark:bg-slate-800 rounded-xl border border-lavender-200 dark:border-slate-700 text-xs font-semibold">
      {!isPlaying && !isPaused ? (
        <button
          type="button"
          onClick={handlePlay}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lavender-600 hover:bg-lavender-700 text-white transition-all shadow-xs"
          title="Listen to this guidance read aloud"
          aria-label="Listen Aloud"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{label}</span>
        </button>
      ) : (
        <div className="inline-flex items-center gap-1 px-1.5 py-0.5">
          {isPlaying && (
            <div className="flex items-center gap-0.5 mr-1.5">
              <span className="w-1 h-3 bg-lavender-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-4 bg-sakhiTeal-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-2 bg-lavender-600 rounded-full animate-bounce" />
            </div>
          )}

          {isPlaying ? (
            <button
              type="button"
              onClick={handlePause}
              className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-700 dark:text-slate-200"
              title="Pause"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-lavender-600 dark:text-lavender-400"
              title="Resume"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleStop}
            className="p-1.5 hover:bg-rose-100 dark:hover:bg-rose-950/60 rounded-md text-rose-600 dark:text-rose-400"
            title="Stop Reading"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      )}
    </div>
  );
}
