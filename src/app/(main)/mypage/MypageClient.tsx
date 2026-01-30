'use client'

import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { Subscription, Profile } from '@/types'
import { SubscriptionStatus } from '@/components/subscription/SubscriptionStatus'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDate, getTierName, getTierColor } from '@/lib/utils'

interface MypageClientProps {
    profile: Profile | null
    subscription: Subscription | null
    currentTier: number
    email: string
}

export function MypageClient({ profile, subscription, currentTier, email }: MypageClientProps) {
    const router = useRouter()

    const handleManageSubscription = async () => {
        try {
            const response = await fetch('/api/stripe/portal', {
                method: 'POST',
            })
            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error('Portal error:', error)
        }
    }

    const getInitials = (email: string) => {
        return email.substring(0, 2).toUpperCase()
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Profile Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        プロフィール
                    </CardTitle>
                    <CardDescription>アカウント情報</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={profile?.avatar_url || undefined} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">
                                {getInitials(email)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{profile?.display_name || email.split('@')[0]}</p>
                            <p className="text-sm text-muted-foreground">{email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t">
                        <span className="text-sm text-muted-foreground">現在のプラン:</span>
                        <Badge className={getTierColor(currentTier)}>
                            {getTierName(currentTier)}
                        </Badge>
                    </div>

                    {profile?.created_at && (
                        <div className="text-sm text-muted-foreground">
                            登録日: {formatDate(profile.created_at)}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Subscription Card */}
            <SubscriptionStatus
                subscription={subscription}
                onManage={handleManageSubscription}
            />
        </div>
    )
}
