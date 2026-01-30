import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Creator - クリエイターサブスクリプションプラットフォーム',
    description: '限定コンテンツをお届けするクリエイターサブスクリプションサイト。イラスト、写真、テキストなどの限定コンテンツにアクセスしよう。',
    keywords: ['クリエイター', 'サブスクリプション', '限定コンテンツ', 'イラスト', 'ファンサイト'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja" suppressHydrationWarning>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
