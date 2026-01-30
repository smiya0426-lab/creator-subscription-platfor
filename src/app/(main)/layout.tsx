import Link from 'next/link'
import { Moon, Sparkles, Twitter, Instagram } from 'lucide-react'

function Header() {
    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 glow-pink group-hover:scale-110 transition-transform">
                        <Moon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl gradient-text tracking-wide">Creator</span>
                </Link>
                <nav className="flex items-center gap-1">
                    <Link href="/" className="px-4 py-2 text-sm font-medium text-purple-200 hover:text-white hover:bg-white/5 rounded-full transition-all">
                        ホーム
                    </Link>
                    <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-purple-200 hover:text-white hover:bg-white/5 rounded-full transition-all">
                        プラン
                    </Link>
                </nav>
            </div>
        </header>
    )
}

function Footer() {
    return (
        <footer className="relative glass border-t border-pink-500/20">
            <div className="absolute inset-0 star-field opacity-20" />
            <div className="container py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Link href="/" className="flex items-center gap-3 group mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 glow-pink">
                                <Moon className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-xl gradient-text">Creator</span>
                        </Link>
                        <p className="text-sm text-purple-200/60">限定コンテンツをお届けする<br />クリエイターサブスクリプションサイト ✦</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-pink-400" />
                            リンク
                        </h3>
                        <ul className="space-y-2 text-sm text-purple-200/60">
                            <li><Link href="/" className="hover:text-pink-300 transition-colors">ホーム</Link></li>
                            <li><Link href="/pricing" className="hover:text-pink-300 transition-colors">プラン</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4">SNS</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-500/20 flex items-center justify-center text-purple-200/60 hover:text-pink-300 transition-all">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-500/20 flex items-center justify-center text-purple-200/60 hover:text-pink-300 transition-all">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="section-divider my-8" />
                <div className="text-center text-sm text-purple-300/50">
                    <p>© 2024 Creator. All rights reserved. ✦</p>
                </div>
            </div>
        </footer>
    )
}

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}
