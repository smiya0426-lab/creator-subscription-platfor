import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Creator Subscription Platform',
    description: 'クリエイター向けサブスクリプションプラットフォーム - 限定コンテンツを配信',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja" className="dark">
            <body>{children}</body>
        </html>
    )
}
