import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FileText, Plus, Settings, ArrowLeft } from 'lucide-react'
import { isAdmin } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const admin = await isAdmin()

    if (!admin) {
        redirect('/')
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-muted/30 p-6">
                <div className="mb-8">
                    <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">サイトに戻る</span>
                    </Link>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold">管理画面</h2>
                    <p className="text-sm text-muted-foreground">コンテンツ管理</p>
                </div>

                <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            ダッシュボード
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin/posts">
                            <FileText className="mr-2 h-4 w-4" />
                            投稿管理
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin/posts/new">
                            <Plus className="mr-2 h-4 w-4" />
                            新規投稿
                        </Link>
                    </Button>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}
