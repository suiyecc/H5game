'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface GameFrameProps {
  url: string
  title: string
}

export default function GameFrame({ url, title }: GameFrameProps) {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement
    if (!iframe) return

    if (!isFullscreen) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const reloadGame = () => {
    setIsLoading(true)
    setHasError(false)
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  return (
    <div className="relative w-full">
      {/* Game Controls */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">{title}</span>
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="text-sm">{t.game?.loading || '加载中...'}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={reloadGame}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded"
            title={t.game?.reload || '重新加载游戏'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded"
            title={isFullscreen ? (t.game?.exitFullscreen || '退出全屏') : (t.game?.fullscreen || '全屏游戏')}
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Game Container */}
      <div className="relative bg-black" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-white text-lg font-medium">{t.game?.loadingGame || '正在加载游戏...'}</p>
              <p className="text-gray-400 text-sm mt-2">{t.game?.pleaseWait || '请稍候，游戏即将开始'}</p>
            </div>
          </div>
        )}

        {/* Error Overlay */}
        {hasError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-white text-lg font-medium mb-2">{t.game?.loadFailed || '游戏加载失败'}</p>
              <p className="text-gray-400 text-sm mb-4">{t.game?.checkConnection || '请检查网络连接或稍后重试'}</p>
              <button
                onClick={reloadGame}
                className="bg-primary hover:bg-accent text-white px-6 py-2 rounded-lg transition-colors"
              >
                {t.game?.reloadButton || '重新加载'}
              </button>
            </div>
          </div>
        )}

        {/* Game Iframe */}
        <iframe
          id="game-iframe"
          src={url}
          title={title}
          className="w-full h-full border-none"
          allowFullScreen
          allow="gamepad; microphone; camera"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            display: isLoading || hasError ? 'none' : 'block'
          }}
        />
      </div>

      {/* Game Instructions */}
      <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>🎮 {t.game?.keyboardMouse || '使用键盘和鼠标控制'}</span>
            <span>📱 {t.game?.touchSupport || '支持触屏操作'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{t.game?.haveProblem || '遇到问题？'}</span>
            <button className="text-primary hover:text-accent transition-colors">
              {t.game?.feedback || '反馈'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}