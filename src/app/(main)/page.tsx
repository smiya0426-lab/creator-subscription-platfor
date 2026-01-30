import { Sparkles, Star, Zap, Heart, Moon, Music } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getUserWithSubscription } from '@/lib/supabase/server'
import { PostList } from '@/components/posts/PostList'
import { Button } from '@/components/ui/button'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
    const supabase = await createClient()
    const { currentTier } = await getUserWithSubscription()

    // Fetch published posts
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(12)

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden hero-gradient py-24 lg:py-40">
                {/* Star field background */}
                <div className="absolute inset-0 star-field opacity-60" />

                {/* Floating decorative elements */}
                <div className="absolute top-20 left-10 text-pink-400/30 float" style={{ animationDelay: '0s' }}>
                    <Moon className="h-16 w-16" />
                </div>
                <div className="absolute bottom-32 right-16 text-purple-400/20 float" style={{ animationDelay: '2s' }}>
                    <Star className="h-20 w-20" />
                </div>
                <div className="absolute top-40 right-1/4 text-yellow-400/20 float" style={{ animationDelay: '4s' }}>
                    <Sparkles className="h-12 w-12" />
                </div>

                <div className="container relative z-10">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm sparkle">
                            <Music className="h-4 w-4 text-pink-400" />
                            <span className="text-pink-200">限定コンテンツを配信中</span>
                        </div>

                        {/* Main heading */}
                        <h1 className="mb-8 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                            <span className="gradient-text">
                                特別な体験
                            </span>
                            <br />
                            <span className="text-white">を</span>
                            <span className="gradient-text-gold">お届けします</span>
                        </h1>

                        <p className="mb-12 text-lg text-purple-200/80 max-w-2xl mx-auto leading-relaxed">
                            クリエイターの限定コンテンツにアクセスして、
                            <br className="hidden sm:inline" />
                            特別なコミュニティの一員になりませんか？
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="btn-gradient text-white border-0 px-8 py-6 text-lg font-bold" asChild>
                                <Link href="/pricing">
                                    <Star className="mr-2 h-5 w-5" />
                                    プランを見る
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-pink-500/50 text-pink-200 hover:bg-pink-500/20 hover:text-white px-8 py-6 text-lg" asChild>
                                <Link href="#posts">コンテンツを見る</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </section>

            {/* Features Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 star-field opacity-30" />
                <div className="container relative z-10">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="glass rounded-2xl p-8 card-hover text-center">
                            <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center glow-pink">
                                <Zap className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-white">限定コンテンツ</h3>
                            <p className="text-purple-200/70">
                                有料会員だけが見られる特別なイラストや写真をお届け
                            </p>
                        </div>
                        <div className="glass rounded-2xl p-8 card-hover text-center">
                            <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center glow-purple">
                                <Heart className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-white">クリエイターを応援</h3>
                            <p className="text-purple-200/70">
                                サブスクリプションで直接クリエイターをサポート
                            </p>
                        </div>
                        <div className="glass rounded-2xl p-8 card-hover text-center">
                            <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center glow-gold">
                                <Star className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-white">いつでも解約可能</h3>
                            <p className="text-purple-200/70">
                                契約に縛られることなく、いつでも自由に解約OK
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="section-divider mx-auto max-w-4xl" />

            {/* Posts Section */}
            <section id="posts" className="py-24">
                <div className="container">
                    <div className="mb-16 text-center">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Sparkles className="h-5 w-5 text-pink-400" />
                            <span className="text-sm text-pink-300 uppercase tracking-widest font-medium">Contents</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 gradient-text">最新のコンテンツ</h2>
                        <p className="text-purple-200/70">
                            新しく公開されたコンテンツをチェック
                        </p>
                    </div>

                    {posts && posts.length > 0 ? (
                        <PostList posts={posts} userTier={currentTier} />
                    ) : (
                        <div className="text-center py-16 glass rounded-2xl">
                            <Moon className="h-16 w-16 text-purple-400/50 mx-auto mb-6" />
                            <p className="text-purple-200/70 mb-2 text-lg">
                                まだ投稿がありません
                            </p>
                            <p className="text-sm text-purple-300/50">
                                コンテンツが公開されるまでお待ちください
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-purple-600/30 to-indigo-600/20" />
                <div className="absolute inset-0 star-field opacity-40" />
                <div className="container relative z-10 text-center">
                    <div className="inline-block mb-6">
                        <Star className="h-12 w-12 text-yellow-400 float" />
                    </div>
                    <h2 className="text-4xl font-bold mb-6 text-white">今すぐ始めよう</h2>
                    <p className="mb-10 text-purple-200/80 max-w-xl mx-auto">
                        有料プランに加入して、すべての限定コンテンツにアクセス
                    </p>
                    <Button size="lg" className="btn-gradient text-white border-0 px-10 py-6 text-lg font-bold pulse-glow" asChild>
                        <Link href="/pricing">
                            <Sparkles className="mr-2 h-5 w-5" />
                            プランを確認する
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    )
}
