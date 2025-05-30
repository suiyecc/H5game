import { notFound } from 'next/navigation'
import CategoryPageClient from './CategoryPageClient'
import gamesData from '@/data/games.json'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return ['arcade', 'girl', 'action', 'adventure', 'racing'].map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  // Note: This is a server component, so we can't use useLanguage here
  // We'll use default Chinese metadata for now
  const categoryNames: { [key: string]: string } = {
    arcade: '街机游戏',
    girl: '女孩游戏', 
    action: '动作游戏',
    adventure: '冒险游戏',
    racing: '赛车游戏'
  }
  
  const categoryName = categoryNames[params.category]
  
  if (!categoryName) {
    return {
      title: '分类未找到',
    }
  }

  return {
    title: `${categoryName} - GigglyGame`,
    description: `${categoryName}，免费在线游戏，无需下载即可游玩。`,
    keywords: `${categoryName}, 免费游戏, 在线游戏, HTML5游戏`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Check if category exists
  const validCategories = ['arcade', 'girl', 'action', 'adventure', 'racing']
  if (!validCategories.includes(params.category)) {
    notFound()
  }

  return <CategoryPageClient category={params.category} />
}