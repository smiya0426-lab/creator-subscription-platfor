import { CreditCard, Calendar, AlertCircle } from 'lucide-react'
import { Subscription } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate, getTierName, getTierColor } from '@/lib/utils'

interface SubscriptionStatusProps {
    subscription: Subscription | null
    onManage: () => void
}

export function SubscriptionStatus({ subscription, onManage }: SubscriptionStatusProps) {
    if (!subscription || subscription.status !== 'active') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        サブスクリプション
                    </CardTitle>
                    <CardDescription>現在、有料プランに加入していません</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <a href="/pricing">プランを見る</a>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        サブスクリプション
                    </CardTitle>
                    <Badge className={getTierColor(subscription.tier)}>
                        {getTierName(subscription.tier)}
                    </Badge>
                </div>
                <CardDescription>現在のプラン情報</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">次回更新日:</span>
                    <span className="font-medium">
                        {subscription.current_period_end
                            ? formatDate(subscription.current_period_end)
                            : '-'}
                    </span>
                </div>

                {subscription.cancel_at_period_end && (
                    <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                        <AlertCircle className="h-4 w-4" />
                        <span>期間終了時に解約予定</span>
                    </div>
                )}

                <Button variant="outline" className="w-full" onClick={onManage}>
                    プランを管理
                </Button>
            </CardContent>
        </Card>
    )
}
