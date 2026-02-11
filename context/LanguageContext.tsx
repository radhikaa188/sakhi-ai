"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, TranslationStrings } from "@/types";
import { getTranslation, getSpeechCode } from "@/lib/translation";

// ============================================
// CONTEXT TYPE
// ============================================

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationStrings; // Translation strings
  speak: (text: string) => void; // Text-to-speech function
  isSpeaking: boolean;
}

// ============================================
// CREATE CONTEXT
// ============================================

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// ============================================
// PROVIDER COMPONENT
// ============================================

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("hindi");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("sakhi-language") as Language;
    if (savedLanguage && ["hindi", "english", "tamil"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("sakhi-language", lang);
  };

  // Get translations for current language
  const t = getTranslation(language);

  // Text-to-speech function
  const speak = (text: string) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const speechCode = getSpeechCode(language);
    utterance.lang = speechCode;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a voice for the selected language
    const languagePrefix = speechCode.split('-')[0]; // 'hi', 'en', 'ta'
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith(languagePrefix)
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Handle errors (like missing Tamil voice)
    utterance.onerror = (event) => {
      console.log("Speech synthesis error:", event.error);
      setIsSpeaking(false);
      
      // If language unavailable, try English fallback
      if (event.error === "language-unavailable") {
        console.log(`${language} voice not available, using English fallback`);
        const fallbackUtterance = new SpeechSynthesisUtterance(text);
        fallbackUtterance.lang = "en-US";
        window.speechSynthesis.speak(fallbackUtterance);
      }
    };

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        speak,
        isSpeaking,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// ============================================
// CUSTOM HOOK
// ============================================

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
