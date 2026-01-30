import { Users, FileText, CreditCard, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    // Fetch stats
    const [postsResult, profilesResult, subscriptionsResult] = await Promise.all([
        supabase.from('posts').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('subscriptions').select('id, tier', { count: 'exact' }).eq('status', 'active'),
    ])

    const totalPosts = postsResult.count || 0
    const totalUsers = profilesResult.count || 0
    const activeSubscriptions = subscriptionsResult.count || 0

    // Calculate monthly revenue (simplified estimate)
    const subscriptions = subscriptionsResult.data || []
    const monthlyRevenue = subscriptions.reduce((acc, sub) => {
        if (sub.tier === 1) return acc + 500
        if (sub.tier === 2) return acc + 1000
        return acc
    }, 0)

    const stats = [
        {
            title: '投稿数',
            value: totalPosts.toString(),
            description: '公開・非公開含む',
            icon: FileText,
            color: 'text-blue-500',
        },
        {
            title: 'ユーザー数',
            value: totalUsers.toString(),
            description: '登録ユーザー全体',
            icon: Users,
            color: 'text-green-500',
        },
        {
            title: '有料会員数',
            value: activeSubscriptions.toString(),
            description: 'アクティブな購読者',
            icon: CreditCard,
            color: 'text-purple-500',
        },
        {
            title: '月間収益（概算）',
            value: `¥${monthlyRevenue.toLocaleString()}`,
            description: '有料会員からの収益',
            icon: TrendingUp,
            color: 'text-orange-500',
        },
    ]

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">ダッシュボード</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">クイックアクション</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <a href="/admin/posts/new">
                            <CardHeader>
                                <CardTitle className="text-lg">新規投稿を作成</CardTitle>
                                <CardDescription>新しいコンテンツを追加する</CardDescription>
                            </CardHeader>
                        </a>
                    </Card>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <a href="/admin/posts">
                            <CardHeader>
                                <CardTitle className="text-lg">投稿を管理</CardTitle>
                                <CardDescription>既存の投稿を編集・削除する</CardDescription>
                            </CardHeader>
                        </a>
                    </Card>
                </div>
            </div>
        </div>
    )
}
