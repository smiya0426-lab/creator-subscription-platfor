import Link from 'next/link'
import Image from 'next/image'
import { Lock, Calendar, Sparkles } from 'lucide-react'
import { Post } from '@/types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, formatDate, getTierName, canAccessContent } from '@/lib/utils'

interface PostCardProps {
    post: Post
    userTier: number
}

function getTierStyles(tier: number): string {
    switch (tier) {
        case 0:
            return 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-0'
        case 1:
            return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0'
        case 2:
            return 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-0'
        default:
            return 'bg-gradient-to-r from-gray-500 to-gray-400 text-white border-0'
    }
}

export function PostCard({ post, userTier }: PostCardProps) {
    const hasAccess = canAccessContent(userTier, post.min_tier)
    const isLocked = !hasAccess && post.min_tier > 0

    return (
        <Card className="group glass border-pink-500/20 overflow-hidden card-hover">
            <Link href={`/posts/${post.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                    {post.thumbnail_url ? (
                        <>
                            <Image
                                src={post.thumbnail_url}
                                alt={post.title}
                                fill
                                className={cn(
                                    'object-cover transition-transform duration-500 group-hover:scale-110',
                                    isLocked && 'blur-xl scale-125'
                                )}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {isLocked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                    <div className="flex flex-col items-center gap-3 text-white">
                                        <div className="rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-4 glow-pink">
                                            <Lock className="h-8 w-8" />
                                        </div>
                                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                                            {getTierName(post.min_tier)}限定
                                        </span>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={cn(
                            'h-full w-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center',
                            isLocked && 'blur-sm'
                        )}>
                            {isLocked ? (
                                <div className="flex flex-col items-center gap-3 text-purple-200">
                                    <div className="rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-4 glow-pink">
                                        <Lock className="h-8 w-8 text-white" />
                                    </div>
                                    <span className="text-sm font-medium">{getTierName(post.min_tier)}限定</span>
                                </div>
                            ) : (
                                <div className="relative">
                                    <span className="text-5xl font-black gradient-text">
                                        {post.title.charAt(0)}
                                    </span>
                                    <Sparkles className="absolute -top-2 -right-4 h-5 w-5 text-yellow-400 float" />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="absolute top-3 right-3">
                        <Badge className={getTierStyles(post.min_tier)}>
                            <Sparkles className="h-3 w-3 mr-1" />
                            {getTierName(post.min_tier)}
                        </Badge>
                    </div>
                </div>
            </Link>

            <CardHeader className="pb-2">
                <Link href={`/posts/${post.id}`}>
                    <h3 className="font-bold text-lg line-clamp-2 text-white group-hover:text-pink-300 transition-colors">
                        {post.title}
                    </h3>
                </Link>
            </CardHeader>

            <CardContent className="pb-2">
                {hasAccess && post.content ? (
                    <p className="text-sm text-purple-200/70 line-clamp-2">
                        {post.content}
                    </p>
                ) : isLocked ? (
                    <p className="text-sm text-purple-300/50 italic">
                        この内容は{getTierName(post.min_tier)}会員限定です ✦
                    </p>
                ) : null}
            </CardContent>

            <CardFooter className="flex items-center justify-between text-xs text-purple-300/60 pt-2">
                <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(post.created_at)}</span>
                </div>
                {isLocked && (
                    <Button size="sm" className="btn-gradient text-white border-0 text-xs px-3" asChild>
                        <Link href="/pricing">プランを見る</Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
