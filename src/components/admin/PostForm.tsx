'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Post, NewPost, UpdatePost } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PostFormProps {
    post?: Post
    mode: 'create' | 'edit'
}

export function PostForm({ post, mode }: PostFormProps) {
    const router = useRouter()
    const supabase = createClient()

    const [title, setTitle] = useState(post?.title || '')
    const [content, setContent] = useState(post?.content || '')
    const [minTier, setMinTier] = useState(post?.min_tier || 0)
    const [isPublished, setIsPublished] = useState(post?.is_published || false)
    const [imageUrls, setImageUrls] = useState<string[]>(post?.image_urls || [])
    const [thumbnailUrl, setThumbnailUrl] = useState(post?.thumbnail_url || '')
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        setError(null)

        try {
            const uploadedUrls: string[] = []

            for (const file of Array.from(files)) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
                const filePath = `posts/${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(filePath, file)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('images')
                    .getPublicUrl(filePath)

                uploadedUrls.push(publicUrl)
            }

            setImageUrls([...imageUrls, ...uploadedUrls])

            // Set first image as thumbnail if not set
            if (!thumbnailUrl && uploadedUrls.length > 0) {
                setThumbnailUrl(uploadedUrls[0])
            }
        } catch (err: any) {
            setError(err.message || '画像のアップロードに失敗しました')
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (index: number) => {
        const newUrls = imageUrls.filter((_, i) => i !== index)
        setImageUrls(newUrls)

        if (thumbnailUrl === imageUrls[index]) {
            setThumbnailUrl(newUrls[0] || '')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError(null)

        try {
            const postData: NewPost | UpdatePost = {
                title,
                content,
                min_tier: minTier,
                is_published: isPublished,
                image_urls: imageUrls,
                thumbnail_url: thumbnailUrl,
            }

            if (mode === 'create') {
                const { error } = await supabase
                    .from('posts')
                    .insert(postData as NewPost)

                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('posts')
                    .update(postData as UpdatePost)
                    .eq('id', post!.id)

                if (error) throw error
            }

            router.push('/admin/posts')
            router.refresh()
        } catch (err: any) {
            setError(err.message || '保存に失敗しました')
        } finally {
            setSaving(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>基本情報</CardTitle>
                    <CardDescription>投稿のタイトルと本文を入力してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">タイトル *</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="投稿のタイトル"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">本文</Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="投稿の本文を入力..."
                            className="min-h-[200px]"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>画像</CardTitle>
                    <CardDescription>投稿に表示する画像をアップロードしてください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="images" className="cursor-pointer">
                            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                                {uploading ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">アップロード中...</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            クリックまたはドラッグ＆ドロップで画像をアップロード
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Label>
                        <Input
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={uploading}
                        />
                    </div>

                    {imageUrls.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {imageUrls.map((url, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'relative group aspect-square rounded-lg overflow-hidden border',
                                        url === thumbnailUrl && 'ring-2 ring-primary'
                                    )}
                                >
                                    <img
                                        src={url}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => setThumbnailUrl(url)}
                                        >
                                            <ImageIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {url === thumbnailUrl && (
                                        <span className="absolute top-2 left-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                                            サムネイル
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>公開設定</CardTitle>
                    <CardDescription>投稿の公開範囲と状態を設定してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>公開範囲</Label>
                        <div className="flex gap-4">
                            {[
                                { value: 0, label: '無料' },
                                { value: 1, label: 'プランA' },
                                { value: 2, label: 'プランB' },
                            ].map((tier) => (
                                <label
                                    key={tier.value}
                                    className={cn(
                                        'flex-1 flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors',
                                        minTier === tier.value
                                            ? 'border-primary bg-primary/10'
                                            : 'hover:border-muted-foreground'
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name="minTier"
                                        value={tier.value}
                                        checked={minTier === tier.value}
                                        onChange={(e) => setMinTier(Number(e.target.value))}
                                        className="sr-only"
                                    />
                                    <span className={minTier === tier.value ? 'font-medium' : ''}>
                                        {tier.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>公開状態</Label>
                        <div className="flex gap-4">
                            {[
                                { value: true, label: '公開' },
                                { value: false, label: '下書き' },
                            ].map((option) => (
                                <label
                                    key={String(option.value)}
                                    className={cn(
                                        'flex-1 flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors',
                                        isPublished === option.value
                                            ? 'border-primary bg-primary/10'
                                            : 'hover:border-muted-foreground'
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name="isPublished"
                                        checked={isPublished === option.value}
                                        onChange={() => setIsPublished(option.value)}
                                        className="sr-only"
                                    />
                                    <span className={isPublished === option.value ? 'font-medium' : ''}>
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                    {error}
                </div>
            )}

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    キャンセル
                </Button>
                <Button type="submit" disabled={saving || !title}>
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            保存中...
                        </>
                    ) : mode === 'create' ? (
                        '投稿を作成'
                    ) : (
                        '変更を保存'
                    )}
                </Button>
            </div>
        </form>
    )
}
