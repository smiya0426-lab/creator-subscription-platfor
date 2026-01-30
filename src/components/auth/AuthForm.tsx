'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, Moon, Sparkles, Mail, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface AuthFormProps {
    mode: 'login' | 'register'
}

export function AuthForm({ mode }: AuthFormProps) {
    const router = useRouter()
    const supabase = createClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (mode === 'register') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                // Show success message for email confirmation
                setError('確認メールを送信しました。メールを確認してください。')
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                router.push('/')
                router.refresh()
            }
        } catch (err: any) {
            setError(err.message || 'エラーが発生しました')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            })
            if (error) throw error
        } catch (err: any) {
            setError(err.message || 'エラーが発生しました')
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto glass border-pink-500/30 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

            <CardHeader className="text-center relative z-10 pt-8">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center glow-pink">
                    <Moon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                    {mode === 'login' ? 'ログイン' : '新規登録'}
                </CardTitle>
                <CardDescription className="text-purple-200/70">
                    {mode === 'login'
                        ? 'アカウントにログインしてください'
                        : 'アカウントを作成して限定コンテンツにアクセス ✦'}
                </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-purple-100 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-pink-400" />
                            メールアドレス
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className="bg-white/5 border-pink-500/30 text-white placeholder:text-purple-300/50 focus:border-pink-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-purple-100 flex items-center gap-2">
                            <Lock className="h-4 w-4 text-purple-400" />
                            パスワード
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            minLength={6}
                            className="bg-white/5 border-pink-500/30 text-white placeholder:text-purple-300/50 focus:border-pink-400"
                        />
                    </div>

                    {error && (
                        <div className={`text-sm p-3 rounded-lg ${error.includes('確認メール') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full btn-gradient text-white border-0 py-6 font-bold"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                処理中...
                            </>
                        ) : mode === 'login' ? (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                ログイン
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                登録
                            </>
                        )}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="section-divider" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass px-4 py-1 rounded-full text-xs text-purple-300/70">
                        または
                    </span>
                </div>

                <Button
                    variant="outline"
                    className="w-full py-6 bg-white/5 border-pink-500/30 text-white hover:bg-white/10 hover:border-pink-400"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Googleでログイン
                </Button>
            </CardContent>
            <CardFooter className="justify-center relative z-10 pb-8">
                <p className="text-sm text-purple-200/60">
                    {mode === 'login' ? (
                        <>
                            アカウントをお持ちでない方は{' '}
                            <Link href="/register" className="text-pink-400 hover:text-pink-300 transition-colors">
                                新規登録
                            </Link>
                        </>
                    ) : (
                        <>
                            すでにアカウントをお持ちの方は{' '}
                            <Link href="/login" className="text-pink-400 hover:text-pink-300 transition-colors">
                                ログイン
                            </Link>
                        </>
                    )}
                </p>
            </CardFooter>
        </Card>
    )
}
