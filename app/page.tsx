"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LANGUAGES } from "@/lib/translation";
import { Language } from "@/types";
import { Volume2, Sparkles } from "lucide-react";

export default function LanguageSelectionPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  // Text-to-speech for each language option
  const speakLanguageName = (lang: Language, nativeName: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(nativeName);
    const speechCode = LANGUAGES.find((l) => l.code === lang)?.speechCode || "en-US";
    utterance.lang = speechCode;
    utterance.rate = 0.9;

    // Get available voices
    const voices = window.speechSynthesis.getVoices();

    // Try to find a voice for the selected language
    const preferredVoice = voices.find(voice =>
      voice.lang.startsWith(speechCode.split('-')[0]) // Match 'ta' from 'ta-IN'
    );

    // If Tamil voice not found, use English voice but speak the word "Tamil"
    if (lang === "tamil" && !preferredVoice) {
      utterance.text = "Tamil"; // Speak in English if Tamil voice unavailable
      utterance.lang = "en-US";
    } else if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onerror = (event) => {
      console.log("Speech error:", event.error);
      // Fallback: speak in English
      if (event.error === "language-unavailable") {
        const fallbackUtterance = new SpeechSynthesisUtterance(
          lang === "tamil" ? "Tamil" : lang === "hindi" ? "Hindi" : "English"
        );
        fallbackUtterance.lang = "en-US";
        window.speechSynthesis.speak(fallbackUtterance);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Handle language selection
  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);

    // Save to localStorage
    localStorage.setItem("sakhi-language", lang);

    // Navigate to onboarding after a short delay
    setTimeout(() => {
      router.push("/onboarding");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Logo/Header */}
      <div className="text-center mb-8 sm:mb-12 animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Sakhi
          </h1>
        </div>
        <p className="text-gray-600 text-base sm:text-lg">
          सीखें • Learn • கற்றுக்கொள்ளுங்கள்
        </p>
      </div>

      {/* Language Selection */}
      <div className="w-full max-w-md space-y-3 sm:space-y-4 px-2 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">          Choose Your Language
        </h2>

        {LANGUAGES.map((lang) => (
          <div
            key={lang.code}
            className={`
              relative bg-white rounded-2xl shadow-lg hover:shadow-xl 
              transition-all duration-300 cursor-pointer border-2
              ${selectedLanguage === lang.code
                ? "border-purple-500 scale-105"
                : "border-transparent hover:border-purple-200"
              }
            `}
            onClick={() => handleLanguageSelect(lang.code)}
          >
            <div className="p-4 sm:p-6 flex items-center justify-between">
              {/* language info */}
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl">{lang.flag}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {lang.nativeName}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">{lang.name}</p>
                </div>
              </div>

              {/* Audio Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakLanguageName(lang.code, lang.nativeName);
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 active:scale-95 transition-all flex-shrink-0"              >
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />              </button>
            </div>

            {/* Selection Indicator */}
            {selectedLanguage === lang.code && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm px-4">
        <p className="text-sm sm:text-base">सीखें • नौकरी पाएं • कमाएं</p>
        <p className="mt-1 text-xs sm:text-sm">Learn • Find Jobs • Earn Money</p>
      </div>

      {/* Simple CSS animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
