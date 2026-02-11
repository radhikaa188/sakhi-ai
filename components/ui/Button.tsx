"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Volume2 } from "lucide-react";

// ============================================
// BUTTON PROPS
// ============================================

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  speakText?: string; // Text to speak when clicked (optional)
  showSpeaker?: boolean; // Show speaker icon
  type?: "button" | "submit" | "reset";
  className?: string;
}

// ============================================
// BUTTON COMPONENT
// ============================================

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  speakText,
  showSpeaker = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const { speak } = useLanguage();

  const handleClick = () => {
    // Play audio if speakText is provided
    if (speakText) {
      speak(speakText);
    }

    // Call onClick handler
    if (onClick) {
      onClick();
    }
  };

  // ============================================
  // STYLES
  // ============================================

  const baseStyles =
    "flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-700",
    secondary:
      "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-700",
    outline:
      "bg-white border-2 border-purple-500 text-purple-700 hover:bg-purple-50",
  };

  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {showSpeaker && (
        <Volume2 className="w-5 h-5" />
      )}
      {children}
    </button>
  );
}

// ============================================
// AUDIO BUTTON (Just for playing audio)
// ============================================

interface AudioButtonProps {
  text: string;
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function AudioButton({
  text,
  children,
  size = "medium",
  className = "",
}: AudioButtonProps) {
  const { speak, isSpeaking } = useLanguage();

  const sizeMap = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <button
      onClick={() => speak(text)}
      className={`${sizeMap[size]} flex items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 active:scale-95 transition-all ${className}`}
      disabled={isSpeaking}
    >
      {children || <Volume2 className="w-5 h-5" />}
    </button>
  );
}
