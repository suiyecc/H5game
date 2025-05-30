import { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'BudgetBites Games - 免费在线游戏平台',
  description: '享受最好的免费在线游戏！包括街机游戏、女孩游戏、动作游戏、冒险游戏和赛车游戏。',
  keywords: '免费游戏, 在线游戏, 街机游戏, 女孩游戏, 动作游戏, 冒险游戏, 赛车游戏',
  authors: [{ name: 'BudgetBites Games' }],
  robots: 'index, follow',
  openGraph: {
    title: 'BudgetBites Games - 免费在线游戏平台',
    description: '享受最好的免费在线游戏！',
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxx"
          crossOrigin="anonymous"
        ></script>
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-white min-h-screen flex flex-col`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}