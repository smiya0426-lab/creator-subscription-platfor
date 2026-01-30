import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { Moon, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserNav } from './UserNav'

interface HeaderProps {
    user: User | null
    isAdmin?: boolean
}

export function Header({ user, isAdmin }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 glow-pink group-hover:scale-110 transition-transform">
                            <Moon className="h-5 w-5 text-white" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                        </div>
                        <span className="font-bold text-xl gradient-text tracking-wide">
                            Creator
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all"
                        >
                            ホーム
                        </Link>
                        <Link
                            href="/pricing"
                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all"
                        >
                            プラン
                        </Link>
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="px-4 py-2 text-sm font-medium text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-full transition-all"
                            >
                                管理画面
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <UserNav user={user} isAdmin={isAdmin} />
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" className="hover:bg-white/10" asChild>
                                <Link href="/login">ログイン</Link>
                            </Button>
                            <Button className="btn-gradient text-white border-0" asChild>
                                <Link href="/register">✦ 新規登録</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
