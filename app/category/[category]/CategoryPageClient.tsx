'use client'

import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'
import { useLanguage } from '@/contexts/LanguageContext'

interface CategoryPageClientProps {
  category: string
}

const getCategoryInfo = (t: any) => ({
  arcade: {
    name: (t.nav && t.nav.arcade) || '街机游戏',
    description: t.category?.arcadeDesc || '经典街机游戏合集，重温童年回忆',
    icon: '🕹️',
    color: 'from-purple-500 to-pink-500'
  },
  girl: {
    name: (t.nav && t.nav.girl) || '女生游戏',
    description: t.category?.girlDesc || '专为女孩设计的有趣游戏',
    icon: '👧',
    color: 'from-pink-500 to-rose-500'
  },
  action: {
    name: (t.nav && t.nav.action) || '动作游戏',
    description: t.category?.actionDesc || '刺激的动作冒险游戏',
    icon: '⚔️',
    color: 'from-red-500 to-orange-500'
  },
  adventure: {
    name: (t.nav && t.nav.adventure) || '冒险游戏',
    description: t.category?.adventureDesc || '探索未知世界的冒险之旅',
    icon: '🗺️',
    color: 'from-green-500 to-teal-500'
  },
  racing: {
    name: (t.nav && t.nav.racing) || '赛车游戏',
    description: t.category?.racingDesc || '极速赛车，感受速度与激情',
    icon: '🏎️',
    color: 'from-blue-500 to-cyan-500'
  }
})

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const { t } = useLanguage()
  const categoryInfo = getCategoryInfo(t)
  const categoryData = categoryInfo[category as keyof typeof categoryInfo]
  
  const categoryGames = gamesData.filter(game => game.category === category)
  const featuredGames = categoryGames.filter(game => game.featured)
  const regularGames = categoryGames.filter(game => !game.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Category Hero */}
      <div className={`bg-gradient-to-r ${categoryData.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">{categoryData.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryData.name}
            </h1>
            <p className="text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
              {categoryData.description}
            </p>
            <div className="flex items-center justify-center space-x-8 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">{categoryGames.length}</div>
                <div className="text-sm opacity-80">{t.category?.totalGames || '游戏总数'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{featuredGames.length}</div>
                <div className="text-sm opacity-80">{t.category?.featuredGames || '精选游戏'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{t.category?.free || '免费'}</div>
                <div className="text-sm opacity-80">{t.category?.completelyFree || '完全免费'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-card border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">{t.category?.filter || '筛选'}:</span>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                {t.category?.all || '全部'}
              </button>
              <button className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors">
                {t.category?.featured || '精选'}
              </button>
              <button className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors">
                {t.category?.latest || '最新'}
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">{t.category?.sortBy || '排序'}:</span>
              <select className="bg-card text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="popular">{t.category?.mostPopular || '最受欢迎'}</option>
                <option value="newest">{t.category?.newest || '最新发布'}</option>
                <option value="rating">{t.category?.highestRated || '评分最高'}</option>
                <option value="name">{t.category?.nameSort || '名称排序'}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Games Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {categoryGames.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">{categoryData.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-4">{t.category?.noGamesInCategory?.replace('{category}', categoryData.name) || `暂无${categoryData.name}`}</h2>
            <p className="text-gray-400 mb-8">{t.category?.addingMoreGames?.replace('{category}', categoryData.name) || `我们正在努力添加更多精彩的${categoryData.name}，敬请期待！`}</p>
            <a 
              href="/"
              className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <span>{t.category?.browseOtherGames || '浏览其他游戏'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ) : (
          <>
            {/* Featured Games */}
            {featuredGames.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">🔥</span>
                  {t.category?.featuredCategory?.replace('{category}', categoryData.name) || `精选${categoryData.name}`}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredGames.map((game) => (
                    <GameCard key={game.id} game={game} priority />
                  ))}
                </div>
              </section>
            )}

            {/* All Games */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">{categoryData.icon}</span>
                {t.category?.allCategory?.replace('{category}', categoryData.name) || `所有${categoryData.name}`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regularGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>

            {/* Load More */}
            {categoryGames.length >= 12 && (
              <div className="text-center mt-12">
                <button className="bg-card hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors border border-gray-700 hover:border-primary">
                  {t.category?.loadMoreCategory?.replace('{category}', categoryData.name) || `加载更多${categoryData.name}`}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-card rounded-lg p-6">
          <div className="text-gray-400 text-sm mb-2 text-center">{t.common?.advertisement || '广告'}</div>
          <div className="h-24 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-gray-500">{t.common?.adBanner || '728x90 广告横幅'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}