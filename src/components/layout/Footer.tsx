import Link from 'next/link'
import { Moon, Twitter, Instagram, Sparkles } from 'lucide-react'

export function Footer() {
    return (
        <footer className="relative glass border-t border-pink-500/20">
            {/* Star field background */}
            <div className="absolute inset-0 star-field opacity-20" />

            <div className="container py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 glow-pink group-hover:scale-110 transition-transform">
                                <Moon className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-xl gradient-text">
                                Creator
                            </span>
                        </Link>
                        <p className="text-sm text-purple-200/60 leading-relaxed">
                            限定コンテンツをお届けする<br />クリエイターサブスクリプションサイト ✦
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-pink-400" />
                            コンテンツ
                        </h3>
                        <ul className="space-y-3 text-sm text-purple-200/60">
                            <li>
                                <Link href="/" className="hover:text-pink-300 transition-colors">
                                    投稿一覧
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-pink-300 transition-colors">
                                    プラン
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">サポート</h3>
                        <ul className="space-y-3 text-sm text-purple-200/60">
                            <li>
                                <Link href="/terms" className="hover:text-pink-300 transition-colors">
                                    利用規約
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-pink-300 transition-colors">
                                    プライバシーポリシー
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-pink-300 transition-colors">
                                    お問い合わせ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">SNS</h3>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-500/20 flex items-center justify-center text-purple-200/60 hover:text-pink-300 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-500/20 flex items-center justify-center text-purple-200/60 hover:text-pink-300 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="section-divider my-8" />

                <div className="text-center text-sm text-purple-300/50">
                    <p>© {new Date().getFullYear()} Creator. All rights reserved. ✦</p>
                </div>
            </div>
        </footer>
    )
}
