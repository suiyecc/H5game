'use client'

import Hero from '@/components/Hero'
import CategorySection from '@/components/CategorySection'
import MasonryGallery from '@/components/MasonryGallery'
import { useLanguage } from '@/contexts/LanguageContext'
import gamesData from '@/data/games.json'

export default function Home() {
  const { t } = useLanguage()
  
  // 分类定义
  const categories = [
    { id: 'arcade', name: (t.nav && t.nav.arcade) || '街机' },
    { id: 'girl', name: (t.nav && t.nav.girl) || '女孩' },
    { id: 'action', name: (t.nav && t.nav.action) || '动作' },
    { id: 'adventure', name: (t.nav && t.nav.adventure) || '冒险' },
    { id: 'racing', name: (t.nav && t.nav.racing) || '赛车' }
  ]
  
  // 获取不同分类的游戏
  const featuredGames = gamesData.filter(game => game.featured).slice(0, 8)
  const latestGames = gamesData.slice(0, 8)
  const recentGames = gamesData.slice(0, 8) // 最新游戏
  const arcadeGames = gamesData.filter(game => game.category === 'arcade').slice(0, 8)
  const girlGames = gamesData.filter(game => game.category === 'girl').slice(0, 8)
  const actionGames = gamesData.filter(game => game.category === 'action').slice(0, 8)
  const adventureGames = gamesData.filter(game => game.category === 'adventure').slice(0, 8)
  const racingGames = gamesData.filter(game => game.category === 'racing').slice(0, 8)
  
  // 瀑布流展示的游戏
  const allGames = gamesData.slice(0, 20) // 瀑布流展示前20个游戏

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Masonry Gallery */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {(t.gallery && t.gallery.title) || '游戏画廊'}
          </h2>
          <p className="text-gray-400 text-lg">
            {(t.gallery && t.gallery.subtitle) || '发现精彩游戏'}
          </p>
        </div>
        <MasonryGallery games={allGames} columns={4} />
      </section>
      
      {/* Categories Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          {(t.categories && t.categories.title) || '游戏分类'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => {
            const categoryGames = gamesData.filter(game => game.category === category.id).slice(0, 4)
            return (
              <CategorySection 
                key={category.id} 
                title={category.name}
                games={categoryGames}
                viewAllLink={`/category/${category.id}`}
              />
            )
          })}
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <CategorySection 
          title={(t.featured && t.featured.title) || '精选游戏'}
          games={featuredGames}
          showViewAll={false}
        />
      </section>

      {/* Recent Games */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <CategorySection 
          title={(t.recent && t.recent.title) || '最新游戏'}
          games={recentGames}
          showViewAll={false}
        />
      </section>

      {/* Ad Banner */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="bg-card rounded-lg p-8 text-center">
          <div className="text-gray-400 text-sm mb-2">{t.common?.advertisement || '广告位'}</div>
          <div className="h-24 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-gray-500">{t.common?.adBanner || '728x90 广告横幅'}</span>
          </div>
        </div>
      </section>
    </div>
  )
}