'use client'

import { Check, Star, Sparkles, Crown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn, formatPrice } from '@/lib/utils'

interface PricingCardProps {
    tier: {
        id: number
        name: string
        price: number
        priceId: string
        features: string[]
    }
    currentTier: number
    isPopular?: boolean
    onSubscribe: (tier: number) => void
    loading?: boolean
}

export function PricingCard({
    tier,
    currentTier,
    isPopular,
    onSubscribe,
    loading,
}: PricingCardProps) {
    const isCurrentPlan = currentTier === tier.id
    const isUpgrade = tier.id > currentTier
    const isPremium = tier.id === 2

    // Card gradient based on tier
    const getCardGradient = () => {
        if (isPremium) return 'from-pink-500/20 via-purple-500/10 to-pink-500/20'
        if (isPopular) return 'from-purple-500/20 via-indigo-500/10 to-purple-500/20'
        return 'from-blue-500/10 via-cyan-500/5 to-blue-500/10'
    }

    // Icon for each tier
    const TierIcon = () => {
        if (isPremium) return <Crown className="h-8 w-8 text-pink-400" />
        if (isPopular) return <Star className="h-8 w-8 text-purple-400" />
        return <Sparkles className="h-8 w-8 text-blue-400" />
    }

    return (
        <Card
            className={cn(
                'relative glass border-pink-500/20 overflow-hidden card-hover',
                isPopular && 'border-purple-400/50 scale-105 z-10',
                isPremium && 'border-pink-400/50',
                isCurrentPlan && 'border-green-400/50'
            )}
        >
            {/* Background gradient */}
            <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-50',
                getCardGradient()
            )} />

            {/* Glow effect for popular/premium */}
            {(isPopular || isPremium) && (
                <div className={cn(
                    'absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl',
                    isPremium ? 'bg-pink-500/30' : 'bg-purple-500/30'
                )} />
            )}

            {/* Badges */}
            {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 px-4 py-1 shadow-lg shadow-purple-500/30">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        人気No.1
                    </Badge>
                </div>
            )}

            {isPremium && !isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-pink-500 to-rose-400 text-white border-0 px-4 py-1 shadow-lg shadow-pink-500/30">
                        <Crown className="h-3 w-3 mr-1" />
                        プレミアム
                    </Badge>
                </div>
            )}

            {isCurrentPlan && (
                <div className="absolute -top-3 right-4 z-20">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-400 text-white border-0 shadow-lg">
                        ✓ 現在のプラン
                    </Badge>
                </div>
            )}

            <CardHeader className="text-center pb-2 pt-8 relative z-10">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <TierIcon />
                </div>
                <CardTitle className="text-2xl font-bold text-white">{tier.name}</CardTitle>
                <CardDescription className="text-purple-200/70">
                    {tier.id === 0 ? '基本機能をお試し' : tier.id === 1 ? '限定コンテンツにアクセス' : 'すべての特典を楽しむ'}
                </CardDescription>
            </CardHeader>

            <CardContent className="text-center relative z-10">
                <div className="mb-8">
                    <span className={cn(
                        'text-5xl font-black',
                        tier.price === 0 ? 'text-blue-400' : isPremium ? 'gradient-text' : 'text-white'
                    )}>
                        {tier.price === 0 ? '無料' : formatPrice(tier.price)}
                    </span>
                    {tier.price > 0 && (
                        <span className="text-purple-300/60 ml-1">/月</span>
                    )}
                </div>

                <ul className="space-y-4 text-sm text-left">
                    {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <div className={cn(
                                'mt-0.5 rounded-full p-1 shrink-0',
                                isPremium ? 'bg-pink-500/20' : isPopular ? 'bg-purple-500/20' : 'bg-blue-500/20'
                            )}>
                                <Check className={cn(
                                    'h-3 w-3',
                                    isPremium ? 'text-pink-400' : isPopular ? 'text-purple-400' : 'text-blue-400'
                                )} />
                            </div>
                            <span className="text-purple-100">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter className="relative z-10 pt-4">
                <Button
                    className={cn(
                        'w-full py-6 font-bold text-base transition-all',
                        isCurrentPlan
                            ? 'bg-green-500/20 border-green-500/50 text-green-300 hover:bg-green-500/30'
                            : isPremium
                                ? 'btn-gradient text-white border-0'
                                : isPopular
                                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0'
                                    : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border-blue-500/50'
                    )}
                    variant={isCurrentPlan ? 'outline' : 'default'}
                    disabled={isCurrentPlan || loading}
                    onClick={() => onSubscribe(tier.id)}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-spin">✦</span>
                            処理中...
                        </span>
                    ) : isCurrentPlan ? (
                        '✓ 現在のプラン'
                    ) : tier.id === 0 ? (
                        '無料で始める'
                    ) : isUpgrade ? (
                        <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            アップグレード
                        </>
                    ) : (
                        'プランを変更'
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
