'use client'

import GameFrame from '@/components/GameFrame'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Game } from '@/types/game'

interface GamePageClientProps {
  game: Game
  relatedGames: Game[]
}

export default function GamePageClient({ game, relatedGames }: GamePageClientProps) {
  const { t } = useLanguage()

  // 获取带有basePath的图片路径
  const getImagePath = (path: string) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/H5Game' : ''
    return `${basePath}${path}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Game Header */}
      <div className="bg-card border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <img
              src={getImagePath(game.thumbnail)}
              alt={game.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">{game.title}</h1>
              <p className="text-gray-400">{game.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {game.category === 'arcade' ? ((t.nav && t.nav.arcade) || '街机游戏') :
                   game.category === 'girl' ? ((t.nav && t.nav.girl) || '女生游戏') :
                   game.category === 'action' ? ((t.nav && t.nav.action) || '动作游戏') :
                   game.category === 'adventure' ? ((t.nav && t.nav.adventure) || '冒险游戏') :
                   game.category === 'racing' ? ((t.nav && t.nav.racing) || '赛车游戏') :
                   game.category}
                </span>
                <button className="text-primary hover:text-accent transition-colors">
                  ⭐ {t.gameDetail?.favorite || '收藏'}
                </button>
                <button className="text-primary hover:text-accent transition-colors">
                  📤 {t.gameDetail?.share || '分享'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Container */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Frame */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg overflow-hidden">
              <GameFrame url={game.url} title={game.title} />
            </div>
            
            {/* Ad Banner Below Game */}
            <div className="mt-6 bg-card rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-2 text-center">{t.common?.advertisement || '广告'}</div>
              <div className="h-20 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-gray-500">{t.common?.adBanner || '728x90 广告横幅'}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Game Info */}
            <div className="bg-card rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-white">{t.gameDetail?.gameInfo || '游戏信息'}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.gameDetail?.category || '分类'}:</span>
                  <span className="text-white">
                    {game.category === 'arcade' ? ((t.nav && t.nav.arcade) || '街机游戏') :
                     game.category === 'girl' ? ((t.nav && t.nav.girl) || '女生游戏') :
                     game.category === 'action' ? ((t.nav && t.nav.action) || '动作游戏') :
                     game.category === 'adventure' ? ((t.nav && t.nav.adventure) || '冒险游戏') :
                     game.category === 'racing' ? ((t.nav && t.nav.racing) || '赛车游戏') :
                     game.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.gameDetail?.rating || '评分'}:</span>
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.gameDetail?.playCount || '播放次数'}:</span>
                  <span className="text-white">1,234</span>
                </div>
              </div>
            </div>

            {/* Ad Sidebar */}
            <div className="bg-card rounded-lg p-4 mb-6">
              <div className="text-gray-400 text-sm mb-2 text-center">{t.common?.advertisement || '广告'}</div>
              <div className="h-64 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-gray-500 text-center">{t.common?.adSidebar || '300x250 广告位'}</span>
              </div>
            </div>

            {/* Related Games */}
            {relatedGames.length > 0 && (
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">{t.gameDetail?.relatedGames || '相关游戏'}</h3>
                <div className="space-y-4">
                  {relatedGames.map((relatedGame) => (
                    <a
                      key={relatedGame.id}
                      href={`/games/${relatedGame.slug}`}
                      className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded transition-colors"
                    >
                      <img
                        src={relatedGame.thumbnail}
                        alt={relatedGame.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {relatedGame.title}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {relatedGame.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}