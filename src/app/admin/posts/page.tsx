import Link from 'next/link'
import { Plus, Edit, Eye, EyeOff, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatDate, getTierName, getTierColor } from '@/lib/utils'

export default async function AdminPostsPage() {
    const supabase = await createClient()

    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">投稿管理</h1>
                    <p className="text-muted-foreground">すべての投稿を管理します</p>
                </div>
                <Button asChild>
                    <Link href="/admin/posts/new">
                        <Plus className="mr-2 h-4 w-4" />
                        新規投稿
                    </Link>
                </Button>
            </div>

            {posts && posts.length > 0 ? (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>タイトル</TableHead>
                                <TableHead>公開範囲</TableHead>
                                <TableHead>ステータス</TableHead>
                                <TableHead>作成日</TableHead>
                                <TableHead className="text-right">アクション</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/admin/posts/${post.id}`} className="hover:underline">
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getTierColor(post.min_tier)}>
                                            {getTierName(post.min_tier)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {post.is_published ? (
                                            <Badge variant="default" className="bg-green-500">
                                                <Eye className="mr-1 h-3 w-3" />
                                                公開
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                <EyeOff className="mr-1 h-3 w-3" />
                                                下書き
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{formatDate(post.created_at)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" variant="ghost" asChild>
                                                <Link href={`/admin/posts/${post.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button size="sm" variant="ghost" asChild>
                                                <Link href={`/posts/${post.id}`} target="_blank">
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-12 border rounded-lg">
                    <p className="text-muted-foreground mb-4">まだ投稿がありません</p>
                    <Button asChild>
                        <Link href="/admin/posts/new">
                            <Plus className="mr-2 h-4 w-4" />
                            最初の投稿を作成
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
