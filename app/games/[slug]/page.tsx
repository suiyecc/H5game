import { notFound } from 'next/navigation'
import gamesData from '@/data/games.json'
import GamePageClient from './GamePageClient'
import type { Metadata } from 'next'

interface GamePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return gamesData.map((game) => ({
    slug: game.slug,
  }))
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = gamesData.find((g) => g.slug === params.slug)
  
  if (!game) {
    return {
      title: '游戏未找到',
    }
  }

  // 构造完整的图片URL用于元数据
  const isProd = process.env.NODE_ENV === 'production'
  const basePath = isProd ? '/H5Game' : ''
  const baseUrl = isProd ? 'https://suiyecc.github.io' : 'http://localhost:3000'
  const imageUrl = `${baseUrl}${basePath}${game.thumbnail}`

  return {
    title: `${game.title} - H5Game`,
    description: game.description,
    keywords: `${game.title}, ${game.category}, 免费游戏, 在线游戏`,
    openGraph: {
      title: game.title,
      description: game.description,
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: game.title,
      description: game.description,
      images: [imageUrl],
    },
  }
}

export default function GamePage({ params }: GamePageProps) {
  const game = gamesData.find((g) => g.slug === params.slug)

  if (!game) {
    notFound()
  }

  const relatedGames = gamesData
    .filter((g) => g.category === game.category && g.id !== game.id)
    .slice(0, 4)

  return <GamePageClient game={game} relatedGames={relatedGames} />
}