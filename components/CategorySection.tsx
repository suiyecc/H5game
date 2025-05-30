'use client'
import Link from 'next/link'
import GameCard from './GameCard'
import { useLanguage } from '@/contexts/LanguageContext'

interface Game {
  id: number
  slug: string
  title: string
  category: string
  thumbnail: string
  url: string
  description: string
  featured: boolean
}

interface CategorySectionProps {
  title: string
  games: Game[]
  viewAllLink?: string
  showViewAll?: boolean
}

export default function CategorySection({ 
  title, 
  games, 
  viewAllLink, 
  showViewAll = true 
}: CategorySectionProps) {
  const { t } = useLanguage()
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            {title}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {games.map((game, index) => (
            <GameCard 
              key={game.id} 
              game={game} 
              priority={index < 4} // 前4个游戏优先加载
            />
          ))}
        </div>
        
        {showViewAll && viewAllLink && (
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl touch-manipulation"
            >
              <span className="hidden sm:inline">{t.gallery?.viewAll || '查看全部'} →</span>
              <span className="sm:hidden">查看全部 →</span>
            </Link>
          </div>
        )}
        
        {games.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">🎮</div>
            <p className="text-gray-400 text-lg">{t.gallery?.noGames || '暂无游戏'}</p>
            <p className="text-gray-500 text-sm mt-2">{t.gallery?.comingSoon || '敬请期待更多精彩内容'}</p>
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {games.length >= 8 && (
          <div className="text-center mt-8">
            <button className="bg-card hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors border border-gray-700 hover:border-primary">
              {t.gallery?.loadMore || '加载更多游戏'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}