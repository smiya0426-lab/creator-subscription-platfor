import { Post } from '@/types'
import { PostCard } from './PostCard'

interface PostListProps {
    posts: Post[]
    userTier: number
}

export function PostList({ posts, userTier }: PostListProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">投稿がありません</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} userTier={userTier} />
            ))}
        </div>
    )
}
