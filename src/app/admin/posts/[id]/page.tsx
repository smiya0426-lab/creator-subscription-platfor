import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PostForm } from '@/components/admin/PostForm'

interface EditPostPageProps {
    params: { id: string }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const supabase = await createClient()

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!post) {
        notFound()
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">投稿を編集</h1>
            <PostForm mode="edit" post={post} />
        </div>
    )
}
