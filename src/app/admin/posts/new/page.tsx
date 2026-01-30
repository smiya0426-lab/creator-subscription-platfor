import { PostForm } from '@/components/admin/PostForm'

export default function NewPostPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">新規投稿</h1>
            <PostForm mode="create" />
        </div>
    )
}
