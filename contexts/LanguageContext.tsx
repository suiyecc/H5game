'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import zhTranslations from '@/locales/zh.json'
import enTranslations from '@/locales/en.json'

type Language = 'zh' | 'en'

type Translations = typeof zhTranslations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const translations = {
  zh: zhTranslations,
  en: enTranslations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh')
  const [isClient, setIsClient] = useState(false)

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load language from localStorage on mount (client-side only)
  useEffect(() => {
    if (isClient) {
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
        setLanguage(savedLanguage)
      }
    }
  }, [isClient])

  // Save language to localStorage when it changes (client-side only)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('language', language)
      // Update document language
      if (typeof document !== 'undefined') {
        document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
      }
    }
  }, [language, isClient])

  const value = {
    language,
    setLanguage,
    t: translations[language] || translations.zh
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export type { Language, Translations }