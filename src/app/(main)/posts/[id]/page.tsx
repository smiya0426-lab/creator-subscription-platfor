import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getUserWithSubscription } from '@/lib/supabase/server'
import { ImageGallery } from '@/components/posts/ImageGallery'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate, getTierName, getTierColor, canAccessContent } from '@/lib/utils'

interface PostPageProps {
    params: { id: string }
}

export default async function PostPage({ params }: PostPageProps) {
    const supabase = await createClient()
    const { currentTier } = await getUserWithSubscription()

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .eq('is_published', true)
        .single()

    if (!post) {
        notFound()
    }

    const hasAccess = canAccessContent(currentTier, post.min_tier)

    return (
        <div className="container py-8">
            <div className="mb-6">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        戻る
                    </Link>
                </Button>
            </div>

            <article className="mx-auto max-w-4xl">
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Badge className={getTierColor(post.min_tier)}>
                            {getTierName(post.min_tier)}
                        </Badge>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.created_at)}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold md:text-4xl">{post.title}</h1>
                </header>

                {hasAccess ? (
                    <div className="space-y-8">
                        {post.image_urls && post.image_urls.length > 0 && (
                            <ImageGallery images={post.image_urls} title={post.title} />
                        )}

                        {post.content && (
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="whitespace-pre-wrap">{post.content}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <Card className="text-center py-12">
                        <CardHeader>
                            <div className="mx-auto mb-4 rounded-full bg-muted p-6">
                                <Lock className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <CardTitle className="text-2xl">限定コンテンツ</CardTitle>
                            <CardDescription className="text-base">
                                このコンテンツは{getTierName(post.min_tier)}会員限定です
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-6">
                                {getTierName(post.min_tier)}以上のプランに加入すると、
                                <br />
                                このコンテンツのすべてを閲覧できます。
                            </p>
                            <Button size="lg" asChild>
                                <Link href="/pricing">プランを見る</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </article>
        </div>
    )
}
