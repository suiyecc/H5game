'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, language, setLanguage } = useLanguage()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'zh' | 'en')
  }

  const categories = [
    { id: 'home', name: (t.nav && t.nav.home) || '首页', href: '/' },
    { id: 'arcade', name: (t.nav && t.nav.arcade) || '街机游戏', href: '/category/arcade' },
    { id: 'girl', name: (t.nav && t.nav.girl) || '女生游戏', href: '/category/girl' },
    { id: 'action', name: (t.nav && t.nav.action) || '动作游戏', href: '/category/action' },
    { id: 'adventure', name: (t.nav && t.nav.adventure) || '冒险游戏', href: '/category/adventure' },
    { id: 'racing', name: (t.nav && t.nav.racing) || '赛车游戏', href: '/category/racing' },
  ]

  return (
    <nav className="bg-secondary border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🎮</span>
            </div>
            <span className="text-xl font-bold text-white">GigglyGame</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="text-gray-300 hover:text-primary transition-colors duration-200 font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Search Bar & Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder={(t.nav && t.nav.search) || '搜索游戏...'}
                className="bg-card text-white placeholder-gray-400 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                🔍
              </button>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">🌐</span>
              <select 
                value={language}
                onChange={handleLanguageChange}
                className="bg-card text-white text-sm rounded px-2 py-1 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="zh">{(t.nav && t.nav.chinese) || '中文'}</option>
                <option value="en">{(t.nav && t.nav.english) || 'English'}</option>
              </select>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-purple-300 transition-colors p-2 rounded-lg hover:bg-white/10 active:bg-white/20 touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              <Link 
                href="/" 
                className="block text-white hover:text-purple-300 py-3 px-2 rounded-lg transition-colors hover:bg-white/10 active:bg-white/20 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                {(t.nav && t.nav.home) || '首页'}
              </Link>
              <Link 
                href="/category/arcade" 
                className="block text-white hover:text-purple-300 py-3 px-2 rounded-lg transition-colors hover:bg-white/10 active:bg-white/20 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                {(t.nav && t.nav.arcade) || '街机游戏'}
              </Link>
              <Link 
                href="/category/girl" 
                className="block text-white hover:text-purple-300 py-3 px-2 rounded-lg transition-colors hover:bg-white/10 active:bg-white/20 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                {(t.nav && t.nav.girl) || '女生游戏'}
              </Link>
              <Link 
                href="/category/action" 
                className="block text-white hover:text-purple-300 py-3 px-2 rounded-lg transition-colors hover:bg-white/10 active:bg-white/20 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                {(t.nav && t.nav.action) || '动作游戏'}
              </Link>
              <Link 
                href="/category/adventure" 
                className="block text-white hover:text-purple-300 py-3 px-2 rounded-lg transition-colors hover:bg-white/10 active:bg-white/20 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                {(t.nav && t.nav.adventure) || '冒险游戏'}
              </Link>
              <Link 
                href="/category/racing" 
                className="block text-white hover:text-purple-300 py-3 px-2 rounded-lg transition-colors hover:bg-white/10 active:bg-white/20 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                {(t.nav && t.nav.racing) || '赛车游戏'}
              </Link>
              
              {/* Language Selector */}
              <div className="pt-4 mt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{(t.nav && t.nav.languageLabel) || '语言'}:</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setLanguage('zh')}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors touch-manipulation ${
                        language === 'zh' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/20'
                      }`}
                    >
                      中文
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors touch-manipulation ${
                        language === 'en' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/20'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}