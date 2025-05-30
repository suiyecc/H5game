'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            BudgetBites
          </span>
          <br />
          <span className="text-white">Games</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2">
          {(t.hero && t.hero.subtitle) || '发现无尽的免费游戏世界'}
          <br />
          <span className="text-base sm:text-lg text-gray-400">
            {(t.hero && t.hero.description) || '在这里，您可以找到各种类型的精彩游戏'}
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Link 
            href="#games" 
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl touch-manipulation"
          >
            🎮 {(t.hero && t.hero.playNow) || '立即游戏'}
          </Link>
          
          <Link 
            href="/category/arcade" 
            className="w-full sm:w-auto border-2 border-white/30 hover:border-white/60 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white/10 active:bg-white/20 backdrop-blur-sm touch-manipulation"
          >
            🕹️ {(t.hero && t.hero.learnMore) || '了解更多'}
          </Link>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-gray-300 text-sm">{(t.hero && t.hero.stats && t.hero.stats.freeGames) || '免费游戏'}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-gray-300 text-sm">{(t.hero && t.hero.stats && t.hero.stats.categories) || '游戏分类'}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-gray-300 text-sm">{(t.hero && t.hero.stats && t.hero.stats.freeToPlay) || '免费游玩'}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-gray-300 text-sm">{(t.hero && t.hero.stats && t.hero.stats.available) || '随时可玩'}</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}